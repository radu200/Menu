module.exports.filterByName = (items,searchQuery) => {
    const searchedItems = items.filter((item)=>{
        return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0; 
      });

    return searchedItems
}