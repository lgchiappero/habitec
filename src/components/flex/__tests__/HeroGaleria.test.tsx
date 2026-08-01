import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroGaleria from "../HeroGaleria";

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentPropsWithRef<"div">) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

// Réplica fiel de @sanity/image-url: accede a source.asset._ref de forma
// inmediata, igual que la librería real, para poder reproducir el crash
// original ("Cannot read properties of null (reading '_ref')") si el
// componente le pasara una imagen con asset null.
vi.mock("@/sanity/lib/image", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  urlFor: (source: any) => {
    void source.asset._ref;
    return {
      width: () => ({ height: () => ({ fit: () => ({ auto: () => ({ url: () => "https://cdn.sanity.io/test.jpg" }) }) }) }),
    };
  },
}));

// Reproduce el bug de Sanity Studio: una referencia rota deja asset en null
// (no undefined), en lugar de un objeto { _ref, _type } válido.
const IMG_CON_ASSET_NULL = { asset: null, label: "Foto rota" } as unknown as {
  asset?: { _ref: string; _type: string };
  label?: string;
};

const IMG_VALIDA = {
  asset: { _ref: "image-abc123-800x600-jpg", _type: "reference" },
  label: "Foto válida",
};

describe("HeroGaleria — seguridad ante referencias de imagen nulas", () => {
  it("no crashea cuando una imagen de la galería tiene asset null", () => {
    expect(() =>
      render(
        <HeroGaleria
          title="MOVARA Flex"
          ctaLabel="Quiero este modelo"
          ctaHref="#"
          images={[IMG_CON_ASSET_NULL]}
        />,
      ),
    ).not.toThrow();
  });

  it("cae al fallback estático cuando todas las imágenes tienen asset null", () => {
    render(
      <HeroGaleria
        title="MOVARA Flex"
        ctaLabel="Quiero este modelo"
        ctaHref="#"
        images={[IMG_CON_ASSET_NULL]}
      />,
    );
    // El fallback usa alt "MOVARA Flex — <descripción>", no la imagen rota.
    expect(screen.getAllByAltText(/MOVARA Flex —/).length).toBeGreaterThan(0);
    expect(screen.queryByAltText("Foto rota")).not.toBeInTheDocument();
  });

  it("filtra las imágenes con asset null pero conserva las válidas", () => {
    render(
      <HeroGaleria
        title="MOVARA Flex"
        ctaLabel="Quiero este modelo"
        ctaHref="#"
        images={[IMG_CON_ASSET_NULL, IMG_VALIDA]}
      />,
    );
    expect(screen.getAllByAltText("Foto válida").length).toBeGreaterThan(0);
  });
});
