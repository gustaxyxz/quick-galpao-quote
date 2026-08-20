import { jsPDF } from "jspdf";
import { EMPRESA } from "@/lib/empresa";
import {
  LABELS,
  descricaoGalpao,
  moeda,
  type ResultadoCalculo,
  type Selecao,
} from "@/lib/galpao";

const PRETO = [20, 20, 20] as const;
const AMARELO = [255, 193, 7] as const;
const CINZA = [110, 110, 110] as const;
const CINZA_CLARO = [242, 242, 242] as const;

type Png = { data: string; w: number; h: number };

async function svgToPng(svg: SVGSVGElement, scale = 4): Promise<Png | null> {
  try {
    const vb = (svg.getAttribute("viewBox") ?? "0 0 64 40").trim().split(/\s+/).map(Number);
    const w = vb[2] || 64;
    const h = vb[3] || 40;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", String(w));
    clone.setAttribute("height", String(h));
    clone.removeAttribute("class");
    clone.style.color = "#141414";
    const xml = new XMLSerializer().serializeToString(clone);
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("svg"));
      img.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return { data: canvas.toDataURL("image/png"), w, h };
  } catch {
    return null;
  }
}

const GRUPOS_RESUMO = [
  "tesoura",
  "coluna",
  "pe",
  "terca",
  "tirante",
  "telha",
  "fechamento",
  "portao",
  "pintura",
] as const;

