import { useContext, useState } from "react";
import { button, spinner } from "./Button.module.css";
import { transformNodes } from "../../utils/transformNodes";
import { transformLinks } from "../../utils/transformLinks";
import { RESET_DATA, SET_NEEDED } from "../../context/actions/actionTypes";
import dataContext from "../../context/store/dataContext";
import { instance } from "../../API/instance";
import { requests } from "../../API/requests";

const Button = () => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(dataContext);
  const { needed } = state;

  const handleRequest = async () => {
    if (!state.start) return;

    setLoading(true);
    const response = await instance.post(requests.runAlgorithm.link, {
      starting_connection: state.start,
      airport_codes: transformNodes(state.nodes),
      connections: transformLinks(state.links),
    });
    const data = await response.data;
    setLoading(false);

    if (data.error) {
      alert(response.data.error);
      return;
    }

    const newLinks = response.data.connections.map((connection) => {
      return {
        source: state.start,
        target: connection,
      };
    });

    dispatch({
      type: SET_NEEDED,
      payload: { links: newLinks, needed: response.data.connections },
    });
  };

  const handleReset = () => {
    dispatch({ type: RESET_DATA });
  };

  if (loading) return <div className={spinner} />;

  return (
    <button
      className={button}
      onClick={needed.length > 0 ? handleReset : handleRequest}
    >
      {state.needed.length > 0 ? "Reset" : "Run"}
    </button>
  );
};

export default Button;
