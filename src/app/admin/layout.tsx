import AdminLayout from "@/components/admin/AdminLayout/AdminLayout";
import { Toaster } from "sonner";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <AdminLayout>
             <Toaster
                position="top-right"
                richColors
                closeButton
            />
            {children}
        </AdminLayout>
    );

}