"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CalendarPlus, User, LogOut, ActivitySquare } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/patient/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/patient/rendez-vous", label: "Mes rendez-vous", icon: CalendarPlus },
  { href: "/patient/profil", label: "Mon profil", icon: User },
];

export default function PatientSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[#E2E8F0] min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#E2E8F0]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0066CC] rounded-lg flex items-center justify-center">
            <ActivitySquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-[#1E293B] text-sm block">Physio Mauricie</span>
            <span className="text-xs text-[#64748B]">Espace patient</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === href
                ? "bg-[#EFF4F9] text-[#0066CC]"
                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B]"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#E2E8F0]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#64748B] hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
