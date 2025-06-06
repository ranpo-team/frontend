function SocialLoginButton({ provider, url }) {
  const config = {
    kakao: {
      bg: 'bg-[#FEE500]',
      logo: '/assets/kakao-login.png',
    },
    naver: {
      bg: 'bg-[#03C75A]',
      logo: '/assets/naver-login.png',
    },
    google: {
      bg: 'bg-[#F2F2F2]',
      logo: '/assets/google-login.png',
    },
  };

  const { bg, logo } = config[provider];

  return (
    <a
      href={url}
      className={`w-full h-12 ${bg} rounded-xl overflow-hidden shadow-md hover:scale-[1.02] hover:opacity-90 transition-transform flex items-center justify-center px-4`}
    >
      <img
        src={logo}
        alt={`${provider} 로그인`}
        className='h-11 object-contain'
      />
    </a>
  );
}

export default SocialLoginButton;
