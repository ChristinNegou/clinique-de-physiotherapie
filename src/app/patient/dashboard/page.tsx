import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/check";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CalendarPlus, Calendar, User, ArrowRight, Clock } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import SupabaseNotConfigured from "@/components/ui/SupabaseNotConfigured";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(timeStr: string) {
  return timeStr.substring(0, 5);
}

export default async function PatientDashboard() {
  if (!isSupabaseConfigured()) return <SupabaseNotConfigured />;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const today = new Date().toISOString().split("T")[0];

  const { data: upcomingAppointments } = await supabase
    .from("appointments")
    .select(`*, therapists(name, title), services(name_fr)`)
    .eq("patient_id", user.id)
    .gte("appointment_date", today)
    .neq("status", "cancelled")
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true })
    .limit(4);

  const { data: recentAppointments } = await supabase
    .from("appointments")
    .select(`*, therapists(name, title), services(name_fr)`)
    .eq("patient_id", user.id)
    .lt("appointment_date", today)
    .order("appointment_date", { ascending: false })
    .limit(3);

  const firstName = profile?.first_name || user.email?.split("@")[0] || "Patient";
  const nextAppt = upcomingAppointments?.[0] ?? null;

  // Profile completeness
  const profileFields = ["first_name", "last_name", "phone", "date_of_birth", "address"];
  const filledFields = profileFields.filter((f) => profile?.[f as keyof typeof profile]);
  const profilePercent = Math.round((filledFields.length / profileFields.length) * 100);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1E293B]">
          Bonjour, {firstName} 👋
        </h1>
        <p className="text-[#64748B] mt-1">Bienvenue dans votre espace patient.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Next appointment */}
        <div className="lg:col-span-2">
          {nextAppt ? (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-[#1E293B] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0066CC]" />
                  Prochain rendez-vous
                </h2>
                <StatusBadge status={nextAppt.status} />
              </div>
              <div className="bg-[#EFF4F9] rounded-xl p-4">
                <p className="font-semibold text-[#1E293B] text-lg capitalize">
                  {formatDate(nextAppt.appointment_date)}
                </p>
                <p className="text-[#0066CC] font-medium mt-1 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatTime(nextAppt.appointment_time)}
                </p>
                <div className="mt-3 pt-3 border-t border-[#E2E8F0] text-sm text-[#64748B]">
                  <p><strong>Service :</strong> {nextAppt.services?.name_fr || "—"}</p>
                  <p><strong>Thérapeute :</strong> {nextAppt.therapists?.name || "—"}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
              <h2 className="font-semibold text-[#1E293B] flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-[#0066CC]" />
                Prochain rendez-vous
              </h2>
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-[#E2E8F0] mx-auto mb-3" />
                <p className="text-[#64748B] text-sm">Aucun rendez-vous à venir</p>
                <Link
                  href="/patient/rendez-vous"
                  className="inline-flex items-center gap-2 mt-4 bg-[#0066CC] text-white font-medium px-4 py-2 rounded-lg text-sm hover:bg-[#0052a3] transition-colors"
                >
                  <CalendarPlus className="w-4 h-4" />
                  Prendre un rendez-vous
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick actions + profile */}
        <div className="space-y-4">
          {/* Quick action */}
          <Link
            href="/patient/rendez-vous"
            className="flex items-center gap-3 bg-[#0066CC] text-white rounded-xl p-4 hover:bg-[#0052a3] transition-colors"
          >
            <CalendarPlus className="w-5 h-5 shrink-0" />
            <span className="font-medium text-sm">Prendre un nouveau RDV</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </Link>

          {/* Profile status */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-[#0066CC]" />
              <span className="text-sm font-medium text-[#1E293B]">Profil</span>
              <span className={`ml-auto text-xs font-medium ${profilePercent === 100 ? "text-green-600" : "text-orange-500"}`}>
                {profilePercent}%
              </span>
            </div>
            <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 mb-3">
              <div
                className={`h-1.5 rounded-full ${profilePercent === 100 ? "bg-[#00A878]" : "bg-[#0066CC]"}`}
                style={{ width: `${profilePercent}%` }}
              />
            </div>
            {profilePercent < 100 && (
              <Link
                href="/patient/profil"
                className="text-xs text-[#0066CC] hover:underline font-medium"
              >
                Compléter mon profil →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Recent appointments */}
      {(recentAppointments?.length ?? 0) > 0 && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E2E8F0]">
            <h2 className="font-semibold text-[#1E293B]">Historique récent</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">Service</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">Thérapeute</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {recentAppointments?.map((appt) => (
                  <tr key={appt.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-3 capitalize">{formatDate(appt.appointment_date)}</td>
                    <td className="px-6 py-3 text-[#64748B]">{appt.services?.name_fr || "—"}</td>
                    <td className="px-6 py-3 text-[#64748B]">{appt.therapists?.name || "—"}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={appt.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
