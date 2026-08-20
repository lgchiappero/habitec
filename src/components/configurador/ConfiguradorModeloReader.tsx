"use client";

import { useSearchParams } from "next/navigation";
import ConfiguradorMovara, { type ConfiguradorPageData, type PreciosConfig } from "@/components/configurador/ConfiguradorMovara";

/**
 * Lee `?modelo=` en el cliente para no forzar SSR dinámico en toda la
 * página del configurador. Debe montarse dentro de un <Suspense>.
 */
export default function ConfiguradorModeloReader({ data, precios }: { data?: ConfiguradorPageData | null; precios?: PreciosConfig | null }) {
  const searchParams = useSearchParams();
  return <ConfiguradorMovara data={data} precios={precios} preselectedModelo={searchParams.get("modelo") ?? undefined} />;
}
