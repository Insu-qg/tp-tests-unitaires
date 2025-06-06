
function createCart() {
  return { items: [], total: 0 };
}

function addItem(cart, item) {
  if (item.quantity <= 0 || item.price < 0) return;

  const existingItem = cart.items.find(i => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.items.push({ ...item });
  }

  cart.total += item.price * item.quantity;
}


function removeItem(cart, itemId) {
  const index = cart.items.findIndex(i => i.id === itemId);
  if (index === -1) return;
  const item = cart.items[index];
  cart.total -= item.price * item.quantity;
  cart.items.splice(index, 1);
}

function clearCart(cart) {
  cart.items = [];
  cart.total = 0;
}

function applyDiscount(cart, code) {
  const validCodes = {
    WELCOME10: 0.1,
    SUMMER20: 0.2,
  };
  const discount = validCodes[code];
  if (!discount) throw new Error('Invalid discount code');
  cart.total = cart.total * (1 - discount);
}

module.exports = { createCart, addItem, removeItem, applyDiscount, clearCart };



