export type Client = {
  id: string;
  name: string;
  doc: string;
  segment?: "PF" | "PJ" | "FO";
};
export type Summary = {
  plBruto: number;
  mes: number;
  ytd: number;
  m12: number;
  cdiMes: number;
  cdi12m: number;
};
export type Performance = {
  monthly: Array<{
    month: string;
    carteira: number;
    cdi: number;
    ipca: number;
  }>;
  windows: {
    "1m": number;
    "12m": number;
    "24m": number;
    "36m": number;
    cdi1m: number;
    cdi12m: number;
  };
};
export type Exposure = {
  profile: "Conservador" | "Moderado" | "Arrojado";
  model: "Conservador" | "Moderado" | "Moderado +" | "Arrojado";
  deltaVsModel: Array<{ class: string; deltaPct: number }>;
};
export type Allocation = {
  byClass: Array<{ class: string; pct: number }>;
  monthlyReturn: Array<{ month: string; pct: number }>;
};
export type Institutions = Array<{ name: string; pct: number }>;
export type Position = {
  asset: string;
  inst: string;
  pctPL: number;
  saldo: number;
  tag?: string;
};
export type Liquidity = {
  buckets: Array<{ label: string; valor: number }>;
  maturities: Array<{ title: string; date: string }>;
};
export type Movements = {
  month: Array<{ kind: "Aplicação" | "Resgate" | "Proventos"; valor: number }>;
  last12m: Array<{ month: string; inFlow: number; outFlow: number }>;
};

export type Report = {
  summary: Summary;
  performance: Performance;
  exposure: Exposure;
  allocation: Allocation;
  institutions: Institutions;
  positions: Position[];
  liquidity: Liquidity;
  movements: Movements;
};

export const CLIENTS: Client[] = [
  { id: "c1", name: "Maria Santos", doc: "123.***.***-**", segment: "PF" },
  { id: "c2", name: "João Oliveira", doc: "987.***.***-**", segment: "PF" },
  {
    id: "c3",
    name: "Family Office Alfa",
    doc: "12.345.678/0001-**",
    segment: "FO",
  },
  { id: "c4", name: "Carlos Lima", doc: "456.***.***-**", segment: "PF" },
  { id: "c5", name: "Beatriz Souza", doc: "654.***.***-**", segment: "PF" },
];

// Helper para gerar variações rápidas
const M = (base: number, f: number) => Math.round(base * f);

