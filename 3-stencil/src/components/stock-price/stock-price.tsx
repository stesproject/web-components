import { h, Component, State } from "@stencil/core";

@Component({
  tag: "sp-stock-price",
  styleUrl: "./stock-price.css",
  shadow: true
})

export class StockPrice {
  @State() fetchedPrice : number;

  onFetchStockPrice(event: Event) {
    event.preventDefault();

    fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo")
    .then(response => {
      return response.json();
    })
    .then(parsedResponse => {
      this.fetchedPrice = +parsedResponse["Global Quote"]["05. price"];
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol"/>
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: ${this.fetchedPrice}</p>
      </div>
    ];
  }
}