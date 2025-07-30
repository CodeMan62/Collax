import type { Metadata } from "next";
import "@collax/ui/globals.css"
import SessionProvider from "@/components/session-provider"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Collax - Collaborative Notes",
  description: "A collaborative note-taking application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
