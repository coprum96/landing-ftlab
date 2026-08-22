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
      en: "Gagik A. Tosunyan",
      ru: "Гагик А. Тосунян",
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
      en: "Academician of the Russian Academy of Sciences; President of the Association of Russian Banks (ARB). As Scientific Director, he connects academic research with the banking sector and regulators.",
      ru: "Академик Российской академии наук; президент Ассоциации российских банков (АРБ). Как научный руководитель лаборатории связывает академические исследования с банковской отраслью и регуляторами.",
    },
    detail: {
      en: "Recognized authority in banking law and financial regulation. His leadership positions the laboratory as a bridge between behavioral research, industry practice, and regulatory policy.",
      ru: "Признанный эксперт в области банковского права и финансового регулирования. Его руководство позиционирует лабораторию как связующее звено между поведенческими исследованиями, отраслевой практикой и регуляторной политикой.",
    },
    institution: {
      en: "Association of Russian Banks (ARB)",
      ru: "Ассоциация российских банков (АРБ)",
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
      en: "Leading Researcher",
      ru: "Ведущий научный сотрудник",
    },
    focus: {
      en: "Economic psychology · developmental psychology",
      ru: "Экономическая психология · психология развития",
    },
    bio: {
      en: "Doctor of Psychological Sciences; Professor at the Financial University under the Government of the Russian Federation. Leading researcher of the laboratory; listed on the team in official presentation materials.",
      ru: "Доктор психологических наук; профессор Финансового университета при Правительстве РФ. Ведущий научный сотрудник лаборатории; указана в составе команды в официальных презентационных материалах.",
    },
    detail: {
      en: "Teaches economic psychology and professional business ethics. Author of 100+ works, including monographs. Serves as a leading researcher (ведущий научный сотрудник) within the FinTechLab team.",
      ru: "Преподаёт экономическую психологию и профессиональную этику бизнеса. Автор 100+ работ, включая монографии. В составе FinTechLab — ведущий научный сотрудник.",
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
      en: "Industry Lead · Association of Russian Banks (ARB)",
      ru: "Индустриальный контур · Ассоциация российских банков (АРБ)",
    },
    focus: {
      en: "Digital banking · fintech regulation · industry standards",
      ru: "Цифровой банкинг · регулирование финтеха · отраслевые стандарты",
    },
    bio: {
      en: "Chair of the Board, Association of Russian Banks (ARB). Connects laboratory research with banking-sector practice and regulatory dialogue.",
      ru: "Председатель Правления Ассоциации российских банков (АРБ). Связывает исследования лаборатории с практикой банковского сектора и регуляторным диалогом.",
    },
    detail: {
      en: "28+ years in banking leadership, including long-term chairmanship of ARB IT committees and board roles. Brings industry standards and digital-banking practice into the laboratory’s applied agenda.",
      ru: "28+ лет на руководящих позициях в банковской сфере, включая многолетнее руководство IT-комитетами АРБ и работу в советах директоров. Привносит отраслевые стандарты и практику цифрового банкинга в прикладную повестку лаборатории.",
    },
    institution: {
      en: "Association of Russian Banks (ARB)",
      ru: "Ассоциация российских банков (АРБ)",
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
      en: "Founder · Senior Researcher · AI / ML",
      ru: "Основатель FTLAB · старший исследователь · ИИ / ML",
    },
    focus: {
      en: "Fraud detection · behavioral risk scoring · SupTech / RegTech",
      ru: "Детекция мошенничества · поведенческий риск-скоринг · SupTech / RegTech",
    },
    bio: {
      en: "Founder of FinTechLab. Solutions and integrations engineer specializing in AI and machine learning. Leads research on antifraud pipelines and behavioral risk engines within FinTechLab / SupTech-RegTech.",
      ru: "Основатель FinTechLab. Инженер по решениям и интеграциям со специализацией в области ИИ и машинного обучения. Ведёт исследования антифрод-пайплайнов и поведенческих риск-движков в рамках направления FinTechLab / SupTech-RegTech.",
    },
    detail: {
      en: "M.Sc. Finance, SPbU; second master's degree in finance from Freie Universität Berlin. Focus: translating behavioral evidence into deployable detection and scoring systems. Builds the technical backbone connecting laboratory experiments to production-grade antifraud and behavioral scoring infrastructure.",
      ru: "Магистр финансов СПбГУ; вторая магистратура по финансам в Свободном университете Берлина. Фокус работы - превращение поведенческих данных в готовые к внедрению системы детекции и скоринга. Создаёт техническую основу, которая соединяет лабораторные эксперименты с промышленными антифрод- и поведенческими скоринг-системами.",
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
  {
    id: "rozanov",
    slug: "ivan-rozanov",
    name: {
      en: "Ivan A. Rozanov",
      ru: "Иван А. Розанов",
    },
    role: {
      en: "Senior Researcher",
      ru: "Старший научный сотрудник",
    },
    focus: {
      en: "Neuroeconomics · stress physiology · decision-making under pressure",
      ru: "Нейроэкономика · психофизиология стресса · принятие решений под давлением",
    },
    bio: {
      en: "Candidate of Medical Sciences. Researcher at the intersection of stress psychophysiology, neurobiology of decision-making, and behavioral psychology. Senior researcher at the Serbsky National Medical Research Center; associate professor at MGPPU.",
      ru: "Кандидат медицинских наук. Исследователь на стыке психофизиологии стресса, нейробиологии принятия решений и поведенческой психологии. Старший научный сотрудник НМИЦ психиатрии и наркологии им. В. П. Сербского; доцент МГППУ.",
    },
    detail: {
      en: "Head of R&D at EchoStressAI (AI solutions for psychodiagnostics). Developer of VR systems for suggestive correction. Author of 70+ publications (H-index 9). Research covers value-meaning regulation of activity, cognitive biases, suggestibility, and deviant behavior risk - forming the scientific basis for neuroeconomics teaching and antifraud models that predict irrational choice and social-engineering vulnerability.",
      ru: "Руководитель R&D-направления EchoStressAI (ИИ-решения для психодиагностики). Разработчик VR-систем суггестивной коррекции. Автор 70+ научных работ (индекс Хирша 9). Исследует ценностно-смысловую регуляцию деятельности, когнитивные искажения, внушаемость и риски девиантного поведения - это формирует научную базу для преподавания нейроэкономики и антифрод-моделей, прогнозирующих иррациональный выбор и уязвимость к социальной инженерии.",
    },
    institution: {
      en: "Serbsky National Medical Research Center · MGPPU",
      ru: "НМИЦ психиатрии и наркологии им. В. П. Сербского · МГППУ",
    },
    links: {},
    initials: "IR",
    motif: "d",
    hasPhoto: true,
    featured: true,
  },
];

export const featuredPeople = people.filter((p) => p.featured);

export function getPersonBySlug(slug: string) {
  return people.find((p) => p.slug === slug);
}
