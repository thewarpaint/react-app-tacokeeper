import React from 'react';

const Variety = ({variety, onChange}) => {
  return (
    <li className={'option ' + (variety.visible ? '' : 'option--hidden')}>
      <label className="option__label">
        <input
          type="number"
          className="input option__input"
          name={'option-' + variety.key}
          value={variety.value || ''}
          onChange={event => onChange(variety.key, event.target.value)}
          min="0"
          max="99"
          placeholder="?"
        />

        <div className="option__times">
          ×
        </div>

        <div className="option__text">
          <div className="option__name">
            {variety.name}
          </div>

          <div className="option__tags">
            {variety.favourite && <span className="option__tag option__tag--favourite">Favorito</span>}

            <span className="option__tag">
              {variety.category}
            </span>
          </div>
        </div>
      </label>
    </li>
  );
};

export default Variety;
