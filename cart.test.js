const { createCart, addItem, removeItem, applyDiscount, clearCart } = require("./cart");

describe("Cart module", () => {
  let cart;

  beforeEach(() => {
    cart = createCart();
  });

  describe("createCart", () => {
    test("should initialize an empty cart", () => {
      expect(cart).toEqual({ items: [], total: 0 });
    });
  });

  describe("addItem", () => {
    test("should add a new item to the cart", () => {
      const item = { id: 1, name: "Apple", price: 1, quantity: 3 };
      addItem(cart, item);
      expect(cart.items.length).toBe(1);
      expect(cart.total).toBe(3);
    });

    test("should increment quantity if item already exists", () => {
      const item = { id: 1, name: "Apple", price: 1, quantity: 2 };
      addItem(cart, item);
      addItem(cart, { id: 1, name: "Apple", price: 1, quantity: 3 });
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].quantity).toBe(5);
      expect(cart.total).toBe(5);
    });

    test("should add multiple different items", () => {
      addItem(cart, { id: 1, name: "Apple", price: 1, quantity: 2 });
      addItem(cart, { id: 2, name: "Banana", price: 2, quantity: 1 });
      expect(cart.items.length).toBe(2);
      expect(cart.total).toBe(4);
    });

    test("should ignore item with quantity = 0", () => {
      addItem(cart, { id: 1, name: "Ghost", price: 10, quantity: 0 });
      expect(cart.items.length).toBe(0);
      expect(cart.total).toBe(0);
    });

    test("should handle item with negative price", () => {
      addItem(cart, { id: 2, name: "Buggy", price: -5, quantity: 2 });
      expect(cart.items.length).toBe(0);
      expect(cart.total).toBe(0);
    });
  });

  describe("removeItem", () => {
    test("should remove an existing item", () => {
      const item = { id: 1, name: "Apple", price: 2, quantity: 2 };
      addItem(cart, item);
      removeItem(cart, 1);
      expect(cart.items.length).toBe(0);
      expect(cart.total).toBe(0);
    });

    test("should do nothing if item does not exist", () => {
      addItem(cart, { id: 1, name: "Apple", price: 2, quantity: 2 });
      removeItem(cart, 999); // id not found
      expect(cart.items.length).toBe(1);
      expect(cart.total).toBe(4);
    });
  });

  describe("applyDiscount", () => {
    beforeEach(() => {
      addItem(cart, { id: 1, name: "Apple", price: 10, quantity: 1 });
    });

    test.each([
      ["WELCOME10", 0.1, 9],
      ["SUMMER20", 0.2, 8],
    ])("should apply discount code %s", (code, rate, expectedTotal) => {
      applyDiscount(cart, code);
      expect(cart.total).toBeCloseTo(expectedTotal);
    });

    test("should throw error for invalid discount code", () => {
      expect(() => applyDiscount(cart, "INVALID")).toThrow(
        "Invalid discount code"
      );
    });
  });

  describe("clearCart", () => {
    test("should empty the cart and reset total", () => {
      addItem(cart, { id: 1, name: "Apple", price: 1, quantity: 3 });
      clearCart(cart);
      expect(cart.items).toEqual([]);
      expect(cart.total).toBe(0);
    });
  });
});
