import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../constants/endpoints';

const authTypeLabel = {
  MEMBER: '회원 참여 가능',
  EMAIL: '이메일 인증 필요',
  PHONE: '휴대폰 인증 필요',
};

const winnerSelectLabel = {
  RANDOM: '무작위 추첨',
};

const winnerScopeLabel = {
  ALL: '전체 응답자 중 당첨',
  BY_OPTION: '선택지별 당첨',
};

const PollDetailPage = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/polls/${pollId}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (data.success) {
          setPoll(data.data);
        } else {
          setError('투표를 불러오지 못했어요 😢');
        }
      } catch (err) {
        setError('서버 오류가 발생했어요.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [pollId]);

  const getStatus = () => {
    if (!poll) return '';
    const now = new Date();
    const start = new Date(poll.startAt);
    const end = new Date(poll.endAt);

    if (now < start) return '투표 시작 전';
    if (now > end) return '투표 종료됨';
    return '진행 중';
  };

  const canVote = getStatus() === '진행 중';

  const handleVote = () => {
    if (!canVote || selectedOptionId == null) return;
    console.log(`선택된 옵션 ID: ${selectedOptionId}`);
    // TODO: 투표 POST 요청 보내기
  };

  if (loading)
    return (
      <div className='text-center py-10 text-blue-500 text-sm'>로딩 중...</div>
    );
  if (error)
    return (
      <div className='text-center text-red-500 py-10 text-sm'>{error}</div>
    );
  if (!poll) return null;

  return (
    <div className='max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 pb-20'>
      {/* 투표 정보 카드 */}
      <div className='bg-white rounded-xl shadow p-6 mb-6 border'>
        <h1 className='text-2xl font-bold text-blue-600 mb-2'>{poll.title}</h1>
        {poll.description && (
          <p className='text-gray-700 text-sm mb-4'>{poll.description}</p>
        )}

        <div className='flex flex-wrap gap-2 text-xs mb-4'>
          <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded-full'>
            {authTypeLabel[poll.authType]}
          </span>
          <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded-full'>
            {winnerSelectLabel[poll.winnerSelectType]}
          </span>
          <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded-full'>
            {winnerScopeLabel[poll.winnerScope]}
          </span>
        </div>

        <div className='text-sm text-gray-500 space-y-1 mb-2'>
          <p>시작: {new Date(poll.startAt).toLocaleString()}</p>
          <p>종료: {new Date(poll.endAt).toLocaleString()}</p>
        </div>

        <div className='text-sm font-medium text-blue-600 mb-1'>
          ⏳ {getStatus()}
        </div>

        <div className='text-sm text-gray-800 mt-1 font-semibold'>
          총 {poll.totalWinnerCount}명이 당첨됩니다.
        </div>
      </div>

      {/* 선택지 목록 */}
      <div className='bg-white rounded-xl shadow p-6 mb-6 border'>
        <h2 className='text-lg font-semibold text-blue-600 mb-4'>선택지</h2>
        <div className='space-y-3'>
          {poll.options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => setSelectedOptionId(option.id)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 ease-in-out transform
                ${
                  selectedOptionId === option.id
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow'
                    : 'bg-gray-50 hover:bg-blue-50 hover:shadow-sm hover:scale-[1.01] text-gray-800'
                }`}
            >
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>
                  <span className='mr-2 text-gray-400'>{index + 1}.</span>
                  {option.content}
                </span>
                {option.winnerCount != null && (
                  <span className='text-xs text-blue-500'>
                    🎯 {option.winnerCount}명 당첨
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 투표하기 버튼 */}
      <button
        onClick={handleVote}
        disabled={!canVote || selectedOptionId == null}
        className={`w-full py-3 rounded-lg text-sm font-semibold transition 
          ${
            canVote && selectedOptionId != null
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        투표하기
      </button>
    </div>
  );
};

export default PollDetailPage;
