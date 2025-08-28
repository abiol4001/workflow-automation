import Sidebar from "@/components/Sidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      <aside className="hidden h-full md:flex md:flex-col md:w-52 lg:w-72 border-r border-r-gray-900 min-h-screen">
        <Sidebar userData={{
          id: "",
          email: "",
          name: "",
          image: ""
        }} />
      </aside>
      <div>
        topbar
        {children}
      </div>
    </div>
  );
}
