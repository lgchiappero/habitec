import BuscarPedidoForm from "@/components/mi-pedido/BuscarPedidoForm";

export default function MiPedidoPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <p className="text-sage-500 text-xs font-bold uppercase tracking-widest mb-1">
        Panel MOVARA
      </p>
      <h1 className="text-2xl font-bold text-[#2F2F2F] mb-2">Seguí tu pedido</h1>
      <p className="text-sm text-stone-600 mb-8">
        Ingresá el código que te enviamos por WhatsApp para ver el estado de tu MOVARA.
      </p>
      <BuscarPedidoForm />
    </div>
  );
}
