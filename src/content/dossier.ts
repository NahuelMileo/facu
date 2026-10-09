/**
 * ─────────────────────────────────────────────────────────────
 *  FILE 023 — CONTENIDO
 * ─────────────────────────────────────────────────────────────
 *  Todo lo que se ve en la página sale de este archivo.
 *
 *  FOTOS: poné los archivos en /public/photos con el nombre que
 *  figura en cada `src`. Si una foto no existe, la página muestra
 *  un marco de "SIN IMAGEN EN ARCHIVO" en su lugar (no se rompe nada).
 *
 *  FECHAS: `null` se muestra como una barra censurada (████).
 *  Sirve para lo que todavía no sabés o preferís no mostrar.
 *
 *  Todo lo marcado con  // EDITAR  es un placeholder para reemplazar.
 * ─────────────────────────────────────────────────────────────
 */

export type Photo = {
  src: string;
  alt: string;
  /** object-position, e.g. "50% 30%" to frame faces */
  focus?: string;
};

/* ───────────────────────── HERO ───────────────────────── */

export const hero = {
  classification: "CLASIFICADO",
  title: "EXPEDIENTE DE INTELIGENCIA PERSONAL",
  subject: "FACUNDO",
  fileId: "023",
  status: "ACTIVO",
  report: "INFORME ANUAL DE ESTADO / 2027",
  meta: [
    ["Rango actual", "Alférez"],
    ["Ocupación", "Piloto"],
    ["Vehículo propio", "Confirmado"],
    ["Nivel de amenaza", "Insignificante"],
    ["Nivel de ambición", "Elevado"],
  ] as [string, string][],
  unlock: ["VERIFICANDO IDENTIDAD", "AUTORIZACIÓN CONFIRMADA", "ACCESO CONCEDIDO"],
  distribution: "DISTRIBUCIÓN: SOLO ANALISTA / SUJETO",
  contents: "Contenido: 7 hojas, 1 archivo fotográfico, 1 nota personal. Prohibida su reproducción fuera del círculo de confianza.",
};

/* ───────────────────────── 01 — PROFILE ───────────────────────── */

export const profile = {
  photo: {
    src: "/photos/profile.jpg", // EDITAR: foto grande de Facu
    alt: "Facundo — fotografía de archivo",
    focus: "50% 25%",
  } as Photo,
  photoCaption: "FOTOGRAFÍA DE ARCHIVO — REF. 023/A",
  fields: [
    ["NOMBRE", "Facundo"],
    ["ESTADO", "Activo"],
    ["OCUPACIÓN", "Piloto"],
    ["RANGO", "Alférez"],
    ["ANALISTA ASIGNADO", "Nahuel"],
    ["PERÍODO DE OBSERVACIÓN", "Desde la infancia"],
    ["FIABILIDAD DE LA FUENTE", "Dudosa"],
    ["EVALUACIÓN DE LEALTAD", "Absoluta"],
  ] as [string, string][],
  indicators: [
    { label: "AMBICIÓN", value: 100 },
    { label: "LEALTAD", value: 100 },
    { label: "CAPACIDAD DE DEJAR DE HABLAR DE AUTOS", value: 20, alert: true },
    { label: "RESPONSABILIDAD ADULTA", value: 70 },
  ],
};

/* ───────────────────────── 02 — TIMELINE ───────────────────────── */

export type CaseFile = {
  code: string;
  title: string;
  date: string | null;
  body: string;
  photo?: Photo;
};

export const timeline: CaseFile[] = [
  {
    code: "001",
    title: "AÑOS DE ESCUELA",
    date: null, // EDITAR: año en que se conocieron
    body: "Primer contacto registrado entre el sujeto y el analista asignado. Evaluación inicial: habla demasiado de aviones.",
    photo: { src: "/photos/case-001.jpg", alt: "Años de escuela" }, // EDITAR
  },
  {
    code: "014",
    title: "MONTEVIDEO",
    date: null, // EDITAR
    body: "La amistad continúa tras la mudanza. La distancia no logra reducir el volumen de comunicación.",
    photo: { src: "/photos/case-014.jpg", alt: "Montevideo" }, // EDITAR
  },
  {
    code: "021",
    title: "FORMACIÓN DE PILOTO COMPLETADA",
    date: "2025",
    body: "El sujeto se convierte oficialmente en piloto. Años de conversaciones teóricas sobre aviación obtienen un número de licencia.",
    photo: { src: "/photos/case-021.jpg", alt: "Graduación de piloto" }, // EDITAR
  },
  {
    code: "022",
    title: "DESPLIEGUE PROFESIONAL",
    date: "14.01.2026",
    body: "El sujeto comienza a trabajar como alférez. Primer sueldo. Primeras responsabilidades reales. Primer uniforme usado sin que sea un disfraz.",
    photo: { src: "/photos/case-022.jpg", alt: "Primer día como alférez" }, // EDITAR
  },
  {
    code: "023",
    title: "PRIMER VEHÍCULO ADQUIRIDO",
    date: "2026",
    body: "Propiedad de vehículo confirmada. Analista notificado en cuestión de minutos. La evidencia fotográfica llegó de inmediato.",
    photo: { src: "/photos/case-023.jpg", alt: "Primer auto" }, // EDITAR
  },
];

