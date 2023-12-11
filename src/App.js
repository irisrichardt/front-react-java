import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';

import './App.css';

import Logs from './pages/Logs/Logs';
import Carteira from './pages/Carteira/Carteira';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/logs' element={<Logs />}/>
        <Route path='/carteira' element={<Carteira />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
