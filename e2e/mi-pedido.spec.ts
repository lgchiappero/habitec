import { test, expect } from "@playwright/test";

const adminAuthHeader =
  "Basic " +
  Buffer.from(
    `${process.env.ADMIN_USER ?? "luciano"}:${process.env.ADMIN_PASSWORD ?? "Lunes12!"}`
  ).toString("base64");

test.describe("/mi-pedido", () => {
  test("Test 1: código inválido muestra mensaje de error, sin crashear", async ({ page }) => {
    await page.goto("/mi-pedido");
    await page.getByPlaceholder("MOV-2025-001").fill("MOV-9999-999");
    await page.getByRole("button", { name: "Ver mi pedido" }).click();

    await expect(page.getByText("No encontramos un pedido con ese código")).toBeVisible();
  });

  test("Test 2: código válido muestra la línea de tiempo del pedido", async ({
    page,
    request,
  }) => {
    const createRes = await request.post("/api/admin/configuraciones", {
      headers: { Authorization: adminAuthHeader },
      data: { clienteNombre: "Playwright Mi Pedido", clienteWhatsapp: "+5491100000002" },
    });
    const { id } = await createRes.json();

    await request.patch(`/api/admin/configuraciones/${id}`, {
      headers: { Authorization: adminAuthHeader },
      data: {
        estadoPedido: "confirmado",
        precioFinal: null,
        anticipo: null,
        numeroFabrica: null,
        numeroContenedor: null,
        numeroBL: null,
        fechaConfirmacion: null,
        fechaProduccion: null,
        fechaDespacho: null,
        fechaArriboEstimado: null,
        fechaEntrega: null,
        notasInternas: null,
        notasCliente: "Gracias por elegirnos",
        costoProveedor: null,
        costoFlete: null,
        costoAduana: null,
        costoOtros: null,
      },
    });

    const numeroRes = await request.post(`/api/admin/configuraciones/${id}/numero`, {
      headers: { Authorization: adminAuthHeader },
    });
    const { numeroPedido } = await numeroRes.json();

    await page.goto("/mi-pedido");
    await page.getByPlaceholder("MOV-2025-001").fill(numeroPedido);
    await page.getByRole("button", { name: "Ver mi pedido" }).click();

    await expect(page.getByText("Playwright Mi Pedido")).toBeVisible();
    await expect(page.getByText("Confirmado")).toBeVisible();
    await expect(page.getByText("Gracias por elegirnos")).toBeVisible();
  });
});
