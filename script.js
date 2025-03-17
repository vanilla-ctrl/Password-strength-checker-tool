const passwordInput = document.getElementById('passwordInput');
const strengthMeter = document.getElementById('strengthMeter');
const suggestions = document.getElementById('suggestions');

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  const strength = checkPasswordStrength(password);
  updateStrengthMeter(strength);
  provideSuggestions(password, strength);
});

function checkPasswordStrength(password) {
  let strength = 0;

  // Check length
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;

  // Check for uppercase, lowercase, numbers, and special characters
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  // Check for common weak passwords
  const weakPasswords = ['password', '123456', 'qwerty', 'admin'];
  if (weakPasswords.includes(password.toLowerCase())) strength = 0;

  return strength;
}

function updateStrengthMeter(strength) {
  strengthMeter.style.width = `${strength * 20}%`;
  if (strength <= 2) {
    strengthMeter.style.backgroundColor = 'red';
  } else if (strength <= 4) {
    strengthMeter.style.backgroundColor = 'orange';
  } else {
    strengthMeter.style.backgroundColor = 'green';
  }
}

function provideSuggestions(password, strength) {
  let suggestionText = '';
  if (password.length < 8) {
    suggestionText += 'Password should be at least 8 characters long. ';
  }
  if (!/[A-Z]/.test(password)) {
    suggestionText += 'Include at least one uppercase letter. ';
  }
  if (!/[0-9]/.test(password)) {
    suggestionText += 'Include at least one number. ';
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    suggestionText += 'Include at least one special character. ';
  }
  suggestions.textContent = suggestionText;
}
