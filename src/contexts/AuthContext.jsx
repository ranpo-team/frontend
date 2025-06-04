import { createContext, useContext, useEffect, useState } from 'react';
import { BACKEND_URL } from '../constants/endpoints';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // /api/me 호출해서 로그인 상태 확인
    fetch(BACKEND_URL + '/api/members/me', {
      credentials: 'include', // 쿠키 전송
    })
      .then((res) => {
        if (!res.ok) throw new Error('unauthenticated');
        return res.json();
      })
      .then((data) => {
        setUser(data.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
