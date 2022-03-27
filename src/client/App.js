import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import * as API from "./api/items";
import * as helpers from "./helpers";
import Item from "./components/items";
import PreviewdItem from "./components/items/preview";
import useDebounce from './hooks/useDebounce';

const App = () => {
  const [state, setState] = useState({
    items: [],
    previewItems: [],
    totalDietaris: {},
    dietarySearch:[],
    searchQuery: "",
    loading: false,
    error: "",
  });
  const debounceSearch = useDebounce(state.searchQuery, 400)
  const debounceDietarySearch = useDebounce(state.dietarySearch, 600)

  const fetchItems = useCallback(async (searchQuery) => {
    try {
      setState((state) => ({ ...state, loading: true }));
      const { status, data } = await API.getItems(searchQuery);
      if (status === 200) {
        setState((state) => ({ ...state, items: data.items }));
      }
    } catch (err) {
      setState((state) => ({ ...state, error: "error" }));
    } finally {
      setState((state) => ({ ...state, loading: false }));
    }
  }, []);


  const onSearch = (e) => {
    setState({ ...state, searchQuery: e.target.value })
  };


  useEffect(() => {
      fetchItems(state.searchQuery);
  }, [debounceSearch, fetchItems]);

  /// on select right side item
  const onPreviewItem = (item) => {
    const previewItems = helpers.onAddItem(state.previewItems, item);
    const totalDietaris = helpers.getTotalDietaries(previewItems);
    setState((state) => ({ ...state, previewItems, totalDietaris }));
  };

  const onRemoveItem = (itemId) => {
    const previewItems = helpers.onRemoveItem(state.previewItems, itemId);
    const totalDietaris = helpers.getTotalDietaries(previewItems);
    setState((state) => ({ ...state, previewItems, totalDietaris }));
  };

  const addDietary = (dietary) => {
    setState(state =>  ({...state, dietarySearch:Array.from(new Set([...state.dietarySearch, dietary]))}))
  }

  const filterByDietary = () => {
  
    if(!debounceDietarySearch.length){
       return state.previewItems;
    }

   const items = state.previewItems.filter(item => {
       return item.dietaries.some(dietary => debounceDietarySearch.includes(dietary)) === true;
    })

    const uniqueItems =  Array.from(items.reduce((map, obj) => map.set(obj.id, obj) ,new Map()).values());
   
    return uniqueItems
  }

  const removeFilter = (dietaryName) => {
    const newItems = debounceDietarySearch.filter(dietary => dietary.toLowerCase() !== dietaryName.toLowerCase())
    setState(state =>  ({...state, dietarySearch:newItems }))
  }

  const getStatus = () => {
    if (state.loading) return "loading";
    if (!state.items.length) return "No items found";
    return "";
  };
  
  return (
    <div className="wrapper">
      <div className="menu-summary">
        <div className="container">
          <div className="row">
            <div className="col-6 menu-summary-left">
              <span>{state.previewItems.length} items</span>
            </div>
            <div className="col-6 menu-summary-right d-flex flex-row-reverse">
              {Object.keys(state.totalDietaris).map((dietary) => (
                <div className="d-flex" key={dietary} onClick={(() => addDietary(dietary))} >
                  <p className="p-2"> {state.totalDietaris[dietary]}x </p>
                  <p className="dietary">{dietary}</p>
                </div>
              ))}
            </div>
            <div className="col-12 menu-summary-right d-flex flex-row-reverse">
              {debounceDietarySearch.map((dietary) => (
                <div key={dietary} onClick={(() => removeFilter(dietary))} >
                  <p className="dietary">{dietary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {state.error ? (
        <div className="container">
          {" "}
          <p>{state.error}</p>{" "}
        </div>
      ) : null}

      <div className="container menu-builder">
        <div className="row">
          <div className="col-4">
            <div className="filters">
              <input
                className="form-control"
                placeholder="Name"
                onChange={onSearch}
              />
            </div>
            {getStatus()}
            <ul className="item-picker">
              {state.items.map((item) => (
                <li
                  key={item.id}
                  className="item"
                  onClick={() => onPreviewItem(item)}
                >
                  <Item {...item} />
                </li>
              ))}
            </ul>
          </div>

          <div className="col-8">
            <h2>Menu preview</h2>
            <ul className="menu-preview">
              {filterByDietary().map(item => (
                   <li key={item.id} className="item">
                   <PreviewdItem
                     {...item}
                     onRemoveItem={() => onRemoveItem(item.id)}
                   />
                 </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