/* ───────────────────────── 03 — RECENT DEVELOPMENTS ───────────────────────── */

export const developments = {
  // encabezado de los memorándums
  memo: { to: "Archivo central", from: "Analista asignado" },
  professional: {
    tag: "ESTADO PROFESIONAL",
    date: "14.01.2027",
    headline: "UN AÑO COMO ALFÉREZ",
    body: [
      "La transición de estudiante a oficial profesional está completa.",
      "El sujeto sobrevivió con éxito aproximadamente un año de responsabilidades reales.",
    ],
    photo: {
      src: "/photos/career.jpg", // EDITAR: foto de uniforme / ETA / avión
      alt: "Sujeto en servicio",
      focus: "50% 40%",
    } as Photo,
  },
  vehicle: {
    tag: "INFORME DE ADQUISICIÓN DE ACTIVOS",
    headline: "PRIMER VEHÍCULO ADQUIRIDO",
    photos: [
      { src: "/photos/car-1.jpg", alt: "Vehículo — frente" }, // EDITAR
      { src: "/photos/car-2.jpg", alt: "Vehículo — lateral" }, // EDITAR
      { src: "/photos/car-3.jpg", alt: "Vehículo — detalle" }, // EDITAR
    ] as Photo[],
    fields: [
      ["TIPO DE ACTIVO", "Vehículo"],
      ["ESTADO", "Adquirido"],
      ["PROPIEDAD", "Confirmada"],
      ["SATISFACCIÓN DEL DUEÑO", "Extremadamente alta"],
      ["FOTOS ENVIADAS AL ANALISTA", "Excesivas"],
    ] as [string, string][],
    // EDITAR: datos reales del auto. Si dejás un valor en null, sale censurado.
    specs: [
      ["MARCA / MODELO", null],
      ["AÑO", null],
      ["COLOR", null],
      ["MATRÍCULA", null],
      ["ADQUIRIDO", "2026"],
    ] as [string, string | null][],
  },
  behavior: {
    tag: "CONDUCTA A LARGO PLAZO",
    subject: "Patrones de conducta observados",
    period: "Desde la infancia — presente",
    body: "El sujeto sigue mostrando niveles inusualmente altos de ambición.",
    topicsLabel: "Temas de conversación recurrentes conocidos:",
    // [tema, frecuencia observada]
    topics: [
      ["autos", "Crítica"],
      ["aviación", "Alta"],
      ["carreras", "Alta"],
      ["plata", "Persistente"],
      ["planes a futuro", "Constante"],
      ["compras poco realistas", "Diaria"],
    ] as [string, string][],
    conclusion: "No se recomienda ninguna acción correctiva. Patrón considerado saludable.",
  },
};

/* ───────────────────────── 04 — EVIDENCE ARCHIVE ───────────────────────── */

export type Evidence = {
  id: string;
  photo: Photo;
  date?: string | null;
  location?: string;
  description?: string;
  status?: string;
  /** "tall" | "wide" changes the tile shape in the grid */
  shape?: "tall" | "wide" | "square";
};

// EDITAR: reemplazá / agregá / sacá los que quieras. Pueden ser fotos,
// screenshots de chats, lo que sea. Mantené los ids como te gusten.
export const evidence: Evidence[] = [
  {
    id: "001",
    photo: { src: "/photos/evidence-001.jpg", alt: "Chuy, 2014" },
    date: "2014",
    location: "Chuy",
    status: "Verificada",
    shape: "tall",
  },
  {
    id: "006",
    photo: { src: "/photos/evidence-006.jpg", alt: "Escuela" },
    date: null,
    location: "Chuy",
    description: "Sujetos fotografiados antes de que cualquiera de los dos tuviera un plan. Ninguno parece preocupado.",
    shape: "square",
  },
  {
    id: "011",
    photo: { src: "/photos/evidence-011.jpg", alt: "Captura de pantalla" },
    description: "Captura recuperada del dispositivo del analista. El contenido habla por sí solo.",
    status: "Admisible",
    shape: "square",
  },
  {
    id: "017",
    photo: { src: "/photos/evidence-017.jpg", alt: "Montevideo" },
    location: "Montevideo",
    description: "Más evidencia de una asociación a largo plazo.",
    shape: "wide",
  },
  {
    id: "019",
    photo: { src: "/photos/evidence-019.jpg", alt: "Salida nocturna" },
    date: null,
    description: "Los detalles de esta operación siguen siendo clasificados. Por el bien de todos.",
    status: "Sellada",
    shape: "tall",
  },
  {
    id: "024",
    photo: { src: "/photos/evidence-024.jpg", alt: "Autos" },
    description: "Otra conversación más sobre autos que ninguno de los dos podía pagar.",
    status: "Recurrente",
    shape: "square",
  },
  {
    id: "027",
    photo: { src: "/photos/evidence-027.jpg", alt: "Graduación" },
    date: "2025",
    description: "El sujeto recibe su licencia de piloto. Analista presente. Analista orgulloso. El analista lo negará.",
    status: "Verificada",
    shape: "wide",
  },
  {
    id: "031",
    photo: { src: "/photos/evidence-031.jpg", alt: "El auto" },
    date: "2026",
    description: "Fotografía 1 de aproximadamente 60 recibidas sobre el mismo vehículo.",
    status: "Verificada",
    shape: "square",
  },
];

