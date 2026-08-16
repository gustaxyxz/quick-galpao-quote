export const PRECOS = {
  tesoura_base_por_metro: 180,
  tesoura_mult: { duas_aguas: 1.0, uma_agua: 0.65, arco_abaulado: 1.35, scissor: 1.5 },
  espacamento_tesoura: 3,
  coluna_pm: { perfil_u: 90, tubo_ret: 120, perfil_w: 160 },
  terca_6m: { simples: 85, enrigecida: 140 },
  terca_espacamento: 1.5,
  tirante_6m: 35,
  chumbador_col: 80,
  telha_m2: { ondulada_043: 32, trapezoidal_050: 45, sanduiche: 95 },
  fechamento_m2: { sem: 0, meia_parede: 30, completo: 55 },
  portao: { sem: 0, basculante: 2800, deslizante: 3500 },
} as const;

export type TesouraKey = keyof typeof PRECOS.tesoura_mult;
export type ColunaKey = keyof typeof PRECOS.coluna_pm;
export type TercaKey = keyof typeof PRECOS.terca_6m;
export type TelhaKey = keyof typeof PRECOS.telha_m2;
export type FechamentoKey = keyof typeof PRECOS.fechamento_m2;
export type PortaoKey = keyof typeof PRECOS.portao;

export type Selecao = {
  comprimento: number | null;
  largura: number | null;
  pe_direito: number | null;
  tesoura: TesouraKey | null;
  coluna: ColunaKey | null;
  telha: TelhaKey | null;
  terca: TercaKey | null;
  fechamento: FechamentoKey | null;
  portao: PortaoKey | null;
};

export const selecaoInicial: Selecao = {
  comprimento: null,
  largura: null,
  pe_direito: null,
  tesoura: null,
  coluna: null,
  telha: null,
  terca: null,
  fechamento: null,
  portao: null,
};

export const LABELS = {
  tesoura: {
    duas_aguas: "Duas Águas",
    uma_agua: "Uma Água",
    arco_abaulado: "Arco Abaulado",
    scissor: "Scissor (tesoura tipo tosoura)",
  },
  coluna: { perfil_u: "Perfil U", tubo_ret: "Tubo Retangular", perfil_w: "Perfil W" },
  terca: { simples: "Terça Simples", enrigecida: "Terça Enrijecida" },
  telha: {
    ondulada_043: "Ondulada 0,43mm",
    trapezoidal_050: "Trapezoidal 0,50mm",
    sanduiche: "Sanduíche Isotérmico",
  },
  fechamento: { sem: "Sem fechamento", meia_parede: "Meia parede", completo: "Fechamento completo" },
  portao: { sem: "Sem portão", basculante: "Portão basculante", deslizante: "Portão deslizante" },
} as const;

export type ItemCalculo = { chave: string; descricao: string; detalhe: string; valor: number };

export type ResultadoCalculo = {
  itens: ItemCalculo[];
  total: number;
  area: number;
  nTesouras: number;
  nColunas: number;
};

export function calcular(sel: Selecao): ResultadoCalculo {
  const C = sel.comprimento || 0;
  const L = sel.largura || 0;
  const PD = sel.pe_direito || 0;
  const itens: ItemCalculo[] = [];

  if (!C || !L || !PD) return { itens, total: 0, area: 0, nTesouras: 0, nColunas: 0 };

  const nTes = Math.ceil(C / PRECOS.espacamento_tesoura) + 1;
  const nCol = nTes * 2;
  const nAguas = sel.tesoura === "uma_agua" ? 1 : 2;

  if (sel.tesoura) {
    itens.push({
      chave: "estrutura",
      descricao: "Tesouras estruturais",
      detalhe: `${nTes} un · vão de ${L}m · ${LABELS.tesoura[sel.tesoura]}`,
      valor: nTes * L * PRECOS.tesoura_base_por_metro * PRECOS.tesoura_mult[sel.tesoura],
    });
  }
  if (sel.coluna) {
    itens.push({
      chave: "colunas",
      descricao: "Colunas",
      detalhe: `${nCol} un · ${PD}m de pé direito · ${LABELS.coluna[sel.coluna]}`,
      valor: nCol * PD * PRECOS.coluna_pm[sel.coluna],
    });
  }
  if (sel.terca) {
    const filas = Math.ceil((L / 2) * 1.08 / PRECOS.terca_espacamento) + 1;
    const pecas = Math.ceil(C / 6) + 1;
    itens.push({
      chave: "terca",
      descricao: "Terças",
      detalhe: `${filas * pecas * nAguas} peças de 6m · ${LABELS.terca[sel.terca]}`,
      valor: filas * pecas * nAguas * PRECOS.terca_6m[sel.terca],
    });
  }
  itens.push({
    chave: "tirante",
    descricao: "Tirantes e contraventamento",
    detalhe: `${nTes * 2} barras de 6m`,
    valor: nTes * 2 * PRECOS.tirante_6m,
  });
  itens.push({
    chave: "chumbador",
    descricao: "Chumbadores e fixações",
    detalhe: `${nCol} conjuntos`,
    valor: nCol * PRECOS.chumbador_col,
  });
  if (sel.telha) {
    const m2 = (L / 2) * 1.08 * C * nAguas;
    itens.push({
      chave: "telha",
      descricao: "Telhas de cobertura",
      detalhe: `${m2.toFixed(1)} m² · ${LABELS.telha[sel.telha]}`,
      valor: m2 * PRECOS.telha_m2[sel.telha],
    });
  }
  if (sel.fechamento && sel.fechamento !== "sem") {
    const fator = sel.fechamento === "meia_parede" ? 0.5 : 1;
    const m2 = (2 * C + 2 * L) * PD * fator;
    itens.push({
      chave: "fechamento",
      descricao: "Fechamento lateral",
      detalhe: `${m2.toFixed(1)} m² · ${LABELS.fechamento[sel.fechamento]}`,
      valor: m2 * PRECOS.fechamento_m2[sel.fechamento],
    });
  }
  if (sel.portao && sel.portao !== "sem") {
    itens.push({
      chave: "portao",
      descricao: "Portão",
      detalhe: LABELS.portao[sel.portao],
      valor: PRECOS.portao[sel.portao],
    });
  }

  const total = itens.reduce((acc, i) => acc + i.valor, 0);
  return { itens, total, area: C * L, nTesouras: nTes, nColunas: nCol };
}

export function moeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function descricaoGalpao(sel: Selecao): string {
  return `Galpão ${sel.comprimento ?? "?"}m x ${sel.largura ?? "?"}m · pé direito ${sel.pe_direito ?? "?"}m`;
}
