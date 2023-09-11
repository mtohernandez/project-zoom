import { useState } from "react";
import { PropTypes } from "prop-types";
import {
  dataTaker,
  dataTaker__input,
  dataTaker__button,
  dataTaker__label,
} from "./DataTaker.module.css";

const DataTaker = ({
  label,
  input,
  button,
  action,
  isDisabled,
}) => {
  const [data, setData] = useState("");

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    action(data);
  };

  return (
    <>
      <label className={dataTaker__label}>{label}</label>
      <div className={dataTaker}>
        {input && (
          <input
            className={dataTaker__input}
            type="text"
            placeholder={input}
            onChange={handleChange}
            disabled={isDisabled}
          />
        )}
        <button
          className={dataTaker__button}
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          {button}
        </button>
      </div>
    </>
  );
};

export default DataTaker;

DataTaker.propTypes = {
  example: PropTypes.string,
  label: PropTypes.string,
  contentPopUp: PropTypes.string,
  input: PropTypes.string,
  button: PropTypes.string,
  action: PropTypes.func,
  runData: PropTypes.func,
  isDisabled: PropTypes.bool,
};
