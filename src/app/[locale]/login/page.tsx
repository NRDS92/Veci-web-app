import LoginForm from "@/components/auth/LoginForm";
import GoogleAuthProvider from "@/components/auth/GoogleAuthProvider";

export default function LoginPage() {
  return (
    <GoogleAuthProvider>
      <LoginForm />
    </GoogleAuthProvider>
  );
}