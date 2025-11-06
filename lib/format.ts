export const nfBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
export const nfPct = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
export const nfNum = new Intl.NumberFormat("pt-BR");

export const fmtBRL = (v: number) => nfBRL.format(v);
export const fmtPct = (v: number) => nfPct.format(v / 100); // 1.32 -> 1,32%
export const fmtPctRaw = (v: number) => `${v.toFixed(2)}%`; // 1.32 -> 1.32%
