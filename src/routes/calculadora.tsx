import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Calculator, Check, FileDown, RotateCcw } from "lucide-react";
import { PageHero, SiteShell } from "@/components/site/SiteShell";
import { PecaIcon } from "@/components/site/PecaIcon";
import { PreviaGalpao } from "@/components/site/PreviaGalpao";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/empresa";
import {
  DESCRICOES,
  LABELS,
  calcular,
  descricaoGalpao,
  moeda,
  selecaoInicial,
  validarDimensoes,
  validarPecas,
  type Erros,
  type Selecao,
} from "@/lib/galpao";

export const Route = createFileRoute("/calculadora")({
  head: () => ({
    meta: [
      { title: "Calculadora de galpão metálico — Metalúrgica Oliveira" },
      {
        name: "description",
        content:
          "Informe largura, comprimento e pé direito e veja na hora a lista de materiais, a prévia 2D e o valor estimado do seu galpão metálico.",
      },
      { property: "og:title", content: "Calculadora de galpão metálico" },
      {
        property: "og:description",
        content: "Estimativa instantânea de tesouras, colunas, pés, terças, telhas e fechamento, com prévia 2D e PDF.",
      },
    ],
  }),
  component: Calculadora,
});

type GrupoKey =
  | "tesoura"
  | "coluna"
  | "pe"
  | "telha"
  | "terca"
  | "tirante"
  | "fechamento"
  | "portao"
  | "pintura";

const grupos: { key: GrupoKey; titulo: string; nota: string }[] = [
  { key: "tesoura", titulo: "Modelo de estrutura / tesoura", nota: "Define o vão livre e o consumo de aço" },
  { key: "coluna", titulo: "Perfil da coluna", nota: "Perfil que recebe a carga da cobertura" },
  { key: "pe", titulo: "Tipo de pé / pilar", nota: "Treliçado, maciço, viga H... define a rigidez do pé direito" },
  { key: "telha", titulo: "Telha de cobertura", nota: "Espessura, isolamento e iluminação" },
  { key: "terca", titulo: "Terças", nota: "Apoiam a telha entre as tesouras" },
  { key: "tirante", titulo: "Tirantes / contraventamento", nota: "Travamento contra vento e torção" },
  { key: "fechamento", titulo: "Fechamento lateral", nota: "Quanto das laterais será fechado" },
  { key: "portao", titulo: "Portão", nota: "Acesso de veículos e empilhadeira" },
  { key: "pintura", titulo: "Tratamento e pintura", nota: "Proteção contra corrosão" },
];

const ETAPAS = [
  { n: 1, titulo: "Dimensões" },
  { n: 2, titulo: "Peças" },
  { n: 3, titulo: "Resumo" },
] as const;

const DIMENSOES = [
  { campo: "comprimento", label: "Comprimento (m)", dica: "4 a 200 m" },
  { campo: "largura", label: "Largura / vão (m)", dica: "3 a 60 m" },
  { campo: "pe_direito", label: "Pé direito (m)", dica: "2 a 20 m" },
] as const;

function ErroCampo({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <span className="mt-1.5 flex items-start gap-1.5 text-[11px] font-medium text-destructive">
      <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" />
      {msg}
    </span>
  );
}

