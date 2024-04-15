import React from "react";
import moment from "moment/moment";
import axios from "axios";

// const url = "https://apimongo-xso0.onrender.com/api";
const url = "http://localhost:3001/api";
class ContagiosPage extends React.Component {
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

  render() {
    return (
      <div className="container-fluid">
        <form className="d-flex gap-1">
          {/* <input
            className="form-control"
            type="text"
            placeholder="Buscar por título"
            name="searchTitle"
            value={searchTitle}
            onChange={this.handleSearchChange}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Buscar por descripción"
            name="searchDescription"
            value={searchDescription}
            onChange={this.handleSearchChange}
          /> */}
          <input
            className="form-control"
            type="month"
            placeholder="Mes"
            name="searchMonth"
          />
          <select className="form-control" name="searchState">
            <option value="">Seleccionar estado</option>
            {this.state.statesList.map((state) => (
              <option key={state.id} value={state._id}>
                {state.state}
              </option>
            ))}
          </select>
        </form>
        <br />
        <div class="row">
          {/* {filteredCampains.map((campain) => {
            return (
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{campain.title}</h5>
                    <p class="card-text">{campain.description}</p>
                  </div>
                  <div className="card-footer d-flex">
                    <span>{campain.address}</span>
                    <span>
                      {moment(campain.date).subtract(10, "days").calendar()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    );
  }
}

export default ContagiosPage;
