import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/check";
import { redirect } from "next/navigation";
import BookingWizard from "@/components/booking/BookingWizard";
import SupabaseNotConfigured from "@/components/ui/SupabaseNotConfigured";
import { SERVICES_STATIC, THERAPISTS_STATIC } from "@/lib/data";

export const metadata = {
  title: "Prendre rendez-vous | Physio Mauricie",
};

export default async function RendezVousPage() {
  if (!isSupabaseConfigured()) return <SupabaseNotConfigured />;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // Try to fetch from DB, fallback to static data
  const { data: dbServices } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("name_fr");

  const { data: dbTherapists } = await supabase
    .from("therapists")
    .select("*")
    .eq("is_active", true);

  // Map static data to match DB types if DB is empty
  const services = (dbServices && dbServices.length > 0)
    ? dbServices
    : SERVICES_STATIC.map((s, i) => ({
        id: `static-service-${i}`,
        name_fr: s.name,
        description_fr: s.shortDesc,
        duration_minutes: 45,
        price: parseFloat(s.price.replace(/[^0-9.]/g, "")) || null,
        category: s.category,
        is_active: true,
      }));

  const therapists = (dbTherapists && dbTherapists.length > 0)
    ? dbTherapists
    : THERAPISTS_STATIC.map((t, i) => ({
        id: `static-therapist-${i}`,
        profile_id: null,
        name: t.name,
        title: t.title,
        specialties: t.specialties,
        bio_fr: t.bio,
        photo_url: t.photo,
        years_experience: t.years,
        is_active: true,
      }));

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1E293B]">Prendre un rendez-vous</h1>
        <p className="text-[#64748B] mt-1">Suivez les étapes pour réserver votre séance.</p>
      </div>
      <BookingWizard services={services} therapists={therapists} />
    </div>
  );
}
