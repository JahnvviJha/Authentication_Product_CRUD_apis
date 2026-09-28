// all requests go to the backend at port 5000
const BASE_URL = "http://localhost:5000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    credentials: "include", // browser needs this to send the httpOnly cookie
    ...options,
  });

  const data = await res.json();
  if (!res.ok) {
    // attach status so callers can check it (e.g. to detect 401)
    const err = { ...data, status: res.status };
    throw err;
  }
  return data;
}

export const authApi = {
  register: (body) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(body) }),

  login: (body) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(body) }),

  logout: (token) =>
    request("/auth/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }),

  // calls the refresh endpoint — browser sends the httpOnly cookie automatically
  refresh: () => request("/auth/refresh-token", { method: "POST" }),
};

export const productApi = {
  getAll: () => request("/products"),

  getOne: (id) => request(`/products/${id}`),

  create: (body, token) =>
    request("/products", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    }),

  update: (id, body, token) =>
    request(`/products/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    }),

  remove: (id, token) =>
    request(`/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
};
