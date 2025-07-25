export const languages = {
  id: 'Bahasa Indonesia',
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  ar: 'العربية',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  pt: 'Português',
}

export const translations = {
  id: {
    // Hero Section
    hero: {
      title: "Temukan Keajaiban",
      subtitle: "Budaya Indonesia",
      description: "Platform terdepan untuk menghubungkan wisatawan dengan kekayaan budaya nusantara. Jelajahi, pelajari, dan rasakan pengalaman autentik Indonesia.",
      cta: "Jelajahi Sekarang",
      watchVideo: "Tonton Video"
    },
    // Features
    features: {
      title: "Fitur Unggulan",
      subtitle: "Menghubungkan Anda dengan Budaya Indonesia",
      discovery: {
        title: "Nusa Discovery",
        description: "Jelajahi peta interaktif Indonesia dan temukan keunikan budaya setiap provinsi dengan informasi mendalam dan menarik."
      },
      events: {
        title: "Event Budaya",
        description: "Temukan dan ikuti festival, workshop, dan acara budaya terkini di seluruh Indonesia secara real-time."
      },
      native: {
        title: "Nusa Native",
        description: "Asisten AI dan translator yang membantu Anda berkomunikasi dalam bahasa daerah dengan sempurna."
      },
      community: {
        title: "Community Hub",
        description: "Bergabung dengan komunitas pecinta budaya, bagikan karya, dan terhubung dengan pelaku seni tradisional."
      },
      camera: {
        title: "Nusa Cam",
        description: "Teknologi AI untuk mengenali objek budaya, batik, monumen, dan memberikan informasi edukatif instant."
      },
      trivia: {
        title: "Daily Trivia",
        description: "Pelajari budaya Indonesia dengan cara menyenangkan melalui kuis harian dan raih poin di leaderboard."
      }
    },
    // FAQ
    faq: {
      title: "Pertanyaan yang Sering Diajukan",
      q1: "Apa itu NusaKala?",
      a1: "NusaKala adalah platform digital yang menghubungkan wisatawan dengan kekayaan budaya Indonesia melalui teknologi modern dan AI.",
      q2: "Apakah NusaKala gratis digunakan?",
      a2: "Ya, fitur dasar NusaKala gratis. Beberapa fitur premium tersedia dengan berlangganan untuk pengalaman yang lebih lengkap.",
      q3: "Bagaimana cara bergabung dengan komunitas?",
      a3: "Daftar akun gratis, lengkapi profil Anda, dan mulai berinteraksi dengan sesama pecinta budaya Indonesia.",
      q4: "Apakah tersedia dalam bahasa lain?",
      a4: "Ya, NusaKala mendukung 10+ bahasa untuk memudahkan wisatawan internasional mengeksplorasi budaya Indonesia."
    },
    // Footer
    footer: {
      tagline: "Menghubungkan Dunia dengan Budaya Indonesia",
      company: "Perusahaan",
      about: "Tentang Kami",
      careers: "Karir",
      press: "Pers",
      product: "Produk",
      features: "Fitur",
      pricing: "Harga",
      api: "API",
      support: "Dukungan",
      help: "Bantuan",
      contact: "Kontak",
      legal: "Legal",
      privacy: "Privasi",
      terms: "Syarat Layanan",
      copyright: "Hak Cipta Dilindungi"
    },
    // Common
    common: {
      learnMore: "Pelajari Lebih Lanjut",
      getStarted: "Mulai Sekarang",
      comingSoon: "Segera Hadir",
      loading: "Memuat...",
    }
  },
  en: {
    // Hero Section
    hero: {
      title: "Discover the Magic of",
      subtitle: "Indonesian Culture",
      description: "The leading platform connecting travelers with Indonesia's rich cultural heritage. Explore, learn, and experience authentic Indonesia.",
      cta: "Explore Now",
      watchVideo: "Watch Video"
    },
    // Features
    features: {
      title: "Key Features",
      subtitle: "Connecting You with Indonesian Culture",
      discovery: {
        title: "Nusa Discovery",
        description: "Explore Indonesia's interactive map and discover the unique culture of each province with in-depth and engaging information."
      },
      events: {
        title: "Cultural Events",
        description: "Find and participate in festivals, workshops, and current cultural events throughout Indonesia in real-time."
      },
      native: {
        title: "Nusa Native",
        description: "AI assistant and translator that helps you communicate perfectly in local languages."
      },
      community: {
        title: "Community Hub",
        description: "Join the culture-loving community, share works, and connect with traditional artists."
      },
      camera: {
        title: "Nusa Cam",
        description: "AI technology to recognize cultural objects, batik, monuments, and provide instant educational information."
      },
      trivia: {
        title: "Daily Trivia",
        description: "Learn Indonesian culture in a fun way through daily quizzes and earn points on the leaderboard."
      }
    },
    // FAQ
    faq: {
      title: "Frequently Asked Questions",
      q1: "What is NusaKala?",
      a1: "NusaKala is a digital platform that connects travelers with Indonesia's rich culture through modern technology and AI.",
      q2: "Is NusaKala free to use?",
      a2: "Yes, basic NusaKala features are free. Some premium features are available with subscription for a more complete experience.",
      q3: "How to join the community?",
      a3: "Register for a free account, complete your profile, and start interacting with fellow Indonesian culture enthusiasts.",
      q4: "Is it available in other languages?",
      a4: "Yes, NusaKala supports 10+ languages to help international travelers explore Indonesian culture."
    },
    // Footer
    footer: {
      tagline: "Connecting the World with Indonesian Culture",
      company: "Company",
      about: "About Us",
      careers: "Careers",
      press: "Press",
      product: "Product",
      features: "Features",
      pricing: "Pricing",
      api: "API",
      support: "Support",
      help: "Help",
      contact: "Contact",
      legal: "Legal",
      privacy: "Privacy",
      terms: "Terms of Service",
      copyright: "All Rights Reserved"
    },
    // Common
    common: {
      learnMore: "Learn More",
      getStarted: "Get Started",
      comingSoon: "Coming Soon",
      loading: "Loading...",
    }
  }
  // Add other languages as needed
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.id

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.')
  let current: unknown = translations[lang] || translations.id

  for (const k of keys) {
    if (typeof current === 'object' && current !== null && k in current) {
      // Type assertion is safe here because we check for object and key existence
      current = (current as Record<string, unknown>)[k]
    } else {
      return key
    }
  }

  if (typeof current === 'string') {
    return current
  }
  return key;
}