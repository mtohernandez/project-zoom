import { useContext } from "react";
import {
  airports,
  airports__airport,
  airports__select,
  airport__delete,
} from "./Airports.module.css";
import XRoundedIcon from "../../assets/XRoundedIcon";
import dataContext from "../../context/dataContext";
import { PropTypes } from "prop-types";

const Airports = ({ handleLinkChange, handleNodeDelete }) => {
  const { data } = useContext(dataContext);

  return (
    <div className={airports}>
      {data.nodes &&
        data.nodes.map((airport, index) => {
          return (
            <div className={airports__airport} key={index}>
              <p>{airport.id}</p>
              <button
                className={airport__delete}
                onClick={() => handleNodeDelete(airport.id)}
              >
                <XRoundedIcon />
              </button>
              <select
                className={airports__select}
                onChange={(e) => handleLinkChange(airport.id, e.target.value)}
              >
                <option value="">None</option>
                {data.nodes &&
                  data.nodes.map((arpt, index) => {
                    if (airport.id === arpt.id) return;
                    return (
                      <option key={index} value={arpt.id}>
                        {arpt.id}
                      </option>
                    );
                  })}
              </select>
            </div>
          );
        })}
    </div>
  );
};

export default Airports;

Airports.propTypes = {
  handleLinkChange: PropTypes.func,
  handleNodeDelete: PropTypes.func,
};
