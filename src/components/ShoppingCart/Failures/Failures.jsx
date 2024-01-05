import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Failures = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Obtén los valores directamente de searchParams
  const collectionStatus = searchParams.get('collection_status');
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const merchantOrderId = searchParams.get('merchant_order_id');
  const preferenceId = searchParams.get('preference_id');

  useEffect(() => {
    //! Apenas se aprueba la compra cambiar el status de PurchaseTicket a **Rejected** ID = "e31f73fb-eea5-46da-9e1e-0d421080d499"
    //! Para crear el Status en http://localhost:3001/order-status
    // {
    // "status": "Rejected",
    // "description": "La compra ha sido rechazada. Por favor, revise la información proporcionada e intente nuevamente."
    // }
    //! NO VACIAR CARRITO
    //! Y AL USUARIO REGISTRARLE SU COMPRA COMO RECHAZADA Y NOTIFICAR 

    alert("SIMULA QUE ACTUALIZA LA ORDEN EN EL BACK A STATUS RECHAZADO");
    // Aquí puedes realizar cualquier lógica adicional si es necesario
    console.log('Datos de la consulta en Failures:', {
      collectionStatus,
      paymentId,
      status,
      merchantOrderId,
      preferenceId,
    });
  }, [collectionStatus, merchantOrderId, paymentId, preferenceId, status]);

  return (
    <div>
      <h1>Failures</h1>
      <h1>Failures</h1>{/* //! Se pone esto porque la barra de navegacion no deja ver debajo */}
      <h1>ACÁ SE VA A MOSTRAR INFORMACION DE LA COMPRA FALLIDA</h1>
      <p>
        <span>collectionStatus: </span>
        {collectionStatus} <br />
        <span>paymentId: </span>
        {paymentId} <br />
        <span>status: </span>
        {status} <br />
        <span>merchantOrderId: </span>
        {merchantOrderId} <br />
        <span>preferenceId: </span>
        {preferenceId}
      </p>
    </div>
  );
};

export default Failures;
