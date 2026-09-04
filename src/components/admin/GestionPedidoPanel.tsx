"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { estadoPedidoOptions, estadoPedidoLabels } from "@/lib/pedido/estado-pedido";

const inputClass =
  "w-full rounded-lg border border-[#E5E5E5] px-3 py-2.5 text-sm text-[#2F2F2F] bg-white focus:outline-none focus:ring-2 focus:ring-sage-500";
const labelClass = "text-sm font-medium text-[#2F2F2F]";
const readonlyClass =
  "w-full rounded-lg border border-[#E5E5E5] px-3 py-2.5 text-sm text-stone-500 bg-[#F4F4F4]";

type Gestion = {
  estadoPedido: string;
  precioFinal: number | null;
  anticipo: number | null;
  numeroFabrica: string | null;
  numeroContenedor: string | null;
  numeroBL: string | null;
  fechaConfirmacion: string | null;
  fechaProduccion: string | null;
  fechaDespacho: string | null;
  fechaArriboEstimado: string | null;
  fechaEntrega: string | null;
  notasInternas: string | null;
  notasCliente: string | null;
  costoProveedor: number | null;
  costoFlete: number | null;
  costoAduana: number | null;
  costoOtros: number | null;
};

type Props = {
  id: string;
  numeroPedido: string | null;
  initial: Gestion;
};

function toDateInput(value: string | null): string {
  return value ? value.slice(0, 10) : "";
}

function toNumberOrNull(value: string): number | null {
  return value.trim() === "" ? null : Number(value);
}

