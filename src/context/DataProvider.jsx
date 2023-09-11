import DataContext from "./store/dataContext";
import { useReducer } from "react";
import { PropTypes } from "prop-types";
import { initialState, dataReducer } from "./reducer/dataReducer";

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

DataProvider.propTypes = {
  children: PropTypes.node,
};
