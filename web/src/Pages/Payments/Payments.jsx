import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Checkout.css";

const stripePromise = loadStripe(
  "pk_test_51MkrgDSEJKAQ1ZUPchUNmWyACIIzqEpfCIdYYyqrEjLolkduGmXYT4yyNP8ZX5CB8nlkI7KfP0VoJSLFcn2dykPe00CV0cmFRj"
);

export default function Payments() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`http://${process.env.REACT_APP_API_URL}/api/consultation/payments/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 120 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}