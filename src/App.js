import "./App.css";
import Login from "./components/Login";
import Informacion from "./components/Informacion";
import Grafica from "./components/Grafica";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Usuarios from "./components/Usuarios";
import Vacio from "./components/Vacio";
import ContagiosForm from "./pages/ContagiosPage/components/ContagiosForm";
import ContagiosPage from "./pages/ContagiosPage/ContagiosPage";
import CampainForm from "./pages/CampainPage/components/CampainForm";
import CampainPage from "./pages/CampainPage/CampainPage";

var x = localStorage.getItem("user");

function App() {
  let actual;
  if (x === null) {
    actual = <Login />;
  } else {
    actual = <Menu />;
  }
  return (
    <div className="container-fluid p-3 d-flex flex-row">
      {actual}
      <Routes>
        <Route path="/Vacio" element={<Vacio />}></Route>
        <Route path="/Informacion" element={<Informacion />} />
        <Route path="/Grafica" element={<Grafica />} />
        <Route path="/Usuarios" element={<Usuarios />} />
        <Route path="/Contagios" element={<ContagiosPage />} />
        <Route path="/ContagiosForm" element={<ContagiosForm />} />
        <Route path="/Campanas" element={<CampainPage />} />
        <Route path="/CampanasForm" element={<CampainForm />} />
      </Routes>
    </div>
  );
}

export default App;
