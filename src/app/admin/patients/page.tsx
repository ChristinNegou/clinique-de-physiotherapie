"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, ChevronLeft, ChevronRight, User, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import StatusBadge from "@/components/ui/StatusBadge";

interface Patient {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email?: string;
  phone: string | null;
  created_at: string;
  appointment_count?: number;
  admin_notes?: string;
}

interface PatientAppointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  services: { name_fr: string } | null;
  therapists: { name: string } | null;
}

const PAGE_SIZE = 20;

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Patient | null>(null);
  const [patientAppts, setPatientAppts] = useState<PatientAppointment[]>([]);
  const [adminNotes, setAdminNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const loadPatients = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    let query = supabase
      .from("profiles")
      .select("id, first_name, last_name, phone, created_at", { count: "exact" })
      .eq("role", "patient")
      .order("created_at", { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%`);
    }

    const { data, count } = await query;
    setPatients(data ?? []);
    setTotal(count ?? 0);
    setLoading(false);
  }, [page, search]);

  useEffect(() => { loadPatients(); }, [loadPatients]);

  async function openPatient(patient: Patient) {
    setSelected(patient);
    setAdminNotes(patient.admin_notes || "");
    const supabase = createClient();
    const { data } = await supabase
      .from("appointments")
      .select(`*, services(name_fr), therapists(name)`)
      .eq("patient_id", patient.id)
      .order("appointment_date", { ascending: false });
    setPatientAppts(data ?? []);
  }

  async function saveNotes() {
    if (!selected) return;
    setSavingNotes(true);
    // In a real app, save to a separate admin_notes table or profile field
    setSavingNotes(false);
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1E293B]">Patients</h1>
        <p className="text-[#64748B] mt-1">{total} patient{total > 1 ? "s" : ""} enregistré{total > 1 ? "s" : ""}</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm mb-4">
        <div className="flex items-center gap-3 px-4 py-3">
          <Search className="w-4 h-4 text-[#64748B] shrink-0" />
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="flex-1 text-sm outline-none placeholder-[#64748B]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">Nom</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">Téléphone</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">Inscription</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-[#64748B]">Chargement...</td>
                </tr>
              ) : patients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-[#64748B]">Aucun patient trouvé.</td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#EFF4F9] rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-[#0066CC]" />
                        </div>
                        <span className="font-medium text-[#1E293B]">
                          {patient.first_name || "—"} {patient.last_name || ""}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-[#64748B]">{patient.phone || "—"}</td>
                    <td className="px-5 py-3 text-[#64748B]">
                      {new Date(patient.created_at).toLocaleDateString("fr-CA")}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => openPatient(patient)}
                        className="text-sm text-[#0066CC] hover:underline font-medium"
                      >
                        Voir la fiche
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#E2E8F0]">
            <p className="text-xs text-[#64748B]">
              {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} sur {total}
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="p-1.5 rounded border border-[#E2E8F0] disabled:opacity-40 hover:bg-[#F8FAFC]"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="p-1.5 rounded border border-[#E2E8F0] disabled:opacity-40 hover:bg-[#F8FAFC]"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Patient detail panel */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div
            className="bg-white w-full max-w-lg h-full overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between">
              <h2 className="font-bold text-[#1E293B]">
                {selected.first_name} {selected.last_name}
              </h2>
              <button onClick={() => setSelected(null)}>
                <X className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Info */}
              <div>
                <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-3">Informations</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-3"><span className="text-[#64748B] w-28">Téléphone</span><span className="text-[#1E293B]">{selected.phone || "—"}</span></div>
                  <div className="flex gap-3"><span className="text-[#64748B] w-28">Inscrit le</span><span className="text-[#1E293B]">{new Date(selected.created_at).toLocaleDateString("fr-CA")}</span></div>
                </div>
              </div>

              {/* Appointments history */}
              <div>
                <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-3">
                  Historique des rendez-vous ({patientAppts.length})
                </h3>
                {patientAppts.length === 0 ? (
                  <p className="text-sm text-[#64748B]">Aucun rendez-vous.</p>
                ) : (
                  <div className="space-y-2">
                    {patientAppts.map((a) => (
                      <div key={a.id} className="flex items-center gap-3 text-sm py-2 border-b border-[#E2E8F0]">
                        <div className="flex-1">
                          <p className="font-medium text-[#1E293B]">{a.services?.name_fr || "—"}</p>
                          <p className="text-xs text-[#64748B]">
                            {new Date(a.appointment_date + "T00:00:00").toLocaleDateString("fr-CA")} · {a.appointment_time.substring(0, 5)} · {a.therapists?.name}
                          </p>
                        </div>
                        <StatusBadge status={a.status as "pending" | "confirmed" | "cancelled" | "completed"} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Admin notes */}
              <div>
                <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-3">
                  Notes internes <span className="text-[#64748B] normal-case font-normal">(admin seulement)</span>
                </h3>
                <textarea
                  rows={4}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Notes internes..."
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] resize-none"
                />
                <button
                  onClick={saveNotes}
                  disabled={savingNotes}
                  className="mt-2 bg-[#0066CC] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#0052a3] transition-colors disabled:opacity-60"
                >
                  Sauvegarder les notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
