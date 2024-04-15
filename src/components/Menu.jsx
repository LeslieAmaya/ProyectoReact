import React from "react";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  Salir() {
    localStorage.removeItem("user");
    localStorage.removeItem("pass");

    setTimeout((window.location.href = "/"), 1000);
  }
  render() {
    return (
      <div className="d-flex flex-column">
        <img src="https://i.postimg.cc/GhBhQfrf/mundo.png" />
        <h2 className="text-center titulo"> CovidMap </h2>
        <Link to="/Informacion" className="btn btn-danger m-1">
          {" "}
          Información{" "}
        </Link>
        <Link to="/Grafica" className="btn btn-danger m-1">
          {" "}
          Gráfica de contagio{" "}
        </Link>
        <Link to="/Usuarios" className="btn btn-danger m-1">
          {" "}
          Usuarios{" "}
        </Link>
        <Link to="/Contagios" className="btn btn-danger m-1">
          {" "}
          Contagios{" "}
        </Link>
        <Link to="/Campanas" className="btn btn-danger m-1">
          Campañas
        </Link>
        <Link to="/ContagiosForm" className="btn btn-danger m-1">
          {" "}
          Formulario de Contagios{" "}
        </Link>
        <Link to="/CampanasForm" className="btn btn-danger m-1">
          Formulario de Campañas
        </Link>
        <Link to="/" className="logout" onClick={this.Salir}>
          Logout
        </Link>
      </div>
    );
  }
}

export default Menu;
