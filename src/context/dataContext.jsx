import { createContext } from "react";

const dataContext = createContext({
  data: null,
  setData: () => {},
});

export default dataContext;