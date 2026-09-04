import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { modeloLabelsEs } from "@/lib/pdf/pedido-labels-es";
import type { PedidoInput } from "@/lib/validators/pedido";

const Schema = z.object({
  codigo: z.string().trim().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ingresá un código de pedido" }, { status: 400 });
  }

  const codigo = parsed.data.codigo.toUpperCase();

  const config = await db.configuracionPedido.findFirst({
    where: { OR: [{ numeroConsulta: codigo }, { numeroPedido: codigo }] },
    select: {
      numeroConsulta: true,
      numeroPedido: true,
      clienteNombre: true,
      modelo: true,
      notasCliente: true,
      estadoPedido: true,
      fechaConfirmacion: true,
      fechaProduccion: true,
      fechaDespacho: true,
      fechaArriboEstimado: true,
      fechaEntrega: true,
    },
  });

  if (!config) {
    return NextResponse.json({ error: "No encontramos un pedido con ese código" }, { status: 404 });
  }

  return NextResponse.json({
    numeroConsulta: config.numeroConsulta,
    numeroPedido: config.numeroPedido,
    clienteNombre: config.clienteNombre,
    modelo: config.modelo ? modeloLabelsEs[config.modelo as PedidoInput["modelo"]] : null,
    notasCliente: config.notasCliente,
    estadoPedido: config.estadoPedido,
    fechaConfirmacion: config.fechaConfirmacion,
    fechaProduccion: config.fechaProduccion,
    fechaDespacho: config.fechaDespacho,
    fechaArriboEstimado: config.fechaArriboEstimado,
    fechaEntrega: config.fechaEntrega,
  });
}
