import { Dimensions, PixelRatio } from "react-native";

const { width } = Dimensions.get("window");
const guidelineBaseWidth = 350;

export default (size) => {
  return PixelRatio.roundToNearestPixel((width / guidelineBaseWidth * size));
}