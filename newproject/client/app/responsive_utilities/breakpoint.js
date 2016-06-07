import React from 'react';
import MediaQuery from 'react-responsive';

const breakpoints = {
  desktop: '(min-width: 651px)',
  //tablet: '(min-width: 501px) and (max-width: 1024px)',
  phone: '(max-width: 650px)',
};

const { string, object } = React.PropTypes;

export default function Breakpoint(props) {
  const breakpoint = breakpoints[props.name] || breakpoints.desktop;

  return (
    <MediaQuery {...props } query={breakpoint}>
      {props.children}
    </MediaQuery>
  );
}

React.propTypes = {
  name: string,
  children: object,
}