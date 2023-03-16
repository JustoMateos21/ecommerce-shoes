import React, { useState } from "react";
import Stars from "../Components/Stars";
import { BiLeftArrow } from "react-icons/bi";
const ProductScreen = () => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="flex flex-col p-4 pt-14  items-center justify-center ">
      <div className="flex h-50 items-center justify-center overflow-hidden  w-screen p-4 rounded-md bg-slate-200">
        <img
          className=" object-cover"
          src={"/assets/featuredShoe.png"}
          alt="shoe"
        />
      </div>

      <div>
        <p className="text-xl text-white  pt-4">Adidas model</p>
      </div>
      <Stars stars={5} />

      <div className="w-[90%] justify-between bg-slate-400 p-2  bg-opacity-30 rounded-md flex">
        {!showDescription ? (
          <p className=" flex text-md  text-white font-medium">Description</p>
        ) : (
          <p>
            {" "}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdams
          </p>
        )}
        <BiLeftArrow
          size={18}
          color="#dadada"
          cursor={"pointer"}
          onClick={() => setShowDescription(!showDescription)}
        />
      </div>
    </div>
  );
};

export default ProductScreen;
