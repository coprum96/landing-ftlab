export type Localized = { en: string; ru: string };

export type Person = {
  id: string;
  slug: string;
  name: Localized;
  role: Localized;
  focus: Localized;
  bio: Localized;
  detail?: Localized;
  institution?: Localized;
  links: {
    linkedin?: string;
    orcid?: string;
    scholar?: string;
    web?: string;
  };
  initials: string;
  motif: "a" | "b" | "c" | "d";
  hasPhoto?: boolean;
  featured?: boolean;
};

/**
 * Profiles summarized from official lab materials and public bios.
 * Private contact details omitted.
 */
export const people: Person[] = [
  {
    id: "tosunyan",
    slug: "gagik-tosunyan",
    name: {
      en: "G. A. Tosunyan",
      ru: "Г. А. Тосунян",
    },
    role: {
      en: "Scientific Director",
      ru: "Научный руководитель",
    },
    focus: {
      en: "Banking law · financial regulation · industry dialogue",
      ru: "Банковское право · финансовое регулирование · диалог с индустрией",
    },
    bio: {
      en: "Academician; President of the Association of Banks of Russia. As Scientific Director, he links academic work with the banking community and regulators.",
      ru: "Академик; президент Ассоциации банков России. Как научный руководитель связывает академическую работу с банковским сообществом и регуляторами.",
    },
    detail: {
      en: "Leadership is framed in laboratory materials as a strategic bridge between research and industry practice. Public profile kept concise pending expanded biography.",
      ru: "В материалах лаборатории руководство описано как стратегический мост между исследованиями и отраслевой практикой. Публичный профиль оставлен кратким до появления расширенной биографии.",
    },
    institution: {
      en: "Association of Banks of Russia",
      ru: "Ассоциация банков России",
    },
    links: {},
    initials: "GT",
    motif: "a",
    hasPhoto: true,
    featured: true,
  },
  {
    id: "medyanik-ov",
    slug: "olga-medyanik",
    name: {
      en: "Olga V. Medyanik",
      ru: "Ольга В. Медяник",
    },
    role: {
      en: "Deputy Scientific Director · Leading Researcher",
      ru: "Заместитель научного руководителя · ведущий научный сотрудник",
    },
    focus: {
      en: "Behavioral economics · economic psychology · social engineering defense",
      ru: "Поведенческая экономика · экономическая психология · защита от социальной инженерии",
    },
    bio: {
      en: "Candidate of Psychological Sciences. Leads the laboratory’s educational track and applied work on behavioral security, Cognitive Shield, and interactive antifraud training tools.",
      ru: "Кандидат психологических наук. Ведёт образовательный трек лаборатории и прикладную работу по поведенческой безопасности, программе «Когнитивный щит» и интерактивным антифрод-инструментам.",
    },
    detail: {
      en: "Associate Professor, Department of Risk Management and Insurance, SPbU. Head of the master’s program “Behavioral Economics and Economic Psychology”; curator of “Platform Economy”. Member of IAREP and Bank of Russia working groups on behavioral aspects of financial culture and social-engineering crime prevention. Author of 50+ publications and registered research software/databases including Golden Detector.",
      ru: "Доцент кафедры управления рисками и страхования СПбГУ. Руководитель магистратуры «Поведенческая экономика и экономическая психология»; куратор программы «Платформенная экономика». Член IAREP и рабочих групп Банка России по поведенческим аспектам финансовой культуры и противодействию преступлениям с использованием социальной инженерии. Автор 50+ публикаций и зарегистрированных программ/БД, включая «Золотой Детектор».",
    },
    institution: {
      en: "Saint Petersburg State University",
      ru: "Санкт-Петербургский государственный университет",
    },
    links: {
      orcid: "https://orcid.org/0000-0002-7230-1027",
      web: "https://econ.spbu.ru/ru/people/medyanik-olga-viktorovna",
    },
    initials: "OM",
    motif: "b",
    hasPhoto: true,
    featured: true,
  },
  {
    id: "gagarina",
    slug: "maria-gagarina",
    name: {
      en: "Maria A. Gagarina",
      ru: "Мария А. Гагарина",
    },
    role: {
      en: "Research Collaborator",
      ru: "Исследователь-сотрудник",
    },
    focus: {
      en: "Economic psychology · developmental psychology",
      ru: "Экономическая психология · психология развития",
    },
    bio: {
      en: "Doctor of Psychological Sciences; Professor at the Financial University under the Government of the Russian Federation. Listed on the laboratory team in official presentation materials.",
      ru: "Доктор психологических наук; профессор Финансового университета при Правительстве РФ. Указана в составе команды лаборатории в официальных презентационных материалах.",
    },
    detail: {
      en: "Teaches economic psychology and professional business ethics. Author of 100+ works, including monographs. Exact laboratory title beyond team membership is not specified in available materials.",
      ru: "Преподаёт экономическую психологию и профессиональную этику бизнеса. Автор 100+ работ, включая монографии. Точная должность в лаборатории сверх включения в команду в доступных материалах не уточнена.",
    },
    institution: {
      en: "Financial University under the Government of the Russian Federation",
      ru: "Финансовый университет при Правительстве Российской Федерации",
    },
    links: {},
    initials: "MG",
    motif: "c",
    hasPhoto: true,
    featured: true,
  },
  {
    id: "skvortsov",
    slug: "oleg-skvortsov",
    name: {
      en: "Oleg V. Skvortsov",
      ru: "Олег В. Скворцов",
    },
    role: {
      en: "Industry Lead · Association of Banks of Russia",
      ru: "Индустриальный контур · Ассоциация банков России",
    },
    focus: {
      en: "Digital banking · fintech regulation · industry standards",
      ru: "Цифровой банкинг · регулирование финтеха · отраслевые стандарты",
    },
    bio: {
      en: "Chair of the Board, Association of Banks of Russia. Connects laboratory research with banking-sector practice and regulatory dialogue.",
      ru: "Председатель Правления Ассоциации банков России. Связывает исследования лаборатории с практикой банковского сектора и регуляторным диалогом.",
    },
    detail: {
      en: "28+ years in banking leadership, including long-term chairmanship of ARB IT committees and board roles. Brings industry standards and digital-banking practice into the laboratory’s applied agenda.",
      ru: "28+ лет на руководящих позициях в банковской сфере, включая многолетнее руководство IT-комитетами АРБ и работу в советах директоров. Привносит отраслевые стандарты и практику цифрового банкинга в прикладную повестку лаборатории.",
    },
    institution: {
      en: "Association of Banks of Russia",
      ru: "Ассоциация банков России",
    },
    links: {},
    initials: "OS",
    motif: "d",
    hasPhoto: true,
    featured: true,
  },
  {
    id: "kuznetsov",
    slug: "sergey-kuznetsov",
    name: {
      en: "Sergey V. Kuznetsov",
      ru: "Сергей В. Кузнецов",
    },
    role: {
      en: "Regulatory Practice · Bank of Russia",
      ru: "Регуляторная практика · Банк России",
    },
    focus: {
      en: "Cybersecurity · social-engineering prevention · regional finance",
      ru: "Кибербезопасность · противодействие социальной инженерии · региональные финансы",
    },
    bio: {
      en: "Candidate of Economic Sciences; Head of the Bank of Russia Ryazan Branch (since 2017). Brings regulatory and cybersecurity practice into the laboratory team.",
      ru: "Кандидат экономических наук; управляющий Отделением Рязань Банка России (с 2017). Привносит в команду лаборатории регуляторную и кибербезопасную практику.",
    },
    detail: {
      en: "Contributed to interagency work on social-engineering crime prevention and to methodological materials “Cognitive Shield…”, with implementation across 30+ credit organizations. Also leads large-scale public surveys on financial-service security satisfaction.",
      ru: "Участвовал в межведомственной работе по противодействию преступлениям с использованием социальной инженерии и в методических материалах «Когнитивный щит…»; внедрение в 30+ кредитных организациях. Также курирует масштабные опросы удовлетворённости безопасностью финансовых услуг.",
    },
    institution: {
      en: "Bank of Russia",
      ru: "Банк России",
    },
    links: {},
    initials: "SK",
    motif: "a",
    hasPhoto: true,
    featured: true,
  },
  {
    id: "medyanik-s",
    slug: "stas-medyanik",
    name: {
      en: "Stas Medyanik",
      ru: "Стас Медяник",
    },
    role: {
      en: "Senior Researcher · AI / ML",
      ru: "Старший исследователь · ИИ / ML",
    },
    focus: {
      en: "Fraud detection · behavioral risk scoring · SupTech / RegTech",
      ru: "Детекция мошенничества · поведенческий риск-скоринг · SupTech / RegTech",
    },
    bio: {
      en: "Solutions & integrations engineer specializing in AI/ML systems. Leads senior research on fraud pipelines and behavioral risk engines for FinTechLab / SupTech–RegTech contexts.",
      ru: "Инженер решений и интеграций со специализацией в ИИ/ML. Ведёт старшую исследовательскую работу над антифрод-пайплайнами и поведенческими риск-движками в контексте FinTechLab / SupTech–RegTech.",
    },
    detail: {
      en: "M.Sc. Finance, SPbU; additional graduate study at Free University of Berlin. Focuses on translating behavioral evidence into deployable detection and scoring systems.",
      ru: "Магистр финансов СПбГУ; дополнительная магистратура в Свободном университете Берлина. Фокус — перевод поведенческих данных в развёртываемые системы детекции и скоринга.",
    },
    institution: {
      en: "Saint Petersburg State University",
      ru: "Санкт-Петербургский государственный университет",
    },
    links: {},
    initials: "SM",
    motif: "c",
    hasPhoto: true,
    featured: true,
  },
];

export const featuredPeople = people.filter((p) => p.featured);

export function getPersonBySlug(slug: string) {
  return people.find((p) => p.slug === slug);
}
