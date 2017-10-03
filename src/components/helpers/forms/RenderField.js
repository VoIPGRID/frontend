import React from "react";

const Select = require("react-select");
const classNames = require("classnames");

const renderField = field => {
  const { meta: { touched, error } } = field;
  let className = field.type;

  if (field.type === "text" || field.type === "password") {
    className = "input";
  }

  // Bulma has the name class names as the type of input
  // (e.g. input, textarea). So just reuse that determine what element to
  // render.
  let element = className;

  className = classNames(className, {
    "is-danger": touched && error
  });

  let labelClass = classNames("label", {
    "is-required": field.required
  });

  switch (element) {
    case "input":
      element = (
        <input
          className={className}
          disabled={field.disabled}
          type={field.type}
          {...field.input}
        />
      );
      break;
    case "textarea":
      element = (
        <textarea
          className={className}
          disabled={field.disabled}
          type={field.type}
          {...field.input}
        />
      );
      break;
    case "select":
      element = (
        <Select.Async
          {...field.input}
          loadOptions={field.loadOptions}
          disabled={field.disabled}
          onBlur={() => field.input.onBlur(field.input.value.value)}
        />
      );
      break;
    case "checkbox":
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
    <div className="field">
      <label htmlFor="field" className={labelClass}>
        {field.label}
      </label>
      <div className="control">
        {element}

        {field.helpText && <p className="help">{field.helpText}</p>}

        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

export default renderField;