function Calculadora() {
  const [sel, setSel] = useState<Selecao>(selecaoInicial);
  const [etapa, setEtapa] = useState<1 | 2 | 3>(1);
  const [tocado, setTocado] = useState<Record<number, boolean>>({});
  const [gerando, setGerando] = useState(false);

  const resultado = useMemo(() => calcular(sel), [sel]);
  const errosDim = useMemo<Erros>(() => validarDimensoes(sel), [sel]);
  const errosPecas = useMemo<Erros>(() => validarPecas(sel), [sel]);

  const dimOk = Object.keys(errosDim).length === 0;
  const pecasOk = Object.keys(errosPecas).length === 0;
  const pronto = dimOk && pecasOk && resultado.total > 0;

  const mostrarErrosDim = !!tocado[1];
  const mostrarErrosPecas = !!tocado[2];

  const setDim = (campo: "comprimento" | "largura" | "pe_direito", valor: string) =>
    setSel((s) => ({ ...s, [campo]: valor === "" ? null : Number(valor) }));

  const avancar = () => {
    setTocado((t) => ({ ...t, [etapa]: true }));
    if (etapa === 1 && !dimOk) return;
    if (etapa === 2 && !pecasOk) return;
    setEtapa((e) => (e === 1 ? 2 : 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const voltar = () => {
    setEtapa((e) => (e === 3 ? 2 : 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const baixarPdf = async () => {
    setTocado({ 1: true, 2: true, 3: true });
    if (!pronto) return;
    setGerando(true);
    try {
      const { gerarPropostaPDF } = await import("@/lib/proposta-pdf");
      await gerarPropostaPDF(sel, resultado);
    } finally {
      setGerando(false);
    }
  };

  const bloqueado = (etapa === 1 && !dimOk) || (etapa === 2 && !pecasOk);
  const faltando = etapa === 2 ? Object.keys(errosPecas).length : Object.keys(errosDim).length;

  return (
    <SiteShell>
      <PageHero
        eyebrow="Orçamento rápido"
        titulo="Calculadora de"
        destaque="galpão"
        descricao="Estimativa com a mesma tabela de materiais usada na nossa produção. O valor final é confirmado após vistoria do terreno."
      />

      {/* Indicador de progresso */}
      <div className="border-b border-border bg-secondary">
        <ol className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-4 sm:gap-4">
          {ETAPAS.map((e, i) => {
            const ativo = etapa === e.n;
            const feito = etapa > e.n;
            return (
              <li key={e.n} className="flex flex-1 items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (e.n < etapa) setEtapa(e.n);
                    else if (e.n > etapa) avancar();
                  }}
                  className="flex items-center gap-2 text-left"
                >
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-sm font-display text-sm font-black transition-colors",
                      feito
                        ? "bg-accent text-accent-foreground"
                        : ativo
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-background text-muted-foreground",
                    )}
                  >
                    {feito ? <Check className="h-4 w-4" /> : e.n}
                  </span>
                  <span
                    className={cn(
                      "font-display text-xs font-bold uppercase tracking-wide sm:text-sm",
                      ativo ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {e.titulo}
                  </span>
                </button>
                {i < ETAPAS.length - 1 ? (
                  <span className={cn("h-px flex-1", etapa > e.n ? "bg-accent" : "bg-border")} />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-6">
          {etapa === 1 ? (
            <div className="rounded-sm border border-border bg-card p-6">
              <h2 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground">
                1. Dimensões do galpão
              </h2>
              <p className="mt-1 text-xs text-muted-foreground/80">
                Medidas externas em metros. Use ponto ou vírgula para meio metro.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {DIMENSOES.map(({ campo, label, dica }) => {
                  const erro = mostrarErrosDim ? errosDim[campo] : undefined;
                  return (
                    <label key={campo} className="block">
                      <span className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                        {label}
                      </span>
                      <input
                        type="number"
                        min={1}
                        step="0.5"
                        inputMode="decimal"
                        value={sel[campo] ?? ""}
                        onChange={(e) => setDim(campo, e.target.value)}
                        onBlur={() => setTocado((t) => ({ ...t, 1: true }))}
                        placeholder="0"
                        aria-invalid={!!erro}
                        className={cn(
                          "mt-1.5 w-full rounded-sm border bg-background px-3 py-2.5 font-display text-lg font-bold outline-none",
                          erro ? "border-destructive focus:border-destructive" : "border-input focus:border-accent",
                        )}
                      />
                      {erro ? <ErroCampo msg={erro} /> : (
                        <span className="mt-1.5 block text-[11px] text-muted-foreground">{dica}</span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ) : null}

          {etapa === 2
            ? grupos.map(({ key, titulo, nota }, i) => {
                const opcoes = Object.entries(LABELS[key]) as [string, string][];
                const erro = mostrarErrosPecas ? errosPecas[key] : undefined;
                return (
                  <div
                    key={key}
                    className={cn(
                      "rounded-sm border bg-card p-6",
                      erro ? "border-destructive/60" : "border-border",
                    )}
                  >
                    <h2 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground">
                      {i + 1}. {titulo}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground/80">{nota}</p>
                    <ErroCampo msg={erro} />
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {opcoes.map(([valor, label]) => {
                        const ativo = sel[key] === valor;
                        const desc = DESCRICOES[key]?.[valor];
                        return (
                          <button
                            key={valor}
                            type="button"
                            onClick={() => setSel((s) => ({ ...s, [key]: valor }))}
                            title={desc}
                            className={cn(
                              "flex items-start gap-3 rounded-sm border px-4 py-3 text-left transition-colors",
                              ativo
                                ? "border-accent bg-accent/15 text-foreground"
                                : "border-border text-foreground hover:border-accent",
                            )}
                          >
                            <PecaIcon
                              grupo={key}
                              opcao={valor}
                              className={ativo ? "text-accent" : "text-muted-foreground"}
                            />
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold leading-tight">{label}</span>
                              {desc ? (
                                <span className="mt-1 block text-[11px] leading-snug text-muted-foreground">
                                  {desc}
                                </span>
                              ) : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : null}

          {etapa === 3 ? (
            <div className="space-y-6">
              <div className="rounded-sm border border-border bg-card p-6">
                <h2 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground">
                  Prévia 2D com cotas
                </h2>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  Desenho ilustrativo gerado a partir das medidas e das peças escolhidas.
                </p>
                <PreviaGalpao sel={sel} nTesouras={resultado.nTesouras} className="mt-4" />
              </div>

              <div className="rounded-sm border border-border bg-card p-6">
                <h2 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground">
                  Peças especificadas
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {grupos.map(({ key, titulo }) => {
                    const opcao = sel[key];
                    if (!opcao) return null;
                    return (
                      <div key={key} className="flex items-center gap-3 rounded-sm border border-border p-3">
                        <PecaIcon grupo={key} opcao={opcao} className="text-accent" />
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            {titulo}
                          </p>
                          <p className="text-sm font-semibold leading-tight">
                            {(LABELS as Record<string, Record<string, string>>)[key]?.[opcao]}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={baixarPdf}
                disabled={gerando || !pronto}
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground disabled:opacity-50 sm:w-auto"
              >
                <FileDown className="h-4 w-4" />
                {gerando ? "Gerando PDF..." : "Baixar proposta em PDF"}
              </button>
            </div>
          ) : null}

          {/* Navegação */}
          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
            {etapa > 1 ? (
              <button
                type="button"
                onClick={voltar}
                className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 font-display text-sm font-bold uppercase"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </button>
            ) : null}
            {etapa < 3 ? (
              <button
                type="button"
                onClick={avancar}
                disabled={bloqueado && !!tocado[etapa]}
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 font-display text-sm font-bold uppercase text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : null}
            {bloqueado && !!tocado[etapa] ? (
              <span className="text-xs font-medium text-destructive">
                {faltando} {faltando === 1 ? "campo pendente" : "campos pendentes"} nesta etapa.
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setSel(selecaoInicial);
                setTocado({});
                setEtapa(1);
              }}
              className="ml-auto inline-flex items-center gap-2 text-sm font-semibold uppercase text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Limpar
            </button>
          </div>
        </div>

        <aside className={cn("lg:sticky lg:top-24 lg:self-start", etapa !== 3 && "hidden lg:block")}>
          <div className="rounded-sm bg-primary p-6 text-primary-foreground">
            <h2 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-accent">
              Resumo do orçamento
            </h2>

            {!pronto ? (
              <p className="mt-6 flex items-start gap-3 text-sm text-primary-foreground/70">
                <Calculator className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                {dimOk
                  ? "Escolha as peças na etapa 2 para ver a lista completa e o valor estimado."
                  : "Preencha comprimento, largura e pé direito para ver os materiais e o valor estimado."}
              </p>
            ) : (
              <>
                <p className="mt-4 text-sm text-primary-foreground/70">{descricaoGalpao(sel)}</p>
                {sel.tesoura ? (
                  <div className="mt-4 flex items-center gap-3 rounded-sm border border-white/15 bg-white/5 p-3">
                    <PecaIcon grupo="tesoura" opcao={sel.tesoura} className="text-accent" />
                    <div className="text-xs text-primary-foreground/70">
                      <p className="font-display text-sm font-bold uppercase text-primary-foreground">
                        {LABELS.tesoura[sel.tesoura]}
                      </p>
                      {sel.telha ? <p>{LABELS.telha[sel.telha]}</p> : null}
                      {sel.pe ? <p>{LABELS.pe[sel.pe]}</p> : null}
                    </div>
                  </div>
                ) : null}
                <div className="mt-4 grid grid-cols-3 gap-3 border-y border-white/15 py-4 text-center">
                  {[
                    [`${resultado.area.toFixed(0)} m²`, "área"],
                    [`${resultado.nTesouras}`, "tesouras"],
                    [`${resultado.nColunas}`, "colunas"],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <p className="font-display text-xl font-extrabold text-accent">{n}</p>
                      <p className="text-[11px] tracking-wide uppercase text-primary-foreground/60">{l}</p>
                    </div>
                  ))}
                </div>

                <ul className="mt-4 space-y-3">
                  {resultado.itens.map((item) => (
                    <li key={item.chave} className="text-sm">
                      <div className="flex justify-between gap-3 font-semibold">
                        <span>{item.descricao}</span>
                        <span className="whitespace-nowrap">{moeda(item.valor)}</span>
                      </div>
                      <p className="text-xs text-primary-foreground/55">{item.detalhe}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-end justify-between border-t border-white/15 pt-4">
                  <span className="font-display text-xs font-bold tracking-[0.2em] uppercase text-primary-foreground/70">
                    Total estimado
                  </span>
                  <span className="font-display text-2xl font-extrabold text-accent">
                    {moeda(resultado.total)}
                  </span>
                </div>
                <p className="mt-1 text-right text-[11px] text-primary-foreground/50">
                  {moeda(resultado.total / (resultado.area || 1))} por m²
                </p>

                <div className="mt-5 grid gap-2">
                  <button
                    type="button"
                    onClick={baixarPdf}
                    disabled={gerando}
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-4 py-3 font-display text-sm font-bold uppercase text-accent-foreground disabled:opacity-60"
                  >
                    <FileDown className="h-4 w-4" />
                    {gerando ? "Gerando..." : "Proposta em PDF"}
                  </button>
                  <a
                    href={whatsappLink(
                      `Olá! Fiz uma simulação no site: ${descricaoGalpao(sel)}. Total estimado ${moeda(resultado.total)}. Gostaria de confirmar o orçamento.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-sm border border-white/25 px-4 py-3 text-center font-display text-sm font-bold uppercase"
                  >
                    Enviar no WhatsApp
                  </a>
                  <Link
                    to="/orcamento"
                    className="rounded-sm border border-white/25 px-4 py-3 text-center font-display text-sm font-bold uppercase"
                  >
                    Pedir orçamento formal
                  </Link>
                </div>
              </>
            )}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Valores de referência para materiais e montagem. Frete, terraplanagem e obra civil não
            estão incluídos.
          </p>
        </aside>
      </section>

      {/* Prévia e ícones fora da tela: usados para montar as imagens do PDF */}
      <div aria-hidden className="pointer-events-none fixed -left-[9999px] top-0 w-[400px]">
        {pronto && etapa !== 3 ? <PreviaGalpao sel={sel} nTesouras={resultado.nTesouras} /> : null}
        {grupos.map(({ key }) => {
          const opcao = sel[key];
          if (!opcao) return null;
          return (
            <span key={key} data-esq={key}>
              <PecaIcon grupo={key} opcao={opcao} />
            </span>
          );
        })}
      </div>
    </SiteShell>
  );
}
