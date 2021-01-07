import "./Chip.css";

const Chip = ({ title, disabled, onChange }) => {
  return (
    <div className="chip--container">
      <input
        type="checkbox"
        id={title}
        value={title}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={title}>{title.replaceAll("-", " ")}</label>
    </div>
  );
};

export default Chip;
