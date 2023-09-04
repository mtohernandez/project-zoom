import { PropTypes } from "prop-types";
import { container } from "./Container.module.css";

const Container = ({ area, children }) => {
  return (
    <div style={{ gridArea: area }} className={container}>
      {children}
    </div>
  );
};

export default Container;

Container.propTypes = {
  area: PropTypes.string,
  children: PropTypes.node,
};
