import React from "react";
import moment from "moment/moment";
import axios from "axios";

const url = "https://apimongo-xso0.onrender.com/api";
// const url = "http://localhost:3001/api";
class CampainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campainList: [],
      statesList: [],
      id: "",
      selectedState: "",
      title: "",
      description: "",
      date: "",
      address: "",
    };
    this.isEditing = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.fetchCampainData();
    this.fetchStatesData();
  }

  // Función para obtener la lista de infectados desde el backend
  fetchCampainData() {
    axios.get(`${url}/campain`).then((response) => {
      this.setState({ campainList: response.data });
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
    const { title, description, date, address, selectedState } = this.state;

    const newCampain = {
      title,
      description,
      date,
      address,
      state: selectedState,
    };

    axios.post(`${url}/campain`, newCampain).then(() => {
      this.fetchCampainData();
      this.setState({
        selectedState: "",
        title: "",
        description: "",
        date: "",
        address: "",
      });
    });
  }

  handleUpdateClick(id) {
    this.isEditing = true;
    const selectedCampain = this.state.campainList.find(
      (campain) => campain._id === id
    );

    // Si se encuentra la campaña, actualiza el estado con sus valores
    if (selectedCampain) {
      this.setState({
        id: id,
        title: selectedCampain.title,
        description: selectedCampain.description,
        date: moment(selectedCampain.date).format("YYYY-MM-DD"),
        address: selectedCampain.address,
        selectedState: selectedCampain.state._id,
      });
    }
  }

  handleUpdate(id) {
    const { title, description, date, address, selectedState } = this.state;

    const newCampain = {
      title,
      description,
      date,
      address,
      state: selectedState,
    };

    axios.put(`${url}/campain/${id}`, newCampain).then(() => {
      this.fetchCampainData();
      this.setState({
        selectedState: "",
        title: "",
        description: "",
        date: "",
        address: "",
      });
      this.isEditing = false;
    });
  }

  handleDelete(id) {
    axios.delete(`${url}/campain/${id}`).then(() => {
      this.fetchCampainData();
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
                        <th>Titulo</th>
                        <th>Descripción</th>
                        <th>Dirección</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.campainList.map((campain) => {
                        return (
                          <tr key={campain._id}>
                            <td>{campain.title}</td>
                            <td>{campain.description}</td>
                            <td>{campain.address}</td>
                            <td>{campain.state.state}</td>
                            <td>
                              {moment(campain.date)
                                .subtract(10, "days")
                                .calendar()}
                            </td>
                            <td>
                              <div className="d-flex">
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                  onClick={() =>
                                    this.handleUpdateClick(campain._id)
                                  }
                                >
                                  Editar
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => this.handleDelete(campain._id)}
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
                          ? "Editar Campaña"
                          : "Registrar Nueva Campaña"}
                      </h2>
                    </div>
                    <div className="user">
                      <form className="form-group">
                        <input
                          value={this.state.title}
                          name="title"
                          type="text"
                          placeholder="Titulo"
                          className="form-control form-control-user"
                          onChange={this.handleChange}
                        />
                        <br />

                        <input
                          value={this.state.description}
                          name="description"
                          type="text"
                          placeholder="Descripción"
                          className="form-control form-control-user"
                          onChange={this.handleChange}
                        />
                        <br />

                        <input
                          value={this.state.date}
                          name="date"
                          type="date"
                          className="form-control form-control-user"
                          onChange={this.handleChange}
                        />
                        <br />
                        <input
                          value={this.state.address}
                          name="address"
                          type="text"
                          placeholder="Dirección"
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

                        <button
                          type="button"
                          className="btn btn-secondary mr-2"
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

export default CampainForm;
