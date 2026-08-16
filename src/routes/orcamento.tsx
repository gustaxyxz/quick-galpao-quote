import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { PageHero, SiteShell } from "@/components/site/SiteShell";
import { EMPRESA, whatsappLink } from "@/lib/empresa";
import { PRODUTOS } from "@/lib/produtos";

export const Route = createFileRoute("/orcamento")({
  head: () => ({
    meta: [
      { title: "Pedir orçamento de galpão — Metalúrgica Oliveira" },
      {
        name: "description",
        content:
          "Envie as medidas e o tipo de estrutura e receba um orçamento formal da Metalúrgica Oliveira em até 24 horas úteis.",
      },
      { property: "og:title", content: "Pedir orçamento de galpão metálico" },
      {
        property: "og:description",
        content: "Formulário rápido: medidas, tipo de estrutura e contato. Resposta em 24h úteis.",
      },
    ],
  }),
  component: Orcamento,
});

const inicial = {
  nome: "",
  telefone: "",
  cidade: "",
  produto: PRODUTOS[0]!.nome,
  comprimento: "",
  largura: "",
  pe_direito: "",
  observacoes: "",
};

function Orcamento() {
  const [form, setForm] = useState(inicial);

  const set = (campo: keyof typeof inicial) => (valor: string) =>
    setForm((f) => ({ ...f, [campo]: valor }));

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const msg = [
      "*Pedido de orçamento — site*",
      `Nome: ${form.nome}`,
      `Telefone: ${form.telefone}`,
      `Cidade: ${form.cidade}`,
      `Estrutura: ${form.produto}`,
      `Medidas: ${form.comprimento || "?"}m x ${form.largura || "?"}m · pé direito ${form.pe_direito || "?"}m`,
      form.observacoes ? `Observações: ${form.observacoes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(msg), "_blank", "noreferrer");
  };

  const campo =
    "mt-1.5 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-accent";
  const rotulo = "text-xs font-semibold tracking-wide uppercase text-muted-foreground";

  return (
    <SiteShell>
      <PageHero
        eyebrow="Orçamento"
        titulo="Pedir"
        destaque="orçamento"
        descricao="Preencha os dados da obra. Retornamos com a proposta detalhada em até 24 horas úteis."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-[1.3fr_.7fr]">
        <form onSubmit={enviar} className="rounded-sm border border-border bg-card p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={rotulo}>Seu nome *</span>
              <input required value={form.nome} onChange={(e) => set("nome")(e.target.value)} className={campo} />
            </label>
            <label className="block">
              <span className={rotulo}>Telefone / WhatsApp *</span>
              <input
                required
                inputMode="tel"
                value={form.telefone}
                onChange={(e) => set("telefone")(e.target.value)}
                className={campo}
              />
            </label>
            <label className="block">
              <span className={rotulo}>Cidade da obra *</span>
              <input
                required
                value={form.cidade}
                onChange={(e) => set("cidade")(e.target.value)}
                className={campo}
              />
            </label>
            <label className="block">
              <span className={rotulo}>Tipo de estrutura</span>
              <select value={form.produto} onChange={(e) => set("produto")(e.target.value)} className={campo}>
                {PRODUTOS.map((p) => (
                  <option key={p.slug} value={p.nome}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {(
              [
                ["comprimento", "Comprimento (m)"],
                ["largura", "Largura (m)"],
                ["pe_direito", "Pé direito (m)"],
              ] as const
            ).map(([k, label]) => (
              <label key={k} className="block">
                <span className={rotulo}>{label}</span>
                <input
                  type="number"
                  min={0}
                  step="0.5"
                  inputMode="decimal"
                  value={form[k]}
                  onChange={(e) => set(k)(e.target.value)}
                  className={campo}
                />
              </label>
            ))}
          </div>

          <label className="mt-4 block">
            <span className={rotulo}>Observações</span>
            <textarea
              rows={4}
              value={form.observacoes}
              onChange={(e) => set("observacoes")(e.target.value)}
              placeholder="Uso do galpão, prazo, acabamentos, condições do terreno..."
              className={campo}
            />
          </label>

          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 font-display text-sm font-bold tracking-wide uppercase text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            <Send className="h-4 w-4" />
            Enviar pedido
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            O pedido é enviado direto para o WhatsApp da equipe comercial.
          </p>
        </form>

        <aside className="space-y-4">
          <div className="rounded-sm bg-primary p-6 text-primary-foreground">
            <h2 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-accent">
              Como funciona
            </h2>
            <ol className="mt-4 space-y-4 text-sm text-primary-foreground/75">
              {[
                "Você envia as medidas e o tipo de estrutura.",
                "Conferimos o dimensionamento e a lista de materiais.",
                "Enviamos a proposta com prazo, materiais e forma de pagamento.",
                "Aprovado o orçamento, agendamos fabricação e montagem.",
              ].map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-sm bg-accent font-display text-xs font-black text-accent-foreground">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-sm border border-border bg-secondary p-6">
            <h2 className="font-display text-sm font-bold tracking-wide uppercase">Prefere ligar?</h2>
            <a href={`tel:+${EMPRESA.whatsapp}`} className="mt-2 block font-display text-xl font-extrabold">
              {EMPRESA.telefone}
            </a>
            <p className="mt-2 text-sm text-muted-foreground">{EMPRESA.regiao}</p>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
