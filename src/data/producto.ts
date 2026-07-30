export type ProductoSeccion = {
  numero: string;
  titulo: string;
  descripcion: string;
  beneficios: string[];
  specs: string[];
};

export const PRODUCTO_SECCIONES: ProductoSeccion[] = [
  {
    numero: "01",
    titulo: "Estructura de acero galvanizado",
    descripcion:
      "La base de toda MOVARA es su estructura de acero galvanizado de alta resistencia. No es aluminio, no es madera — es acero industrial tratado para durar décadas sin oxidarse.",
    beneficios: [
      "Resistencia sísmica grado 8",
      "Resistencia al viento 0.60 kN/m²",
      "Galvanizado 180g/m² — doble del estándar básico del mercado",
      "No se oxida, no se pudre, no la comen las termitas",
    ],
    specs: [
      "Acero grado Q235B según norma GB/T6728-2017",
      "Viga superior central: tubo 60×120×3.0mm",
      "Viga inferior: tubo 80×80×3.0mm",
      "Marco lateral superior: tubo 50×100×1.5mm",
      "Marco lateral inferior: tubo 40×80×1.5mm",
      "Columnas: piezas dobladas de 2.0mm",
      "Recubrimiento galvanizado: 180 g/m²",
      "Pintura: esmalte electrostático en polvo ≥80 micrones",
      "Bisagras de plegado: galvanizadas 130mm + 150×170×120mm T10mm",
      "Separación del suelo: solo 9mm",
    ],
  },
  {
    numero: "02",
    titulo: "Paredes con lana de roca 75mm",
    descripcion:
      "Las paredes de MOVARA no son simples chapas. Son paneles de lana de roca de 75mm — incombustible y con la mejor aislación térmica disponible.",
    beneficios: [
      "Incombustible — Clase A1, no arde ni se derrite",
      "Superior aislación térmica vs EPS estándar del mercado",
      "No absorbe humedad",
      "Múltiples terminaciones estéticas a elección",
    ],
    specs: [
      "Material: panel de lana de roca 75mm",
      "Clasificación de fuego: Clase A1 — incombustible",
      "Conductividad térmica: λ = 0.036–0.040 W/m·K",
      "Revestimiento exterior: panel metálico de 16mm (compuesto con espuma de poliuretano)",
      "Terminaciones disponibles: liso (blanco, gris, beige, marrón) o metálico tallado",
      "Particiones internas: panel EPS 50mm",
    ],
  },
  {
    numero: "03",
    titulo: "Techo con panel sándwich de poliuretano",
    descripcion:
      "El techo es donde más se pierde calor en invierno y más entra en verano. MOVARA usa panel sándwich de poliuretano — estructuralmente rígido con la mejor aislación disponible.",
    beneficios: [
      "Mejor aislación que lana de roca y EPS en el mismo espesor",
      "No se deforma con lluvia ni granizo",
      "Sistema de impermeabilización de 5 capas",
      "Sin goteras",
    ],
    specs: [
      "Material: panel sándwich núcleo PU",
      "Espesor: 50mm o 75mm según configuración",
      "Conductividad térmica: λ = 0.022 W/m·K",
      "Chapa exterior: acero color 0.35mm doble cara",
      "Impermeabilización: cola + cinta butil + tela no tejida + 3 capas pintura Oriental Yuhong",
      "Garantía impermeabilización: más de 5 años",
    ],
  },
  {
    numero: "04",
    titulo: "Piso impermeable y resistente",
    descripcion:
      "El piso de MOVARA está diseñado para durar — impermeable, anticorrosivo, resistente a insectos y fácil de limpiar.",
    beneficios: [
      "No se pudre ni se levanta con la humedad",
      "Resistente a termitas",
      "Fácil de limpiar",
      "SPC 4mm superior al PVC estándar en durabilidad",
    ],
    specs: [
      "Base estructural: tablero de fibra de cemento (MGO) 18mm",
      "Opción 1: PVC 2mm — 5 colores (marrón, gris oscuro, blanco, maple, nogal)",
      "Opción 2: SPC/LVT 4mm — 4 colores — más resistente",
      "Carga viva: 2.0 kN/m²",
    ],
  },
  {
    numero: "05",
    titulo: "Baño completo integrado",
    descripcion:
      "El baño llega instalado y listo para usar. No hay obra, no hay plomero, no hay meses de espera.",
    beneficios: [
      "Listo para usar el día de la instalación",
      "Sin obra ni mano de obra adicional",
      "Separación seca/húmeda incluida",
      "Materiales de alta calidad estética",
    ],
    specs: [
      "Set completo: espejo + lavabo + inodoro + ducha + panel de pared + suelo de mármol + puerta corrediza bidireccional",
      "Paneles de pared: panel UV en mármol blanco, gris, blanco liso o beige",
      "Ventana: 500×500mm aluminio con RPT",
      "Opciones: inodoro estándar o inteligente con bidet / bañera en lugar de ducha",
    ],
  },
  {
    numero: "06",
    titulo: "Cocina equipada y lista",
    descripcion:
      "La cocina llega instalada con muebles, pileta y grifo. Solo conectás el agua y empezás a usarla.",
    beneficios: [
      "Lista para usar desde el primer día",
      "Mesada de alta resistencia al calor y al rayado",
      "Múltiples configuraciones según el uso",
    ],
    specs: [
      "Distribuciones: en L, en U o con alacena superior",
      "Muebles: paneles lacados blanco, gris u oscuro",
      "Mesada: nano-cerámica cristal (negro, blanco/mármol o gris)",
      "Pileta: acero inoxidable + grifo incluido",
      "Cocción: vitrocerámica incluida o espacio para gas",
      "Opciones: extractor, alacena superior, ventana cerca de cocción",
    ],
  },
  {
    numero: "07",
    titulo: "Ventanas y puertas DVH con RPT",
    descripcion:
      "Las ventanas de MOVARA son las mismas que se usan en construcción premium. Doble vidrio hermético con rotura de puente térmico — no dejan pasar el frío ni el calor.",
    beneficios: [
      "Sin condensación en invierno",
      "Sin entrada de calor en verano",
      "Aislación acústica ≥30 dB",
      "Sin filtraciones con precipitación de 16mm/min",
    ],
    specs: [
      "Ventanas: DVH 930×930mm, marco aluminio con RPT",
      "Cantidad: 8 ventanas estándar + 1 pequeña en baño",
      "Incluye: mosquiteros + cortinas interiores",
      "Puerta de entrada: DVH + marco metálico aislado, 1900×2100mm",
      "Opción: rejas de seguridad",
    ],
  },
  {
    numero: "08",
    titulo: "Instalación eléctrica completa",
    descripcion:
      "Todo el sistema eléctrico viene instalado y adaptado al estándar argentino. Solo conectás a la red y listo.",
    beneficios: [
      "Compatible con la red eléctrica argentina sin adaptadores",
      "Dimensionado correctamente por circuito",
      "Protección diferencial incluida — seguridad ante cortocircuitos",
    ],
    specs: [
      "Estándar: 220V, 50Hz, enchufe Tipo I (estándar argentino)",
      "Tablero: disyuntor 40A + 2 diferenciales 25A + 2 protecciones 20A + 1 disyuntor 10A",
      "Cableado: entrada 3×6mm², AA 3×2.5mm², generales 3×2.5mm², iluminación 2×1.5mm²",
      "Iluminación: plafones LED 300×300mm impermeables ×6",
      "Tomacorrientes: panel ultra-delgado estándar IRAM",
      "Enchufe industrial CEE: 220V/50Hz/3P/64A",
    ],
  },
  {
    numero: "09",
    titulo: "Calefón eléctrico incluido",
    descripcion: "Agua caliente disponible desde el primer día, tanto en la cocina como en el baño.",
    beneficios: [
      "Incluido sin costo adicional en todas las unidades",
      "Agua caliente en cocina y baño desde el día 1",
    ],
    specs: ["Calefón eléctrico instantáneo de fábrica", "Conexión: cocina y baño"],
  },
  {
    numero: "10",
    titulo: "Certificaciones",
    descripcion:
      "MOVARA importa producto certificado internacionalmente. No comprás una promesa — comprás un producto con documentación técnica verificable.",
    beneficios: [
      "Certificado de conformidad ECM Italia — EN 1090-1:2009+A1:2011",
      "Vigencia hasta 2029",
      "96 páginas de documentación estructural",
      "Acero certificado norma GB/T6728-2017",
      "En proceso de certificación ante la Dirección de Reglamentos Técnicos de Argentina",
    ],
    specs: ["Modelo certificado: HS-09", "Acero: certificados de colada Tianjin Yuantai Derun"],
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
