import { useState, useRef, useContext } from "react";
import { PropTypes } from "prop-types";
import {
  dataTaker,
  dataTaker__input,
  dataTaker__button,
  dataTaker__label,
} from "./DataTaker.module.css";
import { ADD_TO_NODES } from "../../context/actions/actionTypes";
import dataContext from "../../context/store/dataContext";

const DataTaker = ({ label, input, button }) => {
  const { state, dispatch } = useContext(dataContext);
  const [data, setData] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.value = "";
    dispatch({ type: ADD_TO_NODES, payload: data });
  };

  return (
    <>
      <label className={dataTaker__label}>
        {label} {state.nodes.length > 0 && `(${state.nodes.length} nodes)`}
      </label>
      <div className={dataTaker}>
        {input && (
          <input
            ref={inputRef}
            className={dataTaker__input}
            type="text"
            placeholder={input}
            onChange={handleChange}
            maxLength={10}
          />
        )}
        <button className={dataTaker__button} onClick={handleSubmit}>
          {button}
        </button>
      </div>
    </>
  );
};

export default DataTaker;

DataTaker.propTypes = {
  label: PropTypes.string,
  input: PropTypes.string,
  button: PropTypes.string,
};
