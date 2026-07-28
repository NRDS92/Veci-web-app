import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (

        <div className="flex h-screen bg-gray-100">

            <Sidebar />

            <div className="flex flex-1 flex-col">

                <Topbar />

                <main className="flex-1 overflow-auto p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}