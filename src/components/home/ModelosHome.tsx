"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

type SanityImage = {
  asset?: { _ref: string; _type: string };
  hotspot?: unknown;
  crop?: unknown;
} | null;

type FlexHome = {
  nombre?: string | null;
  imagen?: SanityImage;
} | null;

type ModelosHomeContent = {
  titulo?: string;
  subtitulo?: string;
  ctaReservar?: string;
  ctaCatalogo?: string;
};

export default function ModelosHome({
  content,
  flex,
}: {
  content?: ModelosHomeContent | null;
  flex?: FlexHome;
}) {
  const titulo = content?.titulo ?? "Nuestros modelos";
  const subtitulo = content?.subtitulo ?? "Más modelos en camino.";
  const ctaReservar = content?.ctaReservar ?? "Reservar precio";
  const ctaCatalogo = content?.ctaCatalogo ?? "Ver catálogo completo →";

  const nombreFlex = flex?.nombre ?? "MOVARA Flex";
  const imagenFlex = flex?.imagen?.asset?._ref
    ? urlFor(flex.imagen).width(900).height(700).fit("crop").auto("format").url()
    : null;

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
          <Link
            href="/modelos/flex"
            className="group grid lg:grid-cols-2 rounded-2xl border-2 border-[#D4B06A] bg-[#2F2F2F] overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/20"
          >
            <div className="relative h-64 lg:h-auto min-h-[320px] bg-stone-800 overflow-hidden">
              {imagenFlex ? (
                <Image
                  src={imagenFlex}
                  alt={nombreFlex}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <CameraPlaceholder />
              )}
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D4B06A] mb-3">
                Disponible ahora
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">{nombreFlex}</h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-md">
                Una unidad plegable y expandible que se transporta cerrada y se despliega en
                destino. Vivienda, inversión turística u oficina, lista en días.
              </p>
              <span className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl text-sm font-bold bg-[#D4B06A] text-[#1A1A1A] transition-colors group-hover:bg-[#BF9A52]">
                {ctaReservar} →
              </span>
            </div>
          </Link>
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

function CameraPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
      <svg className="w-10 h-10 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
      <span className="text-xs text-stone-500">Sin foto</span>
    </div>
  );
}

function BuildingPlaceholder() {
  return (
    <svg className="w-10 h-10 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3.75h9a1.5 1.5 0 011.5 1.5V21H3V5.25a1.5 1.5 0 011.5-1.5zM15 21v-4.5A1.5 1.5 0 0116.5 15h2.25a1.5 1.5 0 011.5 1.5V21M6.75 6.75h.008v.008H6.75V6.75zm3 0h.008v.008h-.008V6.75zm-3 3.75h.008v.008H6.75V10.5zm3 0h.008v.008h-.008V10.5zm-3 3.75h.008v.008H6.75v-.008zm3 0h.008v.008h-.008v-.008z" />
    </svg>
  );
}
