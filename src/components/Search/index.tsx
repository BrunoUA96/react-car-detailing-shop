import debounce from "lodash.debounce";
import React, { useCallback, useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { SearchContext } from "../../App";
import { Status, setStatus } from "../../redux/slices/productSlice";
import { setCurrentPage } from "../../redux/slices/productSlice";
import styles from "./Search.module.scss";

const Search: React.FC = () => {
  const dispatch = useDispatch();

  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [localSearchValue, setLocalSerchValue] = useState("");

  const debounceValue = useCallback(
    debounce((str: string) => {
      setSearchValue(str);
      dispatch(setCurrentPage(1));
    }, 500),
    []
  );

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSerchValue(event.target.value);

    dispatch(setStatus(Status.LOADING));
    debounceValue(event.target.value);
  };

  // Get ref to inputin order to put focused on clean
  const searchInputRef = useRef<HTMLInputElement>(null);

  const resetInput = () => {
    setSearchValue("");
    setLocalSerchValue("");
    dispatch(setCurrentPage(1));

    // If current exist
    searchInputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.searchIcon}
        enableBackground="new 0 0 32 32"
        id="Editable-line"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={searchInputRef}
        value={localSearchValue}
        onChange={onChangeValue}
        className={styles.input}
        type="text"
        name="search"
        placeholder="Search..."
      />
      {localSearchValue && (
        <span onClick={resetInput}>
          <svg
            className={styles.closeIcon}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="cross">
              <line x1="7" x2="25" y1="7" y2="25" />
              <line x1="7" x2="25" y1="25" y2="7" />
            </g>
          </svg>
        </span>
      )}
    </div>
  );
};

export default Search;
