// @mui material components
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
//import linearGradient from '';

export default styled(Box)(({ theme, ownerState }) => {
  const { palette, functions = {}, borders = {}, boxShadows = {} } = theme;  // Provide a fallback for boxShadows
  const { variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow } = ownerState;

  const { gradients = {}, grey, white } = palette;  // Fallback for gradients
  const { linearGradient = () => {} } = functions;  // Provide a default empty function for linearGradient
  const { borderRadius: radius = {} } = borders;  // Provide a fallback for borderRadius
  const { colored = {} } = boxShadows;  // Provide a fallback for colored in boxShadows

  const greyColors = {
    "grey-100": grey[100],
    "grey-200": grey[200],
    "grey-300": grey[300],
    "grey-400": grey[400],
    "grey-500": grey[500],
    "grey-600": grey[600],
    "grey-700": grey[700],
    "grey-800": grey[800],
    "grey-900": grey[900],
  };

  const validGradients = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ];

  const validColors = [
    "transparent",
    "white",
    "black",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "grey-100",
    "grey-200",
    "grey-300",
    "grey-400",
    "grey-500",
    "grey-600",
    "grey-700",
    "grey-800",
    "grey-900",
  ];

  const validBorderRadius = ["xs", "sm", "md", "lg", "xl", "xxl", "section"];
  const validBoxShadows = ["xs", "sm", "md", "lg", "xl", "xxl", "inset"];

  // background value
  let backgroundValue = bgColor;

  if (variant === "gradient") {
    backgroundValue = validGradients.find((el) => el === bgColor)
      ? linearGradient(gradients[bgColor]?.main || "", gradients[bgColor]?.state || "")
      : white.main;
  } else if (validColors.find((el) => el === bgColor)) {
    backgroundValue = palette[bgColor] ? palette[bgColor].main : greyColors[bgColor];
  } else {
    backgroundValue = bgColor;
  }

  // color value
  let colorValue = color;

  if (validColors.find((el) => el === color)) {
    colorValue = palette[color] ? palette[color].main : greyColors[color];
  }

  // borderRadius value
  let borderRadiusValue = borderRadius;

  if (validBorderRadius.find((el) => el === borderRadius)) {
    borderRadiusValue = radius[borderRadius] || "0px";  // Fallback to "0px" if radius is undefined
  }

  // boxShadow value
  let boxShadowValue = "none";

  if (validBoxShadows.find((el) => el === shadow)) {
    boxShadowValue = boxShadows[shadow];
  } else if (coloredShadow && colored[coloredShadow]) {
    boxShadowValue = colored[coloredShadow] || "none";
  }

  return {
    opacity,
    background: backgroundValue,
    color: colorValue,
    borderRadius: borderRadiusValue,
    boxShadow: boxShadowValue,
  };
});
