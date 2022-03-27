import { map } from "lodash";

export const debounce = (func, delay) => {
  let id;
   console.log("id", id)
  return (...args) => {
    console.log('prev id', id)
    if(id) clearTimeout(id)
     
    id = setTimeout(() => {
       func(...args)
    }, delay)
  }
}


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
  
  return previewItems
             .map(item => item.dietaries)
             .reduce((map, curr) => [...map, ...curr],[])
             .reduce((map, curr) => {
                 return {...map, [curr]: (map[curr] || 0) + 1};
              }, {});            
    
};
