export type ProductoResultado = {
  label: string;
  valorLabel: string;
  limiteLabel: string;
  /** Fracción del límite normativo utilizada (0–1). Cuanto más baja, más margen. */
  fraccion: number;
  mejora?: string;
};

export type ProductoGrupoLista = {
  tipo: "lista";
  id: string;
  titulo: string;
  items: string[];
};

export type ProductoGrupoTabla = {
  tipo: "tabla";
  id: string;
  titulo: string;
  columnas: string[];
  filas: string[][];
};

export type ProductoGrupoBarras = {
  tipo: "barras";
  id: string;
  titulo: string;
  items: ProductoResultado[];
};

export type ProductoGrupo = ProductoGrupoLista | ProductoGrupoTabla | ProductoGrupoBarras;

export type ProductoSeccion = {
  numero: string;
  titulo: string;
  descripcion: string;
  beneficios: string[];
  grupos: ProductoGrupo[];
};

export const PRODUCTO_SECCIONES: ProductoSeccion[] = [
  {
    numero: "01",
    titulo: "Estructura de acero Q235B — verificada por ingeniería",
    descripcion:
      "Cada unidad MOVARA se calcula antes de fabricarse, no después. La estructura pasa por un análisis de ingeniería con 96 combinaciones de carga que verifica los márgenes de seguridad reales frente a sismo, viento y uso — no solo que \"cumple la norma\".",
    beneficios: [
      "Resiste sismos 12 veces por encima del mínimo normativo",
      "Resiste vientos 6 veces por encima del mínimo normativo",
      "Estructura calculada con 96 combinaciones de carga",
      "Equivalente al acero ASTM A36 usado en construcción civil internacional",
    ],
    grupos: [
      {
        tipo: "lista",
        id: "specs",
        titulo: "Especificaciones técnicas",
        items: [
          "Grado: Q235B — norma GB/T 700-2006",
          "Equivalencia: ASTM A36 / S235JR",
          "Límite elástico: ≥235 MPa",
          "Resistencia a tracción: 370–500 MPa",
          "Peso total: 3.500 kg",
          "Software: PKPM 2021 V1.4.0",
        ],
      },
      {
        tipo: "barras",
        id: "resultados",
        titulo: "Resultados de verificación estructural",
        items: [
          {
            label: "Relación tensión máxima",
            valorLabel: "0.802",
            limiteLabel: "límite 1.0",
            fraccion: 0.802,
          },
          {
            label: "Deflexión máxima",
            valorLabel: "L/790",
            limiteLabel: "límite L/180",
            fraccion: 180 / 790,
            mejora: "4x mejor",
          },
          {
            label: "Desplazamiento por viento",
            valorLabel: "H/368",
            limiteLabel: "límite H/60",
            fraccion: 60 / 368,
            mejora: "6x mejor",
          },
          {
            label: "Desplazamiento sísmico",
            valorLabel: "H/742",
            limiteLabel: "límite H/60",
            fraccion: 60 / 742,
            mejora: "12x mejor",
          },
        ],
      },
    ],
  },
  {
    numero: "02",
    titulo: "3 capas de protección industrial — apta para costa y campo",
    descripcion:
      "El acero no se pinta una sola vez: se protege con un sistema de 3 capas aplicado en taller, bajo condiciones controladas, pensado para resistir humedad, salinidad y exposición permanente a la intemperie sin repintar cada par de años.",
    beneficios: [
      "3 capas de pintura industrial aplicadas en taller",
      "Apta para ambientes costeros e industriales (ISO 12944 C3-C4)",
      "Durabilidad estimada: 10–15 años sin repintado",
      "Preparación de superficie por granallado grado Sa 2.5",
    ],
    grupos: [
      {
        tipo: "lista",
        id: "specs",
        titulo: "Especificaciones técnicas",
        items: [
          "Capa 1: Epoxi rica en zinc, zinc ≥80%, 60–80 micrones",
          "Capa 2: Epoxi alto sólido, 80–100 micrones",
          "Capa 3: Poliuretano alifático, 40–60 micrones, carta RAL",
          "Espesor total: 180–240 micrones",
          "Norma: ISO 12944 C3-C4",
        ],
      },
    ],
  },
  {
    numero: "03",
    titulo: "Lana de roca 75mm en paredes — 4 veces más eficiente que una pared de ladrillos",
    descripcion:
      "Panel de lana de roca 75mm en paredes y particiones. Incombustible y con rendimiento térmico y acústico superior a la construcción tradicional.",
    beneficios: [
      "Aislación térmica 4 veces superior a una pared de ladrillos convencional",
      "Aislación acústica ≥45 dB — una pared de ladrillos estándar logra 35-40 dB",
      "Ignífuga Clase A1 — no arde, no propaga llamas, no genera humo tóxico",
      "En caso de incendio mantiene su forma hasta 1.000°C — la construcción tradicional con aislantes orgánicos arde",
      "No pudre, no se degrada con humedad, no es alimento de roedores ni insectos",
      "Sin mantenimiento durante toda la vida útil de la estructura",
    ],
    grupos: [
      {
        tipo: "tabla",
        id: "capas",
        titulo: "Composición del panel de pared",
        columnas: ["Capa", "Material", "Función"],
        filas: [
          ["1", "Polietileno 0.2mm", "Barrera anti-condensación"],
          ["2", "Lana de roca 75mm", "Aislación térmica y acústica"],
          ["3", "Acero galvanizado 1mm", "Barrera de vapor"],
          ["4", "Bambú/madera o acero lacado 4mm", "Acabado interior"],
        ],
      },
    ],
  },
  {
    numero: "04",
    titulo: "Panel PU en techo — sistema de impermeabilización integrado de fábrica",
    descripcion:
      "Panel sándwich con núcleo de poliuretano (PU) en el techo. Sistema de impermeabilización de 5 capas integrado de fábrica.",
    beneficios: [
      "Conductividad térmica λ = 0.022 W/m·K vs isolant estándar λ = 0.040 W/m·K — el PU es casi el doble de eficiente en el mismo espesor",
      "Sistema integrado de fábrica en una sola capa — el techo tradicional requiere 3 etapas separadas: chapa, isolant y cielorrazo, cada una con su mano de obra y posibilidad de fallas",
      "Sin puentes térmicos — el isolant tradicional pierde eficiencia en los puntos de fijación y bordes",
      "Impermeabilización de 5 capas integrada de fábrica — el techo tradicional depende de la correcta instalación del isolant y del sellado de juntas",
      "Sin mantenimiento — el isolant tradicional se degrada, se humedece y pierde propiedades con el tiempo",
      "No genera condensación interior — problema frecuente en techos con isolant mal instalado",
    ],
    grupos: [
      {
        tipo: "lista",
        id: "specs",
        titulo: "Especificaciones técnicas",
        items: [
          "Conductividad térmica: λ = 0.022 W/m·K",
          "Sistema de impermeabilización: 5 capas integradas de fábrica",
        ],
      },
    ],
  },
  {
    numero: "05",
    titulo: "Soldadura industrial certificada — no hay pernos estructurales",
    descripcion:
      "Las uniones estructurales de MOVARA no se atornillan: se sueldan en taller bajo procesos industriales controlados, con inspección posterior por ultrasonido en cada unión crítica. Menos puntos de falla, más control de calidad.",
    beneficios: [
      "Uniones soldadas por arco sumergido en taller",
      "Control 100% en todas las uniones",
      "Inspección por ultrasonidos",
      "Alta soldabilidad sin tratamiento térmico",
    ],
    grupos: [
      {
        tipo: "lista",
        id: "specs",
        titulo: "Especificaciones técnicas",
        items: [
          "Proceso principal: SAW — uniones vigas-columnas",
          "Proceso secundario: MAG/MIG",
          "Proceso en campo: SMAW",
          "Carbono equivalente CEV: ≤0.38%",
        ],
      },
    ],
  },
];

export type ProductoExtra = {
  texto: string;
  precio: string;
};

export const PRODUCTO_EXTRAS: ProductoExtra[] = [
  { texto: "Terraza cubierta 2m con tarima, barandas y techo", precio: "+USD 1.600" },
  { texto: "Galería perimetral con techo", precio: "Consultar" },
  { texto: "Techo a dos aguas", precio: "Consultar" },
  { texto: "Pared de vidrio (muro cortina)", precio: "Consultar" },
  { texto: "Inodoro inteligente con bidet", precio: "+USD 300" },
  { texto: "Piso SPC 4mm en lugar de PVC", precio: "+USD 240" },
  { texto: "Panel de fachada metálico tallado", precio: "+USD 500" },
  { texto: "Pre-instalación lavarropas", precio: "Consultar" },
  { texto: "Kit solar completo", precio: "Consultar" },
];
