"use client";

import { useState, useEffect } from "react";
import { Save, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfilPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showRamq, setShowRamq] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    phone: "",
    address: "",
    family_doctor: "",
    allergies: "",
    ramq: "",
    insurance_provider: "",
  });

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setForm({
          first_name: profile.first_name || "",
          last_name: profile.last_name || "",
          date_of_birth: profile.date_of_birth || "",
          gender: profile.gender || "",
          phone: profile.phone || "",
          address: profile.address || "",
          family_doctor: profile.family_doctor || "",
          allergies: profile.allergies || "",
          ramq: profile.ramq ? "****-****" : "",
          insurance_provider: profile.insurance_provider || "",
        });
      }
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const update: Record<string, string | null> = {
      first_name: form.first_name || null,
      last_name: form.last_name || null,
      date_of_birth: form.date_of_birth || null,
      gender: form.gender || null,
      phone: form.phone || null,
      address: form.address || null,
      family_doctor: form.family_doctor || null,
      allergies: form.allergies || null,
      insurance_provider: form.insurance_provider || null,
      updated_at: new Date().toISOString(),
    };

    // Only update RAMQ if it's a real value (not the masked display)
    if (form.ramq && !form.ramq.includes("*")) {
      update.ramq = form.ramq;
    }

    await supabase.from("profiles").upsert({ id: user.id, ...update });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-[#64748B]">Chargement...</div>
      </div>
    );
  }

  const inputClass = "w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] bg-white";

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Mon profil</h1>
          <p className="text-[#64748B] mt-1">Gérez vos informations personnelles et médicales.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Sauvegardé
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal info */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6">
          <h2 className="font-semibold text-[#1E293B] mb-4">Informations personnelles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-1">Prénom</label>
              <input
                type="text"
                value={form.first_name}
                onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))}
                className={inputClass}
                placeholder="Jean"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-1">Nom</label>
              <input
                type="text"
                value={form.last_name}
                onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))}
                className={inputClass}
                placeholder="Tremblay"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-1">Date de naissance</label>
              <input
                type="date"
                value={form.date_of_birth}
                onChange={(e) => setForm((f) => ({ ...f, date_of_birth: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-1">Sexe</label>
              <select
                value={form.gender}
                onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
                className={inputClass}
              >
                <option value="">Sélectionner</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
                <option value="NB">Non-binaire</option>
                <option value="PR">Préfère ne pas répondre</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6">
          <h2 className="font-semibold text-[#1E293B] mb-4">Coordonnées</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-1">Téléphone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className={inputClass}
                placeholder="819-555-0000"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#1E293B] mb-1">Adresse</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                className={inputClass}
                placeholder="123 rue des Érables, Cap-de-la-Madeleine, QC"
              />
            </div>
          </div>
        </div>

        {/* Medical */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6">
          <h2 className="font-semibold text-[#1E293B] mb-4">Informations médicales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-1">
                Médecin de famille <span className="text-[#64748B] font-normal">(optionnel)</span>
              </label>
              <input
                type="text"
                value={form.family_doctor}
                onChange={(e) => setForm((f) => ({ ...f, family_doctor: e.target.value }))}
                className={inputClass}
                placeholder="Dr. Tremblay"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-1">Assurance privée</label>
              <input
                type="text"
                value={form.insurance_provider}
                onChange={(e) => setForm((f) => ({ ...f, insurance_provider: e.target.value }))}
                className={inputClass}
                placeholder="Croix Bleue, Sun Life..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#1E293B] mb-1">Allergies connues</label>
              <input
                type="text"
                value={form.allergies}
                onChange={(e) => setForm((f) => ({ ...f, allergies: e.target.value }))}
                className={inputClass}
                placeholder="Pénicilline, latex..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-1 flex items-center gap-2">
                Numéro RAMQ
                <span className="text-xs text-[#64748B] font-normal bg-[#EFF4F9] px-2 py-0.5 rounded">Chiffré</span>
              </label>
              <div className="relative">
                <input
                  type={showRamq ? "text" : "password"}
                  value={form.ramq}
                  onChange={(e) => setForm((f) => ({ ...f, ramq: e.target.value }))}
                  className={inputClass + " pr-10"}
                  placeholder="TREM 8512 3456"
                />
                <button
                  type="button"
                  onClick={() => setShowRamq(!showRamq)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1E293B]"
                >
                  {showRamq ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-[#64748B] mt-1">Jamais affiché en clair. Laissez vide pour conserver l&apos;actuel.</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-[#0066CC] text-white font-semibold py-3 rounded-lg hover:bg-[#0052a3] transition-colors disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {saving ? "Sauvegarde..." : "Sauvegarder les modifications"}
        </button>
      </form>
    </div>
  );
}
