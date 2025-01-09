import React from "react";
import { StyledCard, StyledButton } from "../styles/StyledComponents";

const ProductCard = ({ product, onDelete }) => {
  return (
    <StyledCard>
      <h3>{product.name}</h3>
      <p>Quantity: {product.quantity}</p>
      <p>Price: ${product.price}</p>
      <StyledButton onClick={() => onDelete(product.id)}>Delete</StyledButton>
    </StyledCard>
  );
};

export default ProductCard;
