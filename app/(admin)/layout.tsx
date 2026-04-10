import AdminLayout from "@/layout/adminLayout";
import GlobalLayout from "@/layout/gloableLayout";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        
        <AdminLayout>
            {children}
        </AdminLayout>

    );
}
