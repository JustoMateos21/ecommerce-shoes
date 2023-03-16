import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import ProgressBar from "../Components/ProgressBar";
import { StoreContext } from "../store";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const PaymentScreen = () => {
  const [total, setTotal] = useState(0);
  const [error, setError] = useState();
  const [paymentLink, setPaymentLink] = useState();
  const [orderCreated, setOrderCreated] = useState(false);
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const { cart, userInfo } = state;
  const { cartItems, shippingAddress } = cart;

  const navigate = useNavigate();

  const placeOrderHandler = async () => {
    let orderId = "";
    try {
      dispatch({ type: "CREATE_REQUEST" });

      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: 0,
          // taxPrice: cart.taxPrice,
          totalPrice: total,
          user: userInfo._id,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      orderId = data.order._id;
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      setOrderCreated(true);
      localStorage.removeItem("cartItems");
    } catch (err) {
      console.log(err);
      dispatch({ type: "CREATE_FAIL" });
      console.log(JSON.stringify(err));
      setError(err.message);
    }
    try {
      const { data } = await axios.get(`/api/orders/${orderId}/payment`, {
        params: {
          orderId: orderId,
          userId: userInfo._id,
        },
      });
      const { init_point } = data;
      console.log(data);
      setPaymentLink(init_point);
    } catch (e) {
      console.log(e);
    }
  };

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
  }, []);
  return (
    <div className="flex pt-14 flex-col items-center min-h-screen  ">
      <ProgressBar percentage={80} />
      {!orderCreated ? (
        <>
          <div className="flex mb-4 w-[85%] flex-col bg-slate-400 bg-opacity-50 pl-6 pr-6 p-4 rounded-md">
            <h3 className="text-xl text-white">Items</h3>
            {/* <Link to={"/cart"}>Modify</Link>{" "} */}
            {cartItems &&
              cartItems.map((i) => (
                <div className=" pt-4 grid grid-cols-4 gap-1 grid-rows-1">
                  <p className="text-md col-span-[3/2] text-gray-200">
                    {i.name}
                  </p>
                  <div className="flex  overflow-hidden">
                    <img className=" object-cover" src={i.image} alt="" />
                  </div>
                  <p className="text-gray-200 text-sm">
                    {" "}
                    quantity: <br />
                    {i.quantity}
                  </p>
                  <p className=" text-gray-200 pl-2">${i.price}</p>
                </div>
              ))}
            <p className="pt-6 text-xl text-gray-50">Total: ${total} </p>
          </div>
          <div className="flex flex-col w-[85%] bg-slate-400 bg-opacity-50 pl-6 pr-6 p-4 rounded-md">
            <h3 className="text-xl text-white">Delivery Info</h3>
            <p className=" text-gray-200">{shippingAddress.fullName}</p>
            <p className=" text-gray-200">{shippingAddress.address}</p>
            <p className=" text-gray-200">{shippingAddress.city}</p>
            <p className=" text-gray-200">{shippingAddress.postalCode}</p>
            <p className=" text-gray-200">{shippingAddress.country}</p>
          </div>
          <p className="text-gray-100 pt-4">Shipping : free </p>
          <p className="text-gray-100 pt-4">Payment Method: Mercado Pago </p>
          <button
            onClick={placeOrderHandler}
            className="bg-slate-300 p-2 mt-4 rounded-md"
          >
            Place Order
          </button>{" "}
        </>
      ) : (
        <p className="text-lg text-white">
          Order Filled Successfully, <br />
          <Link className="text-green-300" to={paymentLink}>
            Go to Pay
          </Link>
        </p>
      )}
      {dispatch === "CREATE_SUCCESS" && <p>Exito</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PaymentScreen;
