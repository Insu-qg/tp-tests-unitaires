export function sum(a, b) {
  return a + b;
}

export function isPalindrome(str) {
  // ignore la casse et les espaces
  const clean = str.toLowerCase().replace(/\s/g, '');
  return clean === clean.split('').reverse().join('');
}

export function getMax(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return Math.max(...arr);
}

export function capitalize(str) {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

export function validateEmail(email) {
  // Vérifie si l'email est une chaîne non vide
  if (typeof email !== 'string' || email.trim() === '') {
    return false;
  }

  // Vérifie qu'il n'y a qu'un seul @
  const atCount = email.split('@').length - 1;
  if (atCount !== 1) {
    return false;
  }

  // Expression régulière pour valider l'email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Vérifie la structure de base
  if (!emailRegex.test(email.trim())) {
    return false;
  }

  // Sépare la partie locale et le domaine
  const [localPart, domain] = email.trim().split('@');

  // Vérifie la longueur de la partie locale (max 64 caractères)
  if (localPart.length > 64) {
    return false;
  }

  // Vérifie la longueur du domaine (max 253 caractères)
  if (domain.length > 253) {
    return false;
  }

  // Vérifie que la partie locale ne commence/finit pas par un point
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return false;
  }

  // Vérifie qu'il n'y a pas de points consécutifs dans la partie locale
  if (localPart.includes('..')) {
    return false;
  }

  // Vérifie que le domaine ne commence/finit pas par un tiret
  const domainParts = domain.split('.');
  for (const part of domainParts) {
    if (part.startsWith('-') || part.endsWith('-') || part === '') {
      return false;
    }
  }

  return true;
}