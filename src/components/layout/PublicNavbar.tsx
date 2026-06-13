"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, ActivitySquare } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/equipe", label: "Notre équipe" },
  { href: "/contact", label: "Contact" },
];

export default function PublicNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0066CC] rounded-lg flex items-center justify-center">
              <ActivitySquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-[#1E293B] text-sm leading-tight block">Physio Mauricie</span>
              <span className="text-xs text-[#64748B] leading-tight block">Cap-de-la-Madeleine</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#0066CC]"
                    : "text-[#1E293B] hover:text-[#0066CC]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+18195550101"
              className="flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#0066CC] transition-colors"
            >
              <Phone className="w-4 h-4" />
              819-555-0101
            </a>
            <Link
              href="/auth/login"
              className="text-sm font-medium text-[#0066CC] hover:text-[#0052a3] transition-colors"
            >
              Se connecter
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm font-semibold bg-[#0066CC] text-white px-4 py-2 rounded-lg hover:bg-[#0052a3] transition-colors"
            >
              Prendre RDV
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[#1E293B]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  pathname === link.href ? "text-[#0066CC]" : "text-[#1E293B]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-center text-[#0066CC] py-2 border border-[#0066CC] rounded-lg"
              >
                Se connecter
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-center bg-[#0066CC] text-white py-2 rounded-lg font-semibold"
              >
                Prendre RDV
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
