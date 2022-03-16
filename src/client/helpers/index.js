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
  const dietaries = [];
  previewItems.forEach((item) => {
    item.dietaries.forEach((dietary) => {
      dietaries.push(dietary);
    });
  });

  const result = {};

  dietaries.forEach((element) => {
    if (result[element]) {
      result[element] += 1;
    } else {
      result[element] = 1;
    }
  });

  return result;
};
