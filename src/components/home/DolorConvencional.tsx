"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Stat = { _key?: string; stat: string; label: string; sub: string };
type Problema = {
  _key?: string;
  icono?: string;
  titulo: string;
  descripcion: string;
  lineaImpacto?: string;
};

type DolorContent = {
  titulo?: string;
  subtitulo?: string;
  stats?: Stat[];
  problemas?: Problema[];
  separador?: string;
};

const DEFAULT_PROBLEMAS: Problema[] = [
  {
    titulo: "Albañiles que no aparecen",
    descripcion: "Llegaron tres días, después desaparecieron. El ciclo de siempre.",
  },
  {
    titulo: "Presupuestos que no cierran",
    descripcion:
      "Te dijeron un precio. A mitad de obra ya iban el doble. Los materiales siempre terminan siendo más — el desperdicio de los albañiles corre por tu cuenta.",
  },
  {
    titulo: "Meses que se vuelven años",
    descripcion: "Lo que iba a estar en 8 meses lleva 2 años sin techo definitivo.",
  },
  {
    titulo: "Decisiones que te consumen",
    descripcion: "Cerámicos, electricista, plomero. Coordinás vos. Todo. Siempre.",
  },
  {
    titulo: "Incertidumbre total",
    descripcion: "Sin precio final, sin fecha, sin garantía de resultado.",
  },
  {
    titulo: "El costo emocional",
    descripcion: "Años de ahorro en juego y una obra que no termina nunca.",
  },
];

export default function DolorConvencional({ content }: { content?: DolorContent | null }) {
  const titulo = content?.titulo ?? "¿Ya pasaste por problemas como estos?";
  const subtitulo =
    content?.subtitulo ??
    "La construcción tradicional en Argentina es un camino lleno de obstáculos que nadie te cuenta antes de empezar.";
  const problemas = content?.problemas?.length ? content.problemas : DEFAULT_PROBLEMAS;
  const separador =
    content?.separador ?? "MOVARA existe para que esto no te pase a vos.";

  const scrollToCategoria = () => {
    document.querySelector("#nueva-categoria")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2F2F2F] leading-[1.08] max-w-3xl mb-6">
            {titulo}
          </h2>
          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed">
            {subtitulo}
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {problemas.map((p, i) => {
            const numero = String(i + 1).padStart(2, "0");

            return (
              <motion.div
                key={p._key ?? p.titulo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative h-[280px] lg:h-[380px] rounded-2xl overflow-hidden cursor-default"
              >
                {/* "Foto" de fondo (color de marca + textura) con zoom sutil en hover.
                    Mismo #2F2F2F en las 6 cards — sin variaciones de tono. */}
                <div className="absolute inset-0 bg-[#2F2F2F] transition-transform duration-500 ease-out group-hover:scale-105">
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage: "radial-gradient(circle, #D4B06A 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                </div>

                {/* Overlay oscuro de abajo hacia arriba — mismo gradiente en las 6 cards,
                    se aclara levemente en hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
                  style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)" }}
                />

                {/* Borde sutil */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" />

                {/* Contenido — número, título y descripción centrados en la card */}
                <div className="absolute inset-0 flex flex-col justify-center p-6">
                  <span className="text-4xl lg:text-5xl font-bold text-[#D4B06A] leading-none mb-3">
                    {numero}
                  </span>
                  <h3 className="font-bold text-white text-xl lg:text-2xl leading-tight mb-2">
                    {p.titulo}
                  </h3>
                  <p className="text-stone-200 text-sm leading-relaxed">
                    {p.descripcion}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Separator */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-10"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4B06A]/40" />
          <p className="font-playfair italic text-[#D4B06A] text-xl sm:text-2xl text-center shrink-0 px-2">
            {separador}
          </p>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4B06A]/40" />
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="border-l-4 border-[#D4B06A] pl-6 mb-10"
        >
          <p className="text-xl sm:text-2xl font-bold text-[#2F2F2F] leading-snug">
            &ldquo;No estamos compitiendo con la construcción tradicional.{" "}
            <span className="text-[#D4B06A]">Estamos reemplazándola.&rdquo;</span>
          </p>
        </motion.div>

        {/* Scroll CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col items-center gap-3"
        >
          <button
            onClick={scrollToCategoria}
            className="inline-flex items-center gap-2 text-[#D4B06A] font-semibold text-sm hover:text-[#BF9A52] transition-colors"
          >
            Así lo resolvemos
            <span className="text-xs">→</span>
          </button>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="text-stone-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
