import React from "react";
import { Link } from "react-router-dom";
import FeaturedProducts from "../Components/FeaturedProducts";

const HomeScreen = () => {
  return (
    <div
      id="Home"
      className=" flex-col justify-center pb-40 flex w-screen bg-gradient-to-t from-[#FFB8B8] to-[#1E1E1E]"
    >
      <section className="flex shrink-0	 flex-row w-screen h-[40%] pt-10">
        <aside className="w-1/2 h-[100%] flex justify-items-center items-center">
          <p className="text-[#fff] flex text-center   hover:cursor-pointer leading-[60px] hover:leading-[65px] duration-700 underline	decoration-[#FFB8B8] decoration-3 underline-offset-8    pl-3 font-medium text-2xl ">
            Empower <br /> Your <br /> Performance
          </p>
        </aside>

        <aside className="flex  justify-items-center w-[50%] hover:cursor-pointer items-center">
          <img
            alt="person"
            className="object-cover duration-500 hover:ml-[-20px] "
            src={"/assets/homePersonHeader.png"}
          ></img>
        </aside>
      </section>

      <div className="flex pt-10 pb-10 items-center justify-center">
        <Link
          to="/products"
          className="align-middle justify-center items-center flex text-l text-[#fff] bg-slate-500 w-24 h-9 rounded-md"
        >
          {" "}
          Shop Now
        </Link>
      </div>
      <h2 className="text-3xl font-semibold pt-20 text-center text-[#fff]">
        Featured Products
      </h2>
      <FeaturedProducts />
      <div className="flex items-center justify-center pt-10">
        <Link
          to={"/products"}
          className="align-middle justify-center items-center flex text-l text-[#fff] bg-slate-500 w-24 h-9 rounded-md"
        >
          Shop now
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen;
