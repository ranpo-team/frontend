import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../constants/endpoints';
import { useAlert } from '../../contexts/AlertContext';

export default function CreatePollPage() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [form, setForm] = useState({
    title: '',
    description: '',
    startAt: '',
    endAt: '',
    authType: 'EMAIL',
    winnerSelectType: 'RANDOM',
    winnerScope: 'ALL',
    totalWinnerCount: 0,
    rewardEnabled: false,
    options: [{ content: '', winnerCount: 0, sortOrder: 1 }],
  });

  const getNowLocalDatetime = () => {
    const now = new Date();
    now.setSeconds(0, 0);
    return now.toISOString().slice(0, 16);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newForm = {
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    };

    if (name === 'winnerScope' && value === 'BY_OPTION') {
      newForm.totalWinnerCount = form.options.reduce(
        (sum, opt) => sum + Number(opt.winnerCount || 0),
        0
      );
    }

    setForm(newForm);
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...form.options];
    updatedOptions[index][field] =
      field === 'winnerCount' || field === 'sortOrder' ? Number(value) : value;

    const newForm = {
      ...form,
      options: updatedOptions,
    };

    if (form.winnerScope === 'BY_OPTION' && field === 'winnerCount') {
      newForm.totalWinnerCount = updatedOptions.reduce(
        (sum, opt) => sum + Number(opt.winnerCount || 0),
        0
      );
    }

    setForm(newForm);
  };

  const addOption = () => {
    const updated = [
      ...form.options,
      { content: '', winnerCount: 0, sortOrder: form.options.length + 1 },
    ];
    const total =
      form.winnerScope === 'BY_OPTION'
        ? updated.reduce((sum, opt) => sum + Number(opt.winnerCount || 0), 0)
        : form.totalWinnerCount;

    setForm({ ...form, options: updated, totalWinnerCount: total });
  };

  const removeOption = (index) => {
    const updated = [...form.options];
    updated.splice(index, 1);
    const total =
      form.winnerScope === 'BY_OPTION'
        ? updated.reduce((sum, opt) => sum + Number(opt.winnerCount || 0), 0)
        : form.totalWinnerCount;

    setForm({ ...form, options: updated, totalWinnerCount: total });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const start = new Date(form.startAt);
    const end = new Date(form.endAt);

    if (start <= now) {
      alert('시작 시간은 현재 시각 이후여야 합니다.');
      return;
    }
    if (end <= start) {
      alert('종료 시간은 시작 시간 이후여야 합니다.');
      return;
    }
    if (
      form.options.length === 0 ||
      form.options.some((opt) => !opt.content.trim())
    ) {
      alert('모든 선택지는 내용이 있어야 하며, 1개 이상이어야 합니다.');
      return;
    }

    const payload = {
      ...form,
      rewardEnabled: form.rewardEnabled || false,
      options: form.options.map((opt) => ({
        content: opt.content,
        winnerCount: Number(opt.winnerCount),
        sortOrder: Number(opt.sortOrder),
      })),
    };

    try {
      const res = await fetch(BACKEND_URL + '/api/v1/polls/create', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error('Failed to upload');
      }

      showAlert('성공적으로 작성되었어요!', 'success');
      navigate(`/polls/${data.data.id}`);
    } catch (err) {
      console.error(err);
      showAlert('투표 생성에 실패했어요.', 'error');
    }
  };

  return (
    <div className='max-w-3xl mx-auto px-4 sm:px-6 py-10'>
      <h1 className='text-3xl font-semibold text-blue-600 mb-6'>투표 만들기</h1>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* 제목 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            제목 *
          </label>
          <input
            type='text'
            name='title'
            value={form.title}
            onChange={handleChange}
            required
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='투표 제목을 입력하세요'
          />
        </div>

        {/* 설명 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            설명
          </label>
          <textarea
            name='description'
            value={form.description}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='투표에 대한 설명을 작성하세요'
          />
        </div>

        {/* 시간 */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              시작 시간 *
            </label>
            <input
              type='datetime-local'
              name='startAt'
              value={form.startAt}
              onChange={handleChange}
              required
              min={getNowLocalDatetime()}
              className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              종료 시간 *
            </label>
            <input
              type='datetime-local'
              name='endAt'
              value={form.endAt}
              onChange={handleChange}
              required
              min={form.startAt || getNowLocalDatetime()}
              disabled={!form.startAt}
              className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        {/* 인증, 당첨 설정 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            인증 방식 *
          </label>
          <select
            name='authType'
            value={form.authType}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='EMAIL'>이메일 인증</option>
            <option value='PHONE'>전화번호 인증</option>
            <option value='MEMBER'>가입 멤버만</option>
          </select>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              당첨 방식 *
            </label>
            <select
              name='winnerSelectType'
              value={form.winnerSelectType}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='RANDOM'>랜덤 추첨</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              당첨 범위 *
            </label>
            <select
              name='winnerScope'
              value={form.winnerScope}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='ALL'>전체 중</option>
              <option value='BY_OPTION'>선택지별</option>
            </select>
          </div>
        </div>

        {/* 총 당첨자 수 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            총 당첨자 수 *
          </label>
          <input
            type='number'
            name='totalWinnerCount'
            min={0}
            value={form.totalWinnerCount}
            onChange={handleChange}
            required
            disabled={form.winnerScope === 'BY_OPTION'}
            className={`w-full border rounded px-3 py-2 ${
              form.winnerScope === 'BY_OPTION'
                ? 'bg-gray-100 text-gray-500'
                : ''
            }`}
          />
        </div>

        {/* 보상 여부 */}
        <div className='flex items-center space-x-2'>
          <input
            type='checkbox'
            name='rewardEnabled'
            checked={form.rewardEnabled}
            onChange={handleChange}
            id='rewardEnabled'
            className='w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
          />
          <label htmlFor='rewardEnabled' className='text-sm text-gray-700'>
            보상 있음
          </label>
        </div>

        {/* 선택지 */}
        <div>
          <div className='flex items-center justify-between mb-2'>
            <label className='text-sm font-medium text-gray-700'>
              선택지 *
            </label>
            <button
              type='button'
              onClick={addOption}
              className='text-sm text-blue-600 hover:underline'
            >
              + 선택지 추가
            </button>
          </div>
          <div className='space-y-4'>
            {form.options.map((option, idx) => (
              <div
                key={idx}
                className='border rounded-lg p-4 space-y-2 relative'
              >
                <button
                  type='button'
                  onClick={() => removeOption(idx)}
                  className='absolute top-2 right-2 text-gray-400 hover:text-red-500'
                  title='삭제'
                >
                  ✕
                </button>
                <div>
                  <label className='block text-sm text-gray-700 mb-1'>
                    내용 *
                  </label>
                  <input
                    type='text'
                    value={option.content}
                    onChange={(e) =>
                      handleOptionChange(idx, 'content', e.target.value)
                    }
                    required
                    className='w-full border rounded px-3 py-2'
                    placeholder='선택지 내용을 입력하세요'
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm text-gray-700 mb-1'>
                      당첨자 수
                    </label>
                    <input
                      type='number'
                      value={option.winnerCount}
                      min={0}
                      disabled={form.winnerScope === 'ALL'}
                      onChange={(e) =>
                        handleOptionChange(idx, 'winnerCount', e.target.value)
                      }
                      className={`w-full border rounded px-3 py-2 ${
                        form.winnerScope === 'ALL'
                          ? 'bg-gray-100 text-gray-500'
                          : ''
                      }`}
                    />
                  </div>
                  <div>
                    <label className='block text-sm text-gray-700 mb-1'>
                      정렬 순서
                    </label>
                    <input
                      type='number'
                      value={option.sortOrder}
                      min={1}
                      onChange={(e) =>
                        handleOptionChange(idx, 'sortOrder', e.target.value)
                      }
                      className='w-full border rounded px-3 py-2'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition'
        >
          투표 생성하기
        </button>
      </form>
    </div>
  );
}
