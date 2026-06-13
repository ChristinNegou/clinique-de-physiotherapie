"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, Filter } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { createClient } from "@/lib/supabase/client";

interface AppointmentRow {
  id: string;
  confirmation_number: string;
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  patient_notes: string | null;
  profiles: { first_name: string | null; last_name: string | null } | null;
  therapists: { name: string } | null;
  services: { name_fr: string } | null;
}

export default function AdminRendezVousPage() {
  const [appointments, setAppointments] = useState<AppointmentRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTherapist, setFilterTherapist] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    let query = supabase
      .from("appointments")
      .select(`*, profiles!patient_id(first_name, last_name), therapists(name), services(name_fr)`)
      .order("appointment_date", { ascending: false })
      .order("appointment_time", { ascending: false })
      .limit(100);

    if (filterStatus) query = query.eq("status", filterStatus);
    if (filterDate) query = query.eq("appointment_date", filterDate);
    if (filterTherapist) query = query.ilike("therapists.name", `%${filterTherapist}%`);

    const { data } = await query;
    setAppointments(data ?? []);
    setLoading(false);
  }, [filterStatus, filterDate, filterTherapist]);

  useEffect(() => { loadAppointments(); }, [loadAppointments]);

  async function updateStatus(id: string, status: string) {
    const supabase = createClient();
    await supabase.from("appointments").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    loadAppointments();
  }

  function exportCSV() {
    const rows = [
      ["Confirmation", "Date", "Heure", "Patient", "Thérapeute", "Service", "Statut"],
      ...appointments.map((a) => [
        a.confirmation_number,
        a.appointment_date,
        a.appointment_time.substring(0, 5),
        `${a.profiles?.first_name ?? ""} ${a.profiles?.last_name ?? ""}`.trim(),
        a.therapists?.name ?? "",
        a.services?.name_fr ?? "",
        a.status,
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rdv-physio-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Rendez-vous</h1>
          <p className="text-[#64748B] mt-1">{appointments.length} rendez-vous</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-white border border-[#E2E8F0] text-[#1E293B] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-[#64748B]" />
          <span className="text-sm font-medium text-[#1E293B]">Filtres</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30"
          >
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmé</option>
            <option value="cancelled">Annulé</option>
            <option value="completed">Terminé</option>
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30"
          />
          <input
            type="text"
            placeholder="Thérapeute..."
            value={filterTherapist}
            onChange={(e) => setFilterTherapist(e.target.value)}
            className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {["N° conf.", "Date", "Heure", "Patient", "Thérapeute", "Service", "Statut", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-[#64748B]">Chargement...</td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-[#64748B]">Aucun rendez-vous trouvé.</td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-[#64748B]">{appt.confirmation_number}</td>
                    <td className="px-4 py-3">
                      {new Date(appt.appointment_date + "T00:00:00").toLocaleDateString("fr-CA", { month: "short", day: "numeric" })}
                    </td>
                    <td className="px-4 py-3 font-mono">{appt.appointment_time.substring(0, 5)}</td>
                    <td className="px-4 py-3 font-medium text-[#1E293B]">
                      {appt.profiles?.first_name} {appt.profiles?.last_name}
                    </td>
                    <td className="px-4 py-3 text-[#64748B]">{appt.therapists?.name || "—"}</td>
                    <td className="px-4 py-3 text-[#64748B] max-w-[160px] truncate">{appt.services?.name_fr || "—"}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={appt.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {appt.status !== "confirmed" && appt.status !== "completed" && (
                          <button
                            onClick={() => updateStatus(appt.id, "confirmed")}
                            className="text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded hover:bg-green-100 transition-colors"
                          >
                            Confirmer
                          </button>
                        )}
                        {appt.status !== "cancelled" && appt.status !== "completed" && (
                          <button
                            onClick={() => updateStatus(appt.id, "cancelled")}
                            className="text-xs text-red-700 bg-red-50 border border-red-200 px-2 py-1 rounded hover:bg-red-100 transition-colors"
                          >
                            Annuler
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
