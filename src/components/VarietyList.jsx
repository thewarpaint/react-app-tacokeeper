import React, { Component } from 'react';

import Variety from './variety';

const VarietyList = (props) => {
  return (
    <ul className="options">
      {
        props.varieties.map(variety => {
          return <Variety
                    key={variety.key}
                    variety={variety}
                    onChange={props.onChange}
                 />;
        })
      }
    </ul>
  );
}

export default VarietyList;