import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Award, Briefcase } from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import { THERAPISTS_STATIC } from "@/lib/data";

export const metadata = {
  title: "Notre équipe | Clinique Physio Mauricie",
  description: "Rencontrez les physiothérapeutes de la Clinique Physio Mauricie.",
};

export default function EquipePage() {
  return (
    <>
      <PublicNavbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-[#0066CC] to-[#0052a3] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Notre équipe</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Trois professionnels passionnés dédiés à votre santé et votre mobilité.
            </p>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {THERAPISTS_STATIC.map((therapist, index) => (
              <div
                key={therapist.id}
                className={`bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden`}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-3 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                  {/* Photo */}
                  <div className={`relative h-64 lg:h-auto min-h-[300px] ${index % 2 === 1 ? "lg:col-start-3" : ""}`}>
                    <Image
                      src={therapist.photo}
                      alt={therapist.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-2 p-8 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-[#1E293B]">{therapist.name}</h2>
                        <p className="text-[#0066CC] font-medium mt-1">{therapist.title}</p>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-[#EFF4F9] text-[#0066CC] rounded-full px-4 py-1.5 text-sm font-medium">
                        <Briefcase className="w-4 h-4" />
                        {therapist.years} ans d&apos;expérience
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2 flex items-center gap-1">
                        <Award className="w-3 h-3" /> Spécialités
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {therapist.specialties.map((s) => (
                          <span
                            key={s}
                            className="text-xs bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B] px-3 py-1 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Formation */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">Formation</p>
                      <p className="text-sm text-[#64748B]">{therapist.formation}</p>
                    </div>

                    {/* Bio */}
                    <div className="space-y-3 text-sm text-[#64748B] leading-relaxed mb-4">
                      {therapist.bio.split("\n\n").map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-2 text-sm text-[#64748B]">
                      <Globe className="w-4 h-4 text-[#0066CC]" />
                      <span>{therapist.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-12 border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
              Prêt à rencontrer notre équipe ?
            </h2>
            <p className="text-[#64748B] mb-6">
              Prenez rendez-vous en ligne ou appelez-nous pour choisir votre thérapeute.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-[#0066CC] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0052a3] transition-colors"
            >
              Prendre rendez-vous <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
