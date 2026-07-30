import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  /* ── Auth State ── */
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sr_user')) || null; } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('sr_token') || null);

  /* ── UI State ── */
  const [role, setRole]           = useState('parent'); // 'parent' | 'driver' | 'school_admin'
  const [loginOpen, setLoginOpen] = useState(false);
  const [sosOpen,   setSosOpen]   = useState(false);
  const [toasts,    setToasts]    = useState([]);

  /* ── Auth actions ── */
  const doLogin = useCallback((userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('sr_user', JSON.stringify(userData));
    localStorage.setItem('sr_token', jwtToken);
  }, []);

  const doLogout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('sr_user');
    localStorage.removeItem('sr_token');
  }, []);

  /* ── Toast system ── */
  const showToast = useCallback((type, icon, msg) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, icon, msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      user, token, doLogin, doLogout,
      role, setRole,
      loginOpen, setLoginOpen,
      sosOpen,   setSosOpen,
      toasts, showToast, removeToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
