import React from 'react';
import ImageProfile from '../assets/mundo.png'


import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    Salir() {
        localStorage.removeItem('user');
        localStorage.removeItem('password');
        window.location.reload();
    }
    render() {
        var usuario = localStorage.getItem('user');
        var password = localStorage.getItem('pass');
        return (
            /* <div>
            <div className='container'>
            <div className="row">
                <div className="col-md-5">
                    <div className="padre">
                        <div className="card card-body shadow">
                            <img src={ImageProfile} alt=""/>
                            <h2 className='text-center'>
                                Bienvenido {usuario} <br/><button className='btn btn-warning' onClick={this.Salir}> 
                                Logout                             </button> 
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"/>
        </div> */
            <Sidebar>
                <Menu>
                    <h3 class="text-center"><img src='https://i.postimg.cc/5yz9BGB4/mundo.png'/>  COVID MAP </h3>
                    <MenuItem> Información </MenuItem>
                    <MenuItem> Gráfica de contagio </MenuItem>
                    <MenuItem> Mapa </MenuItem>
                </Menu>
                <button className='btn btn-danger' onClick={this.Salir}>Logout</button>
            </Sidebar>
        );
    }
}
export default Home;