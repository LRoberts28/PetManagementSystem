import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';
import MKBox from '../../MKBox';
import MKTypography from '../../MKTypography';

function DefaultNavbarDropdown({
  name,
  icon = null, // Default value for icon
  children = false, // Default value
  collapseStatus = false, // Default value
  light = false, // Default value
  href = '', // Default value
  route = '', // Default value
  collapse,
  ...rest
}) {
  // Default icon if no icon provided
  const iconElement = icon ? (
    <MKTypography
      variant="body2"
      lineHeight={1}
      color="inherit"
      sx={{ alignSelf: 'center', '& *': { verticalAlign: 'middle' } }}
    >
      {icon}
    </MKTypography>
  ) : (
    <MKTypography
      variant="body2"
      lineHeight={1}
      color="inherit"
      sx={{ alignSelf: 'center', '& *': { verticalAlign: 'middle' } }}
    >
      <Icon>help_outline</Icon> {/* Fallback icon */}
    </MKTypography>
  );

  const linkComponent = {
    component: 'a',
    href,
    target: '_blank',
    rel: 'noreferrer',
  };

  const routeComponent = {
    component: Link,
    to: route,
  };

  return (
    <>
      <MKBox
        {...rest}
        mx={1}
        p={1}
        display="flex"
        alignItems="baseline"
        color={light ? 'white' : 'dark'}
        opacity={light ? 1 : 0.6}
        sx={{ cursor: 'pointer', userSelect: 'none' }}
        {...(route && routeComponent)}
        {...(href && linkComponent)}
      >
        {iconElement}
        <MKTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? 'white' : 'dark'}
          sx={{ fontWeight: '100%', ml: 1, mr: 0.25 }}
        >
          {name}
        </MKTypography>
        <MKTypography variant="body2" color={light ? 'white' : 'dark'} ml="auto">
          <Icon sx={{ fontWeight: 'normal', verticalAlign: 'middle' }}>
            {collapse && 'keyboard_arrow_down'}
          </Icon>
        </MKTypography>
      </MKBox>
      {children && (
        <Collapse in={Boolean(collapseStatus)} timeout={400} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Typechecking props for the DefaultNavbarDropdown
DefaultNavbarDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.node, // No longer required
  children: PropTypes.node,
  collapseStatus: PropTypes.bool,
  light: PropTypes.bool,
  href: PropTypes.string,
  route: PropTypes.string,
  collapse: PropTypes.bool.isRequired,
};

export default DefaultNavbarDropdown;
