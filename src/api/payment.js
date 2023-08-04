class Payment {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  createPaymentIntent = async (data) => {
    try {
      const response = await fetch(`${this.url}/create-payment-intent`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return await response.json();
      }

      throw await response.json();
    } catch (err) {
      throw err;
    }
  };
}

export const payment = (params = {}) =>
  new Payment({
    url: window.location.origin,
    headers: {
      "Content-Type": "application/json",
    },
    ...params,
  });
