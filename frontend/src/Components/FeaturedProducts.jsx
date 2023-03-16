import React, { useEffect, useState } from "react";

import { AiOutlineLink } from "react-icons/ai";
import axios from "axios";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFeaturedProducts = async () => {
    const { data } = await axios.get("/api/products");
    data !== undefined && setLoading(false);

    const filteredProducts = data.filter(
      (product) => product.featured === true
    );
    setFeaturedProducts([
      filteredProducts[0],
      filteredProducts[1],
      filteredProducts[2],
    ]);
    console.log(featuredProducts);
  };

  useEffect(() => {
    getFeaturedProducts();
    console.log(featuredProducts[0]);
  }, []);

  return (
    <div className="flex flex-col">
      <section className="grid grid-cols-2 gap-10 pt-6">
        <div className="flex flex-col justify-around items-end  pt-20">
          <span className="h-2 w-28 bg-[#4D211B] rounded-xl "></span>
          <span className="h-2 w-20 bg-[#084039] rounded-xl "></span>
          <span className="h-2 w-16 bg-[#4F2119] rounded-xl  "></span>
          <span className="h-2 w-14 bg-[#DB734A] rounded-xl "></span>
        </div>
        <div className="">
          {!loading ? (
            <img
              src={featuredProducts[0].image}
              alt="featuredshoe"
              className="object-contain"
            />
          ) : (
            <p>loading</p>
          )}
        </div>{" "}
      </section>

      <p className="pt-10 pb-4 text-2xl text-center text-white ">
        Adidas Xclusive Boost
      </p>
      <section className="grid pt-10 grid-cols-2 pl-2">
        <div className="flex bg-[#D9D9D9] focus:h-[270px] p-4 h-[250px] ">
          {!loading && (
            <img
              className="object-contain  hover:cursor-pointer"
              src={featuredProducts[1].image}
              alt="shoe"
            />
          )}
        </div>
        <aside className="grid h-[250px] grid-cols-1 grid-rows-2 pl-2 gap-2 pr-2">
          <div className="bg-[#D9D9D9] flex justify-center">
            {!loading && (
              <img
                className="object-contain  hover:cursor-pointer"
                src={featuredProducts[2].image}
                alt="shoe"
              />
            )}
          </div>
          <div className="bg-[#D9D9D9] flex justify-center">
            {!loading && (
              <img
                className="object-contain  hover:cursor-pointer "
                src={featuredProducts[0].image}
                alt="shoe"
              />
            )}
            <p></p>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default FeaturedProducts;
