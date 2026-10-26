
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { AxiosError } from "axios";

import LoginForm from "../components/auth/LoginForm";
import { NotificationProvider } from "../components/notifications/NotificationProvider";

vi.mock("next/image", () => ({
  default: (props: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={props.src} alt={props.alt} className={props.className} />,
}));

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, string> = {
      "LoginForm.welcome": "Willkommen zurück",
      "LoginForm.heading": "Schön, dich wiederzusehen.",
      "LoginForm.subtitle":
        "Melde dich an und entdecke deine Community weiter.",
      "LoginForm.email": "E-Mail-Adresse",
      "LoginForm.emailPlaceholder": "du@beispiel.de",
      "LoginForm.password": "Passwort",
      "LoginForm.passwordPlaceholder": "Gib dein Passwort ein",
      "LoginForm.forgotPassword": "Passwort vergessen?",
      "LoginForm.submit": "Anmelden",
      "LoginForm.noAccount": "Du hast noch kein Konto?",
      "LoginForm.register": "Konto erstellen →",
      "LoginForm.community": "Für unsere Community gemacht",
      "LoginForm.loader": "Du wirst mit Veci verbunden",

      "LoginForm.validation.emailRequired.title":
        "E-Mail-Adresse erforderlich",
      "LoginForm.validation.emailRequired.message":
        "Gib deine E-Mail-Adresse ein, um fortzufahren.",

      "LoginForm.validation.passwordRequired.title":
        "Passwort erforderlich",
      "LoginForm.validation.passwordRequired.message":
        "Gib dein Passwort ein, um fortzufahren.",

      "LoginForm.success.title": "Willkommen bei Veci!",
      "LoginForm.success.message":
        "Du hast dich erfolgreich angemeldet.",

      "LoginForm.errors.invalidCredentials.title":
        "Anmeldung fehlgeschlagen",
      "LoginForm.errors.invalidCredentials.message":
        "Deine E-Mail-Adresse oder dein Passwort ist falsch.",

      "LoginForm.errors.emailNotVerified.title": "E-Mail bestätigen",
      "LoginForm.errors.emailNotVerified.message":
        "Du musst deine E-Mail-Adresse bestätigen, bevor du dich anmeldest.",

      "LoginForm.errors.googleAccount.title": "Google-Konto",
      "LoginForm.errors.googleAccount.message":
        "Dieses Konto wurde mit Google erstellt. Bitte nutze diese Anmeldemethode.",

      "LoginForm.errors.generic.title": "Anmeldefehler",
      "LoginForm.errors.generic.message":
        "Die Anmeldung war nicht möglich. Bitte versuche es erneut.",

      "NotificationToast.close": "Schließen",
    };

    return translations[`${namespace}.${key}`] ?? key;
  },
}));

const navigationMocks = vi.hoisted(() => ({
  push: vi.fn(),
  refreshUser: vi.fn(),
  login: vi.fn(),
}));

vi.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    push: navigationMocks.push,
  }),
}));

vi.mock("../components/auth/AuthProvider", () => ({
  useAuth: () => ({
    refreshUser: navigationMocks.refreshUser,
  }),
}));

vi.mock("../features/auth/auth.service", () => ({
  authService: {
    login: navigationMocks.login,
  },
}));

const loginMock = navigationMocks.login;

function renderLogin() {
  return render(
    <NotificationProvider>
      <LoginForm />
    </NotificationProvider>
  );
}

function fillLoginForm(
  email = "wrong@example.com",
  password = "wrong-password"
) {
  fireEvent.change(screen.getByLabelText("E-Mail-Adresse"), {
    target: { value: email },
  });

  fireEvent.change(screen.getByLabelText("Passwort"), {
    target: { value: password },
  });
}

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders the login content without an error notification", () => {
    renderLogin();

    expect(
      screen.getByText("Willkommen zurück")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Anmeldung fehlgeschlagen")
    ).not.toBeInTheDocument();
  });

  it("shows an error notification when credentials are incorrect", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    loginMock.mockRejectedValue({
      isAxiosError: true,
      response: {
        data: { code: "INVALID_CREDENTIALS" },
      },
    } as AxiosError);

    renderLogin();
    fillLoginForm();

    fireEvent.click(
      screen.getByRole("button", { name: "Anmelden" })
    );

    expect(
      await screen.findByText("Anmeldung fehlgeschlagen")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Deine E-Mail-Adresse oder dein Passwort ist falsch."
      )
    ).toBeInTheDocument();

    expect(loginMock).toHaveBeenCalledWith({
      email: "wrong@example.com",
      password: "wrong-password",
    });
  });

  it("shows the loading indicator while login is pending", async () => {
    loginMock.mockImplementation(() => new Promise(() => {}));

    renderLogin();
    fillLoginForm();

    fireEvent.click(
      screen.getByRole("button", { name: "Anmelden" })
    );

    expect(
      await screen.findByText("Du wirst mit Veci verbunden")
    ).toBeInTheDocument();
  });

  it("shows a warning when the email is empty", async () => {
    renderLogin();

    fireEvent.click(
      screen.getByRole("button", { name: "Anmelden" })
    );

    expect(
      await screen.findByText("E-Mail-Adresse erforderlich")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Gib deine E-Mail-Adresse ein, um fortzufahren."
      )
    ).toBeInTheDocument();

    expect(loginMock).not.toHaveBeenCalled();
  });

  it("shows a warning when the password is empty", async () => {
    renderLogin();

    fireEvent.change(screen.getByLabelText("E-Mail-Adresse"), {
      target: { value: "user@example.com" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Anmelden" })
    );

    expect(
      await screen.findByText("Passwort erforderlich")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Gib dein Passwort ein, um fortzufahren."
      )
    ).toBeInTheDocument();

    expect(loginMock).not.toHaveBeenCalled();
  });

  it("logs in successfully with valid credentials", async () => {
    loginMock.mockResolvedValue({
      data: {
        data: {
          token: "fake-jwt-token",
        },
      },
    });

    navigationMocks.refreshUser.mockResolvedValue(undefined);

    renderLogin();
    fillLoginForm("  USER@example.com  ", "valid-password");

    fireEvent.click(
      screen.getByRole("button", { name: "Anmelden" })
    );

    expect(
      await screen.findByText("Willkommen bei Veci!")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Du hast dich erfolgreich angemeldet.")
    ).toBeInTheDocument();

    expect(loginMock).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "valid-password",
    });

    expect(sessionStorage.getItem("auth_token")).toBe(
      "fake-jwt-token"
    );

    expect(navigationMocks.refreshUser).toHaveBeenCalledOnce();
    expect(navigationMocks.push).toHaveBeenCalledWith("/");
  });
});