/* ───────────────────────── 05 — COMMUNICATION LOG ───────────────────────── */

export type Intercept =
  | {
      kind: "quote";
      id: string;
      speaker: string;
      quote: string;
      note: string;
    }
  | {
      kind: "summary";
      id: string;
      fields: [string, string][];
    };

// EDITAR: acá van las bromas internas de verdad. Estas son de muestra.
export const comms: Intercept[] = [
  {
    kind: "quote",
    id: "032",
    speaker: "FACUNDO",
    quote: "Algún día me compro uno de estos.",
    note: "El sujeto hizo afirmaciones similares sobre aproximadamente 47 vehículos distintos.",
  },
  {
    kind: "summary",
    id: "041",
    fields: [
      ["Tema", "Planes a futuro"],
      ["Duración", "02:13:42"],
      ["Conclusión", "Ninguno de los dos participantes sabe exactamente lo que está haciendo."],
    ],
  },
  {
    kind: "quote",
    id: "046",
    speaker: "FACUNDO",
    quote: "Este año arrancamos en serio.",
    note: "Declaración interceptada por primera vez hace varios años. Se repite anualmente. Nivel de confianza intacto.",
  },
  {
    kind: "summary",
    id: "052",
    fields: [
      ["Tema", "Proyecciones salariales"],
      ["Método", "Calculadora del celular, 3 a. m."],
      ["Resultado", "Extremadamente optimista. Archivado para revisión futura."],
    ],
  },
  {
    kind: "quote",
    id: "058",
    speaker: "FACUNDO",
    quote: "Mirá, te mando unas fotos del auto.",
    note: "Mensaje seguido de 14 imágenes. El vehículo no se había movido desde la tanda anterior.",
  },
];

/* ───────────────────────── 06 — ANALYST ASSESSMENT ───────────────────────── */

export const assessment = {
  label: "NOTA PERSONAL DEL ANALISTA",
  photo: {
    src: "/photos/us.jpg", // EDITAR: la foto de ustedes dos
    alt: "Facundo y Nahuel",
    focus: "50% 40%",
  } as Photo,
  paragraphs: [
    "Un año después del último informe, hay varias novedades.",
    "El piloto recién recibido ahora es alférez, trabaja, tiene su primer auto y, lentamente, empieza a parecer una persona adulta. Lentamente.",
    "Y es raro verlo desde mi lado, porque yo todavía veo al mismo Facu con el que crecí.",
    "El mismo con el que hablaba de autos que no podíamos comprar, trabajos que todavía no teníamos y vidas que todavía no habíamos empezado.",
    "Solo que ahora algunas de esas conversaciones empezaron a dejar de ser hipotéticas.",
    "Y creo que eso es de las cosas más lindas de crecer con alguien.",
    "No solamente conocer quién es, sino haber conocido todas las versiones anteriores.",
  ],
  versions: [
    "El Facu de la escuela.",
    "El de Montevideo.",
    "El que quería ser piloto.",
    "El que se recibió.",
    "El alférez.",
    "El del primer auto.",
  ],
  closing: [
    "Y seguramente todavía me falten conocer unas cuantas.",
    "No sé exactamente dónde vamos a estar dentro de diez años.",
    "Probablemente sigamos hablando de autos ridículamente caros y haciendo planes que suenan imposibles.",
    "Pero espero poder seguir estando ahí para ver cómo se van haciendo realidad.",
  ],
  signature: "Nahuel",
};

/* ───────────────────────── FINAL ───────────────────────── */

export const finalAssessment = {
  rows: [
    ["ESTADO DEL SUJETO", "EN PROGRESO"],
    ["TRAYECTORIA PROFESIONAL", "POSITIVA"],
    ["AMBICIÓN", "SIN CAMBIOS"],
    ["ESTADO DE LA AMISTAD", "PERMANENTE"],
  ] as [string, string][],
  recommendation: "MANTENER CONTACTO CERCANO POR TIEMPO INDEFINIDO.",
  birthday: "FELIZ CUMPLEAÑOS, HERMANO.",
  signature: "— NAHUEL",
  footer: "EL EXPEDIENTE SIGUE ABIERTO.",
};

/* ───────────────────────── NOTAS DEL ANALISTA ─────────────────────────
 * Comentarios al margen. En /2027 salen como notas del analista;
 * en /2027/a, escritas a mano con birome.
 */

export const analystNotes = {
  index: "leer en orden",
  profileCars: "siendo generoso",
  history: "+60 fotos del auto",
  vehicle: "la mejor, según él",
  behavior: "todos confirmados",
  comms: "47 es poco",
};
