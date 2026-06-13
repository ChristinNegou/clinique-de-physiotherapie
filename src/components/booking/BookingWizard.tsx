"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import ServiceSelector from "./ServiceSelector";
import TherapistSelector from "./TherapistSelector";
import DateTimePicker from "./DateTimePicker";
import BookingConfirmation from "./BookingConfirmation";
import type { Service, Therapist } from "@/lib/types";

export interface BookingState {
  service: Service | null;
  therapist: Therapist | null;
  date: string;
  time: string;
  notes: string;
}

const STEPS = [
  { number: 1, label: "Service" },
  { number: 2, label: "Thérapeute" },
  { number: 3, label: "Date & heure" },
  { number: 4, label: "Confirmation" },
];

export default function BookingWizard({
  services,
  therapists,
}: {
  services: Service[];
  therapists: Therapist[];
}) {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>({
    service: null,
    therapist: null,
    date: "",
    time: "",
    notes: "",
  });
  const [confirmationNumber, setConfirmationNumber] = useState("");

  function next() { setStep((s) => Math.min(s + 1, 4)); }
  function back() { setStep((s) => Math.max(s - 1, 1)); }

  return (
    <div>
      {/* Stepper */}
      <div className="flex items-center justify-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  step > s.number
                    ? "bg-[#00A878] text-white"
                    : step === s.number
                    ? "bg-[#0066CC] text-white"
                    : "bg-[#E2E8F0] text-[#64748B]"
                }`}
              >
                {step > s.number ? <Check className="w-4 h-4" /> : s.number}
              </div>
              <span className={`text-xs mt-1 hidden sm:block ${step === s.number ? "text-[#0066CC] font-medium" : "text-[#64748B]"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-16 sm:w-24 h-0.5 mx-2 ${step > s.number ? "bg-[#00A878]" : "bg-[#E2E8F0]"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 lg:p-8">
        {step === 1 && (
          <ServiceSelector
            services={services}
            selected={booking.service}
            onSelect={(service) => {
              setBooking((b) => ({ ...b, service, therapist: null }));
              next();
            }}
          />
        )}
        {step === 2 && (
          <TherapistSelector
            therapists={therapists}
            selected={booking.therapist}
            onSelect={(therapist) => {
              setBooking((b) => ({ ...b, therapist }));
              next();
            }}
            onBack={back}
          />
        )}
        {step === 3 && booking.service && (
          <DateTimePicker
            therapistId={booking.therapist?.id ?? null}
            onConfirm={(date, time) => {
              setBooking((b) => ({ ...b, date, time }));
              next();
            }}
            onBack={back}
          />
        )}
        {step === 4 && booking.service && (
          <BookingConfirmation
            booking={booking}
            onBack={back}
            onNoteChange={(notes) => setBooking((b) => ({ ...b, notes }))}
            onSuccess={(confNum) => {
              setConfirmationNumber(confNum);
              setStep(5);
            }}
          />
        )}
        {step === 5 && (
          <SuccessView
            confirmationNumber={confirmationNumber}
            booking={booking}
          />
        )}
      </div>
    </div>
  );
}

function SuccessView({
  confirmationNumber,
  booking,
}: {
  confirmationNumber: string;
  booking: BookingState;
}) {
  const gcalUrl = booking.date && booking.time
    ? (() => {
        const start = `${booking.date.replace(/-/g, "")}T${booking.time.replace(":", "")}00`;
        const end = booking.date.replace(/-/g, "") + "T" + String(parseInt(booking.time.split(":")[0]) + 1).padStart(2, "0") + booking.time.split(":")[1] + "00";
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Rendez-vous Physio Mauricie")}&dates=${start}/${end}&details=${encodeURIComponent("Confirmation: " + confirmationNumber)}`;
      })()
    : null;

  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Rendez-vous confirmé !</h2>
      <p className="text-[#64748B] mb-2">Votre numéro de confirmation :</p>
      <div className="inline-block bg-[#EFF4F9] border border-[#0066CC]/30 rounded-xl px-6 py-3 mb-6">
        <p className="text-xl font-bold text-[#0066CC] tracking-widest">{confirmationNumber}</p>
      </div>
      <p className="text-sm text-[#64748B] mb-8">
        Un courriel de confirmation vous a été envoyé. Notez votre numéro de confirmation.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {gcalUrl && (
          <a
            href={gcalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#0066CC] text-[#0066CC] px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#EFF4F9] transition-colors"
          >
            📅 Ajouter à Google Calendar
          </a>
        )}
        <a
          href="/patient/dashboard"
          className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0052a3] transition-colors"
        >
          Retour au tableau de bord
        </a>
      </div>
    </div>
  );
}
