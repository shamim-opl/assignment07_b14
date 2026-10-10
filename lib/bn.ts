import type { Product } from "./types";

const intFmt = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 0 });
const pctFmt = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/** Bengali digits with grouping, e.g. 1850 -> ১,৮৫০ */
export const bn = (n: number) => intFmt.format(n);
export const bnPct = (n: number) => pctFmt.format(Math.abs(n));
export const taka = (n: number) => `${bn(n)} টাকা`;

const UNIT_LABEL: Record<Product["unit"], string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const unitName = (u: Product["unit"]) => UNIT_LABEL[u];
export const perUnit = (u: Product["unit"]) => `প্রতি ${UNIT_LABEL[u]}`;

export function bnDate(d = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(d)
    .replace(/(\S)\s(\S+)\s(\S+)$/, "$1 $2, $3");
}
