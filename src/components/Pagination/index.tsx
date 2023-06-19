import { useDispatch, useSelector } from "react-redux";
import Select, { StylesConfig } from "react-select";

import {
  selectProductPagination,
  setCurrentPage,
  setItemsPerPage,
} from "../../redux/slices/productSlice";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  paginationCount: number;
  itemsPerPage: number;
};

type optionsInterface = {
  value: number | string;
  label: number | string;
};

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, paginationCount, itemsPerPage }: PaginationProps =
    useSelector(selectProductPagination);

  const options: optionsInterface[] = [
    { value: 4, label: 4 },
    { value: 8, label: 8 },
    { value: 12, label: 12 },
    { value: "all", label: "All" },
  ];

  const onSelectItemsPerPage = (option: any) => {
    dispatch(setItemsPerPage(option.value));
    dispatch(setCurrentPage(1));
  };

  const onChangeCurrentPage = (operator: string) => {
    if (operator == "-") {
      currentPage != 1 ? dispatch(setCurrentPage(currentPage - 1)) : null;
    } else {
      currentPage != paginationCount
        ? dispatch(setCurrentPage(currentPage + 1))
        : null;
    }
  };

  // Custom styles Selector
  const colourStyles: StylesConfig = {
    control: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: "white",
        ...(isFocused && { borderColor: "#fe5f1e" }),
        ...(isFocused && { boxShadow: " 0 0 0 1 #fe5f1e" }),
        ":hover": {
          borderColor: "#fe5f1e",
        },
      };
    },

    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#fe5f1e"
          : isFocused
          ? "#fe5f1e82"
          : "white",
        color: isSelected ? "white" : isFocused ? "white" : "#fe5f1e",
        cursor: isFocused ? "pointer" : "default",
        ":active": {
          backgroundColor: isFocused ? "#fe5f1e" : "white",
        },
      };
    },
  };

  return (
    <div className={styles.root}>
      <div className={styles.paginationContent}>
        <div className={styles.select}>
          <span className={styles.selectTitle}>Items per page:</span>
          <Select
            menuPlacement="top"
            options={options}
            defaultValue={options.find((obj) => obj.value == itemsPerPage)}
            onChange={onSelectItemsPerPage}
            styles={colourStyles}
          />
        </div>
        {paginationCount > 1 && (
          <ul className={styles.pagination}>
            <li
              className={currentPage != 1 ? styles.active : styles.cursorNone}
              onClick={() => onChangeCurrentPage("-")}
            >
              <span>
                <svg
                  viewBox="-4.5 0 20 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-345.000000, -6679.000000)"
                      fill="#000000"
                    >
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        <path
                          d="M299.633777,6519.29231 L299.633777,6519.29231 C299.228878,6518.90256 298.573377,6518.90256 298.169513,6519.29231 L289.606572,6527.55587 C288.797809,6528.33636 288.797809,6529.60253 289.606572,6530.38301 L298.231646,6538.70754 C298.632403,6539.09329 299.27962,6539.09828 299.685554,6538.71753 L299.685554,6538.71753 C300.100809,6538.32879 300.104951,6537.68821 299.696945,6537.29347 L291.802968,6529.67648 C291.398069,6529.28574 291.398069,6528.65315 291.802968,6528.26241 L299.633777,6520.70538 C300.038676,6520.31563 300.038676,6519.68305 299.633777,6519.29231"
                          id="arrow_left-[#335]"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </li>

            {[...new Array(paginationCount)].map((_, index) => (
              <li
                className={
                  currentPage === index + 1
                    ? `${styles.active} ${styles.cursorNone}`
                    : ""
                }
                key={index}
                onClick={() => dispatch(setCurrentPage(index))}
              >
                <span>{++index}</span>
              </li>
            ))}

            <li
              className={
                currentPage != paginationCount
                  ? styles.active
                  : styles.cursorNone
              }
              onClick={() => onChangeCurrentPage("+")}
            >
              <span>
                <svg
                  width="800px"
                  height="800px"
                  viewBox="-4.5 0 20 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-305.000000, -6679.000000)"
                      fill="#000000"
                    >
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        <path
                          d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"
                          id="arrow_right-[#336]"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pagination;
