import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Catalogue from './components/Catalogue/Catalogue';
import Login from './components/Login/Login';
import ShoeDetail from './components/ShoeDetail/ShoeDetail';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/'element={<Landing/>}/>
        <Route path='/Catalogue' element={<Catalogue/>}/>
        <Route path='/Login' element={<Login/>}></Route> 
        <Route path='/Detail/:id'element={<ShoeDetail/>}/>
        <Route path='/ShoppingCart' element={<ShoppingCart/>} >CREATEACTIVITY</Route>
      </Routes>
    </div>
  );
}

export default App;
