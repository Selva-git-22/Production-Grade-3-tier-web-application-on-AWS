const BASE_URL = "http://10.0.19.157";

// =====================
// LOGIN
// =====================
export async function loginUser(email, password) {
  const res = await fetch(
    `${BASE_URL}/api/users?email=${email}&password=${password}`
  );
  return res.json();
}

// =====================
// SIGNUP
// =====================
export async function signupUser(user) {
  const res = await fetch(`${BASE_URL}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return res.json();
}

// =====================
// GET PRODUCTS
// =====================
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}
