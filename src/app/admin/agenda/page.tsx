"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { createClient } from "@/lib/supabase/client";
import { TIME_SLOTS } from "@/lib/types";

const THERAPIST_NAMES = ["Marie-Ève Tremblay", "Jean-François Côté", "Sophie Beauchamp"];

function getWeekDays(weekOffset: number): { date: Date; label: string; str: string }[] {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7) + weekOffset * 7);
  monday.setHours(0, 0, 0, 0);
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      date: d,
      label: d.toLocaleDateString("fr-CA", { weekday: "short", day: "numeric", month: "short" }),
      str: d.toISOString().split("T")[0],
    };
  });
}

interface Appointment {
  id: string;
  appointment_time: string;
  appointment_date: string;
  status: string;
  therapists: { name: string } | null;
  services: { name_fr: string } | null;
  profiles: { first_name: string; last_name: string } | null;
}

export default function AgendaPage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  const days = getWeekDays(weekOffset);

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("appointments")
      .select(`*, therapists(name), services(name_fr), profiles!patient_id(first_name, last_name)`)
      .gte("appointment_date", days[0].str)
      .lte("appointment_date", days[4].str)
      .neq("status", "cancelled");
    setAppointments(data ?? []);
    setLoading(false);
  }, [days[0].str, days[4].str]); // eslint-disable-line

  useEffect(() => { loadAppointments(); }, [loadAppointments]);

  function getSlotAppts(dayStr: string, therapistName: string) {
    return appointments.filter(
      (a) =>
        a.appointment_date === dayStr &&
        a.therapists?.name === therapistName
    );
  }

  const STATUS_COLORS: Record<string, string> = {
    confirmed: "bg-green-50 border-green-200 text-green-800",
    pending: "bg-yellow-50 border-yellow-200 text-yellow-800",
    cancelled: "bg-red-50 border-red-200 text-red-800",
    completed: "bg-slate-50 border-slate-200 text-slate-600",
  };

  return (
    <div className="p-6 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Agenda</h1>
          <p className="text-[#64748B] text-sm mt-1">
            {days[0].label} – {days[4].label}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekOffset((w) => w - 1)}
            className="p-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setWeekOffset(0)}
            className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] text-sm text-[#64748B]"
          >
            Aujourd&apos;hui
          </button>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            className="p-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs">
        {[
          { status: "confirmed", label: "Confirmé" },
          { status: "pending", label: "En attente" },
          { status: "cancelled", label: "Annulé" },
        ].map(({ status, label }) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded border ${STATUS_COLORS[status]}`} />
            <span className="text-[#64748B]">{label}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-auto">
        {loading ? (
          <div className="p-12 text-center text-[#64748B] text-sm">Chargement...</div>
        ) : (
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFC]">
                <th className="w-16 px-3 py-3 text-left text-[#64748B] font-medium border-b border-[#E2E8F0]">Heure</th>
                {days.map((day) => (
                  <th
                    key={day.str}
                    colSpan={3}
                    className="px-3 py-3 text-center font-medium text-[#1E293B] border-b border-[#E2E8F0] capitalize"
                  >
                    {day.label}
                  </th>
                ))}
              </tr>
              <tr className="bg-[#EFF4F9]">
                <th className="border-b border-[#E2E8F0]" />
                {days.map((day) =>
                  THERAPIST_NAMES.map((name, i) => (
                    <th
                      key={`${day.str}-${i}`}
                      className="px-2 py-1.5 text-[10px] text-[#0066CC] font-medium border-b border-[#E2E8F0] truncate max-w-[80px]"
                    >
                      {name.split(" ")[0]}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map((slot) => (
                <tr key={slot} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                  <td className="px-3 py-2 font-mono text-[#64748B] font-medium">{slot}</td>
                  {days.map((day) =>
                    THERAPIST_NAMES.map((therapistName, i) => {
                      const appts = getSlotAppts(day.str, therapistName).filter(
                        (a) => a.appointment_time.substring(0, 5) === slot
                      );
                      const appt = appts[0];
                      return (
                        <td key={`${day.str}-${i}-${slot}`} className="px-1 py-1">
                          {appt ? (
                            <div
                              className={`rounded border px-1.5 py-1 text-[10px] leading-tight ${STATUS_COLORS[appt.status] || "bg-slate-50 border-slate-200"}`}
                            >
                              <p className="font-medium truncate">
                                {appt.profiles?.first_name} {appt.profiles?.last_name?.charAt(0)}.
                              </p>
                              <p className="opacity-75 truncate">{appt.services?.name_fr}</p>
                            </div>
                          ) : (
                            <div className="h-8 rounded border border-dashed border-[#E2E8F0]" />
                          )}
                        </td>
                      );
                    })
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
