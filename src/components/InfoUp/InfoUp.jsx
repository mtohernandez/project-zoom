import Popup from "reactjs-popup";
import { PropTypes } from "prop-types";
import InfoIcon from "../../assets/InfoIcon";
import { modal__button } from "./InfoUp.module.css";


const InfoUp = ({ label, content, example }) => {
  return (
    <Popup
      trigger={
        <button className={modal__button}>
          <InfoIcon />
        </button>
      }
      modal
    >
      <h2>{label}.</h2>
      <h6>{content}</h6>
      {example && <code>{example.replace(/'/g, '"')}</code>}
    </Popup>
  );
};

export default InfoUp;

InfoUp.propTypes = {
  label: PropTypes.string,
  example: PropTypes.string,
  content: PropTypes.string,
};
