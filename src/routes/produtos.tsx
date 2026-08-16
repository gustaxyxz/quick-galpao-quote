import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { PageHero, SiteShell } from "@/components/site/SiteShell";
import { cn } from "@/lib/utils";
import { moeda } from "@/lib/galpao";
import { CATEGORIAS, PRODUTOS } from "@/lib/produtos";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos e serviços — Metalúrgica Oliveira" },
      {
        name: "description",
        content:
          "Galpões duas águas, uma água e arco, coberturas, mezaninos, fechamentos, portões industriais e manutenção estrutural.",
      },
      { property: "og:title", content: "Produtos e serviços — Metalúrgica Oliveira" },
      {
        property: "og:description",
        content: "Catálogo de galpões metálicos, coberturas, mezaninos e portões industriais.",
      },
    ],
  }),
  component: Produtos,
});

function Produtos() {
  const [categoria, setCategoria] = useState<(typeof CATEGORIAS)[number]>("Todos");
  const lista = useMemo(
    () => (categoria === "Todos" ? PRODUTOS : PRODUTOS.filter((p) => p.categoria === categoria)),
    [categoria],
  );

  return (
    <SiteShell>
      <PageHero
        eyebrow="Catálogo"
        titulo="Produtos e"
        destaque="serviços"
        descricao="Valores de referência por metro quadrado. O orçamento final depende do vão, do pé direito e do acabamento escolhido."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategoria(c)}
              className={cn(
                "rounded-sm border px-4 py-2 font-display text-xs font-bold tracking-wide uppercase transition-colors",
                categoria === c
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lista.map((p) => (
            <article key={p.slug} className="flex flex-col rounded-sm border border-border bg-card p-6">
              <span className="font-display text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
                {p.categoria}
              </span>
              <h2 className="mt-2 font-display text-lg font-extrabold uppercase">{p.nome}</h2>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.resumo}</p>
              <ul className="mt-4 space-y-1.5">
                {p.destaques.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                <div>
                  <p className="text-xs tracking-wide uppercase text-muted-foreground">A partir de</p>
                  <p className="font-display text-xl font-extrabold">
                    {p.precoBase > 0 ? `${moeda(p.precoBase)}/${p.unidade}` : "Sob consulta"}
                  </p>
                </div>
                <Link
                  to="/orcamento"
                  className="rounded-sm bg-primary px-4 py-2.5 font-display text-xs font-bold uppercase text-primary-foreground"
                >
                  Orçar
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
