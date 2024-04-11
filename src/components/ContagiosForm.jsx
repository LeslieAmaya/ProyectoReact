import React from "react";
import axios from "axios";

const url = "https://apimongo-xso0.onrender.com/api";
// const url = "http://localhost:3001/api";
class ContagiosForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infectedList: [],
      statesList: [],
      selectedState: "",
      name: "",
      age: "",
      gender: "",
      death: false,
      detectionDate: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.fetchInfectedData();
    this.fetchStatesData();
  }

  // Función para obtener la lista de infectados desde el backend
  fetchInfectedData() {
    axios.get(`${url}/infected`).then((response) => {
      this.setState({ infectedList: response.data });
    });
  }

  // Función para obtener la lista de estados desde el backend
  fetchStatesData() {
    axios.get(`${url}/state`).then((response) => {
      this.setState({ statesList: response.data });
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSave() {
    const { name, age, gender, death, detectionDate, selectedState } =
      this.state;

    const newInfected = {
      name,
      age,
      gender,
      death,
      detectionDate,
      state: selectedState,
    };

    axios.post(`${url}/infected`, newInfected).then(() => {
      this.fetchInfectedData();
      this.setState({
        name: "",
        age: "",
        gender: "",
        death: false,
        detectionDate: "",
        selectedState: "",
      });
    });
  }

  handleDelete(id) {
    axios.delete(`${url}/infected/${id}`).then(() => {
      this.fetchInfectedData();
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="row">
                <div
                  className="col-lg-6 table-responsive overflow-auto"
                  style={{ maxHeight: "670px" }}
                >
                  <table border="1" className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Género</th>
                        <th>Fecha de Detección</th>
                        <th>Estado</th>
                        <th>Finado</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.infectedList.map((infected) => {
                        return (
                          <tr>
                            <td>{infected._id}</td>
                            <td>{infected.name}</td>
                            <td>{infected.age}</td>
                            <td>
                              {infected.gender ? "Masculino" : "Femenino"}
                            </td>
                            <td>{infected.detectionDate}</td>
                            <td>{infected.state.state}</td>
                            <td>{infected.death ? "Sí" : "No"}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => this.handleDelete(infected._id)}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <br />
                    <div className="text-center">
                      <h2 className="h4 text-gray-900 mb-4">
                        Registrar Nuevo Infectado
                      </h2>
                    </div>
                    <div className="user">
                      <form className="form-group">
                        <input
                          value={this.state.name}
                          name="name"
                          type="text"
                          placeholder="Nombre"
                          className="form-control form-control-user"
                          onChange={this.handleChange}
                        />
                        <br />

                        <input
                          value={this.state.age}
                          name="age"
                          type="text"
                          placeholder="Edad"
                          className="form-control form-control-user"
                          onChange={this.handleChange}
                        />
                        <br />

                        <select
                          value={this.state.gender}
                          name="gender"
                          className="form-control form-control-user"
                          onChange={this.handleChange}
                        >
                          <option value="">Seleccione Género</option>
                          <option value="true">Masculino</option>
                          <option value="false">Femenino</option>
                        </select>
                        <br />

                        <input
                          value={this.state.detectionDate}
                          name="detectionDate"
                          type="date"
                          className="form-control form-control-user"
                          onChange={this.handleChange}
                        />
                        <br />

                        <select
                          value={this.state.selectedState}
                          name="selectedState"
                          className="form-control form-control-user"
                          onChange={this.handleChange}
                        >
                          <option value="">Seleccione Estado</option>
                          {this.state.statesList.map((state) => (
                            <option key={state._id} value={state._id}>
                              {state.state}
                            </option>
                          ))}
                        </select>
                        <br />
                        <label>Finado: </label>
                        <input
                          type="checkbox"
                          value={this.state.death}
                          name="death"
                          onChange={(e) =>
                            this.setState({ death: e.target.checked })
                          }
                        />
                        <br />

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={this.LimpiarDatos}
                        >
                          Nuevo
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={this.handleSave}
                        >
                          Guardar
                        </button>
                      </form>
                      <br />
                      <br />
                      <div className="text-center">
                        <label> CovidMap 2024 </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContagiosForm;
