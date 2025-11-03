export const SECTIONS = [
  { id: "overview", label: "Visão Geral", pages: [
      { id: "cover", label: "Capa/Identificação" },
      { id: "kpis", label: "Cards Indicadores" },
      { id: "monthly", label: "Rentab. Mensal" },
  ]},
  { id: "performance", label: "Performance", pages: [
      { id: "bench", label: "Benchmarks" },
      { id: "contrib", label: "Contribuição" },
  ]},
  { id: "exposure", label: "Exposição & Suitability", pages: [
      { id: "model", label: "vs Modelo" },
      { id: "suit", label: "Suitability" },
  ]},
  { id: "allocation", label: "Alocação", pages: [
      { id: "classes", label: "Por Classe" },
      { id: "evol", label: "Evolução mensal" },
  ]},
  { id: "institutions", label: "Instituições", pages: [{ id:"dist", label:"Distribuição" }]},
  { id: "positions", label: "Posições", pages: [
      { id:"p1", label:"Tabela (1/3)" },
      { id:"p2", label:"Tabela (2/3)" },
      { id:"p3", label:"Tabela (3/3)" },
  ]},
  { id: "liquidity", label: "Liquidez", pages: [
      { id:"buckets", label:"Buckets" },
      { id:"mat", label:"Vencimentos" },
  ]},
  { id: "movements", label: "Movimentações", pages: [
      { id:"m12", label:"Fluxo 12M" },
      { id:"m1", label:"Mês" },
    ]},
] as const;
