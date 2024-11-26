import React from 'react';
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import MKBox from "../../MKBox";
import MKTypography from "../../MKTypography";
import typography from "../../../assets/theme/base/typography";

function SimpleFooter({ company = { href: "https://www.creative-tim.com/", name: "Creative Tim" }, links = [], light = false }) {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link, key) => (
      <MKBox
        key={link.name}
        component="li"
        pl={key === 0 ? 0 : 2}
        pr={key === links.length - 1 ? 0 : 2}
        lineHeight={1}
      >
        <Link href={link.href} target="_blank">
          <MKTypography variant="button" fontWeight="regular" color={light ? "white" : "text"}>
            {link.name}
          </MKTypography>
        </Link>
      </MKBox>
    ));

  return (
    <Container>
      <MKBox
        width="100%"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <MKBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          color={light ? "black" : "text"}
          fontSize={size.sm}
        >
          &copy; {new Date().getFullYear()}, made by Lance Roberts for TailTracker.
        </MKBox>
        <MKBox
          component="ul"
          sx={({ breakpoints }) => ({
            display: "flex",
            flexWrap: "wrap",
            alignItems: "left",
            justifyContent: "left",
            listStyle: "none",
            mt: 3,
            mb: 0,
            p: 0,

            [breakpoints.up("lg")]: {
              mt: 0,
            },
          })}
        >
          {renderLinks()}
        </MKBox>
      </MKBox>
    </Container>
  );
}

// Typechecking props for the SimpleFooter
SimpleFooter.propTypes = {
  company: PropTypes.shape({
    href: PropTypes.string,
    name: PropTypes.string,
  }),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  light: PropTypes.bool,
};

export default SimpleFooter;
