import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { WhatsappFab } from "./WhatsappFab";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsappFab />
    </div>
  );
}

export function PageHero({
  eyebrow,
  titulo,
  destaque,
  descricao,
}: {
  eyebrow?: string;
  titulo: string;
  destaque?: string;
  descricao?: string;
}) {
  return (
    <section className="border-b border-white/10 bg-primary py-14 text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4">
        {eyebrow ? (
          <p className="mb-3 font-display text-xs font-bold tracking-[0.25em] uppercase text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl font-extrabold uppercase sm:text-4xl">
          {titulo} {destaque ? <span className="text-accent">{destaque}</span> : null}
        </h1>
        {descricao ? (
          <p className="mt-3 max-w-2xl text-sm text-primary-foreground/70 sm:text-base">
            {descricao}
          </p>
        ) : null}
      </div>
    </section>
  );
}
