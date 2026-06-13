"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  }

  return (
    <>
      <PublicNavbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-[#0066CC] to-[#0052a3] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Notre équipe est disponible pour répondre à toutes vos questions.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Info */}
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B] mb-8">Informations</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: "Adresse",
                      content: "456 boul. des Récollets\nCap-de-la-Madeleine, QC G8T 1M2",
                    },
                    {
                      icon: Phone,
                      title: "Téléphone",
                      content: "819-555-0101",
                      href: "tel:+18195550101",
                    },
                    {
                      icon: Mail,
                      title: "Courriel",
                      content: "info@physio-mauricie.demo",
                      href: "mailto:info@physio-mauricie.demo",
                    },
                    {
                      icon: Clock,
                      title: "Heures d'ouverture",
                      content: "Lundi – Vendredi : 8h00 – 18h00\nSamedi : 9h00 – 13h00\nDimanche : Fermé",
                    },
                  ].map(({ icon: Icon, title, content, href }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-10 h-10 bg-[#EFF4F9] rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#0066CC]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1E293B] mb-1">{title}</p>
                        {href ? (
                          <a href={href} className="text-sm text-[#0066CC] hover:underline">
                            {content}
                          </a>
                        ) : (
                          <p className="text-sm text-[#64748B] whitespace-pre-line">{content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="mt-8 rounded-xl overflow-hidden border border-[#E2E8F0] bg-[#EFF4F9] h-48 flex items-center justify-center">
                  <div className="text-center text-[#64748B]">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-[#0066CC]" />
                    <p className="text-sm font-medium">456 boul. des Récollets</p>
                    <p className="text-xs">Cap-de-la-Madeleine, QC</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B] mb-8">Envoyez-nous un message</h2>

                {sent ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Message envoyé !</h3>
                    <p className="text-green-700 text-sm">
                      Merci pour votre message. Notre équipe vous répondra dans les 24 heures ouvrables.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Prénom *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] bg-white"
                          placeholder="Jean"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Nom *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] bg-white"
                          placeholder="Tremblay"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] mb-1">Courriel *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] bg-white"
                        placeholder="jean@exemple.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] mb-1">Téléphone</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] bg-white"
                        placeholder="819-555-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] mb-1">Objet</label>
                      <select className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] bg-white">
                        <option>Prise de rendez-vous</option>
                        <option>Question sur un service</option>
                        <option>Information générale</option>
                        <option>Autre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] mb-1">Message *</label>
                      <textarea
                        required
                        rows={5}
                        className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] bg-white resize-none"
                        placeholder="Décrivez votre demande..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-[#0066CC] text-white font-semibold py-3 rounded-lg hover:bg-[#0052a3] transition-colors disabled:opacity-60"
                    >
                      {loading ? "Envoi en cours..." : (
                        <>
                          <Send className="w-4 h-4" />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
