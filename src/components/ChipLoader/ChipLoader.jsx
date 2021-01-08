import React from "react";
import ContentLoader from "react-content-loader";

const ChipLoader = (props) => (
  <ContentLoader
    speed={2}
    width={650}
    height={350}
    viewBox="0 0 650 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="20" ry="20" width="100" height="42"></rect>
    <rect x="120" y="0" rx="20" ry="20" width="120" height="42"></rect>
    <rect x="260" y="0" rx="20" ry="20" width="82" height="42"></rect>
    <rect x="360" y="0" rx="20" ry="20" width="110" height="42"></rect>
    <rect x="490" y="0" rx="20" ry="20" width="120" height="42"></rect>
    <rect x="20" y="60" rx="20" ry="20" width="60" height="42"></rect>
    <rect x="100" y="60" rx="20" ry="20" width="90" height="42"></rect>
    <rect x="210" y="60" rx="20" ry="20" width="100" height="42"></rect>
    <rect x="330" y="60" rx="20" ry="20" width="120" height="42"></rect>
    <rect x="470" y="60" rx="20" ry="20" width="82" height="42"></rect>
    <rect x="10" y="120" rx="20" ry="20" width="110" height="42"></rect>
    <rect x="140" y="120" rx="20" ry="20" width="120" height="42"></rect>
    <rect x="280" y="120" rx="20" ry="20" width="60" height="42"></rect>
    <rect x="362" y="120" rx="20" ry="20" width="90" height="42"></rect>
    <rect x="362" y="120" rx="20" ry="20" width="90" height="42"></rect>
    <rect x="472" y="120" rx="20" ry="20" width="60" height="42"></rect>
    <rect x="550" y="120" rx="20" ry="20" width="90" height="42"></rect>
  </ContentLoader>
);

export default ChipLoader;
