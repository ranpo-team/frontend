import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen bg-blue-50 flex items-center justify-center'>
        <p className='text-gray-600'>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-blue-50 flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white rounded-3xl shadow-xl p-10 text-center'>
        <h1 className='text-4xl font-extrabold text-blue-600 mb-6'>RanPo 🎲</h1>
        <p className='text-gray-600 mb-10'>
          이벤트 투표 플랫폼 RanPo에 오신 것을 환영합니다 !
        </p>

        {user ? (
          <>
            <p className='text-lg text-blue-600 font-semibold'>
              환영합니다, {user.nickname}님! 🎉
            </p>
            <p className='text-sm text-gray-500 mt-2'>{user.email}</p>
          </>
        ) : (
          <Link
            to='/login'
            className='inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition'
          >
            로그인 하러 가기
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomePage;
