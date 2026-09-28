const BASE_URL = "http://localhost:5000/api";

async function test() {
  // 1. Register/Login to get a token
  const email = "test" + Date.now() + "@example.com";
  await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Test", email, password: "password123", confirmPassword: "password123" })
  });

  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: "password123" })
  });
  const { accessToken } = await loginRes.json();

  // 2. Test the Product POST with Content-Type (Fix applied)
  console.log("\n--- Testing WITH Content-Type ---");
  const res1 = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      name: "Wireless Mouse",
      description: "Basic wireless mouse",
      price: "599",
      stock: "10",
      category: "Electronics"
    })
  });
  console.log("Status:", res1.status);
  console.log("Response:", await res1.json());

  // 3. Test the Product POST WITHOUT Content-Type (Simulating the bug)
  console.log("\n--- Testing WITHOUT Content-Type (Simulating Bug) ---");
  const res2 = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { 
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      name: "Wireless Mouse",
      description: "Basic wireless mouse",
      price: "599",
      stock: "10",
      category: "Electronics"
    })
  });
  console.log("Status:", res2.status);
  console.log("Response:", JSON.stringify(await res2.json(), null, 2));

  process.exit(0);
}

test();
