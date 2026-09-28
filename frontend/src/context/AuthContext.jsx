import { createContext, useContext, useState } from "react";
import { authApi } from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // access token lives in state (not localStorage) — refresh token is in the httpOnly cookie
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const data = await authApi.login({ email, password });
    setAccessToken(data.accessToken);
    setUser(data.user);
  }

  async function register(name, email, password, confirmPassword) {
    return authApi.register({ name, email, password, confirmPassword });
  }

  async function logout() {
    try {
      await authApi.logout(accessToken);
    } finally {
      // always clear local state, even if the API call fails
      setAccessToken(null);
      setUser(null);
    }
  }

  // calls the API, and if it gets a 401 tries to refresh the token once and retries
  async function callWithRefresh(apiFn) {
    try {
      return await apiFn(accessToken);
    } catch (err) {
      if (err.status !== 401) throw err;

      // access token expired — ask the backend for a new one using the cookie
      let newToken;
      try {
        const data = await authApi.refresh();
        newToken = data.accessToken;
        setAccessToken(newToken);
      } catch {
        // refresh also failed, session is gone
        setAccessToken(null);
        setUser(null);
        throw { message: "Session expired. Please log in again." };
      }

      // pass the new token directly — can't read state here, React hasn't re-rendered yet
      return await apiFn(newToken);
    }
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, login, register, logout, callWithRefresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
