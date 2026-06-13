import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ArrowRight } from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import { SERVICES_STATIC } from "@/lib/data";

export const metadata = {
  title: "Services | Clinique Physio Mauricie",
  description: "Découvrez nos services de physiothérapie à Cap-de-la-Madeleine.",
};

export default function ServicesPage() {
  return (
    <>
      <PublicNavbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-[#0066CC] to-[#0052a3] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Nos services</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Des soins professionnels personnalisés pour chaque condition. Notre équipe vous accompagne vers une guérison durable.
            </p>
          </div>
        </section>

        {/* Services list */}
        <section className="py-16 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {SERVICES_STATIC.map((service, index) => (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative h-[320px] rounded-2xl overflow-hidden shadow-md ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <Image
                    src={service.photo}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h2 className="text-2xl font-bold text-[#1E293B] mb-4">{service.name}</h2>
                  <div className="space-y-3 text-[#64748B] text-sm leading-relaxed mb-6">
                    {service.description.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#0066CC] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-[#1E293B] uppercase tracking-wide">Durée</p>
                        <p className="text-sm text-[#64748B]">{service.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-[#0066CC] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-[#1E293B] uppercase tracking-wide">Indications</p>
                        <p className="text-sm text-[#64748B]">{service.indication}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#0066CC] font-bold text-sm shrink-0 mt-0.5">$</span>
                      <div>
                        <p className="text-xs font-semibold text-[#1E293B] uppercase tracking-wide">Tarif</p>
                        <p className="text-sm text-[#64748B]">{service.price}</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center gap-2 bg-[#0066CC] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#0052a3] transition-colors"
                  >
                    Prendre rendez-vous <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-12 border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
              Vous ne savez pas quel service vous convient ?
            </h2>
            <p className="text-[#64748B] mb-6">
              Contactez-nous et notre équipe vous orientera vers le traitement le plus adapté à votre condition.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#00A878] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#008a62] transition-colors"
            >
              Nous contacter <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
