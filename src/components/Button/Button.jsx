import "./Button.css";

import Loading from "../../images/loading.svg";

const Button = ({ title, loading, onClick, disabled }) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {loading ? (
        <img src={Loading} alt="Loading" className="button--loading" />
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
