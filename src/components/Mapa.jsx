import React from 'react';


class Informacion extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var usuario = localStorage.getItem('user');
        var password = localStorage.getItem('pass');
        return (
            <div>
                <div className='titulo'>HOLA SOY MAPA</div>
            </div>
        );
    }
}
export default Informacion;