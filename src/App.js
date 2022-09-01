import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Statement from './pages/Statement/Statement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/statement' element={<Statement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
