export async function handleFormSubmission(event) {
  event.preventDefault();

  const form = new FormData(event.target);

  const data = {
    sku: form.get("sku"),
    quantity: form.get("quantity"),
  };

  const response = await fetch("/.netlify/functions/create-checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();

  const stripe = Stripe(res.publishableKey);
  const { error } = await stripe.redirectToCheckout({
    sessionId: res.sessionId,
  });

  if (error) {
    console.error(error);
  }
}
