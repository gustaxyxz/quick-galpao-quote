import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator, RotateCcw } from "lucide-react";
import { PageHero, SiteShell } from "@/components/site/SiteShell";
import { PecaIcon } from "@/components/site/PecaIcon";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/empresa";
import {
  DESCRICOES,
  LABELS,
  calcular,
  descricaoGalpao,
  moeda,
  selecaoInicial,
  type Selecao,
} from "@/lib/galpao";

export const Route = createFileRoute("/calculadora")({
  head: () => ({
    meta: [
      { title: "Calculadora de galpão metálico — Metalúrgica Oliveira" },
      {
        name: "description",
        content:
          "Informe largura, comprimento e pé direito e veja na hora a lista de materiais e o valor estimado do seu galpão metálico.",
      },
      { property: "og:title", content: "Calculadora de galpão metálico" },
      {
        property: "og:description",
        content: "Estimativa instantânea de tesouras, colunas, terças, telhas e fechamento.",
      },
    ],
  }),
  component: Calculadora,
});

type GrupoKey =
  | "tesoura"
  | "coluna"
  | "telha"
  | "terca"
  | "tirante"
  | "fechamento"
  | "portao"
  | "pintura";

const grupos: { key: GrupoKey; titulo: string; nota: string }[] = [
  { key: "tesoura", titulo: "Modelo de estrutura / tesoura", nota: "Define o vão livre e o consumo de aço" },
  { key: "coluna", titulo: "Coluna", nota: "Perfil que recebe a carga da cobertura" },
  { key: "telha", titulo: "Telha de cobertura", nota: "Espessura, isolamento e iluminação" },
  { key: "terca", titulo: "Terças", nota: "Apoiam a telha entre as tesouras" },
  { key: "tirante", titulo: "Tirantes / contraventamento", nota: "Travamento contra vento e torção" },
  { key: "fechamento", titulo: "Fechamento lateral", nota: "Quanto das laterais será fechado" },
  { key: "portao", titulo: "Portão", nota: "Acesso de veículos e empilhadeira" },
  { key: "pintura", titulo: "Tratamento e pintura", nota: "Proteção contra corrosão" },
];


function Calculadora() {
  const [sel, setSel] = useState<Selecao>(selecaoInicial);
  const resultado = useMemo(() => calcular(sel), [sel]);
  const pronto = resultado.itens.length > 0 && resultado.total > 0;

  const setDim = (campo: "comprimento" | "largura" | "pe_direito", valor: string) =>
    setSel((s) => ({ ...s, [campo]: valor === "" ? null : Number(valor) }));

  return (
    <SiteShell>
      <PageHero
        eyebrow="Orçamento rápido"
        titulo="Calculadora de"
        destaque="galpão"
        descricao="Estimativa com a mesma tabela de materiais usada na nossa produção. O valor final é confirmado após vistoria do terreno."
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-6">
          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground">
              1. Dimensões
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {(
                [
                  ["comprimento", "Comprimento (m)"],
                  ["largura", "Largura / vão (m)"],
                  ["pe_direito", "Pé direito (m)"],
                ] as const
              ).map(([campo, label]) => (
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
                    placeholder="0"
                    className="mt-1.5 w-full rounded-sm border border-input bg-background px-3 py-2.5 font-display text-lg font-bold outline-none focus:border-accent"
                  />
                </label>
              ))}
            </div>
          </div>

          {grupos.map(({ key, titulo, nota }, i) => {
            const opcoes = Object.entries(LABELS[key]) as [string, string][];
            return (
              <div key={key} className="rounded-sm border border-border bg-card p-6">
                <h2 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground">
                  {i + 2}. {titulo}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground/80">{nota}</p>
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
          })}


          <button
            type="button"
            onClick={() => setSel(selecaoInicial)}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Limpar seleção
          </button>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-sm bg-primary p-6 text-primary-foreground">
            <h2 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-accent">
              Resumo do orçamento
            </h2>

            {!pronto ? (
              <p className="mt-6 flex items-start gap-3 text-sm text-primary-foreground/70">
                <Calculator className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                Preencha comprimento, largura e pé direito para ver os materiais e o valor estimado.
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
                  <a
                    href={whatsappLink(
                      `Olá! Fiz uma simulação no site: ${descricaoGalpao(sel)}. Total estimado ${moeda(resultado.total)}. Gostaria de confirmar o orçamento.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-sm bg-accent px-4 py-3 text-center font-display text-sm font-bold uppercase text-accent-foreground"
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
    </SiteShell>
  );
}
