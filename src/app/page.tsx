import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Users, TrendingUp } from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import { SERVICES_STATIC, STATS } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <PublicNavbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0066CC] to-[#0052a3] text-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
                  ★ Clinique certifiée · Cap-de-la-Madeleine
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                  Retrouvez votre mobilité,{" "}
                  <span className="text-[#33ba93]">retrouvez votre vie</span>
                </h1>
                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  Clinique de physiothérapie à Cap-de-la-Madeleine · Prise de rendez-vous en ligne 24/7
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#0066CC] font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    Prendre rendez-vous
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    En savoir plus
                  </a>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                    alt="Physiothérapeute en action"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 text-[#1E293B]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">500+ patients</p>
                      <p className="text-xs text-[#64748B]">traités avec succès</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-3 gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-[#0066CC]">{stat.value}</p>
                  <p className="text-sm text-[#64748B] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services preview */}
        <section id="services" className="py-20 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E293B] mb-4">Nos services</h2>
              <p className="text-[#64748B] max-w-2xl mx-auto">
                Une gamme complète de soins physiothérapeutiques adaptés à vos besoins.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES_STATIC.slice(0, 4).map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-[#E2E8F0] hover:shadow-md hover:border-[#0066CC]/30 transition-all"
                >
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="font-semibold text-[#1E293B] mb-2">{service.name}</h3>
                  <p className="text-sm text-[#64748B] mb-4">{service.shortDesc}</p>
                  <Link
                    href="/services"
                    className="text-sm text-[#0066CC] font-medium hover:underline inline-flex items-center gap-1"
                  >
                    En savoir plus <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border border-[#0066CC] text-[#0066CC] px-6 py-2.5 rounded-lg font-medium hover:bg-[#0066CC] hover:text-white transition-colors"
              >
                Voir tous les services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#1E293B] mb-6">
                  Pourquoi choisir Physio Mauricie ?
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Clock,
                      title: "Prise de RDV en ligne",
                      desc: "Réservez votre séance 24h/24, 7j/7 depuis votre espace patient sécurisé.",
                    },
                    {
                      icon: Users,
                      title: "3 thérapeutes expérimentés",
                      desc: "Une équipe pluridisciplinaire avec plus de 26 ans d'expérience cumulée.",
                    },
                    {
                      icon: TrendingUp,
                      title: "Clinique accessible et moderne",
                      desc: "Locaux adaptés PMR, équipements de pointe, stationnement gratuit.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-10 h-10 bg-[#EFF4F9] rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#0066CC]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1E293B]">{title}</h3>
                        <p className="text-sm text-[#64748B] mt-1">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
                  alt="Clinique Physio Mauricie"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="bg-gradient-to-r from-[#00A878] to-[#008a62] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à commencer votre rétablissement ?
            </h2>
            <p className="text-green-100 mb-8 max-w-xl mx-auto">
              Créez votre compte patient en 2 minutes et prenez rendez-vous en ligne dès aujourd&apos;hui.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-white text-[#008a62] font-semibold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors"
            >
              Créer mon compte patient
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
