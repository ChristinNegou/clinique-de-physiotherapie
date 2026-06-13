"use client";

import { useState } from "react";
import { ArrowLeft, Calendar, Clock, User, Stethoscope } from "lucide-react";
import type { BookingState } from "./BookingWizard";
import { createClient } from "@/lib/supabase/client";

function generateConfirmationNumber() {
  return "PM-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BookingConfirmation({
  booking,
  onBack,
  onNoteChange,
  onSuccess,
}: {
  booking: BookingState;
  onBack: () => void;
  onNoteChange: (notes: string) => void;
  onSuccess: (confirmationNumber: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Session expirée. Reconnectez-vous."); setLoading(false); return; }

    const confirmationNumber = generateConfirmationNumber();

    const { error: insertError } = await supabase.from("appointments").insert({
      confirmation_number: confirmationNumber,
      patient_id: user.id,
      therapist_id: booking.therapist?.id ?? null,
      service_id: booking.service?.id,
      appointment_date: booking.date,
      appointment_time: booking.time + ":00",
      duration_minutes: booking.service?.duration_minutes ?? 45,
      status: "pending",
      patient_notes: booking.notes || null,
    });

    if (insertError) {
      setError("Erreur lors de la réservation. Veuillez réessayer.");
      setLoading(false);
      return;
    }

    onSuccess(confirmationNumber);
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1E293B] mb-2">Confirmer le rendez-vous</h2>
      <p className="text-[#64748B] text-sm mb-6">Vérifiez les détails avant de confirmer.</p>

      {/* Summary card */}
      <div className="bg-[#EFF4F9] rounded-xl p-5 mb-6 space-y-3">
        <div className="flex items-center gap-3">
          <Stethoscope className="w-5 h-5 text-[#0066CC] shrink-0" />
          <div>
            <p className="text-xs text-[#64748B]">Service</p>
            <p className="font-semibold text-[#1E293B]">{booking.service?.name_fr}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-[#0066CC] shrink-0" />
          <div>
            <p className="text-xs text-[#64748B]">Thérapeute</p>
            <p className="font-semibold text-[#1E293B]">{booking.therapist?.name ?? "Selon disponibilité"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-[#0066CC] shrink-0" />
          <div>
            <p className="text-xs text-[#64748B]">Date</p>
            <p className="font-semibold text-[#1E293B] capitalize">{formatDate(booking.date)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#0066CC] shrink-0" />
          <div>
            <p className="text-xs text-[#64748B]">Heure</p>
            <p className="font-semibold text-[#1E293B]">{booking.time}</p>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          Note pour le thérapeute <span className="text-[#64748B] font-normal">(optionnel)</span>
        </label>
        <textarea
          rows={3}
          value={booking.notes}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Ex: Douleur à l'épaule droite depuis 2 semaines..."
          className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="bg-[#00A878] text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-[#008a62] transition-colors disabled:opacity-60"
        >
          {loading ? "Confirmation..." : "Confirmer le rendez-vous"}
        </button>
      </div>
    </div>
  );
}
