import './App.css'
import Login from './components/Login';
import Informacion from './components/Informacion';
import Grafica from './components/Grafica';
import Mapa from './components/Mapa';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Usuarios from './components/Usuarios';
import Vacio from './components/Vacio';

var x = localStorage.getItem('user');

function App() {
  let actual;
  if (x === null) {
    actual = <Login />;
  }
  else {
    actual = <Menu />;
  }
  return (
    <div className="container-fluid p-3 d-flex flex-row">
      {actual}
      <Routes>
        <Route path="/Vacio" element={<Vacio />}></Route>
        <Route path="/Informacion" element={<Informacion />}> Información </Route>
        <Route path="/Grafica" element={<Grafica />}> Grafica de Contagio </Route>
        <Route path="/Mapa" element={<Mapa />}> Mapa </Route>
        <Route path="/Usuarios" element={<Usuarios />}> Mapa </Route>
      </Routes>
    </div>
  );
}

export default App;
