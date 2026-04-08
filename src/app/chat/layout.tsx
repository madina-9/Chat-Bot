import Sidebar from "@/components/Sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen grid grid-cols-12 bg-[#f7f5ef] text-black font-sans">
      <Sidebar />
      {children}
    </div>
  );
}
