import React from 'react';

const Variety = (props) => {
  return (
    <li className={'option ' + (props.variety.visible ? '' : 'option--hidden')}>
      <label className="option__label">
        <input
          type="number"
          className="input option__input"
          name={'option-' + props.variety.key}
          value={props.variety.value}
          onChange={event => props.onChange(props.variety.key, event.target.value)}
          min="0"
          max="99"
          placeholder="?"
        />

        <div className="option__times">
          ×
        </div>

        <div className="option__text">
          <div className="option__name">
            {props.variety.name}
          </div>

          <div className="option__tags">
            <span className="option__tag">
              {props.variety.category}
            </span>
          </div>
        </div>
      </label>
    </li>
  );
};

export default Variety;
