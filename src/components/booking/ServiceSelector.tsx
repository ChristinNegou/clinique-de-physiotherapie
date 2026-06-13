import type { Service } from "@/lib/types";
import { Clock } from "lucide-react";

const SERVICE_ICONS: Record<string, string> = {
  "Physiothérapie générale": "🦴",
  "Réhabilitation post-opératoire": "🏥",
  "Thérapie sportive": "🏃",
  "Massothérapie thérapeutique": "💆",
  "Électrothérapie et ultrasons": "⚡",
};

export default function ServiceSelector({
  services,
  selected,
  onSelect,
}: {
  services: Service[];
  selected: Service | null;
  onSelect: (service: Service) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#1E293B] mb-2">Choisir un service</h2>
      <p className="text-[#64748B] text-sm mb-6">Sélectionnez le type de traitement souhaité.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className={`text-left p-5 rounded-xl border-2 transition-all ${
              selected?.id === service.id
                ? "border-[#0066CC] bg-[#EFF4F9]"
                : "border-[#E2E8F0] hover:border-[#0066CC]/50 hover:bg-[#F8FAFC]"
            }`}
          >
            <div className="text-2xl mb-3">{SERVICE_ICONS[service.name_fr] || "⚕️"}</div>
            <h3 className="font-semibold text-[#1E293B] mb-1">{service.name_fr}</h3>
            <p className="text-xs text-[#64748B] line-clamp-2 mb-2">{service.description_fr}</p>
            <div className="flex items-center gap-3 text-xs text-[#64748B]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {service.duration_minutes} min
              </span>
              {service.price && (
                <span className="text-[#00A878] font-medium">{service.price} $</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
