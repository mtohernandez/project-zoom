import { useContext } from "react";
import { airports, airports__airport } from "./Airports.module.css";
import dataContext from "../../context/dataContext";

const Airports = () => {
  const { data } = useContext(dataContext);

  return (
    <div className={airports}>
      {data.nodes &&
        data.nodes.map((airport, index) => {
          return (
            <div className={airports__airport} key={index}>
              {airport.id}
            </div>
          );
        })}
    </div>
  );
};

export default Airports;

