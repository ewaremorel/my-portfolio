import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi, setUnauthorizedHandler, tokenStore } from "../api/api";

// Think of this as a "global notice board": any component can ask
// "who is signed in?" without passing props through every level.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // true while we check a saved token when the app first loads
  const [loading, setLoading] = useState(Boolean(tokenStore.get()));

  const clearSession = useCallback(() => {
    tokenStore.clear();
    setUser(null);
  }, []);

  // On first load: if a token is saved, ask the server who it belongs to.
  useEffect(() => {
    if (!tokenStore.get()) return;
    authApi
      .me()
      .then(setUser)
      .catch(clearSession)
      .finally(() => setLoading(false));
  }, [clearSession]);

  // If any request comes back "401 expired token", sign out automatically.
  useEffect(() => {
    setUnauthorizedHandler(clearSession);
    return () => setUnauthorizedHandler(null);
  }, [clearSession]);

  const signIn = useCallback(async (values) => {
    const data = await authApi.signIn(values);
    tokenStore.set(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const signUp = useCallback(async (values) => {
    const data = await authApi.signUp(values);
    tokenStore.set(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authApi.signOut(); // tells the server (it only replies "ok")
    } catch (err) {
      // even if the server is unreachable, we still sign out locally
    }
    clearSession(); // the real sign-out: delete the token from this browser
  }, [clearSession]);

  const value = useMemo(
    () => ({ user, loading, isAdmin: user?.role === "admin", signIn, signUp, signOut }),
    [user, loading, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
