import React from "react";

const ProductCard = ({ title, img }) => {
  return (
    <div className="product-card">
      <img src={img} alt={title} />
      <div className="product-title">{title}</div>
    </div>
  );
};

export default ProductCard;
