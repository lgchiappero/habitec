"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

type SanityImage = {
  asset?: { _ref: string; _type: string };
  hotspot?: unknown;
  crop?: unknown;
} | null;

export type FlexCardData = {
  nombre?: string | null;
  imagen?: SanityImage;
} | null;

export default function FlexFeatureCard({
  flex,
  ctaLabel = "Ver modelo",
  className = "",
}: {
  flex?: FlexCardData;
  ctaLabel?: string;
  className?: string;
}) {
  const nombre = flex?.nombre ?? "MOVARA Flex";
  const imagenUrl = flex?.imagen?.asset?._ref
    ? urlFor({ asset: flex.imagen.asset }).width(900).fit("max").auto("format").url()
    : null;

  return (
    <Link
      href="/modelos/flex"
      className={`group grid lg:grid-cols-2 rounded-2xl border-2 border-[#D4B06A] bg-[#2F2F2F] overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/20 ${className}`}
    >
      <div className="relative aspect-video lg:aspect-auto lg:h-auto min-h-[320px] bg-stone-900 overflow-hidden">
        {imagenUrl ? (
          <Image
            src={imagenUrl}
            alt={nombre}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
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
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{nombre}</h3>
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <span className="text-xs text-stone-400">Disponible en:</span>
          {["18m²", "38m²", "77m²"].map((size) => (
            <span
              key={size}
              className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white"
            >
              {size}
            </span>
          ))}
        </div>
        <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-md">
          Una unidad plegable y expandible que se transporta cerrada y se despliega en
          destino. Vivienda, inversión turística u oficina, lista en días.
        </p>
        <span className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl text-sm font-bold bg-[#D4B06A] text-[#1A1A1A] transition-colors group-hover:bg-[#BF9A52]">
          {ctaLabel} →
        </span>
      </div>
    </Link>
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
