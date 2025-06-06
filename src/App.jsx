import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import { AuthProvider } from './contexts/AuthContext';
import CreatePollPage from './pages/poll/CreatePollPage';
import PollDetailPage from './pages/poll/PollDetailPage';
import Header from './components/Header';
import PollListPage from './pages/poll/PollListPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header /> {/* ✅ 모든 페이지에 고정 헤더 */}
        <main className='pt-16'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route
              path='/oauth2/redirect'
              element={<OAuth2RedirectHandler />}
            />
            <Route path='/polls' element={<PollListPage />} />
            <Route
              path='/polls/:pollId'
              element={
                <PrivateRoute>
                  <PollDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path='/poll/create'
              element={
                <PrivateRoute>
                  <CreatePollPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
