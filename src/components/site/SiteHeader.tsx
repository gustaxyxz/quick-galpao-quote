import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Calculator, FileText, Home, Menu, Package, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EMPRESA } from "@/lib/empresa";

const links = [
  { to: "/", label: "Início", icon: Home },
  { to: "/produtos", label: "Produtos", icon: Package },
  { to: "/orcamento", label: "Orçamento", icon: FileText },
  { to: "/contato", label: "Contato", icon: Phone },
] as const;

export function SiteHeader() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setAberto(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-sm bg-accent font-display text-lg font-black text-accent-foreground">
            MO
          </span>
          <span className="hidden font-display text-sm leading-tight font-extrabold uppercase sm:block">
            Metalúrgica
            <br />
            <span className="text-accent">Oliveira</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "text-accent" }}
              className="rounded-sm px-3 py-2 text-sm font-semibold tracking-wide uppercase text-primary-foreground/75 transition-colors hover:text-accent"
            >
              {label}
            </Link>
          ))}
          <Link
            to="/calculadora"
            className="ml-2 inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2.5 font-display text-sm font-bold tracking-wide uppercase text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            <Calculator className="h-4 w-4" />
            Calcule seu galpão
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 md:hidden"
          aria-label="Abrir menu"
          aria-expanded={aberto}
        >
          {aberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 md:hidden",
          aberto ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="flex flex-col p-3">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "text-accent" }}
              onClick={() => setAberto(false)}
              className="flex items-center gap-3 rounded-sm px-3 py-3 text-sm font-semibold uppercase"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <Link
            to="/calculadora"
            onClick={() => setAberto(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-sm bg-accent px-4 py-3 font-display text-sm font-bold uppercase text-accent-foreground"
          >
            <Calculator className="h-4 w-4" />
            Calcule seu galpão
          </Link>
          <a
            href={`tel:+${EMPRESA.whatsapp}`}
            className="mt-1 px-3 py-3 text-center text-xs text-primary-foreground/60"
          >
            {EMPRESA.telefone}
          </a>
        </nav>
      </div>
    </header>
  );
}
