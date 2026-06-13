// Static content for public pages (no DB needed)

export const SERVICES_STATIC = [
  {
    id: "physio-generale",
    name: "Physiothérapie générale",
    icon: "🦴",
    shortDesc: "Traitement des douleurs, blessures et prévention.",
    description: `La physiothérapie générale vise à évaluer, diagnostiquer et traiter les troubles musculosquelettiques qui affectent votre quotidien. Qu'il s'agisse de douleurs dorsales chroniques, de tendinites, d'entorses ou de problèmes posturaux, notre équipe établit un plan de traitement personnalisé.

Chaque séance combine des techniques manuelles, des exercices thérapeutiques et des modalités électrophysiques pour maximiser votre récupération. Nous accordons une attention particulière à l'éducation du patient pour prévenir les récidives.

Notre approche holistique tient compte de votre mode de vie, de vos activités professionnelles et de vos objectifs personnels. Nous collaborons avec votre médecin de famille pour assurer une continuité des soins optimale.

Le traitement est adapté à chaque patient : qu'il s'agisse d'une douleur aiguë ou d'une condition chronique, nous trouvons les meilleures solutions pour vous permettre de retrouver une vie active sans douleur.`,
    duration: "45 à 60 minutes",
    indication: "Douleurs chroniques, blessures musculaires, problèmes posturaux, prévention.",
    price: "À partir de 85 $ / séance",
    photo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    category: "physio",
  },
  {
    id: "rehab-post-op",
    name: "Réhabilitation post-opératoire",
    icon: "🏥",
    shortDesc: "Récupération optimale après une intervention chirurgicale.",
    description: `La réhabilitation post-opératoire est un processus structuré qui accompagne votre retour à la vie normale après une chirurgie. Que ce soit après une arthroplastie du genou, une réparation de la coiffe des rotateurs ou une fusion vertébrale, notre protocole de réhabilitation est adapté à chaque type d'intervention.

Nous travaillons en étroite collaboration avec votre chirurgien orthopédique pour respecter les délais de cicatrisation et les précautions post-opératoires. Notre programme progressif permet de retrouver la force, la mobilité et la fonctionnalité de manière sécuritaire.

Les premières séances se concentrent sur la gestion de l'œdème, la protection du site opératoire et la récupération précoce de la mobilité. Au fil des semaines, nous progressons vers le renforcement musculaire et la reprise des activités fonctionnelles.

Notre objectif est de vous permettre de retrouver votre indépendance le plus rapidement possible, en minimisant les complications et en optimisant le résultat chirurgical.`,
    duration: "60 minutes",
    indication: "Suite à une chirurgie orthopédique, ligamentaire ou articulaire.",
    price: "À partir de 95 $ / séance",
    photo: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
    category: "rehab",
  },
  {
    id: "therapie-sportive",
    name: "Thérapie sportive",
    icon: "🏃",
    shortDesc: "Retour au sport rapide et sécuritaire pour les athlètes.",
    description: `La thérapie sportive est spécialement conçue pour les athlètes amateurs et compétitifs qui souhaitent récupérer d'une blessure sportive ou optimiser leurs performances. Nos thérapeutes spécialisés comprennent les exigences physiques de chaque sport.

Notre approche combine la thérapie manuelle, les techniques de taping, les exercices neuromusculaires et les protocoles de retour au jeu validés scientifiquement. Nous traitons les entorses de cheville, les tendinopathies, les lésions musculaires, les blessures au genou et bien plus encore.

L'analyse biomécanique fait partie intégrante de notre approche : nous identifions les facteurs de risque et les déséquilibres musculaires qui prédisposent aux blessures. Notre programme de prévention vous aide à rester sur le terrain.

Du joueur de hockey du dimanche au triatlète compétitif, nous adaptons notre prise en charge à vos objectifs spécifiques et à votre calendrier sportif.`,
    duration: "45 à 60 minutes",
    indication: "Blessures sportives, retour au jeu, prévention et optimisation des performances.",
    price: "À partir de 90 $ / séance",
    photo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    category: "sport",
  },
  {
    id: "massotherapie",
    name: "Massothérapie thérapeutique",
    icon: "💆",
    shortDesc: "Détente musculaire profonde et gestion du stress.",
    description: `La massothérapie thérapeutique va au-delà du simple massage de relaxation. Elle constitue un traitement médical reconnu pour soulager les tensions musculaires, améliorer la circulation sanguine et favoriser la récupération physique.

Nos massothérapeutes certifiés utilisent diverses techniques : massage suédois, massage des tissus profonds, trigger point therapy, drainage lymphatique et techniques myofasciales. Chaque traitement est personnalisé selon vos besoins spécifiques.

La massothérapie est particulièrement efficace pour les douleurs cervicales, les maux de tête de tension, les douleurs lombaires, la fibromyalgie et le stress chronique. Elle complète idéalement les traitements de physiothérapie.

Nos séances se déroulent dans un environnement calme et professionnel. Nous vous guidons tout au long du traitement pour optimiser les bienfaits et assurer votre confort.`,
    duration: "45 à 90 minutes",
    indication: "Tension musculaire, stress, maux de tête, douleurs chroniques, récupération sportive.",
    price: "À partir de 75 $ / séance",
    photo: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    category: "massage",
  },
  {
    id: "electrotherapie",
    name: "Électrothérapie et ultrasons",
    icon: "⚡",
    shortDesc: "Technologies de pointe pour accélérer la guérison.",
    description: `L'électrothérapie et les ultrasons sont des modalités thérapeutiques complémentaires qui utilisent l'énergie physique pour favoriser la guérison tissulaire et soulager la douleur. Ces techniques sont souvent intégrées à nos traitements de physiothérapie.

Le TENS (stimulation électrique nerveuse transcutanée) est utilisé pour le contrôle de la douleur aiguë et chronique. L'électrostimulation musculaire favorise le renforcement et la récupération musculaire après une blessure ou une chirurgie.

Les ultrasons thérapeutiques pénètrent les tissus en profondeur pour réduire l'inflammation, accélérer la cicatrisation et améliorer la mobilité tissulaire. Ils sont particulièrement efficaces pour les tendinopathies, les cicatrices et les contractures musculaires.

Ces modalités sont toujours utilisées en complément d'un traitement actif et jamais de manière isolée. Votre thérapeute déterminera quelles modalités sont les plus appropriées à votre condition.`,
    duration: "30 à 45 minutes",
    indication: "Douleur aiguë ou chronique, inflammations, cicatrisation, tendinopathies.",
    price: "Inclus dans les séances de physiothérapie",
    photo: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&q=80",
    category: "tech",
  },
];

