import React from "react";

class Informacion extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var usuario = localStorage.getItem("user");
    var password = localStorage.getItem("pass");
    return (
      <div className="card m-4">
        <div className="contenido">
          <div className="articulos">
            <div className="secciones">
              <div>
                <h2 className="titleinf"> ¿Qué es CovidMap? </h2>
                <p>
                  {" "}
                  CovidMap busca informar a la población mexicana sobre el
                  covid19; mostrando los registros de infectados, defunciones,
                  rangos de edad y sexo de los tres primeros meses del 2024:
                  Enero, Febrero y Marzo.
                </p>
                <p>
                  Tenemos como propósito Monitorear las estadísticas de
                  contagios y decesos que el Covid19 a ocasionado por el virus,
                  a nivel nacional, mostrando gráficas y estadísticas.
                </p>
                <p>
                  Así mismo, nuestro objetivo es Hacer saber el conocimiento de
                  la información (contagios, fechas, sexo, edad…) sobre el
                  Covid-19 actualizada de los meses: Enero, Febrero y Marzo
                  2024, en México para la prevención del virus, así como la
                  notificación de información por estado, para que la población
                  tenga acceso fácil a esta información.
                </p>
              </div>
            </div>
          </div>
          <div class="menu-secundario">
            <img
              className="infor"
              src="https://i.postimg.cc/QCCgLPpS/archivos-1.png"
            />
          </div>
        </div>
        <div className="contenido">
          <div className="articulos">
            <div className="secciones">
              <div>
                <h2 className="titleinf"> Vacunación </h2>
                <p>
                  {" "}
                  En esta web podrás encontrar información sobre campañas de
                  vacunación en tu estado, para facilitar la atención brindada a
                  la población.
                </p>
              </div>
            </div>
          </div>
          <div class="menu-secundario">
            <img
              className="infor"
              src="https://i.postimg.cc/t4QMFX7y/vacuna.png"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Informacion;
