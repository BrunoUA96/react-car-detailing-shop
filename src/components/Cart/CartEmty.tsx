import React from "react";
import { Link } from "react-router-dom";

import emtyCartImg from "../../assets/empty-cart.png";

const CartEmty: React.FC = () => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Cart is empty <span>😕</span>
          </h2>
          <p>
            You probably haven't added anything yet.
            <br />
            To add a product go to the home page.
          </p>

          <img src={emtyCartImg} alt="Empty cart" />

          <Link to="/" className="button button--black">
            <span>Home page</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CartEmty;
