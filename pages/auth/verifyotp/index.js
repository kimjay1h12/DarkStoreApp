import {
    Button,
    ButtonBase,
    CircularProgress,
    Divider,
    TextField,
    Typography,
  } from "@mui/material";
  import { makeStyles } from "@mui/styles";
  import { useRouter } from "next/router";
  import React, { useContext, useEffect, useState } from "react";
  import {
    forgottenpassword,
    resendOtp,
    resendPassword,
    verifyOTP,
  } from "../../../context/actions/auth";
  import { GlobalContext } from "../../../context";
  
  const useStyles = makeStyles({
    root: {
      height: "70vh",
      // height: "100%",
  
      "& .MuiTextField-root": {
        minWidth: "100%",
      },
      "& img": {
        width: 150,
      height: 70,
      objectFit:"contain",
      marginTop: 10,
      },
    },
    header: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    content: {
      height: "100%",
      display: "flex",
  color:"#fff",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    forgottenpassword: {
      display: "flex",
      alignItems: "flex-end",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginBottom: 20,
    },
  });
  function Verify() {
    const router = useRouter();
    const { authDispatch ,authState} = useContext(GlobalContext);
    const classes = useStyles();
    const [steps, setSteps] = useState(2);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpCode, setotpCode] = useState("");
const resend1Otp = async()=>{

const res = resendOtp({email:authState.data.user?.email},authDispatch)
}

    const HandleVerifyOtp = async () => {
      setLoading(true);
      const res = await verifyOTP(otpCode, authDispatch);
      if (res) {
      router.push("/");
      }
      setLoading(false);
    };

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <img src="/img/logo.png" />
        </div>
        <Divider />

    
          <div className={classes.content}>
            <Typography variant="h6" align="center" gutterBottom>
              Verify Otp
            </Typography>
            <div style={{ maxWidth: 420, width: "100%", padding: 10 }}>
              <Typography align="center" sx={{ marginBottom: 3 }} variant="body2">
                Input the 4 digit pin sent to your mail
              </Typography>
              <TextField
                          inputProps={{style:{background:"#fff",borderRadius:10}}}
                          sx={{ marginBottom: 2 ,backgroundColor:"#111",border:"none"}}
                value={otpCode}
                onChange={(e) => {
                  setotpCode(e.target.value);
                }}
                type="number"
                label="Otp Code"
                fullWidth

              />
  
              <Button
              style={{marginBottom:10,backgroundColor:"#fff",color:"#000"}}
              color="error"
                onClick={() => {
           resend1Otp()
                }}
                size="large"
                variant="contained"
                fullWidth
              >
           
                  Resend Otp
                
              </Button>
              <Button
                       style={{marginBottom:10,backgroundColor:"#fff",color:"#000"}}
                onClick={() => {
                  HandleVerifyOtp();
                }}
                size="large"
                variant="contained"
                fullWidth
              >
                {loading ? (
                  <CircularProgress style={{ color: "#000" }} />
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </div>

    
      </div>
    );
  }
  
  export default Verify;
  