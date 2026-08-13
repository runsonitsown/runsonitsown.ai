export type Answers = Record<string, string>;

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: string[];
};

export const revenueChoices = [
  "Under $1M",
  "$1M to $4.9M",
  "$5M to $9.9M",
  "$10M to $24.9M",
  "$25M to $50M",
  "More than $50M",
] as const;

export const hourlyValueChoices = [
  "Under $100",
  "$100 to $249",
  "$250 to $499",
  "$500 to $999",
  "$1,000 or more",
] as const;

export const questions: QuizQuestion[] = [
  {
    id: "q0",
    prompt: "I want my time back so I can...",
    choices: [
      "grow the business instead of running it",
      "get my evenings back",
      "stop being the bottleneck",
      "finally take a real vacation",
    ],
  },
  {
    id: "q1",
    prompt: "What kind of business do you run?",
    choices: [
      "Home services",
      "Professional services",
      "Retail or e-commerce",
      "Health & wellness",
      "Real estate",
      "Restaurant or hospitality",
      "Other",
    ],
  },
  {
    id: "q2",
    prompt: "Including you, how many people work in your business?",
    choices: ["Just me", "2-5", "6-10", "11-20", "20+"],
  },
  {
    id: "annualRevenue",
    prompt: "Roughly what did the business bring in over the last 12 months?",
    choices: [...revenueChoices],
  },
  {
    id: "q3",
    prompt: "Roughly what is one hour of your time worth to the business?",
    choices: [...hourlyValueChoices],
  },
  {
    id: "q4",
    prompt: "Your day starts with email and messages. How much of it do they eat?",
    choices: [
      "Under 30 min — you keep it tight",
      "30-60 min — it's a chunk of the morning",
      "1-2 hours — you're in there more than you'd like",
      "More than 2 hours — email basically runs your morning",
    ],
  },
  {
    id: "q5",
    prompt:
      "Between meetings, calls, prep and follow-up, how much of your week goes to talking about the work instead of doing it?",
    choices: [
      "Under 2 hours",
      "2-5 hours",
      "5-10 hours — it's most of a workday",
      "10+ hours — my calendar owns me",
    ],
  },
  {
    id: "q6",
    prompt:
      "Scheduling, invoicing, data entry, copying info between systems. How many hours a week disappear into that?",
    choices: [
      "Under 2 hours",
      "2-5 hours",
      "5-10 hours — I'm doing admin instead of running the business",
      "10+ hours — it never ends",
    ],
  },
  {
    id: "q7",
    prompt:
      "Quotes, proposals, posts, review replies, job ads. How much time do you lose to writing?",
    choices: [
      "Almost none",
      "1-3 hrs/wk",
      "3-6 hrs/wk — I put it off constantly",
      "6+ hrs/wk — writing is a second job I never signed up for",
    ],
  },
  {
    id: "q8",
    prompt: "How often do you or your team answer the same customer questions over and over?",
    choices: [
      "Rarely",
      "A few times a week",
      "Daily — I've explained this a thousand times",
      "It's most of what we do",
    ],
  },
  {
    id: "q9",
    prompt:
      "How much of the business only exists in your head — things nobody else can do because it's never been written down?",
    choices: [
      "Almost nothing — it's documented",
      "Some of it",
      "A lot of it — my team waits on me",
      "The business IS my head. If I vanished for two weeks, things would break.",
    ],
  },
  {
    id: "q11",
    prompt: "Magic wand. If you could delete one process from your business forever, which one goes?",
    choices: [
      "Email and follow-up",
      "Paperwork and admin",
      "Writing anything",
      "Chasing unpaid invoices and scheduling",
      "Answering the same questions again",
      "something else",
    ],
  },
  {
    id: "q12",
    prompt: "Where are you with AI today?",
    choices: [
      "Not at all",
      "I've tried ChatGPT a few times",
      "I use ChatGPT regularly",
      "We use several tools",
    ],
  },
];

const hourlyValueByChoice: Record<(typeof hourlyValueChoices)[number], number> = {
  "Under $100": 50,
  "$100 to $249": 100,
  "$250 to $499": 250,
  "$500 to $999": 500,
  "$1,000 or more": 1_000,
};

const qualifiedRevenueChoices = new Set<string>([
  "$5M to $9.9M",
  "$10M to $24.9M",
  "$25M to $50M",
]);

const leakMath = {
  q4: {
    category: "Email and follow-up",
    hours: [2.5, 5.5, 9, 13],
    recovery: 0.5,
  },
  q5: {
    category: "Meetings and calls",
    hours: [1, 3.5, 7.5, 12],
    recovery: 0.4,
  },
  q6: {
    category: "Paperwork and admin",
    hours: [1, 3.5, 7.5, 12],
    recovery: 0.7,
  },
  q7: {
    category: "Writing",
    hours: [0.5, 2, 4.5, 7],
    recovery: 0.6,
  },
  q8: {
    category: "Repeated customer questions",
    hours: [0.5, 2, 4, 8],
    recovery: 0.8,
  },
} as const;

export function isQualifiedRevenue(annualRevenue: string) {
  return qualifiedRevenueChoices.has(annualRevenue);
}

export function calculateResults(answers: Answers) {
  const contributions: Array<{ category: string; hours: number }> = Object.entries(leakMath).map(
    ([id, values]) => {
    const question = questions.find((item) => item.id === id);
    const answerIndex = question?.choices.indexOf(answers[id]) ?? -1;
    const hours = answerIndex >= 0 ? values.hours[answerIndex] * values.recovery : 0;
      return { category: values.category, hours };
    },
  );

  const q9Answer = answers.q9 ?? "";
  const knowledgeFlag =
    q9Answer.startsWith("A lot of it") || q9Answer.startsWith("The business IS my head");
  if (knowledgeFlag) {
    contributions.push({ category: "Work trapped in your head", hours: 1 });
  }

  const measuredHours = contributions.reduce((total, item) => total + item.hours, 0);
  const cappedHours = Math.max(3, Math.min(15, measuredHours));
  const roundedHours = Math.round(cappedHours);
  const hourlyValueAnswer = answers.q3 as (typeof hourlyValueChoices)[number];
  const hourlyValue = hourlyValueByChoice[hourlyValueAnswer] ?? 50;
  const biggestMeasuredLeak = contributions.reduce(
    (biggest, item) => (item.hours > biggest.hours ? item : biggest),
    contributions[0],
  ).category;

  return {
    hoursLow: roundedHours - 1,
    hoursHigh: roundedHours + 1,
    dollarsMonthly: Math.round((cappedHours * hourlyValue * 4.33) / 100) * 100,
    knowledgeFlag,
    floorHit: measuredHours < 3,
    qualifiedRevenue: isQualifiedRevenue(answers.annualRevenue ?? ""),
    biggestMeasuredLeak,
  };
}
