import "./ZenQuote.css";
import React from "react";

class ZenQuote extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    quotes: [],
  };

  fetchQuotes() {
    fetch("https://zenquotes.io/api/quotes")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ quotes: json });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // gets invoked after render() method has been run
  // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
  componentDidMount() {
    this.fetchQuotes();
    this.timerID = setInterval(() => this.tick(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.fetchQuotes();
    //console.log(this.state.quote);
    /*
    this.setState({
      quote: this.state.quotes[6],
    });
    */
  }

  render() {
    return (
      <div>
        {this.state.quotes.map((quote) => {
          return (
            <div>
              <blockquote>
                &ldquo;{quote.q}&rdquo;
                <footer>&mdash; {quote.a}</footer>
              </blockquote>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ZenQuote;
