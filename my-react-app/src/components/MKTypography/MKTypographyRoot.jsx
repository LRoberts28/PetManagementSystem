import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import linearGradient from '../../assets/theme/functions/linearGradient.jsx';  // Adjust the path as needed

export default styled(Typography)(({ theme, ownerState }) => {
  const { palette, typography } = theme;

  // Ensure functions are defined before use
  const { color, textTransform, verticalAlign, fontWeight, opacity, textGradient } = ownerState;

  const { gradients, transparent } = palette;
  const { fontWeightLight, fontWeightRegular, fontWeightMedium, fontWeightBold } = typography;

  // fontWeight styles
  const fontWeights = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold,
  };

  // styles for the typography with textGradient={true}
  const gradientStyles = () => ({
    backgroundImage:
      color !== "inherit" && color !== "text" && color !== "white" && gradients[color]
        ? linearGradient ? linearGradient(gradients[color].main, gradients[color].state) : {}  // Safe use of linearGradient
        : linearGradient ? linearGradient(gradients.dark.main, gradients.dark.state) : {},
    display: "inline-block",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: transparent.main,
    position: "relative",
    zIndex: 1,
  });

  // color value
  const colorValue = color === "inherit" || !palette[color] ? "inherit" : palette[color].main;

  return {
    opacity,
    textTransform,
    verticalAlign,
    textDecoration: "none",
    color: colorValue,
    letterSpacing: "-0.125px",
    fontWeight: fontWeights[fontWeight] && fontWeights[fontWeight],
    ...(textGradient && gradientStyles()),  // Apply gradient styles if textGradient is true
  };
});
