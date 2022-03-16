import React from "react";
import PropTypes from "prop-types";
import Item from ".";

const PreviewItem = ({ name, dietaries, onRemoveItem }) => {
  return (
    <>
      <Item name={name} dietaries={dietaries} />
      <button onClick={onRemoveItem} className="remove-item">
        x
      </button>
    </>
  );
};

PreviewItem.propTypes = {
  name: PropTypes.string,
  dietaries: PropTypes.arrayOf(PropTypes.string),
  onRemoveItem: PropTypes.func,
};

export default PreviewItem;
