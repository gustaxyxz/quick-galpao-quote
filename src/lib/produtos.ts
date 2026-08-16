export type Produto = {
  slug: string;
  nome: string;
  categoria: "Galpão" | "Cobertura" | "Estrutura" | "Serviço";
  resumo: string;
  precoBase: number;
  unidade: string;
  destaques: string[];
};

export const PRODUTOS: Produto[] = [
  {
    slug: "galpao-duas-aguas",
    nome: "Galpão duas águas",
    categoria: "Galpão",
    resumo:
      "Modelo mais usado para armazenagem e indústria. Tesoura treliçada, colunas em perfil e cobertura em telha metálica.",
    precoBase: 320,
    unidade: "m²",
    destaques: ["Vãos de 8 a 25 m", "Pé direito de 4 a 8 m", "Projeto e ART inclusos"],
  },
  {
    slug: "galpao-uma-agua",
    nome: "Galpão uma água",
    categoria: "Galpão",
    resumo:
      "Solução econômica para encostar em construção existente, pátios de carga e depósitos laterais.",
    precoBase: 240,
    unidade: "m²",
    destaques: ["Menor consumo de aço", "Ideal para encostar em parede", "Montagem rápida"],
  },
  {
    slug: "galpao-arco",
    nome: "Galpão em arco abaulado",
    categoria: "Galpão",
    resumo:
      "Arco curvo para grandes vãos livres, muito usado em armazenagem de grãos e máquinas agrícolas.",
    precoBase: 410,
    unidade: "m²",
    destaques: ["Vão livre até 30 m", "Ótimo escoamento de água", "Alta resistência a vento"],
  },
  {
    slug: "cobertura-estacionamento",
    nome: "Cobertura para estacionamento",
    categoria: "Cobertura",
    resumo: "Estrutura leve com telha trapezoidal para áreas de estacionamento e pátios.",
    precoBase: 190,
    unidade: "m²",
    destaques: ["Colunas centrais ou laterais", "Telha 0,50 mm", "Pintura eletrostática opcional"],
  },
  {
    slug: "mezanino-metalico",
    nome: "Mezanino metálico",
    categoria: "Estrutura",
    resumo: "Ganho de área útil com vigas em perfil I, laje steel deck ou chapa xadrez.",
    precoBase: 480,
    unidade: "m²",
    destaques: ["Cálculo de carga por m²", "Escada e guarda-corpo", "Instalação sem parar a operação"],
  },
  {
    slug: "fechamento-lateral",
    nome: "Fechamento lateral",
    categoria: "Cobertura",
    resumo: "Fechamento em telha metálica, meia parede ou completo, com opção de janelas em policarbonato.",
    precoBase: 55,
    unidade: "m²",
    destaques: ["Meia parede ou completo", "Telhas onduladas ou trapezoidais", "Rufos e acabamentos"],
  },
  {
    slug: "portao-industrial",
    nome: "Portão industrial",
    categoria: "Estrutura",
    resumo: "Portões basculantes ou deslizantes dimensionados para caminhões e empilhadeiras.",
    precoBase: 2800,
    unidade: "un",
    destaques: ["Basculante ou deslizante", "Automatização opcional", "Trilho reforçado"],
  },
  {
    slug: "manutencao-reforma",
    nome: "Manutenção e reforma",
    categoria: "Serviço",
    resumo: "Troca de telhas, reforço estrutural, pintura anticorrosiva e correção de infiltrações.",
    precoBase: 0,
    unidade: "orçamento",
    destaques: ["Vistoria técnica", "Laudo com fotos", "Atendimento emergencial"],
  },
];

export const CATEGORIAS = ["Todos", "Galpão", "Cobertura", "Estrutura", "Serviço"] as const;
