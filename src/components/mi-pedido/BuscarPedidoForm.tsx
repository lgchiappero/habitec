"use client";

import { useState } from "react";
import {
  estadoPedidoOptions,
  estadoPedidoLabels,
  estadoPedidoIndex,
  type EstadoPedido,
} from "@/lib/pedido/estado-pedido";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const inputClass =
  "w-full rounded-lg border border-[#E5E5E5] px-3 py-2.5 text-sm text-[#2F2F2F] bg-white focus:outline-none focus:ring-2 focus:ring-sage-500";

type Pedido = {
  numeroConsulta: string | null;
  numeroPedido: string | null;
  clienteNombre: string;
  modelo: string | null;
  notasCliente: string | null;
  estadoPedido: EstadoPedido;
  fechaConfirmacion: string | null;
  fechaProduccion: string | null;
  fechaDespacho: string | null;
  fechaArriboEstimado: string | null;
  fechaEntrega: string | null;
};

const FECHA_POR_ESTADO: Record<EstadoPedido, keyof Pedido | null> = {
  consulta: null,
  presupuestado: null,
  confirmado: "fechaConfirmacion",
  en_produccion: "fechaProduccion",
  en_transito: "fechaDespacho",
  en_aduana: "fechaArriboEstimado",
  entregado: "fechaEntrega",
};

function formatFecha(value: string | null): string | null {
  if (!value) return null;
  return new Date(value).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BuscarPedidoForm() {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pedido, setPedido] = useState<Pedido | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPedido(null);

    if (!codigo.trim()) {
      setError("Ingresá tu código de pedido.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/mi-pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo: codigo.trim() }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "No pudimos encontrar tu pedido.");
        return;
      }
      setPedido(json);
    } catch {
      setError("No pudimos buscar tu pedido. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  const currentIndex = pedido ? estadoPedidoIndex(pedido.estadoPedido) : -1;
  const codigoMostrado = pedido ? (pedido.numeroPedido ?? pedido.numeroConsulta) : null;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E5E5E5] p-5 space-y-4">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-[#2F2F2F]">Código de pedido</span>
          <input
            className={inputClass}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="MOV-2025-001"
          />
        </label>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-sage-500 hover:bg-sage-600 disabled:opacity-60 text-[#2F2F2F] font-bold text-sm rounded-xl transition-colors"
        >
          {loading ? "Buscando..." : "Ver mi pedido"}
        </button>
      </form>

      {pedido && (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 space-y-6">
          <div>
            <p className="text-sage-500 text-xs font-bold uppercase tracking-widest mb-1">
              {codigoMostrado}
            </p>
            <h2 className="text-lg font-bold text-[#2F2F2F]">{pedido.clienteNombre}</h2>
            {pedido.modelo && <p className="text-sm text-stone-600">{pedido.modelo}</p>}
          </div>

          <ol className="space-y-0">
            {estadoPedidoOptions.map((estado, i) => {
              const done = i <= currentIndex;
              const isLast = i === estadoPedidoOptions.length - 1;
              const fechaKey = FECHA_POR_ESTADO[estado];
              const fecha = fechaKey ? formatFecha(pedido[fechaKey] as string | null) : null;
              return (
                <li key={estado} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full mt-1 ${
                        done ? "bg-sage-500" : "bg-[#E5E5E5]"
                      }`}
                    />
                    {!isLast && (
                      <div className={`w-px flex-1 ${done ? "bg-sage-500" : "bg-[#E5E5E5]"}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p
                      className={`text-sm font-medium ${
                        done ? "text-[#2F2F2F]" : "text-stone-400"
                      }`}
                    >
                      {estadoPedidoLabels[estado]}
                    </p>
                    {fecha && <p className="text-xs text-stone-500">{fecha}</p>}
                  </div>
                </li>
              );
            })}
          </ol>

          {pedido.notasCliente && (
            <div className="bg-[#F9F5EE] rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-sage-600 mb-1">
                Notas de tu pedido
              </p>
              <p className="text-sm text-stone-700 whitespace-pre-wrap">{pedido.notasCliente}</p>
            </div>
          )}

          <a
            href={getWhatsAppUrl(`Hola! Quería consultar por mi pedido ${codigoMostrado}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-2.5 border border-sage-500 text-sage-600 font-bold text-sm rounded-xl hover:bg-sage-50 transition-colors"
          >
            Contactar por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
