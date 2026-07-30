import type { Metadata } from "next";
import ProductoPageClient from "@/components/producto/ProductoPageClient";

export const metadata: Metadata = {
  title: "Ficha técnica MOVARA Flex — MOVARA",
  description:
    "Especificaciones técnicas completas del MOVARA Flex: estructura de acero galvanizado, aislación, instalaciones y certificaciones internacionales.",
};

export default function ProductoPage() {
  return <ProductoPageClient />;
}
