import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className='bg-white border-b shadow-sm fixed top-0 left-0 right-0 z-50'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
        {/* 로고 */}
        <Link
          to='/'
          className='text-xl font-bold text-blue-600 hover:text-blue-700'
        >
          RanPo
        </Link>

        {/* 사용자 정보 */}
        {!loading && user && (
          <div className='relative' ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className='text-sm text-gray-800 font-medium hover:text-blue-600'
            >
              {user.nickname}님 ▾
            </button>

            {menuOpen && (
              <div className='absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md text-sm z-50'>
                <button
                  onClick={() => handleNavigate('/mypage')}
                  className='w-full text-left px-4 py-2 hover:bg-gray-100'
                >
                  마이페이지
                </button>
                <button
                  onClick={() => handleNavigate('/poll/create')}
                  className='w-full text-left px-4 py-2 hover:bg-gray-100'
                >
                  투표 생성하기
                </button>
                <button
                  onClick={() => {
                    // 로그아웃 처리 로직 필요 시 여기에 추가
                    alert('로그아웃 기능은 아직 연결되지 않았어요!');
                    setMenuOpen(false);
                  }}
                  className='w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500'
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
