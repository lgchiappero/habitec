"use client";

import { useSearchParams } from "next/navigation";
import ConfiguradorMovara, {
  type ConfiguradorPageData,
  type PreciosConfig,
  type ModeloKey,
} from "@/components/configurador/ConfiguradorMovara";

/**
 * Lee `?modelo=` en el cliente para no forzar SSR dinámico en toda la
 * página del configurador. Debe montarse dentro de un <Suspense>.
 */
export default function ConfiguradorModeloReader({
  data,
  precios,
  modeloImagenes,
}: {
  data?: ConfiguradorPageData | null;
  precios?: PreciosConfig | null;
  modeloImagenes?: Record<ModeloKey, string[]>;
}) {
  const searchParams = useSearchParams();
  return (
    <ConfiguradorMovara
      data={data}
      precios={precios}
      modeloImagenes={modeloImagenes}
      preselectedModelo={searchParams.get("modelo") ?? undefined}
    />
  );
}
