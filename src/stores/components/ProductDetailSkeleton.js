import React from "react";

function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col ">
      <div className="py-2 px-4  order-2 grid grid-cols-4 gap-3">
        <div className="p-1 border h-24 bg-gray-300"></div>
        <div className="p-1 border h-24 bg-gray-300"></div>
        <div className="p-1 border h-24 bg-gray-300"></div>
        <div className="p-1 border h-24 bg-gray-300"></div>
      </div>
      <div className="p-4  order-1">
        <div className=" p-2 border  h-80 bg-gray-300"></div>
      </div>
      <div className="p-4 order-3 ">
        <div className=" ">
          <h2 className="bg-gray-300 w-full p-3 "></h2>
          <h2 className="bg-gray-300 w-4/5 p-3 mt-2"></h2>
          <h2 className="bg-gray-300 w-3/5 p-3 mt-2"></h2>
          <h2 className="bg-gray-300 w-2/5 p-3 mt-2"></h2>
        </div>
        <div className="bg-gray-300 mx-auto mt-8 p-4 w-2/5"></div>
      </div>
    </div>
  );
}

export default ProductDetailSkeleton;
