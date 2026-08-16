import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero, SiteShell } from "@/components/site/SiteShell";
import { EMPRESA, whatsappLink } from "@/lib/empresa";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Metalúrgica Oliveira" },
      {
        name: "description",
        content:
          "Fale com a Metalúrgica Oliveira: telefone, WhatsApp e atendimento em Engenheiro Beltrão, Maringá, Campo Mourão e região.",
      },
      { property: "og:title", content: "Contato — Metalúrgica Oliveira" },
      {
        property: "og:description",
        content: "Atendimento para galpões metálicos em Engenheiro Beltrão e região.",
      },
    ],
  }),
  component: Contato,
});

function Contato() {
  const canais = [
    { icon: Phone, titulo: "Telefone", valor: EMPRESA.telefone, href: `tel:+${EMPRESA.whatsapp}` },
    {
      icon: MessageCircle,
      titulo: "WhatsApp",
      valor: EMPRESA.telefone,
      href: whatsappLink("Olá! Gostaria de falar sobre um galpão metálico."),
    },
    { icon: Mail, titulo: "E-mail", valor: EMPRESA.email, href: `mailto:${EMPRESA.email}` },
  ];

  return (
    <SiteShell>
      <PageHero
        eyebrow="Atendimento"
        titulo="Fale com a"
        destaque="Oliveira"
        descricao="Atendemos obras em toda a região. Chame no WhatsApp com as medidas do terreno e agilizamos a visita técnica."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-3">
        {canais.map(({ icon: Icon, titulo, valor, href }) => (
          <a
            key={titulo}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="rounded-sm border border-border bg-card p-6 transition-colors hover:border-accent"
          >
            <Icon className="h-6 w-6 text-accent" />
            <h2 className="mt-4 font-display text-sm font-bold tracking-wide uppercase">{titulo}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{valor}</p>
          </a>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 rounded-sm border border-border bg-secondary p-6 sm:grid-cols-2 sm:p-8">
          <div>
            <MapPin className="h-6 w-6 text-accent" />
            <h2 className="mt-4 font-display text-sm font-bold tracking-wide uppercase">
              Área de atendimento
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{EMPRESA.regiao}</p>
            <p className="mt-1 text-sm text-muted-foreground">{EMPRESA.endereco}</p>
          </div>
          <div>
            <Clock className="h-6 w-6 text-accent" />
            <h2 className="mt-4 font-display text-sm font-bold tracking-wide uppercase">
              Horário de atendimento
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Segunda a sexta, 8h às 18h
              <br />
              Sábado, 8h às 12h
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