export async function gerarPropostaPDF(sel: Selecao, resultado: ResultadoCalculo) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const PW = doc.internal.pageSize.getWidth();
  const PH = doc.internal.pageSize.getHeight();
  const M = 16;

  const cabecalho = () => {
    doc.setFillColor(...PRETO);
    doc.rect(0, 0, PW, 26, "F");
    doc.setFillColor(...AMARELO);
    doc.rect(0, 26, PW, 1.6, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text(EMPRESA.nome.toUpperCase(), M, 13);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(200, 200, 200);
    doc.text(`${EMPRESA.regiao} · ${EMPRESA.telefone}`, M, 19);
    doc.setTextColor(...AMARELO);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("PROPOSTA DE ORÇAMENTO", PW - M, 13, { align: "right" });
    doc.setTextColor(220, 220, 220);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(new Date().toLocaleDateString("pt-BR"), PW - M, 19, { align: "right" });
  };

  const rodape = () => {
    const total = doc.getNumberOfPages();
    for (let p = 1; p <= total; p++) {
      doc.setPage(p);
      doc.setDrawColor(...CINZA_CLARO);
      doc.line(M, PH - 16, PW - M, PH - 16);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...CINZA);
      doc.text(
        [EMPRESA.nome, EMPRESA.endereco, EMPRESA.email].filter(Boolean).join(" · "),
        M,
        PH - 11,
      );
      doc.text(`Página ${p} de ${total}`, PW - M, PH - 11, { align: "right" });
    }
  };

  cabecalho();
  let y = 40;

  // ---- Resumo do galpão ----
  doc.setTextColor(...PRETO);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Resumo do orçamento", M, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(descricaoGalpao(sel), M, y);
  y += 8;

  const cards: [string, string][] = [
    [`${resultado.area.toFixed(0)} m²`, "área construída"],
    [`${resultado.nTesouras}`, "pórticos / tesouras"],
    [`${resultado.nColunas}`, "colunas"],
    [moeda(resultado.total / (resultado.area || 1)), "por m²"],
  ];
  const cw = (PW - M * 2 - 9) / 4;
  cards.forEach(([valor, rotulo], i) => {
    const x = M + i * (cw + 3);
    doc.setFillColor(...CINZA_CLARO);
    doc.rect(x, y, cw, 16, "F");
    doc.setFillColor(...AMARELO);
    doc.rect(x, y, 1.4, 16, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...PRETO);
    doc.text(valor, x + 4, y + 7);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...CINZA);
    doc.text(rotulo.toUpperCase(), x + 4, y + 12);
  });
  y += 24;

  // ---- Vistas 2D ----
  const vistas: Png[] = [];
  for (const vista of ["frontal", "lateral"]) {
    const svg = document.querySelector<SVGSVGElement>(`svg[data-previa="${vista}"]`);
    if (svg) {
      const png = await svgToPng(svg, 4);
      if (png) vistas.push(png);
    }
  }
  if (vistas.length) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...PRETO);
    doc.text("Esquema da estrutura", M, y);
    y += 4;
    const largura = (PW - M * 2 - 6) / vistas.length;
    vistas.forEach((png, i) => {
      const altura = (png.h / png.w) * largura;
      const x = M + i * (largura + 6);
      doc.setDrawColor(225, 225, 225);
      doc.rect(x, y, largura, altura);
      doc.addImage(png.data, "PNG", x, y, largura, altura);
      if (i === vistas.length - 1) y += altura + 4;
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...CINZA);
    doc.text("Vista frontal e vista lateral com cotas em metros (desenho ilustrativo).", M, y + 2);
    y += 10;
  }

  // ---- Tabela de itens ----
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...PRETO);
  doc.text("Materiais e serviços", M, y);
  y += 5;

  doc.setFillColor(...PRETO);
  doc.rect(M, y, PW - M * 2, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text("ITEM", M + 3, y + 5.4);
  doc.text("ESPECIFICAÇÃO", M + 52, y + 5.4);
  doc.text("VALOR", PW - M - 3, y + 5.4, { align: "right" });
  y += 8;

  resultado.itens.forEach((item, i) => {
    if (y > PH - 60) {
      doc.addPage();
      cabecalho();
      y = 40;
    }
    if (i % 2 === 0) {
      doc.setFillColor(249, 249, 249);
      doc.rect(M, y, PW - M * 2, 9, "F");
    }
    doc.setTextColor(...PRETO);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(item.descricao, M + 3, y + 5.8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...CINZA);
    doc.setFontSize(8);
    doc.text(doc.splitTextToSize(item.detalhe, 95)[0] ?? "", M + 52, y + 5.8);
    doc.setTextColor(...PRETO);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(moeda(item.valor), PW - M - 3, y + 5.8, { align: "right" });
    y += 9;
  });

  doc.setDrawColor(...PRETO);
  doc.line(M, y, PW - M, y);
  y += 2;
  doc.setFillColor(...PRETO);
  doc.rect(M, y, PW - M * 2, 12, "F");
  doc.setTextColor(...AMARELO);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("TOTAL ESTIMADO", M + 3, y + 7.6);
  doc.setFontSize(13);
  doc.text(moeda(resultado.total), PW - M - 3, y + 8, { align: "right" });
  y += 20;

  // ---- Mini-esquemas das peças escolhidas ----
  const esquemas: { png: Png; label: string; grupo: string }[] = [];
  for (const grupo of GRUPOS_RESUMO) {
    const opcao = sel[grupo];
    if (!opcao) continue;
    const holder = document.querySelector<HTMLElement>(`[data-esq="${grupo}"]`);
    const svg = holder?.querySelector("svg");
    const png = svg ? await svgToPng(svg as SVGSVGElement, 6) : null;
    if (png) {
      esquemas.push({
        png,
        grupo,
        label: (LABELS as Record<string, Record<string, string>>)[grupo]?.[opcao] ?? opcao,
      });
    }
  }

  if (esquemas.length) {
    if (y > PH - 80) {
      doc.addPage();
      cabecalho();
      y = 40;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...PRETO);
    doc.text("Peças especificadas", M, y);
    y += 5;
    const cols = 3;
    const bw = (PW - M * 2 - (cols - 1) * 4) / cols;
    const bh = 26;
    esquemas.forEach((e, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = M + col * (bw + 4);
      const by = y + row * (bh + 4);
      doc.setDrawColor(228, 228, 228);
      doc.rect(x, by, bw, bh);
      const iw = 20;
      const ih = (e.png.h / e.png.w) * iw;
      doc.addImage(e.png.data, "PNG", x + 3, by + (bh - ih) / 2, iw, ih);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.8);
      doc.setTextColor(...CINZA);
      doc.text(TITULOS[e.grupo] ?? e.grupo, x + iw + 6, by + 9);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...PRETO);
      doc.text(doc.splitTextToSize(e.label, bw - iw - 9), x + iw + 6, by + 14);
    });
    y += Math.ceil(esquemas.length / cols) * (bh + 4) + 6;
  }

  // ---- Condições ----
  if (y > PH - 55) {
    doc.addPage();
    cabecalho();
    y = 40;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...PRETO);
  doc.text("Condições", M, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(70, 70, 70);
  const condicoes = [
    "Valores de referência para material e montagem, com base na tabela vigente.",
    "Não incluídos: frete, terraplanagem, obra civil, fundação e projeto estrutural assinado.",
    "Proposta válida por 15 dias. Prazo de fabricação confirmado na assinatura do pedido.",
    "Pagamento: entrada + parcelas conforme negociação, com recibo de cada pagamento.",
    "Valor final confirmado após vistoria do terreno.",
  ];
  condicoes.forEach((t) => {
    doc.setFillColor(...AMARELO);
    doc.rect(M, y - 2.2, 1.6, 1.6, "F");
    doc.text(doc.splitTextToSize(t, PW - M * 2 - 6), M + 5, y);
    y += 6;
  });

  rodape();
  const nome = `proposta-galpao-${sel.comprimento}x${sel.largura}m.pdf`;
  doc.save(nome);
}

const TITULOS: Record<string, string> = {
  tesoura: "ESTRUTURA / TESOURA",
  coluna: "COLUNA",
  pe: "PÉ / PILAR",
  terca: "TERÇA",
  tirante: "TIRANTE",
  telha: "TELHA",
  fechamento: "FECHAMENTO",
  portao: "PORTÃO",
  pintura: "TRATAMENTO",
};
