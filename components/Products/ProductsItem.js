import { Typography, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import React from "react";
import { currencyFormatter } from "../../utility";
const useStyles = makeStyles({
  root: {
    width: "100%",
    // height: 300,
    height: "100%",
    padding: 4,
    background: "#fff",
      boxShadow: "0.5px 0.5px 4px 0.5px rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    cursor: "pointer",
  },

  img: {
    height: 160,
    width: "100%",
    objectFit: "contain",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding:10,
    // "&:hover": {
    //   background: "#FCFCFC",
    //   boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.1)",
    // },
    // "&::active": {
    //   background: "#FCFCFC",
    // },
    ["@media (min-width : 1200px)"]: {
      height: 300,
    },
  },
});

function ProductsItem({ pictures = [], name, price, _id ,image}) {
  // console.log("id", id);
  const router = useRouter();
  const classes = useStyles();
  return (
    <div
      onClick={() => {
        router.push("/product/" + _id);
      }}
      className={classes.root}
    >
      <img src={image} className={classes.img} />
      {/* <Divider /> */}
      <div  style={{padding:10}} >
      <Typography variant="caption" fontWeight={400} style={{color:"#555"}}>
        {name.slice(0, 20)}
        {/* {" ..."} */}
      </Typography>
      <Typography
        // color={"gray"}
        // style={{ textDecorationLine: "line-through" }}
        variant="body2"
        // ml={1}
        gutterBottom
        fontWeight={600}
      >
        {currencyFormatter(price)}
      </Typography></div>
      {/* <Typography
        color={"gray"}
        style={{ textDecorationLine: "line-through" }}
        variant="body2"
        // ml={1}
        gutterBottom
        fontWeight={600}
      >
        {currencyFormatter(price + 100)}
      </Typography> */}
    </div>
  );
}

export default ProductsItem;
