import "./ZenQuote.css";
import React from "react";

class ZenQuote extends React.Component {
  ZEN_QUOTES_REST_API_URI = "https://zenquotes.io/api/quotes";

  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      index: 0,
    };
  }

  // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree),
  // i.e. after render() method has been run
  componentDidMount() {
    this.fetchQuotes();
    this.timerID = setInterval(
      () => this.tick(),
      this.props.timeInterval * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  fetchQuotes() {
    fetch(this.ZEN_QUOTES_REST_API_URI)
      .then((response) => response.json())
      .then((json) => JSON.parse(JSON.stringify(json)))
      .then((quotes) => this.setState({ quotes: quotes }))
      .catch((err) => {
        console.log(err.message);
      });
  }

  tick() {
    this.updateQuoteIndex();
  }

  updateQuoteIndex() {
    var i = this.state.index;
    i++;
    if (i % this.state.quotes.length === 0) i = 0;
    this.setState({ index: i });
  }

  render() {
    if (this.state.quotes.length === 0) 
      return <div>Loading...</div>;

    const quote = this.state.quotes[this.state.index];

    return (
      <div>
        <blockquote className="quote-block">
          &ldquo;{quote.q}&rdquo;
          <footer className="quote-footer">&mdash; {quote.a}</footer>
        </blockquote>
      </div>
    );
  }
}

export default ZenQuote;
