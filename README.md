# Clinique Physio Mauricie

Portail web complet pour une clinique de physiothérapie fictive — projet vitrine démontrant la capacité à livrer une application avec authentification, base de données relationnelle, dashboard admin et gestion de données sensibles.

## Démo en ligne

**URL :** https://clinique-de-physiotherapie.vercel.app

### Comptes démo
| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Patient | `patient@demo.com` | `Demo2024!` |
| Admin | `admin@physio-mauricie.demo` | `Demo2024!` |

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Auth | Supabase Auth |
| Base de données | Supabase (PostgreSQL) |
| Emails | Resend |
| Déploiement | Vercel |
| Langage | TypeScript 5 |

## Architecture

```
/ (public)
├── /                    → Page d'accueil marketing
├── /services            → Services offerts
├── /equipe              → Équipe de thérapeutes
├── /contact             → Contact
└── /auth/login|signup   → Authentification

/patient (protégé)
├── /patient/dashboard   → Tableau de bord patient
├── /patient/rendez-vous → Prise de RDV (stepper 4 étapes)
└── /patient/profil      → Profil personnel et médical

/admin (rôle admin requis)
├── /admin/dashboard     → KPIs + agenda du jour
├── /admin/agenda        → Vue semaine par thérapeute
├── /admin/patients      → Gestion des patients
└── /admin/rendez-vous   → Gestion des RDV + export CSV
```

## Installation

```bash
# 1. Cloner et installer
cd projet2
npm install

# 2. Configurer les variables d'environnement
cp .env.local.example .env.local
# Remplir avec vos clés Supabase et Resend

# 3. Créer les tables Supabase
# Exécuter supabase-schema.sql dans l'éditeur SQL Supabase

# 4. Lancer le serveur de développement
npm run dev
```

## Variables d'environnement

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
RESEND_API_KEY=xxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Configuration Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Exécuter `supabase-schema.sql` dans l'éditeur SQL
3. Créer les comptes démo via Authentication > Users
4. Mettre à jour les rôles dans la table `profiles` :
   ```sql
   UPDATE profiles SET role = 'admin' WHERE id = '<uuid-admin>';
   ```

## Fonctionnalités

### Pages publiques
- Page d'accueil avec hero, services, statistiques, CTA
- Page services avec 5 traitements détaillés
- Page équipe avec 3 fiches thérapeutes
- Formulaire de contact

### Espace patient
- Dashboard avec prochain RDV et historique
- Prise de RDV en 4 étapes (service → thérapeute → date/heure → confirmation)
- Gestion du profil personnel et médical (RAMQ masqué)

### Espace admin
- KPIs : RDV du jour, nouveaux patients, taux d'occupation
- Agenda hebdomadaire par thérapeute (vue grille)
- Gestion des patients avec fiche détaillée et notes internes
- Gestion des RDV avec filtres, confirmation/annulation, export CSV

## Développeur

**Christin Negou** — Développeur web & mobile, Québec  
Portfolio freelance · 2024
