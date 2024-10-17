import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const wp = (precentage) => {
  const width = deviceWidth;
  return (precentage * width) / 100;
};

export const hp = (precentage) => {
  const height = deviceHeight;
  return (precentage * height) / 100;
};

export const getColumnCount = () => {
  if (deviceWidth >= 1024) {
    // desktop
    return 4;
  } else if (deviceWidth >= 768) {
    // tablet
    return 3;
  } else {
    // phone
    return 2;
  }
};

export const getImageSize = (height, width) => {
  if (width > height) {
    // landscape
    return 250;
  } else if (width < height) {
    // potrait
    return 300;
  } else {
    // square
    return 200;
  }
};

export const capitalize = (str) => {
  return str.replcec(/\b\w/g, (l) => l.toUpperCase());
};
