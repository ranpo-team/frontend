import SocialLoginButton from '../components/SocialLoginButton';
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
  GOOGLE_LOGIN_URL,
  NAVER_LOGIN_URL,
  KAKAO_LOGIN_URL,
} from '../constants/oauth2Urls';

function LoginPage() {
  return (
    <div className='min-h-screen bg-blue-50 flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white rounded-3xl shadow-xl p-10'>
        <h1 className='text-3xl font-extrabold text-blue-600 text-center mb-10'>
          RanPo 🎲
        </h1>

        <div className='flex flex-col gap-4'>
          <SocialLoginButton provider='kakao' url={KAKAO_LOGIN_URL} />
          <SocialLoginButton provider='naver' url={NAVER_LOGIN_URL} />
          <SocialLoginButton provider='google' url={GOOGLE_LOGIN_URL} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
