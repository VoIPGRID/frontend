import React from 'react';
import styled from 'styled-components';

const Select = require('react-select');
const classNames = require('classnames');

const StyledField = styled.div`
  &:not(:last-child) {
    margin-bottom: 0.75rem;
  }

  .input,
  .textarea {
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 3px;
    -webkit-box-shadow: none;
    box-shadow: none;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 14px;
    height: 2.25em;
    -ms-flex-pack: start;
    justify-content: flex-start;
    line-height: 1.5;
    padding-bottom: calc(0.375em - 1px);
    padding-left: calc(0.625em - 1px);
    padding-right: calc(0.625em - 1px);
    padding-top: calc(0.375em - 1px);
    position: relative;
    vertical-align: top;
    background-color: white;
    border-color: #dbdbdb;
    color: #363636;
    -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
    max-width: 100%;
    width: 100%;

    &[disabled] {
      background-color: #eee;
      border: 1px solid #dbdbdb;
    }
  }

  .textarea:not([rows]) {
    max-height: 600px;
    min-height: 120px;
  }

  .control {
    max-width: 400px;
    margin-bottom: 1.5em;
  }

  label {
    color: #363636;
    display: block;
    font-size: 1rem;
    font-weight: 700;
  }

  .Select {
    font-size: 14px;
  }

  .help {
    display: block;
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
`;

const renderField = field => {
  const { meta: { touched, error } } = field;
  let className = field.type;

  if (field.type === 'text' || field.type === 'password') {
    className = 'input';
  }

  // Bulma has the name class names as the type of input
  // (e.g. input, textarea). So just reuse that determine what element to
  // render.
  let element = className;

  className = classNames(className, {
    'is-danger': touched && error
  });

  let labelClass = classNames('label', {
    'is-required': field.required
  });

  switch (element) {
    case 'input':
      element = (
        <input
          className={className}
          disabled={field.disabled}
          type={field.type}
          {...field.input}
        />
      );
      break;
    case 'textarea':
      element = (
        <textarea
          className={className}
          disabled={field.disabled}
          type={field.type}
          {...field.input}
        />
      );
      break;
    case 'select':
      element = (
        <Select.Async
          {...field.input}
          loadOptions={field.loadOptions}
          disabled={field.disabled}
          onBlur={() => field.input.onBlur(field.input.value.value)}
        />
      );
      break;
    case 'checkbox':
      element = (
        <input
          className={className}
          disabled={field.disabled}
          type={field.type}
          {...field.input}
        />
      );
      break;
    default:
      break;
  }

  return (
    <StyledField>
      <label htmlFor="field" className={labelClass}>
        {field.label}
      </label>
      <div className="control">
        {element}

        {field.helpText && <p className="help">{field.helpText}</p>}

        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
    </StyledField>
  );
};

export default renderField;
