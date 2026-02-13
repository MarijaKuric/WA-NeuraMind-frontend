const API_URL = import.meta.env.VITE_API_URL;

export async function getUsers() {
  const res = await fetch(`${API_URL}/api/users`);
  return res.json();
}
