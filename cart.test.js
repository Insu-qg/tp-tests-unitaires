const { createCart, addItem, removeItem, applyDiscount, clearCart } = require("./cart");

describe("Cart module", () => {
  let cart;

  // Avant chaque test, on crée un nouveau panier vide
  beforeEach(() => {
    cart = createCart();
  });

  // Tests de la création du panier
  describe("createCart", () => {
    test("should initialize an empty cart", () => {
      expect(cart).toEqual({ items: [], total: 0 });
    });
  });

  // Tests pour l'ajout d'articles
  describe("addItem", () => {
    // Vérifie l'ajout d'un nouvel article
    test("should add a new item to the cart", () => {
      const item = { id: 1, name: "Apple", price: 1, quantity: 3 };
      addItem(cart, item);
      expect(cart.items.length).toBe(1);
      expect(cart.total).toBe(3);
    });

    // Vérifie que la quantité est incrémentée si l'article existe déjà
    test("should increment quantity if item already exists", () => {
      const item = { id: 1, name: "Apple", price: 1, quantity: 2 };
      addItem(cart, item);
      addItem(cart, { id: 1, name: "Apple", price: 1, quantity: 3 });
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].quantity).toBe(5);
      expect(cart.total).toBe(5);
    });

    // Vérifie l'ajout de plusieurs articles différents
    test("should add multiple different items", () => {
      addItem(cart, { id: 1, name: "Apple", price: 1, quantity: 2 });
      addItem(cart, { id: 2, name: "Banana", price: 2, quantity: 1 });
      expect(cart.items.length).toBe(2);
      expect(cart.total).toBe(4);
    });

    // Vérifie que les articles avec quantité 0 sont ignorés
    test("should ignore item with quantity = 0", () => {
      addItem(cart, { id: 1, name: "Ghost", price: 10, quantity: 0 });
      expect(cart.items.length).toBe(0);
      expect(cart.total).toBe(0);
    });

    // Vérifie que les articles avec prix négatif sont ignorés
    test("should handle item with negative price", () => {
      addItem(cart, { id: 2, name: "Buggy", price: -5, quantity: 2 });
      expect(cart.items.length).toBe(0);
      expect(cart.total).toBe(0);
    });
  });

  // Tests pour la suppression d'articles
  describe("removeItem", () => {
    // Vérifie la suppression d'un article existant
    test("should remove an existing item", () => {
      const item = { id: 1, name: "Apple", price: 2, quantity: 2 };
      addItem(cart, item);
      removeItem(cart, 1);
      expect(cart.items.length).toBe(0);
      expect(cart.total).toBe(0);
    });

    // Vérifie que rien ne se passe si l'article n'existe pas
    test("should do nothing if item does not exist", () => {
      addItem(cart, { id: 1, name: "Apple", price: 2, quantity: 2 });
      removeItem(cart, 999);
      expect(cart.items.length).toBe(1);
      expect(cart.total).toBe(4);
    });
  });

  // Tests pour l'application des réductions
  describe("applyDiscount", () => {
    beforeEach(() => {
      addItem(cart, { id: 1, name: "Apple", price: 10, quantity: 1 });
    });

    // Vérifie l'application de différents codes de réduction
    test.each([
      ["WELCOME10", 0.1, 9],
      ["SUMMER20", 0.2, 8],
    ])("should apply discount code %s", (code, rate, expectedTotal) => {
      applyDiscount(cart, code);
      expect(cart.total).toBeCloseTo(expectedTotal);
    });

    // Vérifie qu'une erreur est levée pour un code invalide
    test("should throw error for invalid discount code", () => {
      expect(() => applyDiscount(cart, "INVALID")).toThrow(
        "Invalid discount code"
      );
    });
  });

  // Tests pour vider le panier
  describe("clearCart", () => {
    // Vérifie que le panier est vidé et le total réinitialisé
    test("should empty the cart and reset total", () => {
      addItem(cart, { id: 1, name: "Apple", price: 1, quantity: 3 });
      clearCart(cart);
      expect(cart.items).toEqual([]);
      expect(cart.total).toBe(0);
    });
  });
});
