import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/check";
import { redirect } from "next/navigation";
import { Calendar, Users, CalendarCheck, TrendingUp } from "lucide-react";
import MetricCard from "@/components/admin/MetricCard";
import StatusBadge from "@/components/ui/StatusBadge";
import SupabaseNotConfigured from "@/components/ui/SupabaseNotConfigured";

function formatTime(t: string) { return t.substring(0, 5); }
function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("fr-CA", { month: "short", day: "numeric" });
}

export default async function AdminDashboard() {
  if (!isSupabaseConfigured()) return <SupabaseNotConfigured />;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const today = new Date().toISOString().split("T")[0];
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
  const weekStartStr = weekStart.toISOString().split("T")[0];
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const weekEndStr = weekEnd.toISOString().split("T")[0];

  const [todayAppts, weekAppts, weekPatients, upcomingAppts] = await Promise.all([
    supabase.from("appointments").select("id, status").eq("appointment_date", today).neq("status", "cancelled"),
    supabase.from("appointments").select("id").gte("appointment_date", weekStartStr).lte("appointment_date", weekEndStr),
    supabase.from("profiles").select("id").eq("role", "patient").gte("created_at", weekStartStr),
    supabase.from("appointments")
      .select(`*, profiles!patient_id(first_name, last_name), therapists(name), services(name_fr)`)
      .gte("appointment_date", today)
      .neq("status", "cancelled")
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true })
      .limit(10),
  ]);

  const todayCount = todayAppts.data?.length ?? 0;
  const weekCount = weekAppts.data?.length ?? 0;
  const newPatients = weekPatients.data?.length ?? 0;
  const maxSlots = 9 * 3; // 9 slots × 3 therapists
  const occupancy = weekCount > 0 ? Math.round((weekCount / (maxSlots * 5)) * 100) : 0;

  // Today's appointments sorted by time
  const { data: todayFull } = await supabase
    .from("appointments")
    .select(`*, profiles!patient_id(first_name, last_name), therapists(name), services(name_fr)`)
    .eq("appointment_date", today)
    .order("appointment_time", { ascending: true });

  // Group today's by therapist
  const byTherapist: Record<string, typeof todayFull> = {};
  todayFull?.forEach((a) => {
    const key = a.therapists?.name ?? "Sans thérapeute";
    if (!byTherapist[key]) byTherapist[key] = [];
    byTherapist[key]!.push(a);
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1E293B]">Tableau de bord</h1>
        <p className="text-[#64748B] mt-1">
          {new Date().toLocaleDateString("fr-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="RDV aujourd'hui"
          value={todayCount}
          sub={`${todayFull?.filter(a => a.status === "confirmed").length ?? 0} confirmés`}
          icon={Calendar}
          color="blue"
        />
        <MetricCard
          title="Nouveaux patients"
          value={newPatients}
          sub="cette semaine"
          icon={Users}
          color="green"
        />
        <MetricCard
          title="RDV cette semaine"
          value={weekCount}
          sub="du lun. au dim."
          icon={CalendarCheck}
          color="purple"
        />
        <MetricCard
          title="Taux d'occupation"
          value={`${occupancy}%`}
          sub="créneaux remplis"
          icon={TrendingUp}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's agenda */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E2E8F0]">
            <h2 className="font-semibold text-[#1E293B]">Agenda du jour</h2>
          </div>
          {Object.keys(byTherapist).length === 0 ? (
            <div className="p-6 text-center text-[#64748B] text-sm">
              Aucun rendez-vous aujourd&apos;hui.
            </div>
          ) : (
            <div className="divide-y divide-[#E2E8F0]">
              {Object.entries(byTherapist).map(([therapistName, appts]) => (
                <div key={therapistName} className="p-4">
                  <p className="text-xs font-semibold text-[#0066CC] uppercase tracking-wide mb-3">{therapistName}</p>
                  <div className="space-y-2">
                    {appts?.map((a) => (
                      <div key={a.id} className="flex items-center gap-3 text-sm">
                        <span className="text-[#64748B] w-12 shrink-0 font-mono">{formatTime(a.appointment_time)}</span>
                        <span className="font-medium text-[#1E293B] flex-1">
                          {a.profiles?.first_name} {a.profiles?.last_name}
                        </span>
                        <span className="text-[#64748B] text-xs flex-1 truncate">{a.services?.name_fr}</span>
                        <StatusBadge status={a.status} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming appointments */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E2E8F0]">
            <h2 className="font-semibold text-[#1E293B]">Prochains rendez-vous</h2>
          </div>
          <div className="divide-y divide-[#E2E8F0]">
            {(upcomingAppts.data?.length ?? 0) === 0 ? (
              <div className="p-6 text-center text-[#64748B] text-sm">Aucun rendez-vous à venir.</div>
            ) : (
              upcomingAppts.data?.map((a) => (
                <div key={a.id} className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-[#F8FAFC]">
                  <div className="shrink-0 text-center">
                    <p className="text-xs text-[#64748B]">{formatDate(a.appointment_date)}</p>
                    <p className="font-mono font-medium text-[#0066CC]">{formatTime(a.appointment_time)}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#1E293B] truncate">
                      {a.profiles?.first_name} {a.profiles?.last_name}
                    </p>
                    <p className="text-xs text-[#64748B] truncate">{a.services?.name_fr} · {a.therapists?.name}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
