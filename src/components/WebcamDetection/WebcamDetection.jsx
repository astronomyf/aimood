import React, { Component } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import Reward from "react-rewards";

import Button from "../Button/Button";

import { getAccessToken, getRecommendations } from "../../api/spotifyApi";

import "./WebcamDetection.css";

class WebcamDetection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingButton: false,
      expression: null,
    };
    this.buttonTitle = "Generate music";
    this.detectFace = this.detectFace.bind(this);
    this.getSpotifyRecommendations = this.getSpotifyRecommendations.bind(this);
    this.launchDetectFace = this.launchDetectFace.bind(this);
    this.handleOnClickButton = this.handleOnClickButton.bind(this);
  }

  async loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");
  }

  detectFaceWrapper(video) {
    return () => this.detectFace(video);
  }

  launchDetectFace() {
    const video = document.querySelector("video");
    video.addEventListener("progress", this.detectFaceWrapper(video));
  }

  removeVideoListener() {
    const video = document.querySelector("video");
    video.removeEventListener("progress", this.detectFaceWrapper(video));
  }

  async detectFace(video) {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    if (detections.length > 0) {
      const expression = this.detectExpression(detections[0].expressions);
      this.setState({ expression: Object.keys(expression)[0] });
      this.props.getExpressionCallback(this.state.expression);
    }
  }

  componentDidMount() {
    this.loadModels();
  }

  detectExpression(expressions) {
    const expressionsToArray = Object.values(expressions);
    const max = Math.max(...expressionsToArray);
    const filterObject = Object.fromEntries(
      Object.entries(expressions).filter(([key, value]) => value === max)
    );
    return filterObject;
  }

  async getSpotifyRecommendations() {
    const { expression } = this.state;
    const { selectedGenres } = this.props;
    const {
      data: { access_token },
    } = await getAccessToken();
    return await getRecommendations(access_token, expression, selectedGenres);
  }

  async handleOnClickButton() {
    const { getTracks } = this.props;
    this.setState({ loadingButton: true });

    const {
      data: { tracks },
    } = await this.getSpotifyRecommendations();

    this.setState({ loadingButton: false });
    this.buttonTitle = "🚀";
    this.reward.rewardMe();

    setTimeout(() => {
      this.removeVideoListener();
      getTracks(tracks);
    }, 2000);
  }

  render() {
    const videoConstraints = {
      width: { min: 200 },
      height: { min: 200 },
      aspectRatio: 1,
    };

    const confettiContraints = {
      lifetime: 100,
      startVelocity: 50,
      angle: 70,
    };

    const { expression, loadingButton } = this.state;

    return (
      <div className="detection-container">
        <Webcam
          className="webcam"
          audio={false}
          height={250}
          width={250}
          mirrored={true}
          onUserMedia={this.launchDetectFace}
          videoConstraints={videoConstraints}
        />
        {expression === null ? (
          <h4>Detecting...</h4>
        ) : (
          <h4>
            It looks like you are in a{" "}
            {expression === "neutral" ? "okay" : expression} mood.
          </h4>
        )}
        <hr />
        <div style={{ width: "100%", height: "43px!important" }}>
          <Reward
            ref={(ref) => {
              this.reward = ref;
            }}
            type="confetti"
            config={confettiContraints}
          >
            <Button
              title={this.buttonTitle}
              loading={loadingButton}
              disabled={expression === null ? true : false}
              onClick={this.handleOnClickButton}
            />
          </Reward>
        </div>
      </div>
    );
  }
}

export default WebcamDetection;
