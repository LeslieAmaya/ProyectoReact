import React from 'react';
import ImageProfile from '../assets/mamot.png'

class Principal extends React.Component{
    constructor(props){
        super(props);
    }
    Salir(){
        localStorage.removeItem('user');
        localStorage.removeItem('password');
        window.location.reload();
    }
    render(){
        var usuario=localStorage.getItem('user');
        var password=localStorage.getItem('pass');
        return(
            <div>
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
        </div>
           
        );
    }
}
export default Principal;