export const THERAPISTS_STATIC = [
  {
    id: "marie-eve",
    name: "Marie-Ève Tremblay",
    title: "Physiothérapeute principale",
    years: 12,
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    specialties: ["Physiothérapie générale", "Réhabilitation post-op", "Douleurs chroniques"],
    formation: "B.Sc. Physiothérapie, Université de Montréal · Maîtrise clinique, UQTR",
    languages: ["Français", "Anglais"],
    bio: `Marie-Ève est la fondatrice et directrice clinique de Physio Mauricie. Avec 12 ans d'expérience en physiothérapie musculosquelettique, elle a développé une expertise reconnue dans le traitement des douleurs chroniques et la réhabilitation post-chirurgicale.

Passionnée par l'éducation thérapeutique, elle croit fermement que chaque patient doit comprendre sa condition pour mieux participer à sa guérison. Son approche bienveillante et rigoureuse lui a valu la fidélité de centaines de patients de la région de Mauricie.`,
  },
  {
    id: "jean-francois",
    name: "Jean-François Côté",
    title: "Spécialiste sport et réhabilitation",
    years: 8,
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    specialties: ["Thérapie sportive", "Réhabilitation post-op", "Électrothérapie"],
    formation: "B.Sc. Kinésiologie, UQTR · Diplôme en physiothérapie sportive, UdeM",
    languages: ["Français", "Anglais"],
    bio: `Jean-François a travaillé pendant 3 ans comme physiothérapeute pour une équipe de hockey junior avant de rejoindre Physio Mauricie. Cette expérience avec des athlètes de haut niveau lui a donné une compréhension unique des blessures sportives et des exigences du retour au jeu.

Il utilise des techniques basées sur les dernières données probantes pour accélérer la récupération de ses patients. Amateur de course à pied et de vélo de montagne, il comprend personnellement l'importance de retrouver rapidement sa capacité athlétique.`,
  },
  {
    id: "sophie",
    name: "Sophie Beauchamp",
    title: "Massothérapeute certifiée",
    years: 6,
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    specialties: ["Massothérapie thérapeutique", "Drainage lymphatique", "Trigger points"],
    formation: "Diplôme en massothérapie, École de physiothérapie de Québec · Certification en massage des tissus profonds",
    languages: ["Français"],
    bio: `Sophie a complété sa formation en massothérapie avec mention d'excellence et a depuis développé une clientèle fidèle qui apprécie son toucher précis et son écoute attentive. Elle s'est spécialisée dans le traitement des douleurs myofasciales et des désordres liés au stress.

Au fil des ans, Sophie a intégré le drainage lymphatique manuel à sa pratique, une technique particulièrement bénéfique pour les patients en post-chirurgie. Elle collabore étroitement avec Marie-Ève et Jean-François pour offrir une approche de soins intégrée à leurs patients communs.`,
  },
];

export const STATS = [
  { value: "500+", label: "Patients traités" },
  { value: "15 ans", label: "Expérience cumulée" },
  { value: "98%", label: "Taux de satisfaction" },
];
