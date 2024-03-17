import React from 'react';
import '../App.css'
import axios from "axios";

const url = "https://apimongo-xso0.onrender.com/api";
// const url = "http://localhost:3000/api";
class Usuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            User: [],
            id: "",
            username: "",
            password: "",
        }
        this.handlerUsuario = this.handlerUsuario.bind(this);
        this.handlerPassword = this.handlerPassword.bind(this);
        this.handlerId = this.handlerId.bind(this);
        // CRUD
        this.GuardarDatos = this.GuardarDatos.bind(this);
        this.BorrarDatos = this.BorrarDatos.bind(this);
    }

    handlerUsuario(event) {
        this.setState({ username: event.target.value });
    }
    handlerPassword(event) {
        this.setState({ password: event.target.value });
    }
    handlerId(event) {
        this.setState({ id: event.target.value });
    }
    cargarDatos() {
        axios.get(url + "/user").then(Response => {
            this.setState({ User: Response.data });
        })
    }
    BorrarDatos() {
        axios.delete(url + "/user/" + this.state.username).then(Response => {
            this.cargarDatos();
        })
    }
    GuardarDatos() {
        let us = {
            username: this.state.username,
            password: this.state.password
        }
        if (this.state.id == "") {
            axios.post(url + "/user", us).then(Response => {
                this.cargarDatos();
            })
        } else {
            axios.put(url + "/user/" + this.state.id, us).then(Response => {
                console.log(this.state.id);
                this.cargarDatos();
            })
        }
    }
    LimpiarDatos = () => {
        this.setState({ id: "" });
        this.setState({ username: "" });
        this.setState({ password: ""});
    }
    componentDidMount() {
        this.cargarDatos();
    }
    render() {
        return (
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-10 col-lg-12 col-md-9">
                        <div class="card o-hidden border-0 shadow-lg my-5">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block">
                                    <table border='1' className="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Usuario</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.User.map(user => {
                                                return (
                                                    <tr>
                                                        <td>{user._id}</td>
                                                        <td>{user.username}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <br />
                                        <div class="text-center">
                                            <h2 class="h4 text-gray-900 mb-4">USUARIOS</h2>
                                        </div>
                                        <div className="user">

                                            <form className="form-group">
                                                <input value={this.state.id} type="text" placeholder="Ingresar ID" class="form-control form-control-user" onChange={this.handlerId} />
                                                <br />

                                                <input value={this.state.username} type="text" placeholder="Ingresar usuario" class="form-control form-control-user" onChange={this.handlerUsuario} />
                                                <br />
                                                <input value={this.state.password} type="password" placeholder="Ingresar contraseña" class="form-control form-control-user" onChange={this.handlerPassword} />
                                            </form>
                                            <br />
                                            <tr>
                                                <td>
                                                    <button type="submit" className="new"
                                                        onClick={this.LimpiarDatos}> Nuevo </button>
                                                    <button type="submit" className="register"
                                                        onClick={this.GuardarDatos}> Guardar </button>
                                                    <button type="submit" className="btn-danger register"
                                                        onClick={this.BorrarDatos}> Eliminar </button>
                                                </td>
                                            </tr>


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

        );
    }
}
export default Usuarios;