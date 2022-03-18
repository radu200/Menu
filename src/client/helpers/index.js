export const onAddItem = (previewItems, newItem) => {
  const itemExist = previewItems.find((item) => item.id === newItem.id);

  if (!itemExist) {
    return [...previewItems, newItem];
  }

  return previewItems;
};

export const onRemoveItem = (previewItems, itemId) => {
  const items = previewItems.filter((item) => item.id !== itemId);

  return items;
};

export const getTotalDietaries = (previewItems) => {
  
  const result = {};

  previewItems.forEach((item) => {
    item.dietaries.forEach((dietary) => {
       result[dietary] = (result[dietary] || 0) + 1;
    });
  });
  return result;
};
