export const PRECOS = {
  tesoura_base_por_metro: 180,
  tesoura_mult: {
    duas_aguas_alma_cheia: 1.15,
    duas_aguas_trelicada: 1.0,
    trelica_fink: 1.05,
    trelica_howe: 1.1,
    trelica_pratt: 1.12,
    trelica_warren: 1.08,
    uma_agua: 0.65,
    uma_agua_trelicada: 0.72,
    arco_abaulado: 1.35,
    arco_pleno: 1.45,
    arco_trelicado: 1.4,
    scissor: 1.5,
    mansarda: 1.55,
    shed_dente_serra: 1.6,
    portico_rigido: 1.3,
    trelica_espacial: 1.85,
  },
  espacamento_tesoura: 3,
  coluna_pm: {
    perfil_u: 90,
    perfil_ue: 105,
    tubo_ret: 120,
    tubo_red: 110,
    perfil_i: 175,
    perfil_w: 160,
    trelicada: 145,
  },
  pe_mult: {
    pe_trelicado: 1.15,
    pe_trelicado_duplo: 1.3,
    pe_macico: 1.35,
    viga_h: 1.45,
    viga_i: 1.4,
    tubular_reforcado: 1.2,
    engastado_simples: 1,
  },
  terca_6m: {
    c_simples: 85,
    ze_enrigecida: 140,
    u_dobrada: 95,
    caixao: 190,
    tubular: 160,
    trelicada: 230,
    i_laminada: 280,
  },
  terca_espacamento: 1.5,
  tirante_6m: {
    sem: 0,
    barra_redonda: 35,
    barra_rosqueada: 48,
    cantoneira: 55,
    tubo_galv: 72,
    cabo_aco: 60,
  },
  chumbador_col: 80,
  telha_m2: {
    ondulada_043: 32,
    ondulada_050: 38,
    trapezoidal_040: 36,
    trapezoidal_050: 45,
    trapezoidal_065: 58,
    zipada: 78,
    sanduiche_30: 95,
    sanduiche_50: 125,
    autoportante: 88,
    galvalume: 62,
    policarbonato: 145,
    fibrocimento: 28,
  },
  fechamento_m2: {
    sem: 0,
    oitao: 22,
    meia_parede: 30,
    tres_quartos: 42,
    completo: 55,
    completo_isotermico: 110,
    alvenaria_meia: 68,
  },
  fechamento_fator: {
    sem: 0,
    oitao: 0.25,
    meia_parede: 0.5,
    tres_quartos: 0.75,
    completo: 1,
    completo_isotermico: 1,
    alvenaria_meia: 0.5,
  },
  portao: {
    sem: 0,
    basculante: 2800,
    deslizante: 3500,
    duas_folhas: 2400,
    enrolar: 4200,
    seccionado: 6800,
  },
  pintura_m2: {
    galvanizado: 0,
    primer: 14,
    esmalte: 26,
    epoxi: 44,
    galvanizacao_fogo: 78,
    po_eletrostatica: 58,
  },
} as const;

export type TesouraKey = keyof typeof PRECOS.tesoura_mult;
export type ColunaKey = keyof typeof PRECOS.coluna_pm;
export type PeKey = keyof typeof PRECOS.pe_mult;
export type TercaKey = keyof typeof PRECOS.terca_6m;
export type TiranteKey = keyof typeof PRECOS.tirante_6m;
export type TelhaKey = keyof typeof PRECOS.telha_m2;
export type FechamentoKey = keyof typeof PRECOS.fechamento_m2;
export type PortaoKey = keyof typeof PRECOS.portao;
export type PinturaKey = keyof typeof PRECOS.pintura_m2;

export type Selecao = {
  comprimento: number | null;
  largura: number | null;
  pe_direito: number | null;
  tesoura: TesouraKey | null;
  coluna: ColunaKey | null;
  pe: PeKey | null;
  telha: TelhaKey | null;
  terca: TercaKey | null;
  tirante: TiranteKey | null;
  fechamento: FechamentoKey | null;
  portao: PortaoKey | null;
  pintura: PinturaKey | null;
};

export const selecaoInicial: Selecao = {
  comprimento: null,
  largura: null,
  pe_direito: null,
  tesoura: null,
  coluna: null,
  pe: null,
  telha: null,
  terca: null,
  tirante: null,
  fechamento: null,
  portao: null,
  pintura: null,
};

