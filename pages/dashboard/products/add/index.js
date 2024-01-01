import React from "react";
import MiniDrawer from "../../../../layouts/Drawer";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  FormControl,
  Checkbox,
  FormGroup,
  Button,
  ButtonBase,
  CircularProgress,
  MenuItem,
  Card,
  CardMedia,
  ButtonGroup,
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import { GlobalContext } from "../../../../context";
import { useContext } from "react";
import { uploadHelmper } from "../../../../utility";
import { createAdminProducts } from "../../../../context/actions/productsActions";
import { useRouter } from "next/router";
const useStyles = makeStyles({
  root: {
    height: "100%",
    padding: 15,
    ["@media (min-width : 1200px)"]: {
      padding: 50,
    },
  },

  content: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  container: {
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "#aaa",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  imageSelector: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#1872F6",
    borderStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
    borderRadius: 5,
    marginBottom: 10,
  },
});
const sizes = [
  {
    label: "S",
    value: "s",
  },
  {
    label: "M",
    value: "m",
  },
  {
    label: "L",
    value: "l",
  },
  {
    label: "XL",
    value: "xl",
  },
];
function Index() {
  const editorConfiguration = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
  
    ],
    
  };
const colors = ['Red', 'Blue', 'Green', 'Yellow',"Black"];


  const [selectedColors, setSelectedColors] = useState([]);

  const handleColorToggle = (color) => {
    const isSelected = selectedColors.includes(color);
    if (isSelected) {
      // Deselect color
      setSelectedColors((prevColors) =>
        prevColors.filter((prevColor) => prevColor !== color)
      );
    } else {
      // Select color
      setSelectedColors((prevColors) => [...prevColors, color]);
    }
  };

  const handleApplyColors = () => {
    onSelectColors(selectedColors);
  };
  const classes = useStyles();
  const { cartegoryState, collectionsState, productDispatch } =
    useContext(GlobalContext);
  const [formData, setFormData] = useState({
    name: "",
    image: [],
    description: "",
    price: "",
  
    size: [],
    color:[],
    category: "",
    brand: "",
    quantityAvailable: "",
    status:true
  });
  const [imageUploading, setImageUploading] = useState(false);
