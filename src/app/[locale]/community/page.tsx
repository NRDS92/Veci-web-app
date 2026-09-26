import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ColombiaLoader from "@/components/ui/loader/ColombiaLoader";

export default function ProfilePage() {
  return (
    
      <div className="min-h-screen flex items-center justify-center bg-white">
    <ColombiaLoader
        size="lg"
        text="Encontrando tu comunidad..."
    />
</div>

  );
}