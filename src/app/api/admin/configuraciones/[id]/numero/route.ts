import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const config = await db.configuracionPedido.findUnique({ where: { id } });
  if (!config) {
    return NextResponse.json({ error: "Configuración no encontrada" }, { status: 404 });
  }
  if (config.estadoPedido !== "confirmado") {
    return NextResponse.json(
      { error: "El pedido debe estar confirmado para generar el número" },
      { status: 400 }
    );
  }
  if (config.numeroPedido) {
    return NextResponse.json({ ok: true, numeroPedido: config.numeroPedido });
  }

  const anio = new Date().getFullYear();
  const prefix = `MOV-${anio}-`;

  const numeroPedido = await db.$transaction(async (tx) => {
    const existentes = await tx.configuracionPedido.findMany({
      where: { numeroPedido: { startsWith: prefix } },
      select: { numeroPedido: true },
    });

    const max = existentes.reduce((acc, c) => {
      const n = parseInt(c.numeroPedido!.slice(prefix.length), 10);
      return Number.isFinite(n) && n > acc ? n : acc;
    }, 0);

    const siguiente = `${prefix}${String(max + 1).padStart(3, "0")}`;

    await tx.configuracionPedido.update({
      where: { id },
      data: { numeroPedido: siguiente },
    });

    return siguiente;
  });

  return NextResponse.json({ ok: true, numeroPedido });
}
