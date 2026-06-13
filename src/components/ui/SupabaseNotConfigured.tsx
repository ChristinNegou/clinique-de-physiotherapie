import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function SupabaseNotConfigured() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 text-center">
        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7 text-orange-600" />
        </div>
        <h2 className="text-xl font-bold text-[#1E293B] mb-2">Configuration requise</h2>
        <p className="text-[#64748B] text-sm mb-4">
          Pour voir cette page fonctionnelle, configurez Supabase dans votre fichier{" "}
          <code className="bg-[#F8FAFC] border border-[#E2E8F0] px-1.5 py-0.5 rounded text-xs">.env.local</code>.
        </p>
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4 text-left text-xs font-mono text-[#64748B] mb-6">
          <p>NEXT_PUBLIC_SUPABASE_URL=...</p>
          <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=...</p>
        </div>
        <p className="text-xs text-[#64748B] mb-4">
          Copiez <code>.env.local.example</code> → <code>.env.local</code> et remplissez vos clés Supabase.
        </p>
        <Link href="/" className="text-sm text-[#0066CC] hover:underline font-medium">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
