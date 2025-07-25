// src/data/triviaData.ts

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct answer
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  points: number;
}

export const CULTURAL_TRIVIA: TriviaQuestion[] = [
  {
    id: 'trivia_001',
    question: 'Instrumen musik tradisional Angklung berasal dari provinsi mana?',
    options: ['Jawa Timur', 'Jawa Barat', 'Jawa Tengah', 'Bali'],
    correctAnswer: 1,
    explanation: 'Angklung adalah instrumen musik tradisional yang berasal dari Jawa Barat, terbuat dari bambu dan telah diakui UNESCO sebagai Masterpiece of Oral and Intangible Heritage of Humanity.',
    difficulty: 'easy',
    category: 'Traditional Music',
    points: 10
  },
  {
    id: 'trivia_002', 
    question: 'Tari Saman yang terkenal dengan gerakan cepat dan dinamis berasal dari daerah mana?',
    options: ['Sumatera Utara', 'Aceh', 'Sumatera Barat', 'Riau'],
    correctAnswer: 1,
    explanation: 'Tari Saman berasal dari Aceh dan dikenal sebagai "Tari Seribu Tangan" karena gerakan tangan yang sangat cepat dan kompak. Tarian ini juga telah diakui UNESCO.',
    difficulty: 'medium',
    category: 'Traditional Dance',
    points: 15
  },
  {
    id: 'trivia_003',
    question: 'Batik cap dan batik tulis adalah dua teknik pembuatan batik. Manakah yang lebih tua?',
    options: ['Batik cap', 'Batik tulis', 'Sama-sama tua', 'Tidak ada yang benar'],
    correctAnswer: 1,
    explanation: 'Batik tulis adalah teknik yang lebih tua, sudah ada sejak abad ke-12. Batik cap baru dikembangkan pada abad ke-19 untuk mempercepat proses produksi.',
    difficulty: 'medium',
    category: 'Traditional Crafts',
    points: 15
  },
  {
    id: 'trivia_004',
    question: 'Rumah adat Tongkonan dengan atap melengkung khas berasal dari daerah mana?',
    options: ['Sulawesi Utara', 'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara'],
    correctAnswer: 2,
    explanation: 'Tongkonan adalah rumah adat suku Toraja di Sulawesi Selatan. Bentuk atapnya yang melengkung menyerupai perahu terbalik memiliki makna filosofis yang mendalam.',
    difficulty: 'medium',
    category: 'Traditional Architecture',
    points: 15
  },
  {
    id: 'trivia_005',
    question: 'Rendang yang terkenal sebagai makanan terenak di dunia berasal dari daerah mana?',
    options: ['Sumatera Utara', 'Sumatera Barat', 'Sumatera Selatan', 'Jambi'],
    correctAnswer: 1,
    explanation: 'Rendang berasal dari Sumatera Barat, khususnya dari suku Minangkabau. Makanan ini pernah dinobatkan sebagai makanan terenak di dunia oleh CNN International.',
    difficulty: 'easy',
    category: 'Traditional Cuisine',
    points: 10
  },
  {
    id: 'trivia_006',
    question: 'Wayang kulit tradisional menggunakan bahasa apa sebagai bahasa utama pertunjukan?',
    options: ['Bahasa Indonesia', 'Bahasa Jawa Kuno', 'Bahasa Sunda', 'Bahasa Bali'],
    correctAnswer: 1,
    explanation: 'Wayang kulit tradisional umumnya menggunakan Bahasa Jawa Kuno (Kawi) dan Bahasa Jawa modern, dengan dalang sebagai narator yang menguasai berbagai tingkatan bahasa Jawa.',
    difficulty: 'hard',
    category: 'Traditional Performance',
    points: 20
  },
  {
    id: 'trivia_007',
    question: 'Kain tradisional "Ulos" yang sering digunakan dalam upacara adat berasal dari suku mana?',
    options: ['Suku Dayak', 'Suku Batak', 'Suku Sasak', 'Suku Bugis'],
    correctAnswer: 1,
    explanation: 'Ulos adalah kain tradisional suku Batak di Sumatera Utara. Kain ini memiliki makna spiritual dan sering digunakan dalam berbagai upacara adat penting.',
    difficulty: 'medium',
    category: 'Traditional Clothing',
    points: 15
  },
  {
    id: 'trivia_008',
    question: 'Candi Borobudur dibangun pada masa kerajaan mana?',
    options: ['Majapahit', 'Sailendra', 'Mataram Kuno', 'Sriwijaya'],
    correctAnswer: 1,
    explanation: 'Candi Borobudur dibangun pada abad ke-8 hingga ke-9 Masehi pada masa Dinasti Sailendra. Candi ini merupakan candi Buddha terbesar di dunia.',
    difficulty: 'hard',
    category: 'Historical Heritage',
    points: 20
  },
  {
    id: 'trivia_009',
    question: 'Tari Kecak yang menampilkan puluhan penari pria duduk melingkar sambil mengucapkan "cak" berasal dari daerah mana?',
    options: ['Jawa Tengah', 'Yogyakarta', 'Bali', 'Lombok'],
    correctAnswer: 2,
    explanation: 'Tari Kecak berasal dari Bali dan dikembangkan pada tahun 1930-an. Tarian ini menggambarkan kisah Ramayana dengan paduan suara "cak" yang hypnotic.',
    difficulty: 'easy',
    category: 'Traditional Dance',
    points: 10
  },
  {
    id: 'trivia_010',
    question: 'Gamelan Degung adalah jenis gamelan khas dari daerah mana?',
    options: ['Jawa Tengah', 'Jawa Timur', 'Jawa Barat', 'Banten'],
    correctAnswer: 2,
    explanation: 'Gamelan Degung adalah gamelan khas Sunda dari Jawa Barat. Musik ini memiliki karakter yang lembut dan melankolis, berbeda dengan gamelan Jawa pada umumnya.',
    difficulty: 'medium',
    category: 'Traditional Music',
    points: 15
  },
  {
    id: 'trivia_011',
    question: 'Upacara "Nyepi" yang merupakan hari raya keheningan berasal dari agama dan daerah mana?',
    options: ['Hindu, Jawa', 'Buddha, Lombok', 'Hindu, Bali', 'Islam, Aceh'],
    correctAnswer: 2,
    explanation: 'Nyepi adalah hari raya Hindu yang dirayakan di Bali sebagai tahun baru Saka. Selama 24 jam, seluruh aktivitas dihentikan untuk merefleksi diri.',
    difficulty: 'easy',
    category: 'Religious Ceremony',
    points: 10
  },
  {
    id: 'trivia_012',
    question: 'Keris yang merupakan senjata tradisional Indonesia memiliki berapa lekukan pada bilahnya yang dianggap paling sakral?',
    options: ['5 lekukan', '7 lekukan', '9 lekukan', '13 lekukan'],
    correctAnswer: 2,
    explanation: 'Keris dengan 9 lekukan (luk) dianggap paling sakral dalam tradisi Jawa. Angka 9 melambangkan kesempurnaan dan kedewasaan spiritual.',
    difficulty: 'hard',
    category: 'Traditional Weaponry',
    points: 20
  },
  {
    id: 'trivia_013',
    question: 'Filosofi "Tri Hita Karana" yang mengajarkan keseimbangan hidup berasal dari budaya mana?',
    options: ['Jawa', 'Bali', 'Sunda', 'Minang'],
    correctAnswer: 1,
    explanation: 'Tri Hita Karana adalah filosofi Hindu Bali yang mengajarkan keseimbangan hubungan antara manusia dengan Tuhan, sesama manusia, dan alam lingkungan.',
    difficulty: 'hard',
    category: 'Philosophy & Wisdom',
    points: 20
  },
  {
    id: 'trivia_014',
    question: 'Makanan "Papeda" yang terbuat dari sagu merupakan makanan pokok dari daerah mana?',
    options: ['Maluku', 'Papua', 'Sulawesi', 'A dan B benar'],
    correctAnswer: 3,
    explanation: 'Papeda adalah makanan pokok yang populer di Maluku dan Papua. Makanan ini terbuat dari tepung sagu dan biasanya dimakan dengan kuah ikan atau sayuran.',
    difficulty: 'medium',
    category: 'Traditional Cuisine',
    points: 15
  },
  {
    id: 'trivia_015',
    question: 'Tarian "Tor-tor" yang dilakukan dalam upacara adat Batak memiliki makna apa?',
    options: ['Tarian perang', 'Tarian penyambutan', 'Tarian spiritual', 'Semua benar'],
    correctAnswer: 3,
    explanation: 'Tor-tor dalam budaya Batak memiliki berbagai makna tergantung konteksnya - bisa sebagai tarian spiritual, penyambutan tamu, atau bahkan ritual perang.',
    difficulty: 'hard',
    category: 'Traditional Dance',
    points: 20
  }
];

// Function to get random trivia for the day
export function getTodayTrivia(): TriviaQuestion {
  const today = new Date().toDateString();
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = seed % CULTURAL_TRIVIA.length;
  return CULTURAL_TRIVIA[index];
}

// Function to get trivia by difficulty
export function getTriviaByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): TriviaQuestion[] {
  return CULTURAL_TRIVIA.filter(trivia => trivia.difficulty === difficulty);
}

// Function to get trivia by category
export function getTriviaByCategory(category: string): TriviaQuestion[] {
  return CULTURAL_TRIVIA.filter(trivia => trivia.category === category);
}