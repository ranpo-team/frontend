import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [isLeaving, setIsLeaving] = useState(false);

  const showAlert = useCallback((message, type = 'info') => {
    setIsLeaving(false);
    setAlert({ message, type });

    setTimeout(() => {
      setIsLeaving(true);
    }, 2500); // 2.5초 뒤에 사라지기 시작

    setTimeout(() => {
      setAlert(null);
    }, 3000); // 3초 후 알림 제거
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          isLeaving={isLeaving}
        />
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);

const Alert = ({ message, type = 'info', isLeaving }) => {
  const styleMap = {
    info: {
      classes: 'bg-blue-100 text-blue-800 border-blue-300',
      emoji: 'ℹ️',
    },
    success: {
      classes: 'bg-green-100 text-green-800 border-green-300',
      emoji: '🎉',
    },
    error: {
      classes: 'bg-red-100 text-red-800 border-red-300',
      emoji: '⚠️',
    },
  };

  return (
    <div className='fixed top-5 inset-x-0 px-4 z-50 flex justify-center pointer-events-none'>
      <div
        className={`max-w-md w-full border text-sm rounded-xl px-4 py-3 shadow-lg flex items-center gap-2 transition-all duration-300
        ${styleMap[type].classes}
        ${isLeaving ? 'animate-toastOut' : 'animate-toastIn'}`}
      >
        <span className='text-lg'>{styleMap[type].emoji}</span>
        <span className='flex-1'>{message}</span>
      </div>
    </div>
  );
};
