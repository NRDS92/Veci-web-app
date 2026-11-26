import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { AxiosError } from "axios";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ResetPasswordForm from "@/features/auth/ResetPaswordForm";

const mocks = vi.hoisted(() => ({
  forgotPassword: vi.fn(),
  resetPassword: vi.fn(),
  login: vi.fn(),
  push: vi.fn(),
  params: { token: "local-reset-token" },
}));

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, string> = {
      "PasswordSecurity.forgotTitle": "Forgot your password?",
      "PasswordSecurity.forgotDescription": "Enter your account email.",
      "PasswordSecurity.emailLabel": "Email address",
      "PasswordSecurity.emailPlaceholder": "you@example.com",
      "PasswordSecurity.invalidEmail": "Enter a valid email address.",
      "PasswordSecurity.submitForgot": "Send reset link",
      "PasswordSecurity.sendingForgot": "Sending…",
      "PasswordSecurity.forgotSuccess": "If an account with this email exists, you will receive a password reset link.",
      "PasswordSecurity.forgotError": "We could not process your request. Please try again.",
      "PasswordSecurity.backToLogin": "Back to login",
      "PasswordSecurity.resetTitle": "Reset password",
      "PasswordSecurity.resetDescription": "Enter a new password below.",
      "PasswordSecurity.newPassword": "New password",
      "PasswordSecurity.newPasswordPlaceholder": "Enter your new password",
      "PasswordSecurity.confirmPassword": "Confirm new password",
      "PasswordSecurity.confirmPasswordPlaceholder": "Confirm your new password",
      "PasswordSecurity.showPassword": "Show passwords",
      "PasswordSecurity.required": "Password is required.",
      "PasswordSecurity.invalidToken": "The reset link is invalid or has expired.",
      "PasswordSecurity.mismatch": "The new password and confirmation do not match.",
      "PasswordSecurity.policyError": "The password does not meet the requirements.",
      "PasswordSecurity.resetSuccess": "Password updated successfully.",
      "PasswordSecurity.resetError": "Unable to reset your password.",
      "PasswordSecurity.rateLimited": "Too many attempts. Please wait before trying again.",
      "PasswordSecurity.genericError": "Something went wrong.",
      "PasswordSecurity.goToLogin": "Go to login",
      "PasswordSecurity.requirements.title": "Password requirements",
      "PasswordSecurity.requirements.minLength": "At least 8 characters",
      "PasswordSecurity.requirements.uppercase": "One uppercase letter",
      "PasswordSecurity.requirements.lowercase": "One lowercase letter",
      "PasswordSecurity.requirements.number": "One number",
      "PasswordSecurity.requirements.special": "One special character",
      "PasswordSecurity.requirements.maxBytes": "No more than 72 UTF-8 bytes",
    };

    return translations[`${namespace}.${key}`] ?? key;
  },
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
  useRouter: () => ({ push: mocks.push }),
}));

vi.mock("next/navigation", () => ({
  useParams: () => mocks.params,
}));

vi.mock("@/features/auth/auth.service", () => ({
  authService: {
    forgotPassword: mocks.forgotPassword,
    resetPassword: mocks.resetPassword,
    login: mocks.login,
  },
}));

