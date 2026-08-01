"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FlexFeatureCard, { type FlexCardData } from "@/components/modelos/FlexFeatureCard";

type ModelosHomeContent = {
  titulo?: string;
  subtitulo?: string;
  ctaVerModelo?: string;
  ctaCatalogo?: string;
};

export default function ModelosHome({
  content,
  flex,
}: {
  content?: ModelosHomeContent | null;
  flex?: FlexCardData;
}) {
  const titulo = content?.titulo ?? "Nuestros modelos";
  const subtitulo = content?.subtitulo ?? "Más modelos en camino.";
  const ctaVerModelo = content?.ctaVerModelo ?? "Ver modelo";
  const ctaCatalogo = content?.ctaCatalogo ?? "Ver catálogo completo →";

  return (
    <section id="modelos" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2F2F2F] leading-tight">
            {titulo}
          </h2>
          <p className="mt-3 text-stone-400 text-base">{subtitulo}</p>
        </motion.div>

        {/* MOVARA Flex — card grande */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <FlexFeatureCard flex={flex} ctaLabel={ctaVerModelo} />
        </motion.div>

        {/* Próximos modelos */}
        <div className="grid sm:grid-cols-2 gap-6">
          <ProximamenteCard label="Modelo 2" delay={0.1} />
          <ProximamenteCard label="Modelo 3" delay={0.2} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/modelos"
            className="text-sm text-stone-400 hover:text-[#2F2F2F] transition-colors underline underline-offset-4"
          >
            {ctaCatalogo}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProximamenteCard({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 overflow-hidden flex flex-col"
    >
      <div className="relative h-48 bg-stone-100 flex items-center justify-center">
        <BuildingPlaceholder />
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-stone-200 text-stone-500">
          Próximamente
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg text-stone-400">{label}</h3>
        <p className="text-sm text-stone-400 mt-1 leading-relaxed">
          Estamos trabajando en el próximo modelo MOVARA.
        </p>
      </div>
    </motion.div>
  );
}

function BuildingPlaceholder() {
  return (
    <svg className="w-10 h-10 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3.75h9a1.5 1.5 0 011.5 1.5V21H3V5.25a1.5 1.5 0 011.5-1.5zM15 21v-4.5A1.5 1.5 0 0116.5 15h2.25a1.5 1.5 0 011.5 1.5V21M6.75 6.75h.008v.008H6.75V6.75zm3 0h.008v.008h-.008V6.75zm-3 3.75h.008v.008H6.75V10.5zm3 0h.008v.008h-.008V10.5zm-3 3.75h.008v.008H6.75v-.008zm3 0h.008v.008h-.008v-.008z" />
    </svg>
  );
}
