export const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (password.match(/[A-Z]/)) strength += 25;
  if (password.match(/[0-9]/)) strength += 25;
  if (password.match(/[^A-Za-z0-9]/)) strength += 25;
  return strength;
};

export const getPasswordStrengthColor = (strength: number): string => {
  if (strength <= 25) return "red.500";
  if (strength <= 50) return "orange.500";
  if (strength <= 75) return "yellow.500";
  return "green.500";
};

export const getPasswordStrengthText = (strength: number): string => {
  if (strength <= 25) return "Weak";
  if (strength <= 50) return "Fair";
  if (strength <= 75) return "Good";
  return "Strong";
};
