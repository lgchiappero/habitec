import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { estadoPedidoOptions, type EstadoPedido } from "@/lib/pedido/estado-pedido";
import { ensureNumeroPedido } from "@/lib/pedido/numero-pedido";
import { buildEstadoEmail } from "@/lib/email/pedido-estado-email";

const numberOrNull = z.union([z.number(), z.null()]);
const stringOrNull = z.union([z.string(), z.null()]).transform((v) => (v === "" ? null : v));
const dateOrNull = z
  .union([z.string(), z.null()])
  .transform((v) => (v ? new Date(v) : null));

const GestionSchema = z.object({
  estadoPedido: z.enum(estadoPedidoOptions),
  precioFinal: numberOrNull,
  anticipo: numberOrNull,
  numeroFabrica: stringOrNull,
  numeroContenedor: stringOrNull,
  numeroBL: stringOrNull,
  fechaConfirmacion: dateOrNull,
  fechaProduccion: dateOrNull,
  fechaDespacho: dateOrNull,
  fechaArriboEstimado: dateOrNull,
  fechaEntrega: dateOrNull,
  notasInternas: stringOrNull,
  notasCliente: stringOrNull,
  costoProveedor: numberOrNull,
  costoFlete: numberOrNull,
  costoAduana: numberOrNull,
  costoOtros: numberOrNull,
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();
  const parsed = GestionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const data = parsed.data;

  const saldoPendiente =
    data.precioFinal != null ? data.precioFinal - (data.anticipo ?? 0) : null;

  const costoTotal =
    data.costoProveedor != null ||
    data.costoFlete != null ||
    data.costoAduana != null ||
    data.costoOtros != null
      ? (data.costoProveedor ?? 0) +
        (data.costoFlete ?? 0) +
        (data.costoAduana ?? 0) +
        (data.costoOtros ?? 0)
      : null;

  const margenUSD =
    data.precioFinal != null && costoTotal != null ? data.precioFinal - costoTotal : null;

  const margenPorcentaje =
    margenUSD != null && data.precioFinal ? (margenUSD / data.precioFinal) * 100 : null;

  try {
    const previous = await db.configuracionPedido.findUnique({
      where: { id },
      select: { estadoPedido: true, clienteEmail: true, clienteNombre: true },
    });

    let config = await db.configuracionPedido.update({
      where: { id },
      data: {
        ...data,
        saldoPendiente,
        costoTotal,
        margenUSD,
        margenPorcentaje,
      },
    });

    const estadoCambio = previous && previous.estadoPedido !== config.estadoPedido;
    if (estadoCambio) {
      if (config.estadoPedido === "confirmado" && !config.numeroPedido) {
        await ensureNumeroPedido(id);
        config = await db.configuracionPedido.findUniqueOrThrow({ where: { id } });
      }
      await enviarEmailEstado(config.estadoPedido as EstadoPedido, config);
    }

    return NextResponse.json({ ok: true, config });
  } catch (err) {
    console.error("[admin/configuraciones/:id PATCH]", err);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}

async function enviarEmailEstado(
  estado: EstadoPedido,
  config: {
    clienteEmail: string | null;
    clienteNombre: string;
    numeroPedido: string | null;
    fechaDespacho: Date | null;
    fechaArriboEstimado: Date | null;
  }
) {
  if (!config.clienteEmail) return;

  const email = buildEstadoEmail(estado, {
    clienteNombre: config.clienteNombre,
    numeroPedido: config.numeroPedido,
    fechaDespacho: config.fechaDespacho,
    fechaArriboEstimado: config.fechaArriboEstimado,
  });
  if (!email) return;

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "MOVARA <onboarding@resend.dev>";
  if (!apiKey) return;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: fromEmail,
      to: config.clienteEmail,
      subject: email.subject,
      html: email.html,
    });
  } catch (err) {
    console.error("[admin/configuraciones/:id] error al enviar email de estado:", err);
  }
}