describe("password recovery flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.params.token = "local-reset-token";
    sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders recovery form and a locale-aware link back to login", () => {
    render(<ForgotPasswordForm />);

    expect(screen.getByRole("heading", { name: "Forgot your password?" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toHaveAttribute("type", "email");
    expect(screen.getByRole("link", { name: "Back to login" })).toHaveAttribute("href", "/login");
  });

  it("rejects invalid email without calling the API", () => {
    render(<ForgotPasswordForm />);
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "not-an-email" } });
    fireEvent.submit(screen.getByRole("form", { name: "forgot-password-form" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email address.");
    expect(mocks.forgotPassword).not.toHaveBeenCalled();
  });

  it("submits a normalized email and always shows the generic confirmation", async () => {
    mocks.forgotPassword.mockResolvedValue({ data: { success: true } });
    render(<ForgotPasswordForm />);
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "  TEST@Example.com  " } });
    fireEvent.submit(screen.getByRole("form", { name: "forgot-password-form" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "If an account with this email exists, you will receive a password reset link."
    );
    expect(mocks.forgotPassword).toHaveBeenCalledWith({ email: "test@example.com" });
  });

  it("shows a separate network error and does not reveal account existence", async () => {
    mocks.forgotPassword.mockRejectedValue(new Error("network unavailable"));
    render(<ForgotPasswordForm />);
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "person@example.test" } });
    fireEvent.submit(screen.getByRole("form", { name: "forgot-password-form" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("We could not process your request. Please try again.");
    expect(screen.queryByText("person@example.test")).not.toBeInTheDocument();
  });

  it("prevents duplicate requests while one is pending", async () => {
    let resolveRequest: (() => void) | undefined;
    mocks.forgotPassword.mockImplementation(() => new Promise<void>((resolve) => {
      resolveRequest = resolve;
    }));
    render(<ForgotPasswordForm />);
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "person@example.test" } });
    const form = screen.getByRole("form", { name: "forgot-password-form" });
    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(mocks.forgotPassword).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();

    resolveRequest?.();
    await screen.findByRole("status");
  });

  it("uses the shared password policy, submits the route token, and does not log in", async () => {
    mocks.resetPassword.mockResolvedValue({ data: { success: true } });
    sessionStorage.setItem("auth_token", "existing-session");
    render(<ResetPasswordForm />);
    fireEvent.change(screen.getByLabelText("New password"), { target: { value: "SecurePass!2026" } });
    fireEvent.change(screen.getByLabelText("Confirm new password"), { target: { value: "SecurePass!2026" } });
    fireEvent.submit(screen.getByRole("button", { name: "Reset password" }).closest("form")!);

    expect(await screen.findByRole("button", { name: "Go to login" })).toBeInTheDocument();
    expect(mocks.resetPassword).toHaveBeenCalledWith({ token: "local-reset-token", password: "SecurePass!2026" });
    expect(sessionStorage.getItem("auth_token")).toBe("existing-session");
    expect(mocks.login).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Go to login" }));
    expect(mocks.push).toHaveBeenCalledWith("/login");
  });

  it("rejects passwords that fail policy or confirmation", async () => {
    render(<ResetPasswordForm />);
    fireEvent.change(screen.getByLabelText("New password"), { target: { value: "weak" } });
    fireEvent.change(screen.getByLabelText("Confirm new password"), { target: { value: "weak" } });
    fireEvent.submit(screen.getByRole("button", { name: "Reset password" }).closest("form")!);
    expect(await screen.findByText("The password does not meet the requirements.")).toBeInTheDocument();
    expect(mocks.resetPassword).not.toHaveBeenCalled();

    cleanup();
    render(<ResetPasswordForm />);
    fireEvent.change(screen.getByLabelText("New password"), { target: { value: "SecurePass!2026" } });
    fireEvent.change(screen.getByLabelText("Confirm new password"), { target: { value: "DifferentPass!2026" } });
    fireEvent.submit(screen.getByRole("button", { name: "Reset password" }).closest("form")!);
    expect(await screen.findByText("The new password and confirmation do not match.")).toBeInTheDocument();
    expect(mocks.resetPassword).not.toHaveBeenCalled();
  });

  it("shows invalid or expired token errors from the Backend", async () => {
    mocks.resetPassword.mockRejectedValue(Object.assign(new Error("expired"), {
      isAxiosError: true,
      response: { data: { code: "INVALID_RESET_TOKEN", message: "Invalid or expired reset token." } },
    }) as AxiosError);
    render(<ResetPasswordForm />);
    fireEvent.change(screen.getByLabelText("New password"), { target: { value: "SecurePass!2026" } });
    fireEvent.change(screen.getByLabelText("Confirm new password"), { target: { value: "SecurePass!2026" } });
    fireEvent.submit(screen.getByRole("button", { name: "Reset password" }).closest("form")!);

    expect(await screen.findByRole("alert")).toHaveTextContent("The reset link is invalid or has expired.");
    expect(sessionStorage.getItem("auth_token")).toBeNull();
    expect(mocks.push).not.toHaveBeenCalled();
  });

  it("localizes validation and rate-limit responses using Backend error codes", async () => {
    mocks.resetPassword.mockRejectedValueOnce(Object.assign(new Error("rate limited"), {
      isAxiosError: true,
      response: { status: 429, data: { code: "RATE_LIMITED", message: "Too many requests. Please try again later." } },
    }));
    render(<ResetPasswordForm />);
    fireEvent.change(screen.getByLabelText("New password"), { target: { value: "SecurePass!2026" } });
    fireEvent.change(screen.getByLabelText("Confirm new password"), { target: { value: "SecurePass!2026" } });
    fireEvent.submit(screen.getByRole("button", { name: "Reset password" }).closest("form")!);
    expect(await screen.findByRole("alert")).toHaveTextContent("Too many attempts. Please wait before trying again.");

    cleanup();
    mocks.resetPassword.mockRejectedValueOnce(Object.assign(new Error("invalid payload"), {
      isAxiosError: true,
      response: { status: 400, data: { code: "VALIDATION_ERROR", message: "Invalid request data" } },
    }));
    render(<ResetPasswordForm />);
    fireEvent.change(screen.getByLabelText("New password"), { target: { value: "SecurePass!2026" } });
    fireEvent.change(screen.getByLabelText("Confirm new password"), { target: { value: "SecurePass!2026" } });
    fireEvent.submit(screen.getByRole("button", { name: "Reset password" }).closest("form")!);
    expect(await screen.findByRole("alert")).toHaveTextContent("The password does not meet the requirements.");
  });
});
