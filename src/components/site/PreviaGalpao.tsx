import { LABELS, type Selecao } from "@/lib/galpao";

type Props = {
  sel: Selecao;
  nTesouras: number;
  className?: string;
};

const UMA_AGUA = ["uma_agua", "uma_agua_trelicada", "shed_dente_serra"];
const ARCOS = ["arco_abaulado", "arco_pleno", "arco_trelicado"];

function alturaTelhado(sel: Selecao, L: number) {
  const t = sel.tesoura;
  if (!t) return L * 0.15;
  if (t === "arco_pleno") return L / 2;
  if (t === "arco_abaulado" || t === "arco_trelicado") return L * 0.22;
  if (t === "mansarda") return L * 0.3;
  if (t === "scissor") return L * 0.25;
  if (UMA_AGUA.includes(t)) return L * 0.12;
  return L * 0.18;
}

/** Contorno da cobertura (vista frontal) em coordenadas do mundo (metros, y para cima). */
function contornoTelhado(sel: Selecao, L: number, h: number): string {
  const t = sel.tesoura ?? "duas_aguas_trelicada";
  if (ARCOS.includes(t)) {
    return `M 0 0 Q ${L / 2} ${h * 2} ${L} 0`;
  }
  if (t === "shed_dente_serra") {
    const n = 3;
    const w = L / n;
    let d = "M 0 0";
    for (let i = 0; i < n; i++) {
      d += ` L ${i * w} ${h} L ${(i + 1) * w} 0`;
    }
    return d;
  }
  if (t === "uma_agua" || t === "uma_agua_trelicada") {
    return `M 0 0 L ${L} ${h}`;
  }
  if (t === "mansarda") {
    return `M 0 0 L ${L * 0.2} ${h * 0.65} L ${L / 2} ${h} L ${L * 0.8} ${h * 0.65} L ${L} 0`;
  }
  return `M 0 0 L ${L / 2} ${h} L ${L} 0`;
}

/** Barras internas da tesoura (vista frontal), em metros. */
function barrasTesoura(sel: Selecao, L: number, h: number): [number, number, number, number][] {
  const t = sel.tesoura;
  const barras: [number, number, number, number][] = [];
  if (!t) return barras;
  if (ARCOS.includes(t)) {
    for (let i = 1; i < 6; i++) {
      const x = (L / 6) * i;
      const y = 4 * h * (x / L) * (1 - x / L) * 2;
      barras.push([x, 0, x, y]);
    }
    return barras;
  }
  if (t === "duas_aguas_alma_cheia" || t === "portico_rigido") return barras;
  if (t === "uma_agua" || t === "uma_agua_trelicada") {
    for (let i = 1; i < 5; i++) {
      const x = (L / 5) * i;
      barras.push([x, 0, x, (h * x) / L]);
    }
    return barras;
  }
  const n = 4;
  barras.push([L / 2, 0, L / 2, h]);
  for (let i = 1; i <= n; i++) {
    const x = (L / 2 / (n + 1)) * i;
    const y = (h * x) / (L / 2);
    barras.push([x, 0, x, y]);
    barras.push([L - x, 0, L - x, y]);
    barras.push([x, y, Math.min(x + L / 2 / (n + 1), L / 2), 0]);
    barras.push([L - x, y, Math.max(L - x - L / 2 / (n + 1), L / 2), 0]);
  }
  return barras;
}

function Cota({
  x1,
  y1,
  x2,
  y2,
  texto,
  vertical,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  texto: string;
  vertical?: boolean;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g className="text-accent" stroke="currentColor" strokeWidth={0.8}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {vertical ? (
        <>
          <line x1={x1 - 3} y1={y1} x2={x1 + 3} y2={y1} />
          <line x1={x2 - 3} y1={y2} x2={x2 + 3} y2={y2} />
        </>
      ) : (
        <>
          <line x1={x1} y1={y1 - 3} x2={x1} y2={y1 + 3} />
          <line x1={x2} y1={y2 - 3} x2={x2} y2={y2 + 3} />
        </>
      )}
      <text
        x={vertical ? mx - 5 : mx}
        y={vertical ? my : my - 4}
        stroke="none"
        fill="currentColor"
        fontSize={8}
        textAnchor={vertical ? "end" : "middle"}
        dominantBaseline={vertical ? "middle" : "auto"}
      >
        {texto}
      </text>
    </g>
  );
}

