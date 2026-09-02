"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ModeloHomeItem = {
  _id: string;
  nombre?: string | null;
  slug?: string | null;
  tagline?: string | null;
  imagen?: string | null;
  proximamente?: boolean | null;
};

type ModelosHomeContent = {
  titulo?: string;
  subtitulo?: string;
  ctaVerModelo?: string;
  ctaCatalogo?: string;
};

export default function ModelosHome({
  content,
  modelos,
}: {
  content?: ModelosHomeContent | null;
  modelos?: ModeloHomeItem[] | null;
}) {
  const titulo = content?.titulo ?? "Nuestros modelos";
  const subtitulo = content?.subtitulo ?? "Más modelos en camino.";
  const ctaVerModelo = content?.ctaVerModelo ?? "Ver modelo";
  const ctaCatalogo = content?.ctaCatalogo ?? "Ver catálogo completo →";
  const items = modelos ?? [];

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

        {/* Modelos — el layout se adapta a la cantidad real de modelos en Sanity */}
        {items.length === 0 ? (
          <p className="text-stone-400 text-sm">
            Estamos actualizando nuestros modelos — volvé pronto.
          </p>
        ) : items.length === 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 max-w-3xl mx-auto"
          >
            <ModeloFeatureCard modelo={items[0]} ctaLabel={ctaVerModelo} />
          </motion.div>
        ) : (
          <div
            className={`grid gap-6 mb-6 ${
              items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {items.map((modelo, i) => (
              <motion.div
                key={modelo._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <ModeloCard modelo={modelo} ctaLabel={ctaVerModelo} />
              </motion.div>
            ))}
          </div>
        )}

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

// Card grande y horizontal — se usa cuando hay un solo modelo activo.
function ModeloFeatureCard({ modelo, ctaLabel }: { modelo: ModeloHomeItem; ctaLabel: string }) {
  const nombre = modelo.nombre ?? "Modelo MOVARA";
  const proximamente = !!modelo.proximamente;
  const href = modelo.slug ? `/modelos/${modelo.slug}` : "/modelos";

  const content = (
    <div className="group grid lg:grid-cols-2 rounded-2xl border-2 border-[#D4B06A] bg-[#2F2F2F] overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/20">
      <div className="relative aspect-video lg:aspect-auto lg:h-auto min-h-[320px] bg-stone-900 overflow-hidden">
        {modelo.imagen ? (
          <Image
            src={modelo.imagen}
            alt={nombre}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <CameraPlaceholder />
        )}
        {proximamente && (
          <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-stone-900/80 text-white border border-white/20">
            Próximamente
          </span>
        )}
      </div>
      <div className="p-8 lg:p-10 flex flex-col justify-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#D4B06A] mb-3">
          {proximamente ? "Próximamente" : "Disponible ahora"}
        </span>
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{nombre}</h3>
        {modelo.tagline && (
          <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-md">{modelo.tagline}</p>
        )}
        {!proximamente && (
          <span className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl text-sm font-bold bg-[#D4B06A] text-[#1A1A1A] transition-colors group-hover:bg-[#BF9A52]">
            {ctaLabel} →
          </span>
        )}
      </div>
    </div>
  );

  if (proximamente) {
    return <div aria-disabled="true">{content}</div>;
  }
  return <Link href={href}>{content}</Link>;
}

// Card chica y vertical — se usa cuando hay 2 o más modelos activos.
function ModeloCard({ modelo, ctaLabel }: { modelo: ModeloHomeItem; ctaLabel: string }) {
  const nombre = modelo.nombre ?? "Modelo MOVARA";
  const proximamente = !!modelo.proximamente;
  const href = modelo.slug ? `/modelos/${modelo.slug}` : "/modelos";

  const card = (
    <div
      className={`group h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
        proximamente
          ? "border-2 border-dashed border-stone-200 bg-stone-50"
          : "border border-stone-100 bg-white hover:shadow-xl hover:shadow-stone-900/10 hover:border-stone-200"
      }`}
    >
      <div className="relative h-48 bg-stone-100 overflow-hidden">
        {modelo.imagen ? (
          <Image
            src={modelo.imagen}
            alt={nombre}
            fill
            className={`object-cover transition-transform duration-500 ${!proximamente ? "group-hover:scale-105" : "opacity-60"}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <BuildingPlaceholder />
        )}
        {proximamente && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-stone-200 text-stone-500">
            Próximamente
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className={`font-bold text-lg ${proximamente ? "text-stone-400" : "text-[#2F2F2F]"}`}>
          {nombre}
        </h3>
        <p className={`text-sm mt-1 leading-relaxed flex-1 ${proximamente ? "text-stone-400" : "text-stone-500"}`}>
          {modelo.tagline ?? (proximamente ? "Estamos trabajando en el próximo modelo MOVARA." : "")}
        </p>
        {!proximamente && (
          <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[#D4B06A] group-hover:text-[#BF9A52] transition-colors">
            {ctaLabel} →
          </span>
        )}
      </div>
    </div>
  );

  if (proximamente) {
    return <div aria-disabled="true">{card}</div>;
  }
  return (
    <Link href={href} className="block h-full">
      {card}
    </Link>
  );
}

function BuildingPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="w-10 h-10 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3.75h9a1.5 1.5 0 011.5 1.5V21H3V5.25a1.5 1.5 0 011.5-1.5zM15 21v-4.5A1.5 1.5 0 0116.5 15h2.25a1.5 1.5 0 011.5 1.5V21M6.75 6.75h.008v.008H6.75V6.75zm3 0h.008v.008h-.008V6.75zm-3 3.75h.008v.008H6.75V10.5zm3 0h.008v.008h-.008V10.5zm-3 3.75h.008v.008H6.75v-.008zm3 0h.008v.008h-.008v-.008z" />
      </svg>
    </div>
  );
}

function CameraPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
      <svg className="w-10 h-10 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    </div>
  );
}