const baseReport = (mult = 1): Report => ({
  summary: {
    plBruto: M(1_450_000, mult),
    mes: 1.32,
    ytd: 7.1,
    m12: 12.4,
    cdiMes: 0.89,
    cdi12m: 11.7,
  },
  performance: {
    monthly: [
      { month: "Jan", carteira: 0.5 * mult, cdi: 0.9, ipca: 0.4 },
      { month: "Fev", carteira: 0.2 * mult, cdi: 0.8, ipca: 0.3 },
      { month: "Mar", carteira: 0.8 * mult, cdi: 1.0, ipca: 0.7 },
      { month: "Abr", carteira: 0.3 * mult, cdi: 0.9, ipca: 0.5 },
      { month: "Mai", carteira: 0.6 * mult, cdi: 0.9, ipca: 0.4 },
      { month: "Jun", carteira: 0.4 * mult, cdi: 0.9, ipca: 0.3 },
      { month: "Jul", carteira: 0.7 * mult, cdi: 0.9, ipca: 0.2 },
      { month: "Ago", carteira: 0.1 * mult, cdi: 0.9, ipca: 0.2 },
      { month: "Set", carteira: 0.5 * mult, cdi: 0.9, ipca: 0.3 },
      { month: "Out", carteira: 0.9 * mult, cdi: 0.9, ipca: 0.4 },
      { month: "Nov", carteira: 0.6 * mult, cdi: 0.9, ipca: 0.3 },
      { month: "Dez", carteira: 0.4 * mult, cdi: 0.9, ipca: 0.2 },
    ],
    windows: {
      "1m": 1.32,
      "12m": 12.4 * mult,
      "24m": 22.1 * mult,
      "36m": 35.7 * mult,
      cdi1m: 0.89,
      cdi12m: 11.7,
    },
  },
  exposure: {
    profile: "Moderado",
    model: "Moderado +",
    deltaVsModel: [
      { class: "Renda Fixa", deltaPct: +2.0 * mult },
      { class: "Ações", deltaPct: -1.2 * mult },
      { class: "Inflação", deltaPct: +0.6 * mult },
      { class: "FII", deltaPct: -0.4 * mult },
      { class: "Cambial", deltaPct: 0.0 },
    ],
  },
  allocation: {
    byClass: [
      { class: "Renda Fixa", pct: 44 },
      { class: "Inflação", pct: 21 },
      { class: "Ações", pct: 19 },
      { class: "FII", pct: 10 },
      { class: "Cambial", pct: 6 },
    ],
    monthlyReturn: [
      { month: "Jan", pct: 0.5 },
      { month: "Fev", pct: 0.2 },
      { month: "Mar", pct: 0.8 },
      { month: "Abr", pct: 0.3 },
      { month: "Mai", pct: 0.6 },
      { month: "Jun", pct: 0.4 },
      { month: "Jul", pct: 0.7 },
      { month: "Ago", pct: 0.1 },
      { month: "Set", pct: 0.5 },
      { month: "Out", pct: 0.9 },
      { month: "Nov", pct: 0.6 },
      { month: "Dez", pct: 0.4 },
    ],
  },
  institutions: [
    { name: "B3", pct: 35 },
    { name: "BTG", pct: 28 },
    { name: "Genial", pct: 19 },
    { name: "Itaú", pct: 18 },
  ],
  positions: [
    {
      asset: "Tesouro IPCA+ 2035",
      inst: "B3",
      pctPL: 24.2,
      saldo: M(352_400, mult),
      tag: "Inflação",
    },
    {
      asset: "FII ABCD11",
      inst: "Genial",
      pctPL: 12.7,
      saldo: M(185_320, mult),
      tag: "FII",
    },
    {
      asset: "CDB 120% CDI 2027",
      inst: "BTG",
      pctPL: 20.0,
      saldo: M(290_000, mult),
      tag: "Renda Fixa",
    },
    {
      asset: "XPTO3",
      inst: "Clear",
      pctPL: 8.9,
      saldo: M(128_000, mult),
      tag: "Ações",
    },
    {
      asset: "LCA 95% CDI 2026",
      inst: "Itaú",
      pctPL: 7.1,
      saldo: M(102_500, mult),
      tag: "Renda Fixa",
    },
  ],
  liquidity: {
    buckets: [
      { label: "D+0", valor: M(120_000, mult) },
      { label: "D+5", valor: M(80_000, mult) },
      { label: "D+10", valor: M(60_000, mult) },
      { label: ">D+60", valor: M(480_000, mult) },
    ],
    maturities: [
      { title: "LCI Itaú 2025", date: "2025-12-05" },
      { title: "Tesouro IPCA+ 2026 (cupom)", date: "2026-01-15" },
      { title: "CDB BTG 2027", date: "2027-03-03" },
    ],
  },
  movements: {
    month: [
      { kind: "Aplicação", valor: M(30_000, mult) },
      { kind: "Resgate", valor: M(12_500, mult) },
      { kind: "Proventos", valor: M(1_280, mult) },
    ],
    last12m: [
      { month: "Jan", inFlow: 20_000 * mult, outFlow: 8_000 * mult },
      { month: "Fev", inFlow: 15_000 * mult, outFlow: 6_000 * mult },
      { month: "Mar", inFlow: 10_000 * mult, outFlow: 5_000 * mult },
      { month: "Abr", inFlow: 12_000 * mult, outFlow: 9_000 * mult },
      { month: "Mai", inFlow: 18_000 * mult, outFlow: 7_000 * mult },
      { month: "Jun", inFlow: 11_000 * mult, outFlow: 4_000 * mult },
      { month: "Jul", inFlow: 14_000 * mult, outFlow: 5_000 * mult },
      { month: "Ago", inFlow: 9_000 * mult, outFlow: 6_000 * mult },
      { month: "Set", inFlow: 13_000 * mult, outFlow: 5_500 * mult },
      { month: "Out", inFlow: 22_000 * mult, outFlow: 8_500 * mult },
      { month: "Nov", inFlow: 16_000 * mult, outFlow: 7_000 * mult },
      { month: "Dez", inFlow: 10_000 * mult, outFlow: 6_000 * mult },
    ],
  },
});

export const REPORTS: Record<string, Report> = {
  c1: baseReport(1.0),
  c2: baseReport(0.85),
  c3: baseReport(1.4),
  c4: baseReport(0.65),
  c5: baseReport(0.95),
};

export function searchClients(q?: string) {
  const s = (q ?? "").trim().toLowerCase();
  if (!s) return CLIENTS;
  return CLIENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(s) ||
      c.doc.toLowerCase().includes(s) ||
      c.id.toLowerCase().includes(s)
  );
}

export const getReport = (clientId: string) => REPORTS[clientId];
