import SocialLoginButton from '../components/SocialLoginButton';
import {
  GOOGLE_LOGIN_URL,
  NAVER_LOGIN_URL,
  KAKAO_LOGIN_URL,
} from '../constants/oauth2Urls';

function LoginPage() {
  return (
    <div className='min-h-screen bg-blue-50 flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white rounded-3xl shadow-xl p-10 text-center'>
        <h1 className='text-4xl font-extrabold text-blue-600 mb-3'>RanPo 🎲</h1>
        <p className='text-gray-700 text-base font-medium mb-1'>
          랜덤으로 뽑히는 짜릿한 재미!
        </p>
        <p className='text-gray-500 text-sm mb-8'>
          먼저 로그인하고 놀아볼까요?
        </p>

        <div className='flex flex-col gap-4'>
          <SocialLoginButton provider='kakao' url={KAKAO_LOGIN_URL} />
          <SocialLoginButton provider='naver' url={NAVER_LOGIN_URL} />
          <SocialLoginButton provider='google' url={GOOGLE_LOGIN_URL} />
        </div>

        <div className='text-xs text-gray-400 mt-6'>
          로그인은 인증용이에요. 소중한 정보는 건드리지 않아요 🐣
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
