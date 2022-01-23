import React from "react";
import PropTypes from "prop-types";
import s from "./filter.module.css";

const Filter = ({ valueFilter, onChange }) => {
  return (
    <label>
      filter for name{" "}
      <input
        className={s.input}
        type="text"
        value={valueFilter}
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  valueFilter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
