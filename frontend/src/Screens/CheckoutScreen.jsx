import axios, { Axios } from "axios";
import React, { useContext, useReducer, useEffect, useState } from "react";
import ProgressBar from "../Components/ProgressBar";
import { StoreContext } from "../store";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const CheckoutScreen = () => {
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState();

  const bellSound = new Audio("/sounds/bell.mp3");

  const [fadeOut, setFadeOut] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const navigate = useNavigate();
  const { cart } = state;
  const { shippingAddress } = cart;
  useEffect(() => {
    setFullName(shippingAddress.fullName);
    setAddress(shippingAddress.address);
    setCity(shippingAddress.city);
    setPostalCode(shippingAddress.postalCode);
    setCountry(shippingAddress.country);
  }, []);

  const orderHandler = async (e) => {
    e.preventDefault();
    console.log(fullName, address, city, postalCode, country);
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <div className="flex flex-col items-center  pt-14 h-screen w-screen bg-gradient-to-t from-[#FFB8B8] to-[#1E1E1E]">
      <ProgressBar percentage={60} />
      <h2 className="text-xl text-[#f3f3f3]">Deliver Info</h2>
      <form
        onSubmit={orderHandler}
        className={[
          "flex w-[70%] jus flex-col ",
          fadeOut && "animate-[fadeout_1s]",
        ]}
      >
        <label htmlFor="name" className="text-white pt-3 pb-2">
          {" "}
          Full Name
        </label>
        <input
          value={fullName}
          id="name"
          name="fullName"
          type="text"
          className="mt-1 text-center rounded-sm"
          onChange={(e) => setFullName(e.target.value)}
        />
        <label className="text-white pt-3 pb-2" htmlFor="address">
          Address
        </label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="address"
          type="text"
          name="address"
          className="mt-1 text-center rounded-sm"
        />
        <label className="text-white pt-3 pb-2" htmlFor="city">
          City
        </label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          id="city"
          name="city"
          type="text"
          className="mt-1 text-center rounded-sm"
        />{" "}
        <label className="text-white pt-3 pb-2" htmlFor="postalCode">
          Postal Code
        </label>
        <input
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          id="postalCode"
          type="text"
          name="postalCode"
          className="mt-1 text-center rounded-sm"
        />
        <label className="text-white pt-3 pb-2" htmlFor="country">
          Country
        </label>
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          id="country"
          type="text"
          name="country"
          className="mt-1 text-center rounded-sm"
        />
        <button type="submit" className="bg-[#175153] text-white mt-4">
          Continue
        </button>
      </form>
    </div>
  );
};

export default CheckoutScreen;
