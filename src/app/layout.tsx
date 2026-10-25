import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { PortalLayout } from "@/components/PortalLayout";

export const metadata: Metadata = {
  title: "AICTE Integrated Institution Complaint Monitoring & Status Dashboard",
  description: "Official internal monitoring and cross-bureau overlap detection portal for AICTE officials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <PortalLayout>{children}</PortalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
