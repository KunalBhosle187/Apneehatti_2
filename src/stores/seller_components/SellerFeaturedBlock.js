import React from "react";

const SellerFeaturedBlock = ({ count, heading, icon }) => {
  return (
    <section className="seller__orderlist__status__card glassMorphismSeller">
      <div className="seller__orderlist__status__card__center__div">
        <h5>{heading}</h5>
        <h4>{count}</h4>
      </div>
      <div className="iconCircle glassMorphismSeller">{icon}</div>
    </section>
  );
};

export default SellerFeaturedBlock;
