import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { StoreContext } from "../store";
import axios from "axios";

const links = [
  {
    text: "Home",
    path: "/",
    id: 1,
  },
  {
    text: "Shop",
    path: "/products",
    id: 1,
  },
  {
    text: "Orders",
    path: "/orders",
    id: 1,
  },
  {
    text: "Logout",
    path: "/logout",
    id: 1,
  },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [itemInCart, setItemInCart] = useState(false);
  const navigate = useNavigate;
  const { state, dispatch: ctxDispatch } = useContext(StoreContext);

  const signout = () => {
    const { data } = axios.get("api/users/:id");
    ctxDispatch({ type: "USER_SIGNOUT", payload: data });
    navigate("/signin");
  };

  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    cartItems[0] !== undefined && setItemInCart(true);
  }, [cartItems]);

  return (
    <div
      className={
        !menuOpen
          ? "items-center absolute justify-items-center flex border-b-[1px] border-b-solid  h-12 w-screen border-b-slate-600"
          : "flex flex-col  bg-gradient-to-t from-[#FFB8B8] to-[#1E1E1E] w-screen h-screen fixed justify-evenly z-[400] bg-slate-700 items-center"
      }
    >
      <Link to={"/cart"}>
        <AiOutlineShoppingCart
          size={25}
          color={!itemInCart ? "#ffffff" : "#15880a"}
          className="ml-7 rounded-xl "
          cursor={"pointer"}
        />
      </Link>
      {!menuOpen && (
        <Link
          className="flex pl-10 pr-10 text-xl font-semibold w-15 text-[#f1f1f1]"
          to={"/"}
        >
          Planet Shoes
        </Link>
      )}
      {menuOpen && (
        <>
          {links.map((l) => (
            <Link
              key={l.id}
              onClick={l.text === "Logout" ? signout : () => setMenuOpen(false)}
              to={l.text !== "Logout" && l.path}
              className="text-[#fff] font-medium text-3xl"
            >
              {l.text}
            </Link>
          ))}
        </>
      )}

      {!menuOpen ? (
        <AiOutlineMenu
          size={25}
          color="#f3f3f3"
          cursor={"pointer"}
          className="mr-7"
          onClick={() => setMenuOpen(true)}
        />
      ) : (
        <AiOutlineClose
          size={25}
          color="#f3f3f3"
          cursor={"pointer"}
          className="mr-7"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default NavBar;
