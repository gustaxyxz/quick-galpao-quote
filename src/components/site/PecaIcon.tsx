import { cn } from "@/lib/utils";

type Props = { grupo: string; opcao: string; className?: string };

const S = {
  stroke: "currentColor",
  fill: "none",
  strokeWidth: 1.4,
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
  pe: {
    engastado_simples: (
      <>
        <path d="M32 6 V32" strokeWidth={2.6} />
        <path d="M22 34 H42" strokeWidth={2} />
        <path d="M26 34 L24 38 M38 34 L40 38" />
      </>
    ),
    pe_trelicado: (
      <>
        <path d="M26 6 V32 M38 6 V32" />
        <path d="M26 10 L38 16 M38 10 L26 16 M26 20 L38 26 M38 20 L26 26" />
        <path d="M20 34 H44" strokeWidth={2} />
      </>
    ),
    pe_trelicado_duplo: (
      <>
        <path d="M20 6 V32 M32 6 V32 M44 6 V32" />
        <path d="M20 10 L32 16 M32 10 L20 16 M32 10 L44 16 M44 10 L32 16" />
        <path d="M20 22 L32 28 M32 22 L20 28 M32 22 L44 28 M44 22 L32 28" />
        <path d="M14 34 H50" strokeWidth={2} />
      </>
    ),
    pe_macico: (
      <>
        <rect x="27" y="6" width="10" height="26" />
        <path d="M27 6 H37 M27 32 H37" strokeWidth={2.2} />
        <path d="M20 34 H44" strokeWidth={2} />
      </>
    ),
    viga_h: (
      <>
        <path d="M24 7 H40 M24 31 H40" strokeWidth={2.6} />
        <path d="M32 7 V31" strokeWidth={2.6} />
        <path d="M18 34 H46" strokeWidth={2} />
      </>
    ),
    viga_i: (
      <>
        <path d="M26 7 H38 M26 31 H38" strokeWidth={2.2} />
        <path d="M32 7 V31" strokeWidth={1.8} />
        <path d="M20 34 H44" strokeWidth={2} />
      </>
    ),
    tubular_reforcado: (
      <>
        <rect x="28" y="6" width="8" height="24" rx="1" />
        <path d="M22 30 H42" strokeWidth={2.4} />
        <path d="M28 30 L24 24 M36 30 L40 24" />
        <path d="M20 34 H44" strokeWidth={2} />
      </>
    ),
  },
  tesoura: {
    duas_aguas_alma_cheia: (
      <>
        <path d="M4 26 L32 11 L60 26" strokeWidth={3} />
        <path d="M4 30 H60" />
        <path d="M6 26 V30 M58 26 V30" />
      </>
    ),
    duas_aguas_trelicada: (
      <>
        <path d="M4 23 L32 9 L60 23" />
        <path d="M4 29 H60" />
        <path d="M4 23 V29 M60 23 V29 M32 9 V29" />
        <path d="M4 29 L18 16 M18 16 V29 M18 29 L32 9 M32 29 L46 16 M46 16 V29 M46 29 L60 23" />
      </>
    ),
    trelica_fink: (
      <>
        <path d="M4 28 L32 10 L60 28 H4 Z" />
        <path d="M32 10 V28" />
        <path d="M18 19 L18 28 M46 19 L46 28" />
        <path d="M18 19 L32 28 M46 19 L32 28" />
      </>
    ),
    trelica_howe: (
      <>
        <path d="M4 28 L32 10 L60 28 H4 Z" />
        <path d="M14 22 V28 M23 16 V28 M32 10 V28 M41 16 V28 M50 22 V28" />
        <path d="M14 28 L23 16 M23 28 L32 10 M41 16 L50 28 M32 10 L41 28" />
      </>
    ),
    trelica_pratt: (
      <>
        <path d="M4 28 L32 10 L60 28 H4 Z" />
        <path d="M14 22 V28 M23 16 V28 M32 10 V28 M41 16 V28 M50 22 V28" />
        <path d="M4 28 L14 22 M14 22 L23 28 M23 16 L32 28 M41 16 L32 28 M50 22 L41 28" />
      </>
    ),
    trelica_warren: (
      <>
        <path d="M4 28 L32 10 L60 28 H4 Z" />
        <path d="M4 28 L18 19 L14 28 L32 10 L50 28 L46 19 L60 28" />
      </>
    ),
    uma_agua: (
      <>
        <path d="M4 12 L60 26" strokeWidth={3} />
        <path d="M4 30 H60" />
        <path d="M5 13 V30 M58 26 V30" />
      </>
    ),
    uma_agua_trelicada: (
      <>
        <path d="M4 11 L60 24" />
        <path d="M4 29 H60" />
        <path d="M4 11 V29 M60 24 V29" />
        <path d="M18 14.2 V29 M32 17.5 V29 M46 20.7 V29" />
        <path d="M4 29 L18 14.2 M18 29 L32 17.5 M32 29 L46 20.7 M46 29 L60 24" />
      </>
    ),
    arco_abaulado: (
      <>
        <path d="M4 28 Q32 6 60 28" />
        <path d="M4 28 H60" />
        <path d="M14 17.5 V28 M32 12 V28 M50 17.5 V28" />
      </>
    ),
    arco_pleno: (
      <>
        <path d="M8 28 A24 24 0 0 1 56 28" />
        <path d="M8 28 H56" />
        <path d="M32 4 V28 M15 13 V28 M49 13 V28" />
      </>
    ),
    arco_trelicado: (
      <>
        <path d="M4 28 Q32 4 60 28" />
        <path d="M8 28 Q32 10 56 28" />
        <path d="M4 28 H60" />
        <path d="M14 16.5 L18 21 M23 11.5 L26 15 M41 11.5 L38 15 M50 16.5 L46 21 M32 8 V13" />
      </>
    ),
    scissor: (
      <>
        <path d="M4 28 L32 10 L60 28" />
        <path d="M4 28 L46 19 M60 28 L18 19" />
        <path d="M32 10 V22" />
      </>
    ),
    mansarda: (
      <>
        <path d="M4 28 L14 18 L32 10 L50 18 L60 28" />
        <path d="M4 28 H60" />
        <path d="M14 18 V28 M50 18 V28 M32 10 V28" />
      </>
    ),
    shed_dente_serra: (
      <>
        <path d="M6 28 V14 L24 22 V10 L42 18 V8 L60 16" />
        <path d="M6 28 H60" />
        <path d="M24 22 V28 M42 18 V28" />
      </>
    ),
    portico_rigido: (
      <>
        <path d="M8 32 V16 L32 8 L56 16 V32" strokeWidth={2.4} />
        <path d="M4 34 H60" />
        <path d="M14 16 L14 22 M50 16 V22" />
      </>
    ),
    trelica_espacial: (
      <>
        <path d="M4 14 H60 M4 26 H60" />
        <path d="M4 14 L14 26 L24 14 L34 26 L44 14 L54 26 L60 14" />
        <path d="M4 26 L14 14 M24 26 L34 14 M44 26 L54 14" />
      </>
    ),
  },
  coluna: {
    perfil_u: (
      <>
        <path d="M20 8 V32 H44 V8" />
        <path d="M25 8 V27 H39 V8" />
      </>
    ),
    perfil_ue: (
      <>
        <path d="M20 12 V8 M20 8 H20" />
        <path d="M22 8 V32 H42 V8" />
        <path d="M27 8 V27 H37 V8" />
        <path d="M22 8 H18 M42 8 H46" />
      </>
    ),
    tubo_ret: (
      <>
        <rect x="20" y="8" width="24" height="24" rx="1" />
        <rect x="25" y="13" width="14" height="14" rx="1" />
      </>
    ),
    tubo_red: (
      <>
        <circle cx="32" cy="20" r="12" />
        <circle cx="32" cy="20" r="8" />
      </>
    ),
    perfil_i: (
      <>
        <path d="M18 8 H46 M18 32 H46" />
        <path d="M32 8 V32" strokeWidth={2.6} />
        <path d="M18 8 V11 M46 8 V11 M18 32 V29 M46 32 V29" />
      </>
    ),
    perfil_w: <path d="M18 8 H46 V12 H35 V28 H46 V32 H18 V28 H29 V12 H18 Z" />,
    trelicada: (
      <>
        <path d="M22 6 V34 M42 6 V34" />
        <path d="M22 10 L42 18 L22 26 L42 34" />
        <path d="M22 18 H42 M22 26 H42" />
      </>
    ),
  },
  terca: {
    c_simples: (
      <>
        <path d="M14 10 H24 V30 H14" />
        <path d="M50 10 H40 V30 H50" />
      </>
    ),
    ze_enrigecida: (
      <>
        <path d="M14 10 H26 V30 H38" />
        <path d="M14 14 V10 M38 26 V30" />
      </>
    ),
    u_dobrada: <path d="M20 10 V30 H44 V10" />,
    caixao: (
      <>
        <rect x="16" y="12" width="32" height="16" />
        <path d="M32 12 V28" />
      </>
    ),
    tubular: (
      <>
        <rect x="14" y="14" width="36" height="12" rx="1" />
        <rect x="18" y="17" width="28" height="6" rx="1" />
      </>
    ),
    trelicada: (
      <>
        <path d="M8 14 H56 M8 26 H56" />
        <path d="M8 26 L20 14 L32 26 L44 14 L56 26" />
      </>
    ),
    i_laminada: (
      <>
        <path d="M14 12 H50 M14 28 H50" />
        <path d="M32 12 V28" strokeWidth={2.6} />
      </>
    ),
  },
  tirante: {
    sem: <path d="M10 12 L54 28 M10 28 L54 12" strokeDasharray="3 3" />,
    barra_redonda: (
      <>
        <path d="M8 12 H56" strokeWidth={2.2} />
        <path d="M8 28 H56" strokeWidth={2.2} />
        <path d="M8 12 L56 28 M8 28 L56 12" />
      </>
    ),
    barra_rosqueada: (
      <>
        <path d="M6 20 H24 M40 20 H58" strokeWidth={2.2} />
        <rect x="24" y="15" width="16" height="10" rx="2" />
        <path d="M10 16 V24 M14 16 V24 M18 16 V24 M46 16 V24 M50 16 V24 M54 16 V24" />
      </>
    ),
    cantoneira: (
      <>
        <path d="M14 10 V30 H46" strokeWidth={2.6} />
        <path d="M20 14 H24 M20 22 H24 M30 26 V30 M38 26 V30" />
      </>
    ),
    tubo_galv: (
      <>
        <rect x="8" y="16" width="48" height="8" rx="4" />
        <path d="M20 16 V24 M44 16 V24" />
      </>
    ),
    cabo_aco: (
      <>
        <path d="M8 20 q6 -6 12 0 q6 6 12 0 q6 -6 12 0 q6 6 12 0" />
        <circle cx="8" cy="20" r="2.5" />
        <circle cx="56" cy="20" r="2.5" />
      </>
    ),
  },
  telha: {
    ondulada_043: <path d="M4 22 q5 -7 10 0 q5 7 10 0 q5 -7 10 0 q5 7 10 0 q5 -7 10 0" />,
    ondulada_050: (
      <>
        <path d="M4 20 q5 -7 10 0 q5 7 10 0 q5 -7 10 0 q5 7 10 0 q5 -7 10 0" strokeWidth={2.6} />
      </>
    ),
    trapezoidal_040: (
      <path d="M4 26 H10 L13 18 H18 L21 26 H30 L33 18 H38 L41 26 H50 L53 18 H58 L60 26" />
    ),
    trapezoidal_050: (
      <path d="M4 27 H10 L14 14 H20 L24 27 H32 L36 14 H42 L46 27 H54 L58 14 H60" />
    ),
    trapezoidal_065: (
      <path
        d="M4 28 H10 L14 12 H21 L25 28 H33 L37 12 H44 L48 28 H56 L60 12"
        strokeWidth={2.8}
      />
    ),
    zipada: (
      <>
        <path d="M4 26 H16 L16 14 L20 14 L20 26 H36 L36 14 L40 14 L40 26 H56 L56 14 L60 14" />
      </>
    ),
    sanduiche_30: (
      <>
        <path d="M4 16 H60 M4 24 H60" />
        <path d="M8 16 L14 24 M18 16 L24 24 M28 16 L34 24 M38 16 L44 24 M48 16 L54 24" />
      </>
    ),
    sanduiche_50: (
      <>
        <path d="M4 12 H60 M4 28 H60" />
        <path d="M8 12 L16 28 M20 12 L28 28 M32 12 L40 28 M44 12 L52 28" />
      </>
    ),
    autoportante: (
      <>
        <path d="M4 30 Q32 6 60 30" />
        <path d="M8 30 Q32 11 56 30" />
      </>
    ),
    galvalume: (
      <>
        <path d="M4 26 H14 L18 16 H26 L30 26 H40 L44 16 H52 L56 26 H60" />
        <path d="M20 22 L23 19 M46 22 L49 19" />
      </>
    ),
    policarbonato: (
      <>
        <rect x="6" y="14" width="52" height="12" rx="1" />
        <path d="M6 18 H58 M6 22 H58" />
        <path d="M18 14 V26 M30 14 V26 M42 14 V26" />
      </>
    ),
    fibrocimento: (
      <>
        <path d="M4 24 q6 -8 12 0 q6 8 12 0 q6 -8 12 0 q6 8 12 0" strokeDasharray="6 2" />
        <path d="M4 30 H60" />
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
    oitao: (
      <>
        <path d="M8 30 H56 M8 30 V12 M56 30 V12" strokeDasharray="3 3" />
        <path d="M20 12 L32 6 L44 12 V30 H20 Z" />
      </>
    ),
    meia_parede: (
      <>
        <path d="M8 12 V30 H56 V12" strokeDasharray="3 3" />
        <rect x="8" y="21" width="48" height="9" />
      </>
    ),
    tres_quartos: (
      <>
        <path d="M8 12 V30 H56 V12" strokeDasharray="3 3" />
        <rect x="8" y="16.5" width="48" height="13.5" />
      </>
    ),
    completo: (
      <>
        <rect x="8" y="12" width="48" height="18" />
        <path d="M20 12 V30 M32 12 V30 M44 12 V30" />
      </>
    ),
    completo_isotermico: (
      <>
        <rect x="8" y="12" width="48" height="18" />
        <path d="M8 16 H56 M8 26 H56" />
        <path d="M14 16 L20 26 M26 16 L32 26 M38 16 L44 26" />
      </>
    ),
    alvenaria_meia: (
      <>
        <path d="M8 12 V30 H56 V12" strokeDasharray="3 3" />
        <rect x="8" y="20" width="48" height="10" />
        <path d="M8 25 H56 M18 20 V25 M32 20 V25 M46 20 V25 M12 25 V30 M26 25 V30 M40 25 V30 M52 25 V30" />
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
    duas_folhas: (
      <>
        <rect x="14" y="12" width="36" height="18" />
        <path d="M32 12 V30" />
        <path d="M20 12 V30 M26 12 V30 M38 12 V30 M44 12 V30" />
      </>
    ),
    enrolar: (
      <>
        <path d="M14 10 H50" strokeWidth={2.4} />
        <path d="M16 16 H48 M16 20 H48 M16 24 H48 M16 28 H48" />
        <path d="M14 30 H50" />
      </>
    ),
    seccionado: (
      <>
        <rect x="14" y="12" width="36" height="18" />
        <path d="M14 18 H50 M14 24 H50" />
        <path d="M50 10 q6 2 6 8" strokeDasharray="3 2" />
      </>
    ),
  },
  pintura: {
    galvanizado: (
      <>
        <rect x="14" y="14" width="36" height="12" rx="1" />
        <path d="M20 14 L26 26 M30 14 L36 26 M40 14 L46 26" />
      </>
    ),
    primer: (
      <>
        <rect x="14" y="14" width="36" height="12" rx="1" />
        <path d="M14 20 H50" strokeDasharray="4 2" />
      </>
    ),
    esmalte: (
      <>
        <path d="M22 12 H42 V18 H22 Z" />
        <path d="M32 18 V26" />
        <path d="M26 26 H38 L36 34 H28 Z" />
      </>
    ),
    epoxi: (
      <>
        <rect x="16" y="14" width="32" height="12" rx="1" />
        <path d="M16 18 H48 M16 22 H48" />
        <path d="M32 6 V12 M26 9 L32 12 L38 9" />
      </>
    ),
    galvanizacao_fogo: (
      <>
        <path d="M10 24 q10 8 22 0 q10 -8 22 0" />
        <path d="M32 8 q6 6 3 10 q-3 -4 -6 0 q-3 -6 3 -10 Z" />
        <path d="M10 30 H54" />
      </>
    ),
    po_eletrostatica: (
      <>
        <rect x="18" y="16" width="28" height="10" rx="1" />
        <circle cx="12" cy="14" r="1.4" />
        <circle cx="14" cy="22" r="1.4" />
        <circle cx="11" cy="29" r="1.4" />
        <circle cx="52" cy="13" r="1.4" />
        <circle cx="54" cy="24" r="1.4" />
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
