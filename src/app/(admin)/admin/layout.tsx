"use client";

import { ToastProvider } from "@/components/admin/Toast";

export const dynamic = "force-dynamic";

export default function AdminPagesLayout({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