export const LABELS = {
  tesoura: {
    duas_aguas_trelicada: "Duas águas treliçada",
    duas_aguas_alma_cheia: "Duas águas alma cheia",
    trelica_fink: "Treliça Fink",
    trelica_howe: "Treliça Howe",
    trelica_pratt: "Treliça Pratt",
    trelica_warren: "Treliça Warren",
    uma_agua: "Uma água (alma cheia)",
    uma_agua_trelicada: "Uma água treliçada",
    arco_abaulado: "Arco abaulado",
    arco_pleno: "Arco pleno",
    arco_trelicado: "Arco treliçado",
    scissor: "Scissor (tesoura cruzada)",
    mansarda: "Mansarda",
    shed_dente_serra: "Shed / dente de serra",
    portico_rigido: "Pórtico rígido",
    trelica_espacial: "Treliça espacial",
  },
  coluna: {
    perfil_u: "Perfil U simples",
    perfil_ue: "Perfil U enrijecido",
    tubo_ret: "Tubo retangular",
    tubo_red: "Tubo redondo",
    perfil_i: "Perfil I laminado",
    perfil_w: "Perfil W soldado",
    trelicada: "Coluna treliçada",
  },
  pe: {
    engastado_simples: "Pé simples engastado",
    pe_trelicado: "Pé treliçado",
    pe_trelicado_duplo: "Pé treliçado duplo",
    pe_macico: "Pé maciço (alma cheia)",
    viga_h: "Pé em viga H",
    viga_i: "Pé em viga I",
    tubular_reforcado: "Pé tubular reforçado",
  },
  terca: {
    c_simples: "Terça C simples",
    ze_enrigecida: "Terça Z enrijecida",
    u_dobrada: "Terça U dobrada",
    caixao: "Terça caixão",
    tubular: "Terça tubular",
    trelicada: "Terça treliçada",
    i_laminada: "Terça I laminada",
  },
  tirante: {
    sem: "Sem tirante",
    barra_redonda: "Barra redonda lisa",
    barra_rosqueada: "Barra rosqueada c/ esticador",
    cantoneira: "Cantoneira",
    tubo_galv: "Tubo galvanizado",
    cabo_aco: "Cabo de aço",
  },
  telha: {
    ondulada_043: "Ondulada 0,43 mm",
    ondulada_050: "Ondulada 0,50 mm",
    trapezoidal_040: "Trapezoidal 0,40 mm",
    trapezoidal_050: "Trapezoidal 0,50 mm",
    trapezoidal_065: "Trapezoidal 0,65 mm",
    zipada: "Telha zipada",
    sanduiche_30: "Sanduíche 30 mm",
    sanduiche_50: "Sanduíche 50 mm",
    autoportante: "Autoportante em arco",
    galvalume: "Galvalume natural",
    policarbonato: "Policarbonato alveolar",
    fibrocimento: "Fibrocimento",
  },
  fechamento: {
    sem: "Sem fechamento",
    oitao: "Só oitões",
    meia_parede: "Meia parede",
    tres_quartos: "Três quartos",
    completo: "Fechamento completo",
    completo_isotermico: "Completo isotérmico",
    alvenaria_meia: "Meia parede em alvenaria",
  },
  portao: {
    sem: "Sem portão",
    basculante: "Basculante",
    deslizante: "Deslizante",
    duas_folhas: "Duas folhas de abrir",
    enrolar: "De enrolar",
    seccionado: "Seccionado",
  },
  pintura: {
    galvanizado: "Só galvanizado (sem pintura)",
    primer: "Fundo primer",
    esmalte: "Esmalte sintético",
    epoxi: "Epóxi industrial",
    galvanizacao_fogo: "Galvanização a fogo",
    po_eletrostatica: "Pintura a pó eletrostática",
  },
} as const;

