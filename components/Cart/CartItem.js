import { ButtonBase, Typography } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import { currencyFormatter } from "../../utility";
import client from "../../api/client";
import { getCart } from "../../context/actions/cart";
import { useContext } from "react";
import { GlobalContext } from "../../context";
function CartItem({ _id, noOfItems, product ,name,price,quantity,image}) {
  const { cartDispatch } = useContext(GlobalContext);
  const RemoveItemFromCart = async () => {
    try {
      const res = await client.delete(`cart/${_id}`);
      console.log(res);
      getCart(cartDispatch);
      alert("Successfully removed Item from Cart");
    } catch (error) {
      console.log("error removing from cart", error);
      alert("error removing from cart");
    }
  };
  return (
    <div
      style={{
        cursor: "pointer",
        display: "flex",
        marginTop: 20,
        marginBottom: 20,
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <img
          src={image[0]}
          style={{ width: 80, height: 80 }}
        />
        <div style={{ gap: 5 }}>
          <Typography variant="body2">{name}</Typography>
          <Typography fontWeight={800} variant="body2">
            Quantity {quantity}
          </Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography ml={4} variant="body2">
          {currencyFormatter(price)}
        </Typography>
        <ButtonBase
          onClick={() => {
            RemoveItemFromCart();
          }}
        >
          <RemoveIcon style={{ background: "#aaa", borderRadius: 20 }} />
        </ButtonBase>
      </div>
    </div>
  );
}

export default CartItem;