export default function GestionPedidoPanel({ id, numeroPedido, initial }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    estadoPedido: initial.estadoPedido,
    precioFinal: initial.precioFinal?.toString() ?? "",
    anticipo: initial.anticipo?.toString() ?? "",
    numeroFabrica: initial.numeroFabrica ?? "",
    numeroContenedor: initial.numeroContenedor ?? "",
    numeroBL: initial.numeroBL ?? "",
    fechaConfirmacion: toDateInput(initial.fechaConfirmacion),
    fechaProduccion: toDateInput(initial.fechaProduccion),
    fechaDespacho: toDateInput(initial.fechaDespacho),
    fechaArriboEstimado: toDateInput(initial.fechaArriboEstimado),
    fechaEntrega: toDateInput(initial.fechaEntrega),
    notasInternas: initial.notasInternas ?? "",
    notasCliente: initial.notasCliente ?? "",
    costoProveedor: initial.costoProveedor?.toString() ?? "",
    costoFlete: initial.costoFlete?.toString() ?? "",
    costoAduana: initial.costoAduana?.toString() ?? "",
    costoOtros: initial.costoOtros?.toString() ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [numeroLocal, setNumeroLocal] = useState(numeroPedido);
  const [generandoNumero, setGenerandoNumero] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const precioFinal = toNumberOrNull(form.precioFinal);
  const anticipo = toNumberOrNull(form.anticipo);
  const saldoPendiente = precioFinal != null ? precioFinal - (anticipo ?? 0) : null;

  const costoProveedor = toNumberOrNull(form.costoProveedor);
  const costoFlete = toNumberOrNull(form.costoFlete);
  const costoAduana = toNumberOrNull(form.costoAduana);
  const costoOtros = toNumberOrNull(form.costoOtros);
  const algunCosto =
    costoProveedor != null || costoFlete != null || costoAduana != null || costoOtros != null;
  const costoTotal = algunCosto
    ? (costoProveedor ?? 0) + (costoFlete ?? 0) + (costoAduana ?? 0) + (costoOtros ?? 0)
    : null;
  const margenUSD = precioFinal != null && costoTotal != null ? precioFinal - costoTotal : null;
  const margenPorcentaje =
    margenUSD != null && precioFinal ? (margenUSD / precioFinal) * 100 : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/configuraciones/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estadoPedido: form.estadoPedido,
          precioFinal,
          anticipo,
          numeroFabrica: form.numeroFabrica || null,
          numeroContenedor: form.numeroContenedor || null,
          numeroBL: form.numeroBL || null,
          fechaConfirmacion: form.fechaConfirmacion || null,
          fechaProduccion: form.fechaProduccion || null,
          fechaDespacho: form.fechaDespacho || null,
          fechaArriboEstimado: form.fechaArriboEstimado || null,
          fechaEntrega: form.fechaEntrega || null,
          notasInternas: form.notasInternas || null,
          notasCliente: form.notasCliente || null,
          costoProveedor,
          costoFlete,
          costoAduana,
          costoOtros,
        }),
      });
      if (!res.ok) throw new Error("request-failed");
      router.refresh();
    } catch {
      setError("No pudimos guardar los cambios. Probá de nuevo.");
    } finally {
      setSaving(false);
    }
  }

  async function generarNumero() {
    setGenerandoNumero(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/configuraciones/${id}/numero`, { method: "POST" });
      if (!res.ok) throw new Error("request-failed");
      const json = await res.json();
      setNumeroLocal(json.numeroPedido);
      router.refresh();
    } catch {
      setError("No pudimos generar el número de pedido.");
    } finally {
      setGenerandoNumero(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-sage-600">
          Gestión del pedido
        </h2>

        {numeroLocal && (
          <p className="text-sm text-stone-600">
            Número de pedido: <span className="font-bold text-[#2F2F2F]">{numeroLocal}</span>
          </p>
        )}

        <label className="block space-y-1.5">
          <span className={labelClass}>Estado</span>
          <select
            className={inputClass}
            value={form.estadoPedido}
            onChange={(e) => set("estadoPedido", e.target.value)}
          >
            {estadoPedidoOptions.map((opt) => (
              <option key={opt} value={opt}>
                {estadoPedidoLabels[opt]}
              </option>
            ))}
          </select>
        </label>

        {form.estadoPedido === "confirmado" && !numeroLocal && (
          <button
            type="button"
            onClick={generarNumero}
            disabled={generandoNumero}
            className="w-full py-2.5 border border-sage-500 text-sage-600 font-bold text-sm rounded-xl hover:bg-sage-50 disabled:opacity-60 transition-colors"
          >
            {generandoNumero ? "Generando..." : "Generar número de pedido"}
          </button>
        )}

        <div className="grid grid-cols-2 gap-4">
          <label className="block space-y-1.5">
            <span className={labelClass}>Precio final (USD)</span>
            <input
              type="number"
              step="0.01"
              className={inputClass}
              value={form.precioFinal}
              onChange={(e) => set("precioFinal", e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Anticipo recibido (USD)</span>
            <input
              type="number"
              step="0.01"
              className={inputClass}
              value={form.anticipo}
              onChange={(e) => set("anticipo", e.target.value)}
            />
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className={labelClass}>Saldo pendiente</span>
          <p className={readonlyClass}>
            {saldoPendiente != null ? `USD ${saldoPendiente.toLocaleString("es-AR")}` : "—"}
          </p>
        </label>

        <div className="grid grid-cols-3 gap-4">
          <label className="block space-y-1.5">
            <span className={labelClass}>Número fábrica</span>
            <input
              className={inputClass}
              value={form.numeroFabrica}
              onChange={(e) => set("numeroFabrica", e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Número contenedor</span>
            <input
              className={inputClass}
              value={form.numeroContenedor}
              onChange={(e) => set("numeroContenedor", e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Número BL</span>
            <input
              className={inputClass}
              value={form.numeroBL}
              onChange={(e) => set("numeroBL", e.target.value)}
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block space-y-1.5">
            <span className={labelClass}>Fecha confirmación</span>
            <input
              type="date"
              className={inputClass}
              value={form.fechaConfirmacion}
              onChange={(e) => set("fechaConfirmacion", e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Fecha producción</span>
            <input
              type="date"
              className={inputClass}
              value={form.fechaProduccion}
              onChange={(e) => set("fechaProduccion", e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Fecha despacho</span>
            <input
              type="date"
              className={inputClass}
              value={form.fechaDespacho}
              onChange={(e) => set("fechaDespacho", e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Fecha arribo estimado</span>
            <input
              type="date"
              className={inputClass}
              value={form.fechaArriboEstimado}
              onChange={(e) => set("fechaArriboEstimado", e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Fecha entrega</span>
            <input
              type="date"
              className={inputClass}
              value={form.fechaEntrega}
              onChange={(e) => set("fechaEntrega", e.target.value)}
            />
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className={labelClass}>Notas internas (solo admin)</span>
          <textarea
            className={inputClass}
            rows={3}
            value={form.notasInternas}
            onChange={(e) => set("notasInternas", e.target.value)}
          />
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>Notas para el cliente</span>
          <textarea
            className={inputClass}
            rows={3}
            value={form.notasCliente}
            onChange={(e) => set("notasCliente", e.target.value)}
          />
        </label>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href={`/api/admin/configuraciones/${id}/pdf-cliente`}
            className="text-center py-2.5 border border-sage-500 text-sage-600 font-bold text-sm rounded-xl hover:bg-sage-50 transition-colors"
          >
            Generar PDF cliente
          </a>
          <a
            href={`/api/admin/configuraciones/${id}/pdf-proveedor`}
            className="text-center py-2.5 border border-stone-400 text-stone-600 font-bold text-sm rounded-xl hover:bg-stone-50 transition-colors"
          >
            Generar PDF proveedor
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-[#F3C6C6] p-5 space-y-4" style={{ backgroundColor: "#fff0f0" }}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-red-700">
            Costos internos
          </h2>
          <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
            🔒 Información privada — nunca visible para el cliente
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block space-y-1.5">
            <span className={labelClass}>Costo proveedor (USD)</span>
            <input
              type="number"
              step="0.01"
              className={inputClass}
              value={form.costoProveedor}
              onChange={(e) => set("costoProveedor", e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Costo flete (USD)</span>
            <input
              type="number"
              step="0.01"
              className={inputClass}
              value={form.costoFlete}
              onChange={(e) => set("costoFlete", e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Costo aduana (USD)</span>
            <input
              type="number"
              step="0.01"
              className={inputClass}
              value={form.costoAduana}
              onChange={(e) => set("costoAduana", e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Otros costos (USD)</span>
            <input
              type="number"
              step="0.01"
              className={inputClass}
              value={form.costoOtros}
              onChange={(e) => set("costoOtros", e.target.value)}
            />
          </label>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <label className="block space-y-1.5">
            <span className={labelClass}>Costo total</span>
            <p className={readonlyClass}>
              {costoTotal != null ? `USD ${costoTotal.toLocaleString("es-AR")}` : "—"}
            </p>
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Margen bruto</span>
            <p className={readonlyClass}>
              {margenUSD != null ? `USD ${margenUSD.toLocaleString("es-AR")}` : "—"}
            </p>
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Margen %</span>
            <p className={readonlyClass}>
              {margenPorcentaje != null ? `${margenPorcentaje.toFixed(1)}%` : "—"}
            </p>
          </label>
        </div>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="w-full py-3 bg-sage-500 hover:bg-sage-600 disabled:opacity-60 text-[#2F2F2F] font-bold text-sm rounded-xl transition-colors"
      >
        {saving ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
