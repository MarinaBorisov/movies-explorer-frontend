import React from 'react';
import './Input.css';

export const Input = (props) => {
  return (
    <div className="input">
      <input className={props.className}
        type={props.type}
        name={props.name}
        minLength={props.minLength}
        maxLength={props.maxLength}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
        required></input>
      <span className="input__error">{props.isDirty && props.currentError}</span>
    </div>
  );
}