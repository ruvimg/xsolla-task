import React from "react";
import { DataProvider } from "./dataProvider.jsx";

class InputSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onInputChange(e.target.value);
  }

  render() {
    return (
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            Y
          </span>
        </div>
        <input
          value={this.props.label}
          onChange={this.handleChange}
          type="text"
          class="form-control"
          placeholder="Input project name or email"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
    );
  }
}

function FormatDate(c) {
  var a = new Date;
  a.setTime(Date.parse(c));
  // a.setTime(Date.parse(b));
  // var d = a.getFullYear(),
  //     e = a.getMonth(),
  //     f = a.getDate();
  // b ? a.setTime(Date.parse(b)) : a = new Date;
  return a;
};

class SearchList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const filteredRows = [];
    this.props.filteredData.forEach(function(item) {
      filteredRows.push(
        <tr key={item.transaction.id}>
          <td>{item.transaction.id}</td>
          <td>{item.transaction.project.name}</td>
          <td>{item.transaction.payment_method.name}</td>
          <td>{item.transaction.transfer_date}</td>
          <td>{item.user.name}</td>
          <td>{item.user.email}</td>
          <td>{item.payment_details.payment.amount}</td>
          <td>
            {item.purchase.virtual_currency.amount}{" "}
            {item.purchase.virtual_currency.name}
          </td>
        </tr>
      );
    });

    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>PROJECT NAME</th>
            <th>PAYMENT METHOD</th>
            <th>DATE</th>
            <th>NAME</th>
            <th>E-MAIL</th>
            <th>AMOUNT</th>
            <th>PURCHASE</th>
          </tr>
        </thead>
        <tbody>{filteredRows}</tbody>
      </table>
    );
  }
}

  

export default class ExFilterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = { search: "", selectId: "", filteredData: [] };
  }

  componentDidMount() {
    this.setState({
      filteredData: DataProvider.all()
    });
  }

  handleInputChange(value) {
    this.setState({ search: value });
    const data = DataProvider.filterData(value);
    this.setState({
      filteredData: data,
      selectLabel: value
    });
  }

  
    

  render() {
    return (
      <div>
        <h3 className="text-center">TRANSACTIONS LIST</h3>
        <div>
          <InputSearch
            label={this.state.selectLabel}
            id={this.state.selectId}
            onInputChange={this.handleInputChange}
          />
        </div>
        <div>
          <SearchList
            filteredData={this.state.filteredData}
            onSelectChange={this.handleListSelect}
          />
        </div>
      </div>
    );
  }
}
