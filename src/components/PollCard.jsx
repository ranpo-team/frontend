import { Link } from 'react-router-dom';

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} / ${hh}:${min}`;
};

const PollCard = ({ poll }) => {
  return (
    <Link
      to={`/polls/${poll.id}`}
      className='block bg-white border rounded-2xl shadow-sm hover:shadow-md transition px-5 py-4 w-full'
    >
      <div className='flex items-start justify-between gap-2'>
        <h2 className='text-lg font-semibold text-blue-700'>{poll.title}</h2>
        {poll.rewardEnabled && (
          <span className='text-xs bg-yellow-100 text-yellow-800 font-medium px-2 py-1 rounded-full whitespace-nowrap'>
            🎁 보상 있음
          </span>
        )}
      </div>

      {poll.description && (
        <p className='text-sm text-gray-600 mt-1 line-clamp-2'>
          {poll.description}
        </p>
      )}

      <div className='mt-3 space-y-1 text-xs text-gray-500'>
        <div>⏱ 시작: {formatDateTime(poll.startAt)}</div>
        <div>⏳ 종료: {formatDateTime(poll.endAt)}</div>
      </div>
    </Link>
  );
};

export default PollCard;
