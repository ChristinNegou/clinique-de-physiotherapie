import Link from "next/link";
import { ActivitySquare, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0066CC] rounded-lg flex items-center justify-center">
                <ActivitySquare className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">Physio Mauricie</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Clinique de physiothérapie professionnelle au cœur de Cap-de-la-Madeleine.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/services" className="hover:text-white transition-colors">Physiothérapie générale</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Réhabilitation post-op</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Thérapie sportive</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Massothérapie</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Électrothérapie</Link></li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/equipe" className="hover:text-white transition-colors">Notre équipe</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Nous contacter</Link></li>
              <li><Link href="/auth/signup" className="hover:text-white transition-colors">Créer un compte</Link></li>
              <li><Link href="/auth/login" className="hover:text-white transition-colors">Espace patient</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#00A878] shrink-0" />
                <span>456 boul. des Récollets<br />Cap-de-la-Madeleine, QC G8T 1M2</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00A878] shrink-0" />
                <a href="tel:+18195550101" className="hover:text-white transition-colors">819-555-0101</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00A878] shrink-0" />
                <a href="mailto:info@physio-mauricie.demo" className="hover:text-white transition-colors">info@physio-mauricie.demo</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-[#00A878] shrink-0" />
                <span>Lun–Ven : 8h00–18h00<br />Samedi : 9h00–13h00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Clinique Physio Mauricie. Tous droits réservés.
          </p>
          <p className="text-xs text-slate-600">
            Projet vitrine — <a href="https://github.com/jordydeangelis" className="hover:text-slate-400">Deangelis Dev</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
