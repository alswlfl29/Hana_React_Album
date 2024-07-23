import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { AlbumList } from './components/AlbumList';
import { AlbumDetail } from './components/AlbumDetail';
import { Header } from './components/Header';
import { SessionProvider } from './contexts/session-context';
import { NotFound } from './NotFound';
import { AlbumProvider } from './contexts/album-context';

function App() {
  return (
    <SessionProvider>
      <Header />
      <AlbumProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/albums' element={<AlbumList />} />
          <Route path='/albums/:id' element={<AlbumDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AlbumProvider>
    </SessionProvider>
  );
}

export default App;