console.log(formData.image)
  const handleUploadImage = async () => {
    setImageUploading(true);
    const { url } = await uploadHelmper("image");
    const p = [...formData?.image];
    p.push(url);
    setFormData({
      ...formData,
      image: p,
    });
    console.log(url);
    setImageUploading(false);
  };
  console.log(formData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const HandleUploadProducts = async () => {
    setLoading(true);
    const res = await createAdminProducts(productDispatch, formData);
    if (res) {
      router.back();
    }
    setLoading(false);
  };
  return (
    <MiniDrawer active={"product"}>
      <div className={classes.root}>
        <Typography fontWeight={600} mb={2} variant="h5">
          Add products
        </Typography>
        <Grid container spacing={6} style={{ maxHeight: "calc(100vh - 64px)" }}>
          <Grid item xs={20} md={7}>
            <div className={classes.content}>
              <TextField
                value={formData.name}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  });
                }}
                style={{ marginBottom: 20 }}
                label="name"
                fullWidth
                size="small"
              />
              <div style={{marginBottom:10}}>
                <Typography fontWeight={600} mb={1} >
                  Description
                </Typography>
                <TextField multiline rows={4}fullWidth size="small" value={formData.description} onChange={(e) => {setFormData({...formData,description: e.target.value})}}/>

          </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                {formData.image?.length > 0 &&
                  formData.image?.map((cur, i) => (
                    <Card
                      key={i}
                      sx={{
                        maxWidth: "33%",
                        marginTop: 2,
                        marginBottom: 2,
                        height: 120,
                        display: "flex",
                        // flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",

                        // ali
                      }}
                    >
                      <div key={i}>
                        <div
                          styles={{ position: "absolute", top: 5, right: 10 }}
                        >
                          <ButtonBase
                            onClick={() => {
                              let s = [...formData.image];
                              const b = formData.image.indexOf(cur);
                              if (b > -1) s.splice(b, 1);
                              setFormData({
                                ...formData,
                                imageUrls: s,
                              });
                            }}
                          >
                            <DeleteIcon sx={{ color: "red" }} />
                          </ButtonBase>
                        </div>
                        <CardMedia
                          component="img"
                          sx={{ objectFit: "contain" }}
                          alt="Preview"
                          height="120"
                          image={cur}
                        />{" "}
                      </div>
                    </Card>
                  ))}
              </div>
              <div
                // onClick={() => {
                //   handleUploadImage();
                // }}
                className={classes.imageSelector}
              >
                <Button
                  sx={{
                    backgroundColor: "#1872F6",
                    color: "#fff",
                  }}
                  onClick={() => {
                    handleUploadImage();
                  }}
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  {imageUploading ? (
                    <CircularProgress size={20} sx={{ color: "#fff" }} />
                  ) : (
                    " Upload Images"
                  )}
                </Button>
              </div>
              <TextField
                type="number"
                style={{ marginBottom: 20 }}
                label="Pricing"
                fullWidth
                size="small"
                value={formData.price}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    price: e.target.value,
                  });
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                {/* <TextField
                  value={formData.sku}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      sku: e.target.value,
                    });
                  }}
                  label="SKU (Stock keeping unit)"
                  size="small"
                  sx={{ width: "48%" }}
                /> */}
                <TextField
                  type="number"
                  value={formData.quantityAvailable}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      quantityAvailable: e.target.value,
                    });
                  }}
                  // value={formData.}
                  label="Quantity available"
                  size="small"
                  sx={{ width: "48%" }}
                />
              </div>

              {/* <TextField
                type="number"
                style={{ marginBottom: 20 }}
                label="Size"
                fullWidth
                select
                size="small"
              >
                {sizes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField> */}
            </div>{" "}
            <div className={classes.content}>
              <Typography>Select Sizes</Typography>
              <div className={classes.container}>
                <FormGroup>
                  {sizes.map((cur, b) => (
                    <FormControlLabel
                      onClick={() => {
                        // alert("fghj");
                        let s = [...formData.size];
                        const i = formData.size.indexOf(cur.value);
                        if (i > -1) s.splice(i, 1);
                        else s.push(cur.value);

                        setFormData({
                          ...formData,
                          size: s,
                        });
                      }}
                      key={b}
                      control={
                        <Checkbox
                          checked={formData.size?.find(
                            (item) => item === cur.value
                          )}
                          size="small"
                        />
                      }
                      // control={<Checkbox defaultChecked size="small" />}
                      label={cur.label}
                    />
                  ))}
                </FormGroup>
              </div>
            </div>
          </Grid>
          <Grid item xs={20} md={5}>
            <div className={classes.content}>
              <Typography>Select Category</Typography>
              <div className={classes.container}>
                <FormGroup>
                  {[...cartegoryState?.data]?.map((cur, b) => (
                    <FormControlLabel
                      onClick={() => {
                        if(cur._id === formData.category){
                        setFormData({
                          ...formData,
                          category: "",
                        });}
                        else{
                        setFormData({
                         ...formData,
                          category: cur._id,
                        });}
                      }}
                      key={b}
                      control={
                        <Checkbox
                          checked={formData.category ===cur._id}
                          size="small"
                        />
                      }
                      // label={cur.title}
                      // key={i}
                      // control={<Checkbox defaultChecked size="small" />}
                      label={cur.name}
                    />
                  ))}
                </FormGroup>
              </div>
            </div>
            <div className={classes.content}>
              <Typography>Select Collections</Typography>
              <div className={classes.container}>
                <FormGroup>
                  {[...collectionsState?.data].map((cur, b) => (
                    <FormControlLabel
                      onClick={() => {
                    if(cur._id === formData.brand){
                      setFormData({
                        ...formData,
                        brand: "",
                      });
                    }
                    else{

                    
                        setFormData({
                          ...formData,
                          brand: cur._id,
                        });}
                      }}
                      key={b}
                      control={
                        <Checkbox
                          checked={formData.brand ===cur._id}
                          size="small"
                        />
                      }
                      label={cur.name}
                    />
                  ))}
                </FormGroup>
              </div>
            </div>
            <div className={classes.content}>
            <Typography>Select Color</Typography>

            <div className={classes.container}>
      <ButtonGroup variant="contained" color="primary" aria-label="color selector">
        {colors.map((color) => (
          <Button
            key={color}
            onClick={() => {
              let s = [...formData.color];
              const i = formData.color.indexOf(color);
              if (i > -1) s.splice(i, 1);
              else s.push(color);
setFormData({
  ...formData,color:s
})
            }}
            style={{
              backgroundColor: color.toLowerCase(),
              // color: 'white',
              boxShadow:"none",
              
              opacity: formData.color?.includes(color) ? 10 : 0.7,
            }}
          >
          {formData.color?.includes(color)?<CheckIcon/>:  color}
          </Button>
        ))}
      </ButtonGroup>
     
    </div>
            </div>
            <Button
              variant="contained"
              onClick={() => {
                HandleUploadProducts();
              }}
              sx={{
                // backgroundColor: "#1872F6",
                color: "#fff",
                marginTop: 2,
                width: "100%",
              }}
            >
              {" "}
              {loading ? (
                <CircularProgress size={20} sx={{ color: "#fff" }} />
              ) : (
                "Create Product"
              )}
            </Button>
          </Grid>
        </Grid>
        <div
          style={{
            marginBottom: 100,
          }}
        ></div>
      </div>
    </MiniDrawer>
  );
}

export default Index;
