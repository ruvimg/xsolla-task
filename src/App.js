import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Search from "./search";
import { DataProvider } from "./dataProvider.jsx";

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    };
  }
  componentDidMount() {
    this.setState({
      isLoaded: true,
      items: DataProvider.all()
    });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>load</div>;
    } else {
      var rawData = items;
      let resList = [];
      for (let i = 0; i < rawData.length; i++) {
        if (
          resList.find(
            x => x.name === rawData[i].transaction.payment_method.name
          ) === undefined
        ) {
          resList.push({
            name: rawData[i].transaction.payment_method.name,
            count: 1
          });
        } else {
          resList.find(
            x => x.name === rawData[i].transaction.payment_method.name
          ).count++;
        }
        this.paymentsCount++;
      }

      function compareCounts(paymentA, paymentB) {
        return paymentB.count - paymentA.count;
      }
      function randColor() {
        var r = Math.floor(Math.random() * 256),
          g = Math.floor(Math.random() * 256),
          b = Math.floor(Math.random() * 256);
        return "#" + r.toString(16) + g.toString(16) + b.toString(16);
      }
      resList.sort(compareCounts);
      var paymentsList = resList;

      var rawData = items;
      let resultList = [];
      for (let i = 0; i < rawData.length; i++) {
        if (resultList.indexOf(rawData[i].transaction.project.name) == -1) {
          resultList.push(rawData[i].transaction.project.name);
        }
      }
      const data = {
        labels: paymentsList.map(item => item.name),
        datasets: [
          {
            data: paymentsList.map(item => item.count),
            backgroundColor: paymentsList.map(item => randColor()),
            hoverBackgroundColor: paymentsList.map(item => randColor())
          }
        ]
      };
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <h2>PROJECTS LIST</h2>
              <div class="table-responsive">
                <table className="table table-striped table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>PROJECT NAME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultList.map(item => (
                      <tr>
                        <td>{item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-3">
              <h2>PAYMENTS TOP</h2>
              <table className="table table-striped table-bordered table-sm">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>COUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentsList.map(item => (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-6">
              <h2 className="text-center">Rating</h2>
              <Doughnut data={data} />
            </div>
          </div>
          <Search />
        </div>
      );
    }
  }
}
export default Data;
