import { createContext } from "react";

const dataContext = createContext({
  state: null,
  dispatch: () => {},
});

export default dataContext;