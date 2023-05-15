import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, selectProductById } from '../../redux/slices/cartSlise';
import ContentLoader from 'react-content-loader';

const CarPartBlock = ({ id, title, price, subCategory, imageProguct, quantity, size }) => {
   const dispatch = useDispatch();

   // I take image from a third size
   // That's why i need to check if image is finally loaded
   const [imgIsLoaded, setImgIsLoaded] = useState(false);

   // Find added product
   const addedProduct = useSelector(selectProductById(id));
   // If product doesn't exist in redux put count 0
   // Else put number of added
   const addedCount = addedProduct ? addedProduct.count : 0;

   const [activeQuantity, setActiveQuantity] = useState(0);
   const [activeSize, setActiveSize] = useState(0);

   const addToCart = () => {
      const product = {
         id,
         title,
         price,
         imageProguct,
         quantity: quantity[activeQuantity],
         size: size[activeSize],
      };

      dispatch(addProduct(product));
   };

   return (
      <div className="car-parts-block">
         {/* When image loading */}
         {!imgIsLoaded && (
            <ContentLoader
               speed={5}
               width={240}
               height={260}
               viewBox="0 0 240 260"
               backgroundColor="#f3f3f3"
               foregroundColor="#ecebeb">
               <rect x="0" y="0" rx="10" ry="10" width="240" height="260" />
            </ContentLoader>
         )}

         {/* If image is loaded, hodden param is false */}
         <img
            hidden={!imgIsLoaded}
            className="car-parts-block__image"
            src={imageProguct}
            alt="car-parts"
            onLoad={() => setImgIsLoaded(true)}
         />

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
            <div className="car-parts-block__price">${price}</div>
            <button onClick={addToCart} className="button button--outline button--add">
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
               {addedCount > 0 && <i>{addedCount}</i>}
            </button>
         </div>
      </div>
   );
};

export default CarPartBlock;
