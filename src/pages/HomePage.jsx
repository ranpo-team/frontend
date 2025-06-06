import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMemo, useEffect, useState } from 'react';
import { BACKEND_URL } from '../constants/endpoints';
import PollCard from '../components/PollCard';

function HomePage() {
  const { user, loading } = useAuth();
  const [polls, setPolls] = useState([]);

  const welcomeMessages = [
    '오늘도 운명의 선택을 기다리고 있어요.',
    '오늘의 투표, 당신의 선택은?',
    '오늘도 재미있는 선택의 순간이 기다리고 있어요',
    '당신의 한 표가 당첨을 부를지도 몰라요!',
  ];

  const randomMessage = useMemo(() => {
    const idx = Math.floor(Math.random() * welcomeMessages.length);
    return welcomeMessages[idx];
  }, []);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/polls?page=0&size=4`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.success) {
          setPolls(data.data.content);
        }
      } catch (err) {
        console.error('홈 투표 불러오기 실패:', err);
      }
    };

    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-blue-50 flex items-center justify-center'>
        <p className='text-gray-600'>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-blue-50 px-4 pt-10 pb-20'>
      {/* 상단 카드 */}
      <div className='max-w-md mx-auto bg-white rounded-3xl shadow-xl p-10 text-center mb-10'>
        <h1 className='text-4xl font-extrabold text-blue-600 mb-6'>RanPo 🎲</h1>
        <p className='text-gray-600 mb-10'>
          이벤트 투표 플랫폼 RanPo에 오신 것을 환영합니다 !
        </p>

        {user ? (
          <>
            <p className='text-lg text-blue-600 font-semibold'>
              환영합니다, {user.nickname}님! 🎉
            </p>
            <p className='text-sm text-gray-500 mt-2'>{randomMessage}</p>
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

      {/* 둘러보기 섹션 */}
      <div className='max-w-3xl mx-auto'>
        <div className='mb-4 flex justify-between items-center px-1'>
          <h2 className='text-xl font-bold text-gray-800'>
            🔥 지금 인기 투표 둘러보기
          </h2>
          <Link to='/polls' className='text-sm text-blue-500 hover:underline'>
            전체 보기 →
          </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