export const DESCRICOES: Record<string, Record<string, string>> = {
  tesoura: {
    duas_aguas_trelicada: "Treliça leve e esbelta, barras finas. Melhor custo-benefício em vãos de 8 a 20 m.",
    duas_aguas_alma_cheia: "Viga cheia em perfil I, visual limpo e altura baixa. Boa para vãos até 15 m.",
    trelica_fink: "Diagonais em V. Clássica de telhado residencial e galpões pequenos.",
    trelica_howe: "Montantes verticais com diagonais para o centro. Muito usada em vãos médios.",
    trelica_pratt: "Diagonais tracionadas, ótima para carga de vento. Vãos de 15 a 25 m.",
    trelica_warren: "Diagonais em zigue-zague sem montantes. Leve e econômica.",
    uma_agua: "Um plano único de queda. Ideal para encostar em parede existente.",
    uma_agua_trelicada: "Uma água em treliça, cobre vãos maiores com menos aço.",
    arco_abaulado: "Curva suave, ótimo escoamento de água e grande vão livre.",
    arco_pleno: "Arco alto (meia-lua). Muito usado em armazenagem de grãos.",
    arco_trelicado: "Arco em treliça para vãos livres acima de 25 m.",
    scissor: "Banzos cruzados, dá pé direito interno maior sem subir a coluna.",
    mansarda: "Duas inclinações por água. Aproveita o espaço do sótão/mezanino.",
    shed_dente_serra: "Perfil serrado com janelas voltadas ao norte, entra luz natural.",
    portico_rigido: "Quadro soldado coluna+viga, sem tesoura aparente. Padrão industrial.",
    trelica_espacial: "Malha tridimensional para vãos muito grandes e coberturas nobres.",
  },
  coluna: {
    perfil_u: "Chapa dobrada em U. Econômica para galpões leves.",
    perfil_ue: "U com abas dobradas, mais rígido à flambagem.",
    tubo_ret: "Tubo fechado, boa resistência à torção e acabamento limpo.",
    tubo_red: "Tubo circular, comum em coberturas e mercados.",
    perfil_i: "Perfil laminado, alta capacidade de carga e ponte rolante.",
    perfil_w: "Perfil soldado sob medida para grandes cargas.",
    trelicada: "Coluna em treliça, leve para pés direitos altos.",
  },
  pe: {
    engastado_simples: "Coluna direta chumbada na base, sem reforço extra. Galpões baixos.",
    pe_trelicado: "Pé em treliça: dois banzos ligados por diagonais. Leve e rígido em pé direito alto.",
    pe_trelicado_duplo: "Treliça com dois planos, resiste vento forte e ponte rolante leve.",
    pe_macico: "Perfil de alma cheia soldado, visual limpo e alta rigidez.",
    viga_h: "Viga H laminada, padrão industrial para grandes cargas verticais.",
    viga_i: "Viga I laminada, boa relação peso x resistência.",
    tubular_reforcado: "Tubo com chapa de reforço na base, ótimo contra torção.",
  },
  terca: {
    c_simples: "Perfil C dobrado, apoio padrão da telha.",
    ze_enrigecida: "Perfil Z com abas, permite vãos maiores entre tesouras.",
    u_dobrada: "U simples, uso em coberturas leves e beirais.",
    caixao: "Dois perfis unidos, para grandes espaçamentos.",
    tubular: "Tubo retangular, boa resistência e acabamento.",
    trelicada: "Treliça de terça para vãos livres longos.",
    i_laminada: "Perfil I, usada com telha zipada e cargas altas.",
  },
  tirante: {
    sem: "Sem contraventamento adicional (só o previsto na estrutura).",
    barra_redonda: "Barra lisa soldada, travamento simples e barato.",
    barra_rosqueada: "Barra com esticador, permite regular a tensão.",
    cantoneira: "Cantoneira parafusada, resiste tração e compressão.",
    tubo_galv: "Tubo galvanizado, mais rígido e durável.",
    cabo_aco: "Cabo com esticador, rápido de montar em vãos longos.",
  },
  telha: {
    ondulada_043: "Aço ondulado fino. Cobertura econômica de depósitos.",
    ondulada_050: "Ondulada mais espessa, maior durabilidade.",
    trapezoidal_040: "Trapézio leve para vãos curtos entre terças.",
    trapezoidal_050: "Padrão industrial, boa relação vão x resistência.",
    trapezoidal_065: "Chapa grossa para vento forte e vãos maiores.",
    zipada: "Sem parafuso furando a chapa, ótima vedação e grandes panos.",
    sanduiche_30: "Duas chapas com isolante 30 mm, reduz calor e ruído.",
    sanduiche_50: "Isolante 50 mm, para câmaras, indústria de alimentos.",
    autoportante: "Telha curva que dispensa terças, arco calandrado.",
    galvalume: "Liga alumínio-zinco, alta resistência à corrosão.",
    policarbonato: "Translúcida, entra luz natural em faixas da cobertura.",
    fibrocimento: "Mais barata e silenciosa, porém mais pesada.",
  },
  fechamento: {
    sem: "Galpão aberto nas laterais, só cobertura.",
    oitao: "Fecha apenas as duas empenas (frente e fundo).",
    meia_parede: "Fecha metade da altura, mantém ventilação em cima.",
    tres_quartos: "Fecha 3/4 da altura, protege mais da chuva de vento.",
    completo: "Fechamento total em telha metálica.",
    completo_isotermico: "Fechamento total em painel sanduíche isolante.",
    alvenaria_meia: "Meia parede de bloco com telha acima.",
  },
  portao: {
    sem: "Sem portão, vão livre.",
    basculante: "Folha única que sobe inteira. Simples e barato.",
    deslizante: "Corre lateralmente em trilho, bom para vãos largos.",
    duas_folhas: "Abre para os lados, sem motor.",
    enrolar: "Enrola em eixo no topo, ocupa pouco espaço.",
    seccionado: "Painéis articulados que sobem ao teto, melhor vedação.",
  },
  pintura: {
    galvanizado: "Aço galvanizado sem pintura, uso interno protegido.",
    primer: "Fundo anticorrosivo, base para pintura futura.",
    esmalte: "Primer + esmalte na cor escolhida, padrão do mercado.",
    epoxi: "Alta resistência química, indústria e litoral.",
    galvanizacao_fogo: "Zinco por imersão, máxima durabilidade externa.",
    po_eletrostatica: "Pintura em pó curada em estufa, acabamento premium.",
  },
};

