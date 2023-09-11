import { useContext } from "react";
import {
  airports,
  airports__airport,
  airports__select,
  airport__delete,
} from "./Airports.module.css";
import { DELETE_NODE, ADD_TO_LINKS } from "../../context/actions/actionTypes";
import XRoundedIcon from "../../assets/XRoundedIcon";
import dataContext from "../../context/store/dataContext";

const Airports = () => {
  const { state, dispatch } = useContext(dataContext);

  const handleDelete = (id) => {
    dispatch({ type: DELETE_NODE, payload: id });
  };

  const handleLinkChange = (source, target) => {
    dispatch({ type: ADD_TO_LINKS, payload: { source, target } });
  };

  return (
    <div className={airports}>
      {state.nodes &&
        state.nodes.map((airport, index) => {
          return (
            <div className={airports__airport} key={index}>
              <p>{airport.id}</p>
              <button
                className={airport__delete}
                onClick={() => handleDelete(airport.id)}
              >
                <XRoundedIcon />
              </button>
              <select
                className={airports__select}
                onChange={(e) => handleLinkChange(airport.id, e.target.value)}
              >
                <option value="">None</option>
                {state.nodes &&
                  state.nodes.map((arpt, index) => {
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
