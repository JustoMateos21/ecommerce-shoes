import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store";
import { AiFillPlusCircle } from "react-icons/ai";
import { RxMinusCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import ProgressBar from "../Components/ProgressBar";
const CartScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const [total, setTotal] = useState(0);
  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    let qtys = [];
    for (let i = 0; i < cartItems.length; i++) {
      qtys.push(cartItems[i].price * cartItems[i].quantity);
    }
    let initialValue = 0;
    setTotal(
      qtys.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      )
    );
  }, [cartItems]);

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const updateCartHandler = async (item, action) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity =
      action === "add"
        ? existItem
          ? existItem.quantity + 1
          : 1
        : existItem
        ? existItem.quantity - 1
        : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });
  };

  const clearCartHandler = () => {
    ctxDispatch({ type: "CART_CLEAR" });
  };

  return (
    <div className=" flex flex-col h-screen items-center pl-3 pr-3  pt-14 w-screen">
      <ProgressBar percentage={50} />
      {cartItems.map((item) => (
        <div
          key={item._id}
          className=" grid grid-cols-2 border-b border-b-slate-500 pb-2 rounded-b-md"
        >
          <div className="flex drop-shadow-md  w-36 bg-slate-400 bg-opacity-20 rounded-lg">
            <img
              alt="shoe"
              className="objec  object-scale-down"
              src={item.image}
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-md text-white pt-2 pb-2">{item.name}</p>

            <div className="flex w-[90%] bg-slate-400 rounded-md p-2 items-center justify-around">
              <RxMinusCircled
                size={20}
                onClick={() => updateCartHandler(item, "remove")}
              />
              <span>
                <p className=" font-medium text-lg">{item.quantity}</p>
              </span>
              <AiFillPlusCircle
                onClick={() => updateCartHandler(item, "add")}
                size={20}
              />
            </div>
            <p className="text-lg text-white pt-2">${item.price}</p>
            <BsTrash
              onClick={() => removeItemHandler(item)}
              cursor="pointer"
              size={25}
              color="#ffffff"
              className="pt-2 "
            />
          </div>
        </div>
      ))}
      {cartItems.length ? (
        <div className="flex mt-4 flex-col bg-slate-300 rounded-md p-5 items-center">
          <p className="text-lg pb-2">Subtotal: ${total}</p>

          <Link
            to={"/checkout"}
            className="disabled rounded-lg font-semibold bg-slate-400 flex w-40 h-10 p-1 items-center justify-center text-[#3f3f3f]"
          >
            Proceed to Checkout
          </Link>
          <button
            className="bg-red-400 text-white  mt-2 p-2 rounded-md "
            onClick={clearCartHandler}
          >
            Clear Cart
          </button>
        </div>
      ) : (
        <p className="text-xl text-white">
          There is no items in cart, you can <br />
          <Link to={"/products"} className="text-[#9596b8]">
            Continue Shopping
          </Link>
        </p>
      )}
    </div>
  );
};

export default CartScreen;
