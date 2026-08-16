import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { EMPRESA, whatsappLink } from "@/lib/empresa";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="h-1.5 hatch" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-extrabold uppercase">
            Metalúrgica <span className="text-accent">Oliveira</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-primary-foreground/65">
            Fabricação, venda e montagem de estruturas metálicas para galpões agrícolas, comerciais
            e industriais.
          </p>
          <p className="mt-4 flex items-start gap-2 text-xs text-primary-foreground/55">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            {EMPRESA.regiao}
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <p className="mb-1 font-display text-xs font-bold tracking-[0.2em] uppercase text-accent">
            Navegação
          </p>
          <Link to="/" className="text-primary-foreground/70 hover:text-accent">
            Início
          </Link>
          <Link to="/produtos" className="text-primary-foreground/70 hover:text-accent">
            Produtos
          </Link>
          <Link to="/calculadora" className="text-primary-foreground/70 hover:text-accent">
            Calculadora de galpão
          </Link>
          <Link to="/orcamento" className="text-primary-foreground/70 hover:text-accent">
            Solicitar orçamento
          </Link>
          <Link to="/contato" className="text-primary-foreground/70 hover:text-accent">
            Contato
          </Link>
        </nav>

        <div>
          <p className="mb-3 font-display text-xs font-bold tracking-[0.2em] uppercase text-accent">
            Fale com a gente
          </p>
          <a
            href={whatsappLink("Olá! Gostaria de um orçamento de galpão.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-accent px-4 py-2.5 font-display text-sm font-bold uppercase text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Phone className="h-4 w-4" />
            {EMPRESA.telefone}
          </a>
          <p className="mt-4 text-xs text-primary-foreground/50">
            Atendimento de segunda a sábado, 7h30 às 18h.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-primary-foreground/45">
        © {new Date().getFullYear()} {EMPRESA.nome} — Todos os direitos reservados.
      </div>
    </footer>
  );
}
