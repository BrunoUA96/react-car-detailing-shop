import { useDispatch } from "react-redux";

import {
  addProduct,
  decrementItemQuantity,
  removeProduct,
} from "../../../redux/cart/slice";
import { CartProductType, ItemCardType } from "../../../redux/cart/types";

const ProductCart: React.FC<CartProductType> = ({
  id,
  title,
  imageProguct,
  price,
  size,
  count,
}) => {
  const dispatch = useDispatch();

  const onIncrementQuantity = (size: string) => {
    dispatch(addProduct({ id, size } as ItemCardType));
  };

  const onDecrementQuantity = (size: string) => {
    dispatch(decrementItemQuantity({ id, size } as ItemCardType));
  };

  const onRemoveProduct = () => {
    if (window.confirm("Do you want to remove product from cart?")) {
      dispatch(removeProduct(id));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageProguct} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <div>
          <h3>{title}</h3>
          <ul className="cart__item-info--list">
            <h4>Details:</h4>
            {size.map((sizeItem, index) => (
              <li
                className="cart__item-info--list-item"
                key={sizeItem.value + index}
              >
                <div className="cart__item-info--list-item-wrapper">
                  <span className="cart__item-info--list-item-count">
                    {sizeItem.value}
                  </span>
                  <div className="cart__item-count">
                    <button
                      disabled={sizeItem.sizeCount == 1}
                      onClick={() => onDecrementQuantity(sizeItem.value)}
                      className="button button--outline button--circle cart__item-count-minus"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                          fill="#EB5A1E"
                        ></path>
                        <path
                          d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                          fill="#EB5A1E"
                        ></path>
                      </svg>
                    </button>
                    <b>{sizeItem.sizeCount}</b>
                    <div
                      onClick={() => onIncrementQuantity(sizeItem.value)}
                      className="button button--outline button--circle cart__item-count-plus"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                          fill="#EB5A1E"
                        ></path>
                        <path
                          d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                          fill="#EB5A1E"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="cart__item-price-list">
          <div>
            <span>
              Price per product: <b>$ {price}</b>
            </span>
            <div>
              Total Added: <b>{count}</b>
            </div>
          </div>

          <div className="cart__item-price">
            <b>$ {(price * count).toFixed(2)}</b>
          </div>
        </div>
      </div>

      <div className="cart__item-remove">
        <div
          onClick={onRemoveProduct}
          className="button button--outline button--circle"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"
            ></path>
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
