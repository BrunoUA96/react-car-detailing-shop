import { useEffect, useRef, useState } from 'react';

// List Sort Options
export const sortOptions = [
   { id: 0, title: 'price (low)', property: 'price', orderBy: 'asc' },
   { id: 1, title: 'price (high)', property: 'price', orderBy: 'desc' },
   { id: 2, title: 'alphabet (a-z)', property: 'title', orderBy: 'asc' },
   { id: 3, title: 'alphabet (z-a)', property: 'title', orderBy: 'desc' },
];

const Sort = ({ sortItem, setSortItem }) => {
   const [isVisible, setIsVisible] = useState(false);

   const sortRef = useRef(null);

   useEffect(() => {
      // Mount function (subscribe)
      const handleClickOutside = (event) => {
         if (!event.composedPath().includes(sortRef.current)) {
            setIsVisible(false);
         }
      };
      document.body.addEventListener('click', handleClickOutside);

      // To unmount function (unsubscribe)
      // When i leave from this page, need to unsubscribe from memory
      return () => {
         document.body.removeEventListener('click', handleClickOutside);
      };
   }, []);

   return (
      <div ref={sortRef} className="sort">
         <div className="sort__label">
            <svg
               width="10"
               height="6"
               viewBox="0 0 10 6"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
               style={!isVisible ? { transform: 'rotate(180deg)' } : {}}>
               <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="#2C2C2C"
               />
            </svg>
            <b>Sort by:</b>
            <span onClick={() => setIsVisible(!isVisible)}>{sortItem.title}</span>
         </div>
         {isVisible && (
            <div className="sort__popup">
               <ul>
                  {sortOptions.map((obj, index) => (
                     <li
                        key={index}
                        onClick={() => (setSortItem(obj), setIsVisible(!isVisible))}
                        className={sortItem.id == obj.id ? 'active' : ''}>
                        {obj.title}
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
};

export default Sort;
