import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../constants/endpoints';
import PollCard from '../../components/PollCard';

const PollListPage = () => {
  const [polls, setPolls] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const size = 10;

  useEffect(() => {
    const fetchPolls = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/v1/polls?page=${page}&size=${size}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setPolls(data.data.content);
          setTotalPages(data.data.pageInfo.totalPages);
        }
      } catch (err) {
        console.error('투표 목록 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, [page]);

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  return (
    <div className='max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 pb-20'>
      <h1 className='text-2xl font-bold text-blue-600 mb-6'>
        📋 전체 투표 목록
      </h1>

      <div className='space-y-4'>
        {loading ? (
          <p className='text-sm text-blue-500 text-center'>로딩 중...</p>
        ) : (
          polls.map((poll) => <PollCard key={poll.id} poll={poll} />)
        )}
      </div>

      <div className='flex justify-between items-center mt-8'>
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className='px-4 py-2 text-sm rounded-lg bg-blue-100 text-blue-700 disabled:opacity-50'
        >
          이전
        </button>
        <span className='text-sm text-gray-500'>
          {page + 1} / {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page >= totalPages - 1}
          className='px-4 py-2 text-sm rounded-lg bg-blue-100 text-blue-700 disabled:opacity-50'
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default PollListPage;
