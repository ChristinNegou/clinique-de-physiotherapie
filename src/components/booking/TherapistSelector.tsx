import Image from "next/image";
import type { Therapist } from "@/lib/types";
import { ArrowLeft } from "lucide-react";

export default function TherapistSelector({
  therapists,
  selected,
  onSelect,
  onBack,
}: {
  therapists: Therapist[];
  selected: Therapist | null;
  onSelect: (therapist: Therapist | null) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#1E293B] mb-2">Choisir un thérapeute</h2>
      <p className="text-[#64748B] text-sm mb-6">Sélectionnez votre thérapeute ou choisissez &ldquo;Peu importe&rdquo;.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Any therapist option */}
        <button
          onClick={() => onSelect(null)}
          className={`text-left p-5 rounded-xl border-2 transition-all ${
            selected === null
              ? "border-[#0066CC] bg-[#EFF4F9]"
              : "border-[#E2E8F0] hover:border-[#0066CC]/50"
          }`}
        >
          <div className="w-12 h-12 bg-[#E2E8F0] rounded-full flex items-center justify-center text-xl mb-3">
            🤝
          </div>
          <h3 className="font-semibold text-[#1E293B]">Peu importe</h3>
          <p className="text-xs text-[#64748B] mt-1">Le premier thérapeute disponible</p>
        </button>

        {therapists.map((therapist) => (
          <button
            key={therapist.id}
            onClick={() => onSelect(therapist)}
            className={`text-left p-5 rounded-xl border-2 transition-all ${
              selected?.id === therapist.id
                ? "border-[#0066CC] bg-[#EFF4F9]"
                : "border-[#E2E8F0] hover:border-[#0066CC]/50"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              {therapist.photo_url ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src={therapist.photo_url} alt={therapist.name} fill className="object-cover object-top" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-[#E2E8F0] rounded-full flex items-center justify-center text-xl">
                  👤
                </div>
              )}
              <div>
                <h3 className="font-semibold text-[#1E293B] text-sm">{therapist.name}</h3>
                <p className="text-xs text-[#64748B]">{therapist.title}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {therapist.specialties?.slice(0, 2).map((s) => (
                <span key={s} className="text-xs bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] px-2 py-0.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <button
          onClick={() => onSelect(selected)}
          className="bg-[#0066CC] text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-[#0052a3] transition-colors"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
