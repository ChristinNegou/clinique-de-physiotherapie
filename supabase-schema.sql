-- ============================================================
-- Clinique Physio Mauricie — Schéma Supabase
-- ============================================================

-- ============================================================
-- 1. TABLE PROFILES
-- ============================================================
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null default 'patient', -- 'patient' | 'admin' | 'therapist'
  first_name text,
  last_name text,
  phone text,
  date_of_birth date,
  gender text,
  address text,
  family_doctor text,
  allergies text,
  ramq text,
  insurance_provider text,
  admin_notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, first_name, last_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- 2. TABLE THERAPISTS
-- ============================================================
create table if not exists therapists (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references profiles(id),
  name text not null,
  title text not null,
  specialties text[],
  bio_fr text,
  photo_url text,
  years_experience integer,
  is_active boolean default true
);

-- ============================================================
-- 3. TABLE SERVICES
-- ============================================================
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  name_fr text not null,
  description_fr text,
  duration_minutes integer not null default 45,
  price decimal(10,2),
  category text,
  is_active boolean default true
);

-- ============================================================
-- 4. TABLE AVAILABILITIES
-- ============================================================
create table if not exists availabilities (
  id uuid default gen_random_uuid() primary key,
  therapist_id uuid references therapists(id) on delete cascade,
  day_of_week integer, -- 1=Lundi, ..., 5=Vendredi
  start_time time not null,
  end_time time not null,
  is_active boolean default true
);

-- ============================================================
-- 5. TABLE APPOINTMENTS
-- ============================================================
create table if not exists appointments (
  id uuid default gen_random_uuid() primary key,
  confirmation_number text unique not null,
  patient_id uuid references profiles(id) on delete cascade,
  therapist_id uuid references therapists(id) on delete set null,
  service_id uuid references services(id) on delete set null,
  appointment_date date not null,
  appointment_time time not null,
  duration_minutes integer not null default 45,
  status text default 'pending', -- 'pending' | 'confirmed' | 'cancelled' | 'completed'
  patient_notes text,
  admin_notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ============================================================
-- 6. ROW LEVEL SECURITY
-- ============================================================

-- Profiles
alter table profiles enable row level security;

create policy "Users read own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Admins read all profiles"
  on profiles for select
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins update all profiles"
  on profiles for update
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Therapists (public read)
alter table therapists enable row level security;

create policy "Anyone reads therapists"
  on therapists for select
  using (true);

create policy "Admins manage therapists"
  on therapists for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Services (public read)
alter table services enable row level security;

create policy "Anyone reads services"
  on services for select
  using (true);

create policy "Admins manage services"
  on services for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Availabilities (public read)
alter table availabilities enable row level security;

create policy "Anyone reads availabilities"
  on availabilities for select
  using (true);

-- Appointments
alter table appointments enable row level security;

create policy "Patients see own appointments"
  on appointments for select
  using (auth.uid() = patient_id);

create policy "Patients insert own appointments"
  on appointments for insert
  with check (auth.uid() = patient_id);

create policy "Patients update own pending appointments"
  on appointments for update
  using (auth.uid() = patient_id and status = 'pending');

create policy "Admins see all appointments"
  on appointments for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- ============================================================
-- 7. DONNÉES DE DÉMONSTRATION
-- ============================================================

-- Services
insert into services (id, name_fr, description_fr, duration_minutes, price, category, is_active) values
  ('11111111-1111-1111-1111-111111111101', 'Physiothérapie générale', 'Traitement des douleurs musculosquelettiques, blessures et prévention.', 45, 85.00, 'physio', true),
  ('11111111-1111-1111-1111-111111111102', 'Réhabilitation post-opératoire', 'Programme de récupération après une intervention chirurgicale.', 60, 95.00, 'rehab', true),
  ('11111111-1111-1111-1111-111111111103', 'Thérapie sportive', 'Retour au sport rapide et sécuritaire pour les athlètes.', 45, 90.00, 'sport', true),
  ('11111111-1111-1111-1111-111111111104', 'Massothérapie thérapeutique', 'Détente musculaire profonde et gestion du stress.', 60, 75.00, 'massage', true),
  ('11111111-1111-1111-1111-111111111105', 'Électrothérapie et ultrasons', 'Technologies de pointe pour accélérer la guérison.', 30, 0.00, 'tech', true)
on conflict (id) do nothing;

-- Therapists (NOTE: profile_id set to null for demo — will be linked after account creation)
insert into therapists (id, name, title, specialties, bio_fr, photo_url, years_experience, is_active) values
  (
    '22222222-2222-2222-2222-222222222201',
    'Marie-Ève Tremblay',
    'Physiothérapeute principale',
    array['Physiothérapie générale', 'Réhabilitation post-op', 'Douleurs chroniques'],
    'Marie-Ève est la fondatrice et directrice clinique de Physio Mauricie. Avec 12 ans d''expérience en physiothérapie musculosquelettique, elle a développé une expertise reconnue dans le traitement des douleurs chroniques.',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    12,
    true
  ),
  (
    '22222222-2222-2222-2222-222222222202',
    'Jean-François Côté',
    'Spécialiste sport et réhabilitation',
    array['Thérapie sportive', 'Réhabilitation post-op', 'Électrothérapie'],
    'Jean-François a travaillé pendant 3 ans comme physiothérapeute pour une équipe de hockey junior avant de rejoindre Physio Mauricie.',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    8,
    true
  ),
  (
    '22222222-2222-2222-2222-222222222203',
    'Sophie Beauchamp',
    'Massothérapeute certifiée',
    array['Massothérapie thérapeutique', 'Drainage lymphatique', 'Trigger points'],
    'Sophie a complété sa formation en massothérapie avec mention d''excellence et a depuis développé une clientèle fidèle qui apprécie son toucher précis.',
    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    6,
    true
  )
on conflict (id) do nothing;

-- Availabilities (Lundi–Vendredi, 9h–17h)
insert into availabilities (therapist_id, day_of_week, start_time, end_time) values
  ('22222222-2222-2222-2222-222222222201', 1, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222201', 2, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222201', 3, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222201', 4, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222201', 5, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222202', 1, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222202', 2, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222202', 3, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222202', 4, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222202', 5, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222203', 1, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222203', 2, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222203', 3, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222203', 4, '09:00', '17:00'),
  ('22222222-2222-2222-2222-222222222203', 5, '09:00', '17:00');

-- ============================================================
-- NOTE: Les comptes démo (admin + patient) doivent être créés
-- via l'interface Supabase Auth, puis leurs profiles mis à jour :
--
-- Admin:
--   UPDATE profiles SET role = 'admin', first_name = 'Admin', last_name = 'Demo'
--   WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@physio-mauricie.demo');
--
-- Patient:
--   UPDATE profiles SET first_name = 'Patient', last_name = 'Demo'
--   WHERE id = (SELECT id FROM auth.users WHERE email = 'patient@demo.com');
--
-- Puis insérer 15 rendez-vous demo avec le patient_id du compte patient.
-- Voir le script seed-demo-appointments.sql ci-dessous.
-- ============================================================
