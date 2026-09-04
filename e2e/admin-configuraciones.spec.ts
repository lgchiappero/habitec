import { test, expect, type APIRequestContext } from "@playwright/test";

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

function pedidoPayload(clienteNombre: string) {
  return {
    clienteNombre,
    clienteWhatsapp: "+5491100000001",
    clienteEmail: "playwright@example.com",
    tipoCliente: "particular",
    modelo: "20ft",
    finalidad: "vivienda",
    provincia: "Buenos Aires",
    localidad: "La Plata",
    habitaciones: 2,
    incluyeCocina: true,
    tipoCocina: "electrico",
    incluyeBano: true,
    tipoAgua: "calefon-electrico",
    lavarropas: "bano",
    materiales: { exterior: "blanco", piso: "nogal-oscuro" },
    upgrades: [],
  };
}

/** Simula el submit del configurador público — es como llegan los registros
 * reales, ya que /admin/configuraciones ya no crea nada. */
async function seedPedido(request: APIRequestContext, clienteNombre: string) {
  const res = await request.post("/api/pedido", { data: pedidoPayload(clienteNombre) });
  const json = await res.json();
  return { res, ...json };
}

test.describe("/admin/configuraciones", () => {
  test("Test 1: responde 200 con credenciales correctas", async ({ page }) => {
    const response = await page.goto("/admin/configuraciones");
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { name: "Configuraciones de pedido" })
    ).toBeVisible();
  });

  test("Test 2: una consulta enviada desde /configurador aparece en el panel admin", async ({
    page,
    request,
  }) => {
    const { res, numeroConsulta } = await seedPedido(request, "Playwright Cliente Prueba");
    expect(res.status()).toBe(200);
    expect(numeroConsulta).toMatch(/^MOV-CONSULTA-\d{4}-\d{3}$/);

    await page.goto("/admin/configuraciones");
    // numeroConsulta es único por request — el nombre de cliente no lo es
    // entre corridas repetidas del suite, así que ubicamos la fila por él.
    const row = page.locator("tr", { hasText: numeroConsulta });
    await expect(row).toBeVisible();
    await expect(row.getByText("Playwright Cliente Prueba")).toBeVisible();
  });

  test("Test 3: el campo updatedAt existe y se actualiza en cada cambio", async ({
    page,
    request,
  }) => {
    const { numeroConsulta } = await seedPedido(request, "Playwright Cliente UpdatedAt");

    await page.goto("/admin/configuraciones");
    const row = page.locator("tr", { hasText: numeroConsulta });
    const href = await row.getByRole("link", { name: "Ver detalle" }).getAttribute("href");
    const id = href!.split("/").pop()!;

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
