import React from 'react';
import axios from 'axios';
import Imagen from '../assets/mundo.png'
import '../App.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: "",
            password: "",
            mensaje: ""
        }
        this.handlerUsuario = this.handlerUsuario.bind(this);
        this.handlerPassword = this.handlerPassword.bind(this);
        this.validarUsuario = this.validarUsuario.bind(this);
    }

    handlerUsuario(event) {
        this.setState({ usuario: event.target.value });
    }
    handlerPassword(event) {
        this.setState({ password: event.target.value });
    }
    validarUsuario = async () => { //AXIOS peticiones a URLs
        try {
            const response = await axios.post('https://apimongo-xso0.onrender.com/api/login', { username: this.state.usuario, password: this.state.password });
            console.log('Respuesta', response.data);
            localStorage.setItem('user', response.data.username);
            localStorage.setItem('pass', response.data.password);
            window.location.reload();
        } catch (err) {
            console.log(err);
            this.setState({ mensaje: err.response.data.message }); //te manda el error de la api
        }

    }
    render() {
        return (
            /* <div className='container'>
            <div className="row">
                <div className="col-md-4">
                    <div className="padre">
                        <div className="card card-body shadow">
                            <img src={ImageProfile} alt=""/>
                            <form >
                                <input value={this.state.usuario} type="text" placeholder="Ingresar usuario" className="cajatexto" onChange={this.handlerUsuario}/>
                                <input value={this.state.password} type="password" placeholder="Ingresar contraseña" className="cajatexto" id='password' onChange={this.handlerPassword}/>
                            </form>
                            <button className="btnform" onClick={this.validarUsuario}>ACEPTAR</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <img src={Imagen} alt="" className='tamaño-imagen'/>
                </div>
            </div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
        </div> */
            <body>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-xl-10 col-lg-12 col-md-9">
                            <div class="card o-hidden border-0 shadow-lg my-5">
                                <div class="row">
                                    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div class="col-lg-6">
                                        <div class="p-5">
                                            <div class="text-center">
                                                <div class="titulo">CovidMap</div>
                                            </div>
                                            <br/>
                                            <div class="text-center">
                                                <h2 class="h4 text-gray-900 mb-4">Inicia Sesión</h2>
                                            </div>
                                            <div className="user">
                                                <form className="form-group">
                                                    <input value={this.state.usuario} type="text" placeholder="Ingresar usuario" class="form-control form-control-user" onChange={this.handlerUsuario} />
                                                    <br />
                                                    <input value={this.state.password} type="password" placeholder="Ingresar contraseña" class="form-control form-control-user" onChange={this.handlerPassword} />
                                                </form>
                                                <br />
                                                <button type="submit" class="btn btn-user btn-block"
                                                    onClick={this.validarUsuario}> ACEPTAR </button>
                                                <br /><br />
                                                <div class="text-center">
                                                    <label> CovidMap 2024 </label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </body>
        );

    }
}
export default Login;