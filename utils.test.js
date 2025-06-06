import {
  sum,
  isPalindrome,
  getMax,
  capitalize,
  divide,
  validateEmail,
} from "./utils.js";

// sum : additionne deux nombres
describe("sum", () => {
  test("additionne deux nombres positifs", () => {
    expect(sum(2, 3)).toBe(5);
  });

  test("additionne deux nombres négatifs", () => {
    expect(sum(-2, -3)).toBe(-5);
  });

  test("additionne un nombre positif et un négatif", () => {
    expect(sum(5, -3)).toBe(2);
  });

  test("additionne avec zéro", () => {
    expect(sum(5, 0)).toBe(5);
    expect(sum(0, 3)).toBe(3);
    expect(sum(5.5, 0)).toBe(5.5);
    expect(sum(0, 3.3)).toBe(3.3);
  });

  test("additionne des nombres décimaux", () => {
    expect(sum(1.5, 2.5)).toBe(4);
  });

  test("additionne un décimal et un entier", () => {
    expect(sum(1.5, 3)).toBe(4.5);
    expect(sum(5, 2.3)).toBe(7.3);
  });

  test("additionne deux nombres décimaux négatifs", () => {
    expect(sum(-2.5, -3.5)).toBe(-6);
  });

  test("additionne un nombre décimale positif et un négatif", () => {
    expect(sum(5.5, -3.5)).toBe(2);
    expect(sum(-5.5, 3.5)).toBe(-2);
  });

  test("gère les très grands nombres", () => {
    expect(sum(1e10, 1e10)).toBe(2e10);
    expect(sum(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
  });

  test("gère les très petits nombres", () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    expect(sum(1e-10, 2e-10)).toBeCloseTo(3e-10);
  });

  test("gère les valeurs infinies", () => {
    expect(sum(Infinity, 5)).toBe(Infinity);
    expect(sum(-Infinity, 5)).toBe(-Infinity);
    expect(sum(Infinity, -Infinity)).toBeNaN();
    expect(sum(Infinity, Infinity)).toBe(Infinity);
    expect(sum(-Infinity, -Infinity)).toBe(-Infinity);
  });

  test("gère NaN (Not a Number)", () => {
    expect(sum(NaN, 5)).toBeNaN();
    expect(sum(5, NaN)).toBeNaN();
    expect(sum(NaN, NaN)).toBeNaN();
  });

  test("gère les types non-numériques", () => {
    expect(sum("5", 3)).toBe("53"); // concaténation de chaînes
    expect(sum(3, "5")).toBe("35"); // concaténation de chaînes
    expect(sum("hello", "world")).toBe("helloworld");
    expect(sum(true, 1)).toBe(2); // true converti en 1
    expect(sum(false, 5)).toBe(5); // false converti en 0
    expect(sum(null, 5)).toBe(5); // null converti en 0
    expect(sum(undefined, 5)).toBeNaN(); // undefined converti en NaN
  });

  test("gère le dépassement de capacité", () => {
    expect(sum(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Infinity);
    expect(sum(-Number.MAX_VALUE, -Number.MAX_VALUE)).toBe(-Infinity);
  });

  test("gère les nombres en notation scientifique", () => {
    expect(sum(1e20, 1e20)).toBe(2e20);
    expect(sum(1.5e-5, 2.5e-5)).toBeCloseTo(4e-5);
  });
});

// isPalindrome : vérifie si une chaîne est un palindrome
describe("isPalindrome", () => {
  test("vérifie un palindrome simple", () => {
    expect(isPalindrome("radar")).toBe(true);
  });

  test("vérifie un non-palindrome", () => {
    expect(isPalindrome("hello")).toBe(false);
  });

  test("ignore la casse", () => {
    expect(isPalindrome("Radar")).toBe(true);
    expect(isPalindrome("RaceCar")).toBe(true);
  });

  test("ignore les espaces", () => {
    expect(isPalindrome("A man a plan a canal Panama")).toBe(true);
    expect(isPalindrome("race a car")).toBe(false);
  });

  test("chaîne vide", () => {
    expect(isPalindrome("")).toBe(true);
  });

  test("caractère unique", () => {
    expect(isPalindrome("a")).toBe(true);
  });

  test("palindrome avec espaces et casse mixte", () => {
    expect(isPalindrome("Madam")).toBe(true);
    expect(isPalindrome("A Santa at NASA")).toBe(true);
  });
});

// getMax : trouve le maximum dans un tableau de nombres
describe("getMax", () => {
  test("trouve le maximum dans un tableau de nombres positifs", () => {
    expect(getMax([1, 3, 2, 5, 4])).toBe(5);
  });

  test("trouve le maximum dans un tableau avec des nombres négatifs", () => {
    expect(getMax([-1, -3, -2, -5, -4])).toBe(-1);
  });

  test("trouve le maximum dans un tableau mixte", () => {
    expect(getMax([-1, 3, -2, 5, -4])).toBe(5);
  });

  test("tableau avec un seul élément", () => {
    expect(getMax([42])).toBe(42);
  });

  test("tableau vide retourne null", () => {
    expect(getMax([])).toBe(null);
  });

  test("entrée non-tableau retourne null", () => {
    expect(getMax(null)).toBe(null);
    expect(getMax(undefined)).toBe(null);
    expect(getMax("not an array")).toBe(null);
    expect(getMax(123)).toBe(null);
  });

  test("tableau avec des nombres décimaux", () => {
    expect(getMax([1.5, 2.7, 1.2, 3.1])).toBe(3.1);
  });
});

// capitalize : met en majuscule la première lettre d'une chaîne
describe("capitalize", () => {
  test("met en majuscule la première lettre d'un mot en minuscules", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("met en majuscule et convertit le reste en minuscules", () => {
    expect(capitalize("HELLO")).toBe("Hello");
    expect(capitalize("hELLO")).toBe("Hello");
  });

  test("gère une chaîne avec un seul caractère", () => {
    expect(capitalize("a")).toBe("A");
    expect(capitalize("A")).toBe("A");
  });

  test("gère une chaîne vide", () => {
    expect(capitalize("")).toBe("");
  });

  test("gère les valeurs nulles ou undefined", () => {
    expect(capitalize(null)).toBe("");
    expect(capitalize(undefined)).toBe("");
  });

  test("gère les mots avec des espaces", () => {
    expect(capitalize("hello world")).toBe("Hello world");
  });

  test("gère les caractères spéciaux", () => {
    expect(capitalize("123abc")).toBe("123abc");
    expect(capitalize("!hello")).toBe("!hello");
  });
});

// divide : divise deux nombres
describe("divide", () => {
  test("divise deux nombres positifs", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("divise avec des nombres décimaux", () => {
    expect(divide(7.5, 2.5)).toBe(3);
  });

  test("divise par un nombre négatif", () => {
    expect(divide(10, -2)).toBe(-5);
  });

  test("divise un nombre négatif", () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  test("divise deux nombres négatifs", () => {
    expect(divide(-10, -2)).toBe(5);
  });

  test("divise zéro par un nombre", () => {
    expect(divide(0, 5)).toBe(0);
  });

  test("division par zéro lance une erreur", () => {
    expect(() => divide(4, 0)).toThrow("Division by zero");
    expect(() => divide(-4, 0)).toThrow("Division by zero");
    expect(() => divide(0, 0)).toThrow("Division by zero");
  });

  test("division avec résultat décimal", () => {
    expect(divide(7, 2)).toBe(3.5);
  });

// validation des emails
describe('validateEmail', () => {
  // Tests de base - emails valides
  test('accepte un email valide simple', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  test('accepte un email avec des chiffres', () => {
    expect(validateEmail('user123@domain123.com')).toBe(true);
  });

  test('accepte un email avec des caractères spéciaux autorisés', () => {
    expect(validateEmail('user.name+tag@example.com')).toBe(true);
    expect(validateEmail('user_name@example.com')).toBe(true);
    expect(validateEmail('user-name@example.com')).toBe(true);
    expect(validateEmail('user%test@example.com')).toBe(true);
  });

  test('accepte un email avec sous-domaine', () => {
    expect(validateEmail('user@mail.example.com')).toBe(true);
  });

  test('accepte un email avec domaine de premier niveau plus long', () => {
    expect(validateEmail('user@example.info')).toBe(true);
    expect(validateEmail('user@example.museum')).toBe(true);
  });

  // Tests de base - emails invalides
  test('rejette un email sans @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });

  test('rejette un email avec plusieurs @', () => {
    expect(validateEmail('user@@example.com')).toBe(false);
    expect(validateEmail('user@ex@ample.com')).toBe(false);
    expect(validateEmail('user@example@.com')).toBe(false);
    expect(validateEmail('@user@example.com')).toBe(false);
    expect(validateEmail('user@example.com@')).toBe(false);
    expect(validateEmail('user@@@example.com')).toBe(false);
    expect(validateEmail('@@@')).toBe(false);
    expect(validateEmail('user@domain@subdomain.com')).toBe(false);
  });

  test('rejette un email avec zéro @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
    expect(validateEmail('user.example.com')).toBe(false);
    expect(validateEmail('user-example.com')).toBe(false);
    expect(validateEmail('user_example_com')).toBe(false);
    expect(validateEmail('plaintext')).toBe(false);
    expect(validateEmail('user.domain.com')).toBe(false);
  });

  test('accepte exactement un @', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('a@b.co')).toBe(true);
    expect(validateEmail('test@domain.org')).toBe(true);
  });

  test('rejette un email sans partie locale', () => {
    expect(validateEmail('@example.com')).toBe(false);
  });

  test('rejette un email sans domaine', () => {
    expect(validateEmail('user@')).toBe(false);
  });

  test('rejette un email sans extension de domaine', () => {
    expect(validateEmail('user@example')).toBe(false);
  });

  test('rejette un email avec extension trop courte', () => {
    expect(validateEmail('user@example.c')).toBe(false);
  });

  // Tests des cas limites
  test('gère les chaînes vides', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('   ')).toBe(false);
  });

  test('gère les valeurs nulles et undefined', () => {
    expect(validateEmail(null)).toBe(false);
    expect(validateEmail(undefined)).toBe(false);
  });

  test('gère les types non-string', () => {
    expect(validateEmail(123)).toBe(false);
    expect(validateEmail(true)).toBe(false);
    expect(validateEmail({})).toBe(false);
    expect(validateEmail([])).toBe(false);
  });

  test('gère les espaces en début/fin', () => {
    expect(validateEmail('  user@example.com  ')).toBe(true);
    expect(validateEmail('\tuser@example.com\n')).toBe(true);
  });

  test('rejette les espaces dans l\'email', () => {
    expect(validateEmail('user name@example.com')).toBe(false);
    expect(validateEmail('user@exam ple.com')).toBe(false);
  });

  // Tests des règles spécifiques
  test('rejette les points en début/fin de partie locale', () => {
    expect(validateEmail('.user@example.com')).toBe(false);
    expect(validateEmail('user.@example.com')).toBe(false);
  });

  test('rejette les points consécutifs dans la partie locale', () => {
    expect(validateEmail('user..name@example.com')).toBe(false);
    expect(validateEmail('user...test@example.com')).toBe(false);
  });

  test('rejette les tirets en début/fin de domaine', () => {
    expect(validateEmail('user@-example.com')).toBe(false);
    expect(validateEmail('user@example-.com')).toBe(false);
    expect(validateEmail('user@example.-com')).toBe(false);
    expect(validateEmail('user@example.com-')).toBe(false);
  });

  test('rejette les domaines avec parties vides', () => {
    expect(validateEmail('user@example..com')).toBe(false);
    expect(validateEmail('user@.example.com')).toBe(false);
    expect(validateEmail('user@example.com.')).toBe(false);
  });

  // Tests de longueur
  test('rejette une partie locale trop longue', () => {
    const longLocal = 'a'.repeat(65); // 65 caractères
    expect(validateEmail(`${longLocal}@example.com`)).toBe(false);
  });

  test('accepte une partie locale à la limite', () => {
    const maxLocal = 'a'.repeat(64); // 64 caractères
    expect(validateEmail(`${maxLocal}@example.com`)).toBe(true);
  });

  test('rejette un domaine trop long', () => {
    const longDomain = 'a'.repeat(250) + '.com'; // > 253 caractères
    expect(validateEmail(`user@${longDomain}`)).toBe(false);
  });

  // Tests de caractères spéciaux
  test('rejette les caractères interdits', () => {
    expect(validateEmail('user@exam<>ple.com')).toBe(false);
    expect(validateEmail('user@exam[]ple.com')).toBe(false);
    expect(validateEmail('user@exam()ple.com')).toBe(false);
    expect(validateEmail('user@exam,ple.com')).toBe(false);
    expect(validateEmail('user@exam;ple.com')).toBe(false);
  });

  test('accepte les caractères autorisés dans la partie locale', () => {
    expect(validateEmail('user+tag@example.com')).toBe(true);
    expect(validateEmail('user_name@example.com')).toBe(true);
    expect(validateEmail('user-name@example.com')).toBe(true);
    expect(validateEmail('user123@example.com')).toBe(true);
  });

  // Tests de domaines spéciaux
  test('accepte les domaines avec tirets au milieu', () => {
    expect(validateEmail('user@ex-ample.com')).toBe(true);
    expect(validateEmail('user@mail-server.example.com')).toBe(true);
  });

  test('accepte les domaines numériques', () => {
    expect(validateEmail('user@123domain.com')).toBe(true);
    expect(validateEmail('user@domain123.com')).toBe(true);
  });

    // Tests de base - emails invalides
  test('rejette un email sans @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });

  test('rejette un email avec plusieurs @', () => {
    expect(validateEmail('user@@example.com')).toBe(false);
    expect(validateEmail('user@ex@ample.com')).toBe(false);
    expect(validateEmail('user@example@.com')).toBe(false);
    expect(validateEmail('@user@example.com')).toBe(false);
    expect(validateEmail('user@example.com@')).toBe(false);
    expect(validateEmail('user@@@example.com')).toBe(false);
    expect(validateEmail('@@@')).toBe(false);
    expect(validateEmail('user@domain@subdomain.com')).toBe(false);
  });

  test('rejette un email avec zéro @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
    expect(validateEmail('user.example.com')).toBe(false);
    expect(validateEmail('user-example.com')).toBe(false);
    expect(validateEmail('user_example_com')).toBe(false);
    expect(validateEmail('plaintext')).toBe(false);
    expect(validateEmail('user.domain.com')).toBe(false);
  });


  // Tests de casse
  test('accepte les majuscules et minuscules', () => {
    expect(validateEmail('User@Example.COM')).toBe(true);
    expect(validateEmail('USER@EXAMPLE.COM')).toBe(true);
    expect(validateEmail('user@example.com')).toBe(true);
  });
});
});
