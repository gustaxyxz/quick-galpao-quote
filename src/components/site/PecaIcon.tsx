import { cn } from "@/lib/utils";

type Props = { grupo: string; opcao: string; className?: string };

const S = {
  stroke: "currentColor",
  fill: "none",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 64 40" className="h-10 w-16 shrink-0" aria-hidden="true">
      <g {...S}>{children}</g>
    </svg>
  );
}

const desenhos: Record<string, Record<string, React.ReactNode>> = {
  tesoura: {
    duas_aguas: (
      <>
        <path d="M4 28 L32 10 L60 28" />
        <path d="M4 28 H60" />
        <path d="M32 10 V28 M18 19 V28 M46 19 V28" />
        <path d="M4 28 L18 19 M32 28 L18 19 M32 28 L46 19 M60 28 L46 19" />
      </>
    ),
    uma_agua: (
      <>
        <path d="M4 12 L60 28 H4 Z" />
        <path d="M18 16 V28 M32 20 V28 M46 24 V28" />
        <path d="M4 28 L18 16 M18 28 L32 20 M32 28 L46 24" />
      </>
    ),
    arco_abaulado: (
      <>
        <path d="M4 28 Q32 4 60 28" />
        <path d="M4 28 H60" />
        <path d="M14 18.5 V28 M32 12 V28 M50 18.5 V28" />
      </>
    ),
    scissor: (
      <>
        <path d="M4 28 L32 10 L60 28" />
        <path d="M4 28 L44 20 M60 28 L20 20" />
        <path d="M32 10 V28" />
      </>
    ),
  },
  coluna: {
    perfil_u: (
      <>
        <path d="M20 8 H30 V32 H44 V8" transform="translate(0,0)" />
        <path d="M20 8 V32 H30" />
      </>
    ),
    tubo_ret: (
      <>
        <rect x="20" y="8" width="24" height="24" rx="1" />
        <rect x="25" y="13" width="14" height="14" rx="1" />
      </>
    ),
    perfil_w: (
      <>
        <path d="M18 9 H46 M18 31 H46" />
        <path d="M32 9 V31" />
        <path d="M22 9 V11 M42 9 V11 M22 29 V31 M42 29 V31" />
      </>
    ),
  },
  terca: {
    simples: (
      <>
        <path d="M14 10 H24 V30 H14" />
        <path d="M50 10 H40 V30 H50" />
      </>
    ),
    enrigecida: (
      <>
        <path d="M14 14 V10 H24 V30 H14 V26" />
        <path d="M50 14 V10 H40 V30 H50 V26" />
      </>
    ),
  },
  telha: {
    ondulada_043: (
      <path d="M4 22 q5 -8 10 0 q5 8 10 0 q5 -8 10 0 q5 8 10 0 q5 -8 10 0" />
    ),
    trapezoidal_050: (
      <path d="M4 26 H10 L14 14 H20 L24 26 H32 L36 14 H42 L46 26 H54 L58 14 H60" />
    ),
    sanduiche: (
      <>
        <path d="M4 14 H60 M4 26 H60" />
        <path d="M10 14 V26 M20 14 V26 M30 14 V26 M40 14 V26 M50 14 V26" />
      </>
    ),
  },
  fechamento: {
    sem: (
      <>
        <path d="M8 30 H56" />
        <path d="M8 30 V12 M56 30 V12" strokeDasharray="3 3" />
      </>
    ),
    meia_parede: (
      <>
        <path d="M8 12 V30 H56 V12" strokeDasharray="3 3" />
        <rect x="8" y="21" width="48" height="9" />
      </>
    ),
    completo: (
      <>
        <rect x="8" y="12" width="48" height="18" />
        <path d="M20 12 V30 M32 12 V30 M44 12 V30" />
      </>
    ),
  },
  portao: {
    sem: <path d="M12 30 H52 M20 30 V16 M44 30 V16" strokeDasharray="3 3" />,
    basculante: (
      <>
        <rect x="16" y="12" width="32" height="18" />
        <path d="M16 18 H48 M16 24 H48" />
        <path d="M52 12 q6 6 0 12" strokeDasharray="3 2" />
      </>
    ),
    deslizante: (
      <>
        <rect x="14" y="12" width="26" height="18" />
        <path d="M20 12 V30 M27 12 V30 M34 12 V30" />
        <path d="M12 33 H56" />
        <path d="M44 21 H54 M50 17 L54 21 L50 25" />
      </>
    ),
  },
};

export function PecaIcon({ grupo, opcao, className }: Props) {
  const node = desenhos[grupo]?.[opcao];
  if (!node) return null;
  return (
    <span className={cn("block text-current", className)}>
      <Frame>{node}</Frame>
    </span>
  );
}