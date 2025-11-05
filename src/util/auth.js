// IMPORTANT: This is for demo / local development only. Not to be deployed.
// I just wanted to make this lecture project a bit more complete.
// intentionally simple (base64) and insecure.

export function getUsers() {
  try {
    const raw = localStorage.getItem('users');
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to parse users from localStorage', err);
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function hashPassword(password) {
  // I am aware that this is very insecure. In real apps I would use (bcrypt, Argon2, etc.).
  try {
    return btoa(password);
  } catch (err) {
    return String(password);
  }
}

export function registerUser({ email, password, firstName, lastName, role, acquisition }) {
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    return { success: false, error: 'A user with this email already exists' };
  }

  const newUser = {
    email,
    passwordHash: hashPassword(password),
    firstName: firstName || '',
    lastName: lastName || '',
    role: role || '',
    acquisition: acquisition || [],
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, user: newUser };
}

export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return { success: false, error: 'User not found' };

  if (user.passwordHash !== hashPassword(password)) {
    return { success: false, error: 'Invalid credentials' };
  }

  return { success: true, user };
}

export function setCurrentUserEmail(email) {
  try {
    localStorage.setItem('currentUserEmail', email);
  } catch (err) {
    console.error('Failed to set current user email', err);
  }
}

export function getCurrentUserEmail() {
  try {
    return localStorage.getItem('currentUserEmail');
  } catch (err) {
    return null;
  }
}

export function getCurrentUser() {
  const email = getCurrentUserEmail();
  if (!email) return null;
  const users = getUsers();
  return users.find((u) => u.email === email) || null;
}

export function clearCurrentUser() {
  try {
    localStorage.removeItem('currentUserEmail');
  } catch (err) {
    console.error('Failed to clear current user', err);
  }
}
