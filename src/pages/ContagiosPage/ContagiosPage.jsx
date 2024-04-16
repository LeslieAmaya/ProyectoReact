import React from "react";
import axios from "axios";

const url = "https://apimongo-xso0.onrender.com/api";
// const url = "http://localhost:3001/api";

const processData = (data) => {
  const processedData = {};
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  data.forEach((item) => {
    const date = new Date(item.detectionDate);
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const state = item.state.state;
    const key = `${state}-${year}-${monthIndex}`;

    if (!processedData[key]) {
      processedData[key] = {
        month: `${months[monthIndex]} ${year}`,
        state: state,
        infected: 0,
        deaths: 0,
      };
    }

    processedData[key].infected++;

    if (item.death) {
      processedData[key].deaths++;
    }
  });

  return Object.values(processedData);
};

class ContagiosPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infectedList: [],
      filteredInfectedList: [],
      statesList: [],
      selectedMonth: "",
      selectedState: "",
    };
  }

  componentDidMount() {
    this.fetchInfectedData().then(() => {
      this.fetchStatesData().then(() => {
        this.applyFilters(); // Aplicar filtros después de cargar los datos
      });
    });
  }

  handleSearchChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      console.log("Selected Month:", this.state.selectedMonth);
      console.log("Selected State:", this.state.selectedState);
      this.applyFilters();
    });
  };

  applyFilters() {
    let filteredList = this.state.infectedList;

    if (this.state.selectedMonth) {
      filteredList = filteredList.filter(
        (item) =>
          new Date(item.detectionDate).toISOString().slice(0, 7) ===
          this.state.selectedMonth
      );
    }

    if (this.state.selectedState) {
      filteredList = filteredList.filter(
        (item) => item.state._id === this.state.selectedState
      );
    }

    this.setState({ filteredInfectedList: filteredList });
  }

  fetchInfectedData() {
    return axios.get(`${url}/infected`).then((response) => {
      this.setState({
        infectedList: response.data,
        filteredInfectedList: response.data, // Actualizar filteredInfectedList aquí
      });
      processData(response.data);
    });
  }

  fetchStatesData() {
    return axios.get(`${url}/state`).then((response) => {
      this.setState({ statesList: response.data });
    });
  }

  render() {
    const processedData = processData(this.state.filteredInfectedList);

    return (
      <div className="container-fluid">
        <form className="d-flex gap-1">
          <input
            className="form-control"
            type="month"
            placeholder="Mes"
            name="selectedMonth"
            value={this.state.selectedMonth}
            onChange={this.handleSearchChange}
          />
          <select
            className="form-control"
            name="selectedState"
            value={this.state.selectedState}
            onChange={this.handleSearchChange}
          >
            <option value="">Seleccionar estado</option>
            {this.state.statesList.map((state) => (
              <option key={state._id} value={state._id}>
                {state.state}
              </option>
            ))}
          </select>
        </form>
        <br />
        <div className="row">
          {processedData.map((item) => (
            <div key={item.state + item.month} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    {item.state} - {item.month}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="h4">Total de infectados: {item.infected}</div>
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{
                        width: `${(item.deaths / item.infected) * 100}%`,
                      }}
                      aria-valuenow={item.deaths}
                      aria-valuemin="0"
                      aria-valuemax={item.infected}
                    >
                      Defunciones: {item.deaths}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ContagiosPage;
