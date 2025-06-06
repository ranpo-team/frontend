import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../contexts/AlertContext';

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorMessage = params.get('error');

    if (errorMessage) {
      showAlert(decodeURIComponent(errorMessage), 'error');
      navigate('/login', { replace: true });
    } else {
      showAlert('반가워요! 로그인에 성공했어요!', 'success');
      navigate('/', { replace: true });
    }
  }, [navigate, showAlert]);

  return null;
}

export default OAuth2RedirectHandler;
