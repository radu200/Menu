import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import * as API from "./api/items";
import * as helpers from "./helpers";
import Item from "./components/items";
import PreviewdItem from "./components/items/preview";

const App = () => {
  const [state, setState] = useState({
    items: [],
    previewItems: [],
    totalDietaris: {},
    searchQuery: "",
    loading: false,
    error: "",
  });

  const fetchItems = useCallback(async (searchQuery) => {
    try {
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

  const onSearch = (e) => {
    const query = e.target.value;
    setState({ ...state, searchQuery: query });
  };

  useEffect(() => {
    setState((state) => ({ ...state, loading: true }));
    const myTimeoutId = setTimeout(() => {
      fetchItems(state.searchQuery);
    }, 600);
    () => clearTimeout(myTimeoutId);
  }, [fetchItems, state.searchQuery]);

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
                <div className="d-flex" key={dietary}>
                  <p className="p-2"> {state.totalDietaris[dietary]}x </p>
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
              {state.previewItems.map((item) => (
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
