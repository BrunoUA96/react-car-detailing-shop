import { useContext } from 'react';
import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
   const { searchValue, setSearchValue } = useContext(SearchContext);

   return (
      <div className={styles.root}>
         <svg
            className={styles.searchIcon}
            enableBackground="new 0 0 32 32"
            id="Editable-line"
            version="1.1"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg">
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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={styles.input}
            type="text"
            name="search"
            placeholder="Search..."
         />
         {searchValue && (
            <span onClick={() => setSearchValue('')}>
               <svg
                  className={styles.closeIcon}
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg">
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
