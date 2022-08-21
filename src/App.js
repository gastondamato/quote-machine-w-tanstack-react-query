import "./styles.css";
import { useState, useEffect } from "react";
import { FaTwitterSquare, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

function Main() {
  const { isLoading, error, data } = useQuery(["repoData"], () =>
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    ).then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="App">
      <QuoteBox data={data} />
    </div>
  );
}

const QuoteBox = ({ data }) => {
  const [len, setLen] = useState(0);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [selector, setSelector] = useState(1);
  const [efector, setEfector] = useState(0);

  const randomQuote = (amount) => {
    return Math.floor(Math.random() * amount);
  };

  useEffect(() => {
    setLen(data.quotes.length);
    setSelector(randomQuote(len));
    setQuote(data.quotes[selector].quote);
    setAuthor(data.quotes[selector].author);
  }, [efector]);

  return (
    <div id="quote-box">
      <Quote quote={quote} author={author} />
      <div className="footer">
        <Twitter quote={quote} author={author} />
        <button id="new-quote" onClick={() => setEfector(Math.random)}>
          New Quote
        </button>
      </div>
    </div>
  );
};

const Quote = ({ quote, author }) => {
  return (
    <div>
      <div id="text">
        <h2>
          <FaQuoteLeft /> {quote} <FaQuoteRight />
        </h2>
      </div>
      <div id="author">-{author}</div>
    </div>
  );
};

const Twitter = ({ quote, author }) => {
  let twitter = encodeURI(
    "?hashtags=quotes&related=freeCodeCamp&text="
      .concat(quote)
      .concat(" ")
      .concat(author)
  );
  return (
    <a
      id="tweet-quote"
      href={"https://www.twitter.com/intent/tweet".concat(twitter)}
      target="_blank"
      rel="noreferrer"
    >
      <FaTwitterSquare />
    </a>
  );
};
