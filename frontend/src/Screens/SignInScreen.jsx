import React, { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { StoreContext } from "../store";
import Axios from "axios";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(StoreContext);

  const { userInfo } = state;
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(
        "https://main--comforting-biscuit-a0b226.netlify.app/api/users/signin",
        {
          email,
          password,
        }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo]);

  return (
    <div className="flex h-full w-screen bg-[#D8A598] items-center	 justify-items-center	 ">
      <form
        className="flex flex-col bg-[#343136] m-auto p-[8%]  rounded-md	box-border justify-evenly"
        onSubmit={loginHandler}
      >
        <label for="email" className="text-white">
          Email
        </label>
        <input
          type="email"
          className="mt-5"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="password" className="text-white mt-10">
          Contraseña
        </label>
        <input
          type="password"
          className="mt-5"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-slate-200 mt-10 w-[60%] self-center rounded-md">
          Sign In
        </button>
        <p className="text-white mt-5">
          Don't you have an accoun? <Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default SignInScreen;
