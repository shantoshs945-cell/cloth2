const checkoutLink = document.querySelector("#whatsapp-checkout");

if (!checkoutLink) {
  throw new Error("WhatsApp checkout link is missing from the cart page.");
}

checkoutLink.addEventListener("click", () => {
  const items = [...document.querySelectorAll("[data-cart-item]")].map((item) => {
    const name = item.querySelector("h2")?.textContent.trim();
    const quantityText = item.querySelector("[data-cart-quantity]")?.textContent.trim();
    const quantity = Number(quantityText);

    if (!name || !Number.isInteger(quantity) || quantity < 1) {
      throw new Error("A cart item is missing its name or valid quantity.");
    }

    return `- ${name} x ${quantity}`;
  });

  if (items.length === 0) {
    throw new Error("Cannot place a WhatsApp order because the cart is empty.");
  }

  const total = document.querySelector("#cart-total-amount")?.textContent.trim();

  if (!total) {
    throw new Error("The cart total is missing.");
  }

  const pincode = document.querySelector("#delivery-pincode")?.value.trim();
  const message = [
    "Hello, I would like to place this order:",
    "",
    ...items,
    "",
    `Total shown: ${total}`,
    ...(pincode ? [`Delivery pincode: ${pincode}`] : []),
    "",
    "Please confirm availability, delivery details, and payment arrangement. I understand no online payment is collected on the website.",
  ].join("\n");

  checkoutLink.href = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
});
