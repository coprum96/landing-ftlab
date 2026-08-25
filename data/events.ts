export type Localized = { en: string; ru: string };

export type EventSession = {
  time: string;
  title: Localized;
  speakers?: Localized;
  venue?: Localized;
  kind?: "break" | "session" | "ceremony";
};

export type EventDay = {
  id: string;
  date: string;
  label: Localized;
  venue: Localized;
  format: Localized;
  sessions: EventSession[];
};

export type LabEvent = {
  id: string;
  slug: string;
  status: "upcoming" | "past";
  edition: Localized;
  title: Localized;
  summary: Localized;
  dates: Localized;
  format: Localized;
  organizers: Localized;
  sponsors?: Localized;
  infoPartner?: Localized;
  days: EventDay[];
};

/**
 * II All-Russian conference — schedule from program short version (19.08.2026).
 */
export const events: LabEvent[] = [
  {
    id: "conf-2026",
    slug: "behavioral-economics-information-security-2026",
    status: "upcoming",
    edition: {
      en: "II All-Russian Scientific and Practical Conference",
      ru: "II Всероссийская научно-практическая конференция",
    },
    title: {
      en: "Behavioral Economics and Information Security: a Strategic Dialogue",
      ru: "Поведенческая экономика и информационная безопасность: стратегический диалог",
    },
    summary: {
      en: "Two days at SPbU: a research–industry dialogue on behavioral economics, trust architecture, antifraud analytics, and platform practice — followed by a Youth Day with masterclasses and the Golden Detector simulation.",
      ru: "Два дня в СПбГУ: диалог науки и практики о поведенческой экономике, архитектуре доверия, антифрод-аналитике и платформах — и Молодёжный день с мастер-классами и симулятором «Золотой Детектор».",
    },
    dates: {
      en: "9–10 October 2026",
      ru: "9–10 октября 2026",
    },
    format: {
      en: "Hybrid (on-site + online)",
      ru: "Смешанный формат (очно + онлайн)",
    },
    organizers: {
      en: "SPbU · Laboratory of Modern Financial Technologies · Association of Russian Banks (ARB)",
      ru: "СПбГУ · Лаборатория современных финансовых технологий · Ассоциация российских банков (АРБ)",
    },
    sponsors: {
      en: "Ozon · Yandex · RWB",
      ru: "Ozon · Яндекс · RWB",
    },
    infoPartner: {
      en: "National Banking Journal",
      ru: "Национальный банковский журнал",
    },
    days: [
      {
        id: "day-1",
        date: "2026-10-09",
        label: {
          en: "Conference day",
          ru: "День конференции",
        },
        venue: {
          en: "SPbU, Universitetskaya Emb. 7/9 · Assembly Hall",
          ru: "СПбГУ, Университетская наб., 7/9 · Актовый зал",
        },
        format: {
          en: "Hybrid",
          ru: "Смешанный формат",
        },
        sessions: [
          {
            time: "09:30–10:00",
            title: {
              en: "Registration / welcome coffee · Press approach",
              ru: "Регистрация / приветственный кофе · Пресс-подход",
            },
            venue: {
              en: "Hall before the Assembly Hall",
              ru: "Холл перед актовым залом",
            },
            kind: "ceremony",
          },
          {
            time: "10:00–10:15",
            title: {
              en: "Conference opening",
              ru: "Открытие конференции",
            },
            speakers: {
              en: "N. M. Kropachev · G. A. Tosunyan",
              ru: "Н. М. Кропачев · Г. А. Тосунян",
            },
            venue: { en: "Assembly Hall", ru: "Актовый зал" },
            kind: "ceremony",
          },
          {
            time: "10:15–11:30",
            title: {
              en: "Plenary 1 — Behavioral economics in the digital age: from the consumer to cyber threats",
              ru: "Пленарное заседание 1 — «Поведенческая экономика в цифровую эпоху: от потребителя к киберугрозам»",
            },
            speakers: {
              en: "G. A. Tosunyan · Karin Kneissl · M. V. Mamuta · V. A. Uvarov · Ministry of Finance representative",
              ru: "Г. А. Тосунян · Карин Кнайсль · М. В. Мамута · В. А. Уваров · представитель Минфина",
            },
            venue: { en: "Assembly Hall", ru: "Актовый зал" },
          },
          {
            time: "11:30–12:45",
            title: {
              en: "Plenary 2 — Architecture of trust: tools for responsible behavior",
              ru: "Пленарное заседание 2 — «Архитектура доверия: инструменты формирования ответственного поведения»",
            },
            speakers: {
              en: "G. A. Tosunyan · D. V. Ushakov · M. F. Chernysh · Wang Qiang · Kazi Sohag",
              ru: "Г. А. Тосунян · Д. В. Ушаков · М. Ф. Черныш · Ван Цян · Кази Сохаг",
            },
            venue: { en: "Assembly Hall", ru: "Актовый зал" },
          },
          {
            time: "12:45–13:30",
            title: { en: "Coffee break", ru: "Кофе-брейк" },
            venue: { en: "Hall, 3rd floor", ru: "Холл, 3 этаж" },
            kind: "break",
          },
          {
            time: "13:30–14:45",
            title: {
              en: "Panel 1 — Prediction and prevention: behavioral analytics against financial fraud",
              ru: "Панельная дискуссия 1 — «Предсказание и предотвращение: поведенческая аналитика в борьбе с финансовым мошенничеством»",
            },
            speakers: {
              en: "V. A. Uvarov · S. V. Kuznetsov · O. V. Skvortsov · O. V. Medyanik · Rosfinmonitoring representative",
              ru: "В. А. Уваров · С. В. Кузнецов · О. В. Скворцов · О. В. Медяник · представитель Росфинмониторинга",
            },
            venue: { en: "Assembly Hall", ru: "Актовый зал" },
          },
          {
            time: "14:45–16:00",
            title: {
              en: "Panel 2 — Platforms in the age of behavioral economics",
              ru: "Панельная дискуссия 2 — «Платформы в эпоху поведенческой экономики»",
            },
            speakers: {
              en: "Ozon · Wildberries · Yandex",
              ru: "Ozon · Wildberries · Яндекс",
            },
            venue: { en: "Assembly Hall", ru: "Актовый зал" },
          },
          {
            time: "16:00–16:15",
            title: { en: "Coffee break", ru: "Кофе-брейк" },
            venue: { en: "Hall, 3rd floor", ru: "Холл, 3 этаж" },
            kind: "break",
          },
          {
            time: "16:15–17:15",
            title: {
              en: "Round table — Architecture of financial choice: how nudging shapes decisions",
              ru: "Круглый стол — «Архитектура финансового выбора: как наджинг формирует финансовые решения»",
            },
            speakers: {
              en: "O. V. Medyanik · M. A. Gagarina · M. A. Semov · L. A. Presnyakova · K. Lobanova",
              ru: "О. В. Медяник · М. А. Гагарина · М. А. Семов · Л. А. Преснякова · К. Лобанова",
            },
            venue: { en: "Assembly Hall", ru: "Актовый зал" },
          },
          {
            time: "17:15–18:05",
            title: {
              en: "Why citizens trust fraudsters",
              ru: "«Почему граждане доверяют мошенникам»",
            },
            speakers: {
              en: "V. A. Shurov (psychiatrist, psychotherapist, clinic chief physician)",
              ru: "В. А. Шуров (врач-психиатр, психотерапевт, главный врач клиники)",
            },
            venue: { en: "Assembly Hall", ru: "Актовый зал" },
          },
          {
            time: "18:05–18:15",
            title: {
              en: "Conference closing",
              ru: "Закрытие конференции",
            },
            venue: { en: "Assembly Hall", ru: "Актовый зал" },
            kind: "ceremony",
          },
        ],
      },
      {
        id: "day-2",
        date: "2026-10-10",
        label: {
          en: "Youth Day — Architecture of Financial Choice 2.0",
          ru: "Молодёжный день — «Архитектура финансового выбора 2.0»",
        },
        venue: {
          en: "SPbU Faculty of Economics, Tavricheskaya St. 21–23 · Assembly Hall & classrooms",
          ru: "Экономический факультет СПбГУ, Таврическая ул., 21–23 · Актовый зал и аудитории",
        },
        format: {
          en: "Hybrid",
          ru: "Смешанный формат",
        },
        sessions: [
          {
            time: "09:00–10:00",
            title: {
              en: "Registration · VIP coffee for speakers",
              ru: "Регистрация · Кофе-брейк (VIP, спикеры)",
            },
            venue: {
              en: "Hall (1st floor) · Aud. 64",
              ru: "Холл, 1 этаж · Ауд. 64",
            },
            kind: "ceremony",
          },
          {
            time: "10:00–11:00",
            title: {
              en: "Meeting with Academician G. A. Tosunyan",
              ru: "Встреча с академиком Г. А. Тосуняном",
            },
            speakers: {
              en: "President of ARB · Head of the Laboratory of Modern Financial Technologies, SPbU",
              ru: "Президент АРБ · руководитель Лаборатории современных финансовых технологий СПбГУ",
            },
            venue: { en: "Assembly Hall", ru: "Актовый зал" },
          },
          {
            time: "11:15–12:00",
            title: {
              en: "Student & school contest «Nudging for Good»",
              ru: "Конкурс студентов и школьников «Наджинг добра»",
            },
            venue: { en: "Assembly Hall", ru: "Актовый зал" },
          },
          {
            time: "12:00–13:00",
            title: {
              en: "Bank of Russia panel — Digital brain: how young people make financial decisions in the age of AI",
              ru: "Панельная дискуссия Банка России — «Цифровой мозг: как молодые принимают финансовые решения в эпоху ИИ»",
            },
            venue: { en: "Assembly Hall", ru: "Актовый зал" },
          },
          {
            time: "13:00–13:30",
            title: { en: "Coffee break", ru: "Кофе-брейк" },
            venue: {
              en: "Hall, 2nd floor · Aud. 64 (VIP)",
              ru: "Холл, 2 этаж · Ауд. 64 (VIP)",
            },
            kind: "break",
          },
          {
            time: "13:15–14:45",
            title: {
              en: "Parallel masterclasses",
              ru: "Параллельные мастер-классы",
            },
            speakers: {
              en: "Academy of Competency Development · Serbsky Center · EchoStressAI · RWB · TeamMatrix · Wang Qiang (Asian Studies Lab)",
              ru: "Академия развития компетенций · НМИЦ им. В. П. Сербского · EchoStressAI · RWB · TeamMatrix · Ван Цян (Лаборатория азиатских исследований)",
            },
            venue: {
              en: "Aud. 77 · 78 · 79 · 93 · 94",
              ru: "Ауд. 77 · 78 · 79 · 93 · 94",
            },
          },
          {
            time: "14:45–15:15",
            title: { en: "Coffee break", ru: "Кофе-брейк" },
            venue: {
              en: "Hall, 2nd floor · Aud. 64 (VIP)",
              ru: "Холл, 2 этаж · Ауд. 64 (VIP)",
            },
            kind: "break",
          },
          {
            time: "15:15–16:30",
            title: {
              en: "Business game — Golden Detector antifraud simulator",
              ru: "Деловая игра — антифрод-симулятор «Золотой Детектор»",
            },
            speakers: {
              en: "Moderator: actor Nikita Antonov",
              ru: "Модератор: актёр Никита Антонов",
            },
            venue: { en: "Assembly Hall", ru: "Актовый зал" },
          },
          {
            time: "16:30–17:45",
            title: {
              en: "Closing",
              ru: "Закрытие",
            },
            venue: { en: "Assembly Hall", ru: "Актовый зал" },
            kind: "ceremony",
          },
        ],
      },
    ],
  },
];

export const featuredEvent = events.find((e) => e.status === "upcoming") ?? null;

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}
