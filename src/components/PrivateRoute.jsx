import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useRef } from 'react';
import { useAlert } from '../contexts/AlertContext';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const { showAlert } = useAlert();
  const hasAlerted = useRef(false); // 🚨 알림 중복 방지

  useEffect(() => {
    if (!loading && !user && !hasAlerted.current) {
      showAlert('로그인이 필요합니다');
      hasAlerted.current = true;
    }
  }, [loading, user, showAlert]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return user ? children : <Navigate to='/login' replace />;
}
