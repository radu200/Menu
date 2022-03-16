import React from "react";
import PropTypes from "prop-types";

const Item = ({ name, dietaries }) => {
  return (
    <>
      <h2>{name}</h2>
      <p>
        {dietaries.map((d, i) => (
          <span className="dietary" key={i}>
            {d}
          </span>
        ))}
      </p>
    </>
  );
};

Item.propTypes = {
  name: PropTypes.string,
  dietaries: PropTypes.arrayOf(PropTypes.string),
};

export default Item;
