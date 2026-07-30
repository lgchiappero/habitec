"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { PRODUCTO_SECCIONES } from "@/data/producto";

export default function EspecificacionesCompletas({
  className = "",
  dark = false,
}: {
  className?: string;
  /** Tema oscuro (#1C1C1C + dorado) usado en /producto. /modelos/flex usa el tema claro por defecto. */
  dark?: boolean;
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  function toggle(numero: string) {
    setOpenKey((prev) => (prev === numero ? null : numero));
  }

  const theme = dark
    ? {
        wrapper: "bg-[#1C1C1C] divide-y divide-white/10",
        button: "hover:bg-white/[0.03]",
        numero: "text-[#D4B06A]",
        titulo: "text-white",
        plusIdle: "border-[#D4B06A]/30 text-[#D4B06A]",
        plusOpen: "bg-[#D4B06A] border-[#D4B06A] text-[#1C1C1C]",
        descripcion: "text-stone-400",
        beneficio: "text-stone-200",
        check: "text-[#D4B06A]",
        divider: "border-white/10",
        specsLabel: "text-white",
        specItem: "text-stone-400",
      }
    : {
        wrapper: "bg-white border border-stone-200 rounded-2xl divide-y divide-stone-200 overflow-hidden",
        button: "hover:bg-stone-50",
        numero: "text-sage-600",
        titulo: "text-stone-900",
        plusIdle: "border-sage-300 text-sage-600",
        plusOpen: "bg-sage-500 border-sage-500 text-white",
        descripcion: "text-stone-600",
        beneficio: "text-stone-700",
        check: "text-sage-600",
        divider: "border-stone-100",
        specsLabel: "text-stone-400",
        specItem: "text-stone-500",
      };

  return (
    <div className={`${theme.wrapper} ${className}`}>
      {PRODUCTO_SECCIONES.map((s) => {
        const isOpen = openKey === s.numero;
        return (
          <div key={s.numero}>
            <button
              type="button"
              onClick={() => toggle(s.numero)}
              className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors ${theme.button}`}
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className={`shrink-0 text-xs font-bold tabular-nums ${theme.numero}`}>{s.numero}</span>
                <span className={`font-bold ${theme.titulo}`}>{s.titulo}</span>
              </span>
              <span
                className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
                  isOpen ? theme.plusOpen : theme.plusIdle
                }`}
              >
                <Plus size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1">
                    <p className={`text-sm leading-relaxed ${theme.descripcion}`}>{s.descripcion}</p>

                    <ul className="mt-4 space-y-2">
                      {s.beneficios.map((b) => (
                        <li key={b} className={`flex items-start gap-2.5 text-sm ${theme.beneficio}`}>
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${theme.check}`} />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className={`mt-4 pt-4 border-t ${theme.divider}`}>
                      <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${theme.specsLabel}`}>
                        Especificaciones técnicas
                      </p>
                      <ul className="space-y-1.5">
                        {s.specs.map((sp) => (
                          <li key={sp} className={`text-sm leading-relaxed ${theme.specItem}`}>
                            {sp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
