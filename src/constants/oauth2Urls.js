import { BACKEND_URL } from './endpoints';

export const KAKAO_LOGIN_URL = BACKEND_URL + '/oauth2/authorization/kakao';
export const GOOGLE_LOGIN_URL = BACKEND_URL + '/oauth2/authorization/google';
export const NAVER_LOGIN_URL = BACKEND_URL + '/oauth2/authorization/naver';

const GOOGLE_REQUEST_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_REDIRECT_URI =
  BACKEND_URL + import.meta.env.VITE_OAUTH2_REDIRECT_PATH + '/google';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const googleAuthUrl = () => {
  let url = GOOGLE_REQUEST_URL;
  url += `?client_id=${GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${GOOGLE_REDIRECT_URI}`;
  url += `&response_type=code`;
  url += `&scope=email profile`;
  return url;
};
export const GOOGLE_AUTH_URL = googleAuthUrl();

const NAVER_REQUEST_URL = 'https://nid.naver.com/oauth2.0/authorize';
const NAVER_REDIRECT_URI =
  BACKEND_URL + import.meta.env.VITE_OAUTH2_REDIRECT_PATH + '/naver';
const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const NAVER_STATE = import.meta.env.VITE_NAVER_STATE;
const naverAuthUrl = () => {
  let url = NAVER_REQUEST_URL;
  url += `?client_id=${NAVER_CLIENT_ID}`;
  url += `&redirect_uri=${NAVER_REDIRECT_URI}`;
  url += `&response_type=code`;
  url += `&state=${NAVER_STATE}`;
  return url;
};
export const NAVER_AUTH_URL = naverAuthUrl();

const KAKAO_REQUEST_URL = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_REDIRECT_URI =
  BACKEND_URL + import.meta.env.VITE_OAUTH2_REDIRECT_PATH + '/kakao';
const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const kakaoAuthUrl = () => {
  let url = KAKAO_REQUEST_URL;
  url += `?client_id=${KAKAO_CLIENT_ID}`;
  url += `&redirect_uri=${KAKAO_REDIRECT_URI}`;
  url += `&response_type=code`;
  return url;
};
export const KAKAO_AUTH_URL = kakaoAuthUrl();
