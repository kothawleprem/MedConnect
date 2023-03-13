import React from 'react'

const CapturePayments = () => {
    const queryString = window.location.search;
    console.log("all query", queryString);

    const urlParams = new URLSearchParams(queryString);

    const payment_intent = urlParams.get("payment_intent");
    console.log("payment_intent", payment_intent);

    const payment_intent_client_secret = urlParams.get(
      "payment_intent_client_secret"
    );
    console.log("payment_intent_client_secret", payment_intent_client_secret);

    const redirect_status = urlParams.get("redirect_status");
    console.log("redirect_status", redirect_status);
  return (
    <div>CapturePayments</div>
  )
}

export default CapturePayments