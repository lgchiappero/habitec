"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type HeroContent = {
  badgePreventa?: string;
  titulo?: string;
  tituloDestacado?: string;
  subtitulo?: string;
  ctaPrimario?: string;
  ctaSecundario?: string;
};

const DEFAULTS = {
  badgePreventa: "Precio Lanzamiento Exclusivo — Activo",
  titulo: "Vivienda modular de precisión.",
  tituloDestacado: "Sin obra. Lista en semanas.",
  subtitulo:
    "Las primeras unidades MOVARA ya están disponibles, con condiciones exclusivas de lanzamiento para clientes seleccionados.",
  ctaPrimario: "Hablar con un asesor",
  ctaSecundario: "Ver el proyecto completo",
};

export default function Hero({
  waNumber,
  content,
}: {
  waNumber?: string | null;
  content?: HeroContent | null;
}) {
  const c = { ...DEFAULTS, ...content };
  const waHref = getWhatsAppUrl(
    "Hola MOVARA! Quiero hablar con un asesor sobre el precio de lanzamiento.",
    waNumber,
  );

  return (
    <section className="relative min-h-[100dvh] flex items-center bg-[#1A1A1A] overflow-hidden">
      {/* Background photo — módulo con deck sobre lago y montañas al atardecer.
          object-position corrido a la derecha: deja el cielo/agua (más
          despejados) del lado izquierdo, donde va el texto. */}
      <Image
        src="/hero-fachada.jpg"
        alt=""
        fill
        priority
        className="object-cover object-[75%_center] sm:object-[65%_center]"
        sizes="100vw"
        quality={85}
      />

      {/* Overlay muy sutil (máx. 15% negro) — la foto es la protagonista.
          La legibilidad del texto la da el text-shadow, no el oscurecimiento. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/[0.08] to-transparent" />

      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #D4B06A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 sm:py-32 w-full">
        <div className="max-w-xl">
          {/* Badge de lanzamiento — único elemento de escasez de esta sección, sin parpadeo */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#D4B06A]/25 bg-black/25 backdrop-blur-sm text-[#D4B06A]/90 text-[11px] sm:text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4B06A] shrink-0" />
            {c.badgePreventa}
          </motion.div>

          {/* H1 — alineado a la izquierda, más corto que la versión anterior */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08 }}
            className="text-3xl sm:text-5xl lg:text-[3.75rem] font-bold text-white leading-[1.08] tracking-tight mb-4 sm:mb-6 [text-shadow:0_2px_20px_rgba(0,0,0,0.7)]"
          >
            {c.titulo}
            <br />
            <span className="text-[#D4B06A]">{c.tituloDestacado}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg text-stone-200 max-w-md leading-relaxed mb-7 sm:mb-10 [text-shadow:0_1px_12px_rgba(0,0,0,0.75)]"
          >
            {c.subtitulo}
          </motion.p>

          {/* CTAs — primario: WhatsApp con un asesor (bajo compromiso, no "reservar").
              Secundario: link ghost hacia el dossier completo (el paso formal
              de reserva queda para más adelante en la conversación). */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-7"
          >
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] flex items-center justify-center px-9 py-3 sm:py-4 bg-[#D4B06A] hover:bg-[#BF9A52] text-[#1A1A1A] font-bold rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-[#D4B06A]/30 hover:-translate-y-0.5 text-sm tracking-wide"
            >
              {c.ctaPrimario}
            </a>
            <a
              href="#dossier"
              className="group inline-flex items-center justify-center sm:justify-start gap-2 text-white/90 hover:text-white font-semibold text-sm tracking-wide transition-colors [text-shadow:0_1px_10px_rgba(0,0,0,0.75)]"
            >
              {c.ctaSecundario}
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-14 bg-gradient-to-b from-stone-600 to-transparent mx-auto"
        />
      </motion.div>
    </section>
  );
}
