import React, { Component } from 'react';

class Variety extends Component {
  render() {
    return (
      <li className="option">
        <label className="option__label">
          <input
            type="number"
            className="input option__input"
            name={'option-' + this.props.variety.key}
            value={this.props.variety.value}
            onChange={event => this.props.onChange(this.props.variety.key, event.target.value)}
            min="0"
            max="99"
            placeholder="?"
          />

          <div className="option__times">
            ×
          </div>

          <div className="option__text">
            <div className="option__name">
              {this.props.variety.name}
            </div>

            <div className="option__tags">
              <span className="option__tag">
                {this.props.variety.category}
              </span>
            </div>
          </div>
        </label>
      </li>
    );
  }
}

export default Variety;
