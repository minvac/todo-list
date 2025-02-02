import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <Navbar />
      <div className="mt-8">{children}</div>
    </div>
  );
}
