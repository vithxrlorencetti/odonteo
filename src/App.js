import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Extract from './pages/Main/Extract/Extract';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/extract' element={<Extract />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
