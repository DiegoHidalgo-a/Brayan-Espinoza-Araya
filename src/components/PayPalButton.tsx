import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useCart } from "../contexts/CartContext";

const PayPalButton: React.FC = () => {
  const [{ isPending }] = usePayPalScriptReducer();
  const { state, dispatch } = useCart();

  // Formatear productos para la descripción
  const productSummary = state.items
    .map(item => `${item.name} (x${item.quantity}${item.size ? ", T: " + item.size : ""})`)
    .join(", ");

  // PayPal requiere el monto en string y con punto decimal
  const total = state.total.toFixed(2);

  const handlePaymentSuccess = async (details: any) => {
    const payerName = details?.payer?.name?.given_name || "";
    alert("Pago completado" + (payerName ? ` por ${payerName}` : "") );
    dispatch({ type: "CLEAR_CART" });
  };

  const handlePaymentError = (err: any) => {
    alert("Hubo un error con el pago");
    console.error(err);
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: total,
            currency_code: "USD",
          },
          description: productSummary,
        },
      ],
    });
  };

  return (
    <div className="space-y-3">
      {isPending ? <div>Loading PayPal...</div> : null}
      
      {/* Botón de PayPal */}
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
        forceReRender={[total]}
        fundingSource="paypal"
        createOrder={createOrder}
        onApprove={handlePaymentSuccess}
        onError={handlePaymentError}
      />
      
      {/* Botón de tarjeta de crédito/débito */}
      <PayPalButtons
        style={{ layout: "vertical", color: "black", shape: "rect", label: "pay" }}
        forceReRender={[total]}
        fundingSource="card"
        createOrder={createOrder}
        onApprove={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </div>
  );
};

export default PayPalButton; 