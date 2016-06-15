'use strict';

module.exports = {
  '.react-tabs [role=tablist]': {
    'display': 'flex',
    'width': '100vw',
    'flex-display': 'row',
    'border-bottom': '0px solid #aaa',
    'margin': '-1px 0 10px',
    'padding': '0'
  },

  '.react-tabs [role=tab]': {
 
    'border': 'thin solid #a687c4',
    'border-bottom': 'none',
    'bottom': '-1px',
    'position': 'relative',
    'list-style': 'none',
    'padding': '10px 12px 0 12px',
    'cursor': 'pointer',
    'height': '35px',
    'width': '25%',
    'background': '#B8A0D0',
    'text-align': 'center',
    'font-size': '16px',
    'font-weight': 'bold'
  },

  '.react-tabs [role=tab][aria-selected=true]': {
    'background': '#fff',
    'border-color': '#aaa',
    'color': 'black'
  },

  '.react-tabs [role=tab][aria-disabled=true]': {
    'color': 'GrayText',
    'cursor': 'default'
  },

  '.react-tabs [role=tab]:focus': {
    'box-shadow': '0 0 5px hsl(208, 99%, 50%)',
    'border-color': 'hsl(208, 99%, 50%)',
    'outline': 'none'
  },

  '.react-tabs [role=tab]:focus:after': {
    'content': '""',
    'position': 'absolute',
    'height': '20px',
    'width': '100px',
    'left': '-4px',
    'right': '-4px',
    'bottom': '-5px',
    'background': '#fff'
  }
};