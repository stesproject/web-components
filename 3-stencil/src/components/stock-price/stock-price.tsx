import { h, Component, State, Element } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

@Component({
  tag: "sp-stock-price",
  styleUrl: "./stock-price.css",
  shadow: true
})

export class StockPrice {
  stockInput: HTMLInputElement;

  @Element() el: HTMLElement;

  @State() fetchedPrice : number;

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    // const stockSymbol = (this.el.shadowRoot.querySelector("#stock-symbol") as HTMLInputElement).value;
    const stockSymbol = this.stockInput.value; // We can use this approach instead of the one above because we have linked the property 'stockInput' in the 'ref' attribute of the input tag.

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
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
        <input id="stock-symbol" ref={el => this.stockInput = el}/>
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: ${this.fetchedPrice}</p>
      </div>
    ];
  }
}