export type ItemCalculo = { chave: string; descricao: string; detalhe: string; valor: number };

export type ResultadoCalculo = {
  itens: ItemCalculo[];
  total: number;
  area: number;
  nTesouras: number;
  nColunas: number;
};

const UMA_AGUA: TesouraKey[] = ["uma_agua", "uma_agua_trelicada", "shed_dente_serra"];
const ARCOS: TesouraKey[] = ["arco_abaulado", "arco_pleno", "arco_trelicado"];

export function calcular(sel: Selecao): ResultadoCalculo {
  const C = sel.comprimento || 0;
  const L = sel.largura || 0;
  const PD = sel.pe_direito || 0;
  const itens: ItemCalculo[] = [];

  if (!C || !L || !PD) return { itens, total: 0, area: 0, nTesouras: 0, nColunas: 0 };

  const nTes = Math.ceil(C / PRECOS.espacamento_tesoura) + 1;
  const nCol = nTes * 2;
  const umaAgua = sel.tesoura ? UMA_AGUA.includes(sel.tesoura) : false;
  const arco = sel.tesoura ? ARCOS.includes(sel.tesoura) : false;
  const nAguas = umaAgua ? 1 : 2;
  const fatorInclinacao = arco ? 1.25 : 1.08;
  const larguraAgua = umaAgua ? L : L / 2;
  const areaCobertura = larguraAgua * fatorInclinacao * C * nAguas;

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
    const filas = Math.ceil((larguraAgua * fatorInclinacao) / PRECOS.terca_espacamento) + 1;
    const pecas = Math.ceil(C / 6) + 1;
    itens.push({
      chave: "terca",
      descricao: "Terças",
      detalhe: `${filas * pecas * nAguas} peças de 6m · ${LABELS.terca[sel.terca]}`,
      valor: filas * pecas * nAguas * PRECOS.terca_6m[sel.terca],
    });
  }
  if (sel.tirante && sel.tirante !== "sem") {
    itens.push({
      chave: "tirante",
      descricao: "Tirantes e contraventamento",
      detalhe: `${nTes * 2} barras de 6m · ${LABELS.tirante[sel.tirante]}`,
      valor: nTes * 2 * PRECOS.tirante_6m[sel.tirante],
    });
  }
  itens.push({
    chave: "chumbador",
    descricao: "Chumbadores e fixações",
    detalhe: `${nCol} conjuntos`,
    valor: nCol * PRECOS.chumbador_col,
  });
  if (sel.telha) {
    itens.push({
      chave: "telha",
      descricao: "Telhas de cobertura",
      detalhe: `${areaCobertura.toFixed(1)} m² · ${LABELS.telha[sel.telha]}`,
      valor: areaCobertura * PRECOS.telha_m2[sel.telha],
    });
  }
  if (sel.fechamento && sel.fechamento !== "sem") {
    const fator = PRECOS.fechamento_fator[sel.fechamento];
    const perimetro = sel.fechamento === "oitao" ? 2 * L : 2 * C + 2 * L;
    const m2 = perimetro * PD * (sel.fechamento === "oitao" ? 1 : fator);
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
  if (sel.pintura && sel.pintura !== "galvanizado") {
    const m2 = C * L * 0.9;
    itens.push({
      chave: "pintura",
      descricao: "Tratamento e pintura",
      detalhe: `${m2.toFixed(1)} m² de aço · ${LABELS.pintura[sel.pintura]}`,
      valor: m2 * PRECOS.pintura_m2[sel.pintura],
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
