import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VirtualTour from "../VirtualTour";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    onError,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} onError={onError} {...props} />
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

describe("VirtualTour", () => {
  it("muestra el botón para iniciar el tour y arranca cerrado", () => {
    render(<VirtualTour modelName="Familiar 65" />);
    expect(screen.getByRole("button", { name: /recorrer la casa/i })).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("abre el modal en el ambiente 'Exterior' (1 / 7)", async () => {
    const user = userEvent.setup();
    render(<VirtualTour modelName="Familiar 65" />);
    await user.click(screen.getByRole("button", { name: /recorrer la casa/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("1 / 7")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Exterior" })).toHaveAttribute("aria-pressed", "true");
  });

  it("navega al siguiente ambiente con la flecha y con el hotspot", async () => {
    const user = userEvent.setup();
    render(<VirtualTour />);
    await user.click(screen.getByRole("button", { name: /recorrer la casa/i }));

    await user.click(screen.getByRole("button", { name: /ambiente siguiente/i }));
    expect(screen.getByText("2 / 7")).toBeInTheDocument();

    // El hotspot muestra y lleva al próximo ambiente ("Living").
    await user.click(screen.getByRole("button", { name: "Ir a Living" }));
    expect(screen.getByText("3 / 7")).toBeInTheDocument();
  });

  it("retrocede con la flecha anterior y da la vuelta desde el primer ambiente", async () => {
    const user = userEvent.setup();
    render(<VirtualTour />);
    await user.click(screen.getByRole("button", { name: /recorrer la casa/i }));

    await user.click(screen.getByRole("button", { name: /ambiente anterior/i }));
    expect(screen.getByText("7 / 7")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dormitorio 2" })).toHaveAttribute("aria-pressed", "true");
  });

  it("navega con las flechas del teclado y cierra con Escape", async () => {
    const user = userEvent.setup();
    render(<VirtualTour />);
    await user.click(screen.getByRole("button", { name: /recorrer la casa/i }));

    await user.keyboard("{ArrowRight}");
    expect(screen.getByText("2 / 7")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("saltea directo a un ambiente clickeando su punto de navegación", async () => {
    const user = userEvent.setup();
    render(<VirtualTour />);
    await user.click(screen.getByRole("button", { name: /recorrer la casa/i }));

    const cocinaBtn = screen.getByRole("button", { name: "Cocina" });
    await user.click(cocinaBtn);
    expect(screen.getByText("4 / 7")).toBeInTheDocument();
    expect(cocinaBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("cae al placeholder de marca cuando la foto todavía no existe en /public/tour", async () => {
    const user = userEvent.setup();
    render(<VirtualTour />);
    await user.click(screen.getByRole("button", { name: /recorrer la casa/i }));

    const img = document.querySelector('img[alt="Exterior"]') as HTMLImageElement;
    expect(img).toBeTruthy();
    fireEvent.error(img);

    expect(await screen.findByText("Foto próximamente")).toBeInTheDocument();
  });
});
