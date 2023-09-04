import { useState } from "react";
import { PropTypes } from "prop-types";
import {
  dataTaker,
  dataTaker__input,
  dataTaker__button,
  dataTaker__label,
  modal__button,
} from "./DataTaker.module.css";
import Popup from "reactjs-popup";
import InfoIcon from "../../assets/InfoIcon";

const DataTaker = ({ example, label, input, button, action, isDisabled }) => {
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
        <input
          className={dataTaker__input}
          type="text"
          placeholder={input}
          onChange={handleChange}
          disabled={isDisabled}
        />
        <Popup
          trigger={
            <button className={modal__button}>
              <InfoIcon />
            </button>
          }
          modal
        >
          <h2>{label}.</h2>
          <h6>Must follow this format:</h6>
          <code>
            {example.replace(/'/g, '"')}
          </code>
        </Popup>
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
  input: PropTypes.string,
  button: PropTypes.string,
  action: PropTypes.func,
  isDisabled: PropTypes.bool,
};
