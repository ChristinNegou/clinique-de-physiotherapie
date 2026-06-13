"use client";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { fr } from "react-day-picker/locale";
import { ArrowLeft } from "lucide-react";
import { TIME_SLOTS } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

export default function DateTimePicker({
  therapistId,
  onConfirm,
  onBack,
}: {
  therapistId: string | null;
  onConfirm: (date: string, time: string) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [takenSlots, setTakenSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Disable weekends and past dates
  function isDisabled(date: Date) {
    if (date < today) return true;
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  useEffect(() => {
    if (!selected) return;
    const dateStr = selected.toISOString().split("T")[0];
    setTakenSlots([]);
    setTime("");
    setLoadingSlots(true);

    const supabase = createClient();
    let query = supabase
      .from("appointments")
      .select("appointment_time")
      .eq("appointment_date", dateStr)
      .neq("status", "cancelled");

    if (therapistId) {
      query = query.eq("therapist_id", therapistId);
    }

    query.then(({ data }) => {
      setTakenSlots(data?.map((a) => a.appointment_time.substring(0, 5)) ?? []);
      setLoadingSlots(false);
    });
  }, [selected, therapistId]);

  function handleConfirm() {
    if (!selected || !time) return;
    const dateStr = selected.toISOString().split("T")[0];
    onConfirm(dateStr, time);
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1E293B] mb-2">Choisir la date et l&apos;heure</h2>
      <p className="text-[#64748B] text-sm mb-6">Sélectionnez une date puis un créneau disponible.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            locale={fr}
            disabled={isDisabled}
            startMonth={today}
            className="border border-[#E2E8F0] rounded-xl p-4 bg-white"
          />
        </div>

        {/* Time slots */}
        <div>
          {selected ? (
            <div>
              <p className="text-sm font-medium text-[#1E293B] mb-3">
                Créneaux disponibles pour le{" "}
                {selected.toLocaleDateString("fr-CA", { weekday: "long", day: "numeric", month: "long" })}
              </p>
              {loadingSlots ? (
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((s) => (
                    <div key={s} className="h-10 bg-[#E2E8F0] rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const taken = takenSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        disabled={taken}
                        onClick={() => setTime(slot)}
                        className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                          taken
                            ? "bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed line-through"
                            : time === slot
                            ? "bg-[#0066CC] text-white"
                            : "bg-[#EFF4F9] text-[#1E293B] hover:bg-[#0066CC]/20"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
              <p className="text-xs text-[#64748B] mt-3">
                Les créneaux barrés sont déjà réservés.
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-[#64748B] text-sm">
              Sélectionnez d&apos;abord une date sur le calendrier.
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-[#E2E8F0] mt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <button
          onClick={handleConfirm}
          disabled={!selected || !time}
          className="bg-[#0066CC] text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-[#0052a3] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
