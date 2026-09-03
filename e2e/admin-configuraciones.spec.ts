import { test, expect } from "@playwright/test";

test.use({
  httpCredentials: {
    username: process.env.ADMIN_USER ?? "luciano",
    password: process.env.ADMIN_PASSWORD ?? "Lunes12!",
  },
});

const basePatchBody = {
  estadoPedido: "consulta",
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
  notasCliente: null,
  costoProveedor: null,
  costoFlete: null,
  costoAduana: null,
  costoOtros: null,
};

test.describe("/admin/configuraciones", () => {
  test("Test 1: responde 200 con credenciales correctas", async ({ page }) => {
    const response = await page.goto("/admin/configuraciones");
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { name: "Configuraciones de pedido" })
    ).toBeVisible();
  });

  test("Test 2: crear una configuración nueva funciona correctamente", async ({ request }) => {
    const res = await request.post("/api/admin/configuraciones", {
      data: { clienteNombre: "Playwright Cliente Prueba", clienteWhatsapp: "+5491100000001" },
    });
    expect(res.status()).toBe(201);

    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.id).toBeTruthy();
  });

  test("Test 3: el campo updatedAt existe y se actualiza en cada cambio", async ({ request }) => {
    const createRes = await request.post("/api/admin/configuraciones", {
      data: { clienteNombre: "Playwright Cliente UpdatedAt", clienteWhatsapp: "" },
    });
    const { id } = await createRes.json();

    const patch1 = await request.patch(`/api/admin/configuraciones/${id}`, {
      data: basePatchBody,
    });
    expect(patch1.status()).toBe(200);
    const json1 = await patch1.json();
    expect(json1.config.updatedAt).toBeTruthy();

    await new Promise((resolve) => setTimeout(resolve, 1100));

    const patch2 = await request.patch(`/api/admin/configuraciones/${id}`, {
      data: { ...basePatchBody, notasInternas: "cambio de prueba" },
    });
    const json2 = await patch2.json();

    expect(new Date(json2.config.updatedAt).getTime()).toBeGreaterThan(
      new Date(json1.config.updatedAt).getTime()
    );
  });
});
