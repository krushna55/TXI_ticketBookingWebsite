'use client'

import GlobalLayout from "@/layout/gloableLayout";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalLayout>
      {children}
    </GlobalLayout>
  );
}
