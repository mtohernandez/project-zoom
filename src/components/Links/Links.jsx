import { useContext } from "react";
import { links, links__airport } from "./Links.module.css";
import dataContext from "../../context/dataContext";

const Links = () => {
  const { data } = useContext(dataContext);

  return (
    <div className={links}>
      {data.links &&
        data.links.map((airport, index) => {
          return (
            <div className={links__airport} key={index}>
              {airport.source}
              <div className={links__airport}>{airport.target}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Links;
