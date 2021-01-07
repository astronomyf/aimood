import { Component } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WebcamDetection from "./components/WebcamDetection/WebcamDetection";
import GenresContainer from "./components/GenresContainer/GenresContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      expression: "",
      selectedGenres: [],
      tracks: null,
    };

    this.getExpression = this.getExpression.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.getTracks = this.getTracks.bind(this);
  }

  getExpression(data) {
    this.setState({ expression: data });
  }

  getGenres(data) {
    this.setState({ selectedGenres: data });
  }

  getTracks(data) {
    this.setState({ tracks: data });
  }

  render() {
    const { selectedGenres, tracks } = this.state;
    return (
      <>
        <Header />
        <main className="main">
          {tracks === null ? (
            <GenresContainer onSelectedGenres={this.getGenres} />
          ) : (
            ""
          )}
          {selectedGenres.length > 0 && tracks === null ? (
            <WebcamDetection
              selectedGenres={selectedGenres}
              getTracks={this.getTracks}
              getExpressionCallback={this.getExpression}
            />
          ) : (
            ""
          )}
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
