import React from "react";
import { Link } from "react-router-dom";

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }
    Salir() {
        localStorage.removeItem('user');
        localStorage.removeItem('pass');
        window.location.reload();
    }
    render() {
        return (
            <div className='d-flex flex-column'>
                <img src="https://i.postimg.cc/GhBhQfrf/mundo.png" />
                <h2 className='text-center titulo'> CovidMap </h2>
                <Link to="/Vacio" className="btn" ></Link>
                <Link to="/Informacion" className="btn btn-danger m-1" > Información </Link>
                <Link to="/Grafica" className="btn btn-danger m-1"> Gráfica de contagio </Link>
                <Link to="/Mapa" className="btn btn-danger m-1"> Mapa </Link>
                <Link to="/Usuarios" className="btn btn-danger m-1"> Usuarios </Link>
                <Link to="/Contagios" className="btn btn-danger m-1"> Contagios </Link>
                <button className="logout" onClick={this.Salir}>Logout</button>
            </div>
        );
    }
}

export default Menu