import { useState } from 'react';

const CarPartBlock = ({ title, price, subCategory, imageProguct, quantity, size }) => {
   const [activeQuantity, setActiveQuantity] = useState(0);
   const [activeSize, setActiveSize] = useState(0);

   return (
      <div className="car-parts-block">
         <img className="car-parts-block__image" src={imageProguct} alt="car-parts" />
         <h4 className="car-parts-block__title">{title}</h4>
         <span className="car-parts-block__subtitle">{subCategory}</span>
         {(quantity.length > 0 || size.length > 0) && (
            <div className="car-parts-block__selector">
               {quantity.length > 0 && (
                  <ul style={size.length == 0 ? { marginBottom: 0 } : {}}>
                     {quantity.map((value, index) => (
                        <li
                           key={index + value}
                           onClick={() => setActiveQuantity(index)}
                           className={activeQuantity == index ? 'active' : ''}>
                           {value}
                        </li>
                     ))}
                  </ul>
               )}
               {size.length > 0 && (
                  <ul style={quantity.length == 0 ? { marginBottom: 0 } : {}}>
                     {size.map((value, index) => (
                        <li
                           key={index + value}
                           onClick={() => setActiveSize(index)}
                           className={activeSize == index ? 'active' : ''}>
                           {value.toUpperCase()}
                        </li>
                     ))}
                  </ul>
               )}
            </div>
         )}

         <div className="car-parts-block__bottom">
            <div className="car-parts-block__price">{price}</div>
            <button className="button button--outline button--add">
               <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                     fill="white"
                  />
               </svg>
               <span>Add</span>
               <i>0</i>
            </button>
         </div>
      </div>
   );
};

export default CarPartBlock;
