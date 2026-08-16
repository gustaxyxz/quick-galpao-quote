import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, CheckCircle2, Factory, Ruler, ShieldCheck, Truck } from "lucide-react";
import heroImg from "@/assets/hero-galpao.jpg";
import { SiteShell } from "@/components/site/SiteShell";
import { EMPRESA, whatsappLink } from "@/lib/empresa";
import { PRODUTOS } from "@/lib/produtos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Metalúrgica Oliveira — Galpões metálicos sob medida" },
      {
        name: "description",
        content:
          "Galpões metálicos com projeto, fabricação e montagem em Engenheiro Beltrão e região. Calcule seu galpão online em 1 minuto.",
      },
      { property: "og:title", content: "Galpões metálicos sob medida — Metalúrgica Oliveira" },
      {
        property: "og:description",
        content: "Orçamento rápido com cálculo de tesouras, colunas, terças e telhas.",
      },
    ],
  }),
  component: Index,
});

const diferenciais = [
  { icon: Ruler, titulo: "Projeto sob medida", texto: "Dimensionamento conforme o seu terreno e o uso do galpão." },
  { icon: Factory, titulo: "Fabricação própria", texto: "Corte, dobra e solda na nossa estrutura, sem intermediário." },
  { icon: Truck, titulo: "Entrega e montagem", texto: "Equipe própria de montagem em toda a região." },
  { icon: ShieldCheck, titulo: "Garantia estrutural", texto: "Aço certificado, pintura anticorrosiva e ART do projeto." },
];

function Index() {
  return (
    <SiteShell>
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImg}
          alt="Galpão metálico em estrutura de aço durante a montagem"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-28">
          <div>
            <p className="mb-4 inline-block bg-accent px-3 py-1 font-display text-xs font-bold tracking-[0.2em] uppercase text-accent-foreground">
              {EMPRESA.cidade}
            </p>
            <h1 className="font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl lg:text-6xl">
              Galpões metálicos
              <br />
              <span className="text-accent">sob medida</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-primary-foreground/75">
              Estrutura, cobertura, fechamento e portão. Você informa as medidas e recebe na hora a
              lista de materiais e o valor estimado do seu galpão.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/calculadora"
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 font-display text-sm font-bold tracking-wide uppercase text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                <Calculator className="h-4 w-4" />
                Calcular meu galpão
              </Link>
              <a
                href={whatsappLink("Olá! Gostaria de um orçamento de galpão metálico.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-white/25 px-6 py-3.5 font-display text-sm font-bold tracking-wide uppercase transition-colors hover:bg-white/10"
              >
                Falar no WhatsApp
              </a>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {[
                ["+15", "anos de obra"],
                ["+300", "galpões entregues"],
                ["30 m", "de vão livre"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-extrabold text-accent">{n}</dt>
                  <dd className="text-xs tracking-wide uppercase text-primary-foreground/60">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="hatch h-3 w-full" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-extrabold uppercase">
          Por que fechar com a <span className="text-accent">Oliveira</span>
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {diferenciais.map(({ icon: Icon, titulo, texto }) => (
            <div key={titulo} className="rounded-sm border border-border bg-card p-5">
              <Icon className="h-6 w-6 text-accent" />
              <h3 className="mt-4 font-display text-sm font-bold tracking-wide uppercase">{titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-extrabold uppercase">O que fabricamos</h2>
            <Link to="/produtos" className="text-sm font-semibold uppercase text-accent-foreground underline">
              Ver catálogo completo
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PRODUTOS.slice(0, 3).map((p) => (
              <article key={p.slug} className="flex flex-col rounded-sm border border-border bg-card p-6">
                <span className="font-display text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
                  {p.categoria}
                </span>
                <h3 className="mt-2 font-display text-lg font-extrabold uppercase">{p.nome}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.resumo}</p>
                <ul className="mt-4 space-y-1.5">
                  {p.destaques.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-sm bg-primary p-8 text-primary-foreground sm:p-12">
          <h2 className="font-display text-2xl font-extrabold uppercase sm:text-3xl">
            Tem as medidas? <span className="text-accent">Tem o orçamento.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-primary-foreground/70">
            A calculadora usa a mesma tabela de materiais da nossa produção: tesouras, colunas,
            terças, tirantes, chumbadores, telhas, fechamento e portão.
          </p>
          <Link
            to="/calculadora"
            className="mt-6 inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 font-display text-sm font-bold uppercase text-accent-foreground"
          >
            <Calculator className="h-4 w-4" />
            Começar agora
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
