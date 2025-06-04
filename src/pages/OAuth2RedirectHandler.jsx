// src/pages/OAuth2RedirectHandler.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuth2RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorMessage = params.get('error');

    if (errorMessage) {
      alert(decodeURIComponent(errorMessage));
      navigate('/login', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return null;
}

export default OAuth2RedirectHandler;
