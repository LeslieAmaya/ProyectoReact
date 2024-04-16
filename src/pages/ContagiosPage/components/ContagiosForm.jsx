import React from "react";
import moment from "moment/moment";
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
      age: "",
      gender: false,
      death: false,
      detectionDate: "",
    };
    this.isEditing = false;
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
    const { age, gender, death, detectionDate, selectedState } = this.state;

    const newInfected = {
      age,
      gender,
      death,
      detectionDate,
      state: selectedState,
    };

    axios.post(`${url}/infected`, newInfected).then(() => {
      this.fetchInfectedData();
      this.setState({
        age: "",
        gender: "",
        death: false,
        detectionDate: "",
        selectedState: "",
      });
    });
  }

  handleUpdateClick(id) {
    this.isEditing = true;
    const selectedInfected = this.state.infectedList.find(
      (infected) => infected._id === id
    );

    // Si se encuentra la campaña, actualiza el estado con sus valores
    if (selectedInfected) {
      this.setState({
        id: id,
        age: selectedInfected.age,
        gender: selectedInfected.gender,
        death: selectedInfected.death,
        detectionDate: moment(selectedInfected.detectionDate).format(
          "YYYY-MM-DD"
        ),
        selectedState: selectedInfected.state._id,
      });
    }
  }

  handleUpdate(id) {
    const { age, gender, death, detectionDate, selectedState } = this.state;

    const newInfected = {
      age,
      gender,
      death,
      detectionDate,
      state: selectedState,
    };

    axios.put(`${url}/infected/${id}`, newInfected).then(() => {
      this.fetchInfectedData();
      this.setState({
        age: "",
        gender: "",
        death: false,
        detectionDate: "",
        selectedState: "",
      });
      this.isEditing = false;
    });
  }

  handleDelete(id) {
    axios.delete(`${url}/infected/${id}`).then(() => {
      this.fetchInfectedData();
    });
  }
  render() {
    return (
      <div className="container-fluid">
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
                        <th>Edad</th>
                        <th>Género</th>
                        <th>Fecha de Detección</th>
                        <th>Estado</th>
                        <th>Finado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.infectedList.map((infected) => {
                        return (
                          <tr key={infected._id}>
                            <td>{infected.age}</td>
                            <td>
                              {infected.gender ? "Masculino" : "Femenino"}
                            </td>
                            <td>
                              {moment(infected.detectionDate)
                                .subtract(10, "days")
                                .calendar()}
                            </td>
                            <td>{infected.state.state}</td>
                            <td>{infected.death ? "Sí" : "No"}</td>
                            <td>
                              <div className="d-flex">
                                <button
                                  className="btn btn-warning mr-1"
                                  onClick={() =>
                                    this.handleUpdateClick(infected._id)
                                  }
                                >
                                  Editar
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    this.handleDelete(infected._id)
                                  }
                                >
                                  Eliminar
                                </button>
                              </div>
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
                        {this.isEditing
                          ? "Editar Infectado"
                          : "Registrar Nuevo Infectado"}
                      </h2>
                    </div>
                    <div className="user">
                      <form className="form-group">
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
                          className="btn btn-secondary  mr-2"
                          onClick={this.LimpiarDatos}
                        >
                          Nuevo
                        </button>
                        {this.isEditing ? (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => this.handleUpdate(this.state.id)}
                          >
                            Editar
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.handleSave}
                          >
                            Guardar
                          </button>
                        )}
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
