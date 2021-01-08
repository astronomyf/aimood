import { Component } from "react";
import ConfettiGenerator from "confetti-js";

import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WebcamDetection from "./components/WebcamDetection/WebcamDetection";
import GenresContainer from "./components/GenresContainer/GenresContainer";
import AlbumsContainer from "./components/AlbumsContainer/AlbumsContainer";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: "",
      selectedGenres: null,
      tracks: null,
    };

    this.getExpression = this.getExpression.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.getTracks = this.getTracks.bind(this);
  }

  componentDidMount() {
    const confettiSettings = {
      target: "confetti-background",
      animate: false,
      props: ["circle"],
      respawn: false,
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  }

  getExpression(data) {
    this.setState({ expression: data });
  }

  getGenres(data) {
    this.setState({ selectedGenres: data });
  }

  getTracks(data) {
    this.setState({ tracks: data });
    console.log(data);
  }

  render() {
    const { selectedGenres, tracks } = this.state;
    return (
      <>
        <canvas id="confetti-background" />
        <div className="container">
          <Header />
          <main className="main">
            {tracks === null ? (
              <GenresContainer onSelectedGenres={this.getGenres} />
            ) : (
              <AlbumsContainer tracks={tracks} />
            )}
            {selectedGenres !== null && tracks === null ? (
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
        </div>
      </>
    );
  }
}

export default App;
