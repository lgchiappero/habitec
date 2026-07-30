"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

type SanityAsset = { _ref: string; _type: string };
type SanityImage = { asset?: SanityAsset; hotspot?: unknown; crop?: unknown; label?: string };
type VideoInput = { url: string; titulo?: string | null };

type GalleryItem =
  | { kind: "image"; src: string; isSanity: boolean; alt: string }
  | { kind: "video"; url: string; embedUrl: string; label: string };

const PLACEHOLDER_SRC = "/banner-hero.webp";
const PLACEHOLDER_COUNT = 5;

function getEmbedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return url;
}

function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

export default function HeroGaleria({
  title,
  ctaLabel,
  ctaHref,
  images,
  videos,
}: {
  title: string;
  ctaLabel: string;
  ctaHref: string;
  images?: SanityImage[] | null;
  videos?: VideoInput[] | null;
}) {
  const hasSanityImages = !!(images && images.length > 0);

  const imageItems: GalleryItem[] = hasSanityImages
    ? images!.map((img, i) => ({
        kind: "image" as const,
        src: urlFor(img).width(1800).height(1400).fit("crop").auto("format").url(),
        isSanity: true,
        alt: img.label ?? `${title} — foto ${i + 1}`,
      }))
    : Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => ({
        kind: "image" as const,
        src: PLACEHOLDER_SRC,
        isSanity: false,
        alt: `${title} — foto ${i + 1}`,
      }));

  const videoItems: GalleryItem[] =
    videos?.map((v) => ({
      kind: "video" as const,
      url: v.url,
      embedUrl: getEmbedUrl(v.url),
      label: v.titulo ?? "Video",
    })) ?? [];

  const items: GalleryItem[] = [...imageItems, ...videoItems];

  const [selected, setSelected] = useState(0);
  const active = items[selected];
  const thumbsRef = useRef<HTMLDivElement>(null);

  function scrollThumbs(dir: number) {
    thumbsRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  }

  return (
    <div className="w-full">
      {/* Imagen principal */}
      <div className="relative w-full h-[70vh] sm:h-[75vh] lg:h-[80vh] bg-stone-900 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {active.kind === "video" ? (
              isDirectVideo(active.url) ? (
                <video
                  src={active.url}
                  controls
                  autoPlay
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label={active.label}
                />
              ) : (
                <iframe
                  src={active.embedUrl}
                  title={active.label}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              )
            ) : (
              <Image
                src={active.src}
                alt={active.alt}
                fill
                priority={selected === 0}
                className="object-cover"
                sizes="100vw"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Texto mínimo — título y CTA, ambos con fondo semi-transparente */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5 sm:p-8 pointer-events-none">
          <span className="pointer-events-auto bg-black/40 backdrop-blur-md text-white font-bold text-base sm:text-xl px-4 py-2 sm:px-5 sm:py-2.5 rounded-full">
            {title}
          </span>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white font-bold text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-colors whitespace-nowrap"
          >
            {ctaLabel}
          </a>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="relative bg-white border-b border-stone-100">
        <button
          type="button"
          onClick={() => scrollThumbs(-1)}
          className="hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-stone-200 items-center justify-center text-stone-500 hover:text-stone-800"
          aria-label="Thumbnails anteriores"
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={thumbsRef}
          className="flex gap-2.5 overflow-x-auto px-4 sm:px-10 py-3 sm:py-4 scroll-smooth"
        >
          {items.map((item, i) => {
            const isActive = i === selected;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(i)}
                aria-label={item.kind === "video" ? item.label : item.alt}
                aria-pressed={isActive}
                className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  isActive ? "border-sage-500" : "border-transparent"
                }`}
              >
                {item.kind === "video" ? (
                  <div className="absolute inset-0 bg-stone-800 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" fill="white" />
                  </div>
                ) : (
                  <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="80px" />
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollThumbs(1)}
          className="hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-stone-200 items-center justify-center text-stone-500 hover:text-stone-800"
          aria-label="Siguientes thumbnails"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