const W = 340;
const H = 210;
const PAD = { left: 44, right: 20, top: 22, bottom: 40 };

export function PreviaGalpao({ sel, nTesouras, className }: Props) {
  const C = sel.comprimento || 0;
  const L = sel.largura || 0;
  const PD = sel.pe_direito || 0;
  if (!C || !L || !PD) return null;

  const hTelhado = alturaTelhado(sel, L);
  const totalH = PD + hTelhado;

  const areaW = W - PAD.left - PAD.right;
  const areaH = H - PAD.top - PAD.bottom;

  // ---- vista frontal ----
  const sf = Math.min(areaW / L, areaH / totalH);
  const fx = (m: number) => PAD.left + (areaW - L * sf) / 2 + m * sf;
  const fy = (m: number) => H - PAD.bottom - m * sf;

  const barras = barrasTesoura(sel, L, hTelhado);
  const contorno = contornoTelhado(sel, L, hTelhado);
  const contornoPx = contorno.replace(
    /(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g,
    (_m, a: string, b: string) => `${fx(Number(a)).toFixed(1)} ${fy(PD + Number(b)).toFixed(1)}`,
  );

  // ---- vista lateral ----
  const sl = Math.min(areaW / C, areaH / (PD + hTelhado * 0.35));
  const lx = (m: number) => PAD.left + (areaW - C * sl) / 2 + m * sl;
  const ly = (m: number) => H - PAD.bottom - m * sl;
  const passos = Math.max(nTesouras - 1, 1);

  const fechado = sel.fechamento && sel.fechamento !== "sem";
  const alturaFech =
    sel.fechamento === "meia_parede" || sel.fechamento === "alvenaria_meia"
      ? PD * 0.5
      : sel.fechamento === "tres_quartos"
        ? PD * 0.75
        : sel.fechamento === "oitao"
          ? 0
          : PD;

  return (
    <div className={className}>
      <div className="grid gap-4 sm:grid-cols-2">
        {(["frontal", "lateral"] as const).map((vista) => (
          <figure key={vista} className="rounded-sm border border-border bg-background p-2">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full text-foreground"
              data-previa={vista}
              role="img"
              aria-label={`Vista ${vista} do galpão ${C}m x ${L}m`}
            >
              <rect x={0} y={0} width={W} height={H} fill="none" />
              {/* solo */}
              <line
                x1={PAD.left - 14}
                y1={H - PAD.bottom}
                x2={W - 8}
                y2={H - PAD.bottom}
                stroke="currentColor"
                strokeWidth={1.4}
              />

              {vista === "frontal" ? (
                <g>
                  {fechado && alturaFech > 0 ? (
                    <rect
                      x={fx(0)}
                      y={fy(alturaFech)}
                      width={L * sf}
                      height={alturaFech * sf}
                      className="text-accent"
                      fill="currentColor"
                      fillOpacity={0.12}
                      stroke="none"
                    />
                  ) : null}
                  {/* colunas */}
                  <line x1={fx(0)} y1={fy(0)} x2={fx(0)} y2={fy(PD)} stroke="currentColor" strokeWidth={2.4} />
                  <line x1={fx(L)} y1={fy(0)} x2={fx(L)} y2={fy(PD)} stroke="currentColor" strokeWidth={2.4} />
                  {/* banzo inferior */}
                  <line x1={fx(0)} y1={fy(PD)} x2={fx(L)} y2={fy(PD)} stroke="currentColor" strokeWidth={1.4} />
                  {/* barras internas */}
                  <g stroke="currentColor" strokeWidth={0.7} opacity={0.85}>
                    {barras.map(([x1, y1, x2, y2], i) => (
                      <line
                        key={i}
                        x1={fx(x1)}
                        y1={fy(PD + y1)}
                        x2={fx(x2)}
                        y2={fy(PD + y2)}
                      />
                    ))}
                  </g>
                  {/* cobertura */}
                  <path d={contornoPx} fill="none" stroke="currentColor" strokeWidth={2.4} />
                  {/* cotas */}
                  <Cota x1={fx(0)} y1={H - PAD.bottom + 16} x2={fx(L)} y2={H - PAD.bottom + 16} texto={`${L} m`} />
                  <Cota
                    vertical
                    x1={fx(0) - 12}
                    y1={fy(0)}
                    x2={fx(0) - 12}
                    y2={fy(PD)}
                    texto={`${PD} m`}
                  />
                  <Cota
                    vertical
                    x1={fx(L) + 12}
                    y1={fy(PD)}
                    x2={fx(L) + 12}
                    y2={fy(PD + hTelhado)}
                    texto={`${hTelhado.toFixed(1)} m`}
                  />
                </g>
              ) : (
                <g>
                  {fechado && alturaFech > 0 && sel.fechamento !== "oitao" ? (
                    <rect
                      x={lx(0)}
                      y={ly(alturaFech)}
                      width={C * sl}
                      height={alturaFech * sl}
                      className="text-accent"
                      fill="currentColor"
                      fillOpacity={0.12}
                      stroke="none"
                    />
                  ) : null}
                  {/* colunas ao longo do comprimento */}
                  <g stroke="currentColor" strokeWidth={1.8}>
                    {Array.from({ length: nTesouras }, (_, i) => {
                      const x = lx((C / passos) * i);
                      return <line key={i} x1={x} y1={ly(0)} x2={x} y2={ly(PD)} />;
                    })}
                  </g>
                  {/* cobertura / terças */}
                  <line
                    x1={lx(0)}
                    y1={ly(PD + hTelhado * 0.3)}
                    x2={lx(C)}
                    y2={ly(PD + hTelhado * 0.3)}
                    stroke="currentColor"
                    strokeWidth={2.4}
                  />
                  <g stroke="currentColor" strokeWidth={0.6} opacity={0.6}>
                    {Array.from({ length: 4 }, (_, i) => {
                      const y = ly(PD + (hTelhado * 0.3 * (i + 1)) / 5) - 1;
                      return <line key={i} x1={lx(0)} y1={y} x2={lx(C)} y2={y} />;
                    })}
                  </g>
                  {/* portão */}
                  {sel.portao && sel.portao !== "sem" ? (
                    <rect
                      x={lx(C / 2 - Math.min(2, C / 6))}
                      y={ly(Math.min(PD * 0.7, 4))}
                      width={Math.min(4, C / 3) * sl}
                      height={Math.min(PD * 0.7, 4) * sl}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.4}
                      strokeDasharray="3 2"
                    />
                  ) : null}
                  <Cota x1={lx(0)} y1={H - PAD.bottom + 16} x2={lx(C)} y2={H - PAD.bottom + 16} texto={`${C} m`} />
                  <Cota
                    x1={lx(0)}
                    y1={H - PAD.bottom + 30}
                    x2={lx(C / passos)}
                    y2={H - PAD.bottom + 30}
                    texto={`${(C / passos).toFixed(2)} m entre pórticos`}
                  />
                  <Cota vertical x1={lx(0) - 12} y1={ly(0)} x2={lx(0) - 12} y2={ly(PD)} texto={`${PD} m`} />
                </g>
              )}
            </svg>
            <figcaption className="px-1 pt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
              Vista {vista} — {sel.tesoura ? LABELS.tesoura[sel.tesoura] : "estrutura a definir"}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
