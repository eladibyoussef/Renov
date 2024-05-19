import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  selectAllProducts,
  Product,
  selectProductLoading,
  deleteProduct,
  updateProduct,
  fetchProducts,
} from "../../features/product/productSlice";
import Swiper from "./Swiper";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
  Rating,
  useTheme,
} from "@mui/material";
import Popper from "@mui/material/Popper";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcn/ui/sheet";
import { MdDeleteOutline } from "react-icons/md";
import type { PopconfirmProps } from "antd";
import { Button, message, Popconfirm } from "antd";
import { Input, Switch } from "antd";
import { MdAddPhotoAlternate } from "react-icons/md";

import UploadWidget from "../UploadWidget";

const { TextArea } = Input;

const ProductCard = ({ Product }: { Product: Product }) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState(Product);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (field: string, value: string) => {
    setEditedProduct({ ...editedProduct, [field]: value });
    // console.log(editedProduct);
  };

  useEffect( () => {
    console.log("edited product:", editedProduct);
    const response =  dispatch(updateProduct(editedProduct));
  }, [editedProduct.photos]);

  const handleEdit = () => {
    setEditMode(true);
  };
  const confirm: PopconfirmProps["onConfirm"] = async (e) => {
    message.loading({ content: "deleting product...", key: "creating" });

    await dispatch(deleteProduct(Product._id));
    message.success({
      content: "product deleted successfully",
      key: "deleting",
    });
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error(" cancelled");
  };
  const handleSave = async () => {
    const response = await dispatch(updateProduct(editedProduct)).unwrap();
    console.log(response);
    setEditedProduct(response)

    setEditMode(false);
  };

  const handleUploadSuccess = async (url: string, id: string) => {
    console.log("cloudinary url returned", url);
    const photo = { url: url, cloudinaryId: id };
    setEditedProduct((prevProductForm) => ({
      ...prevProductForm,
      photos: [...prevProductForm.photos, photo],
    }));
       };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <Card
      sx={{
        backgroundImage: "none",
        borderRadius: "0.55rem",
      }}
      className=" relative"
    >
      <CardContent>
        <Popconfirm
          title="Delete the product"
          description="Are you sure to delete this product?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <MdDeleteOutline className=" absolute right-10 size-4 text-red-600" />
        </Popconfirm>

        <Typography
          sx={{
            fontSize: 14,
          }}
          color="#997d3d"
          gutterBottom
        >
          {Product.category}
        </Typography>

        <Typography variant="h5" component="div">
          {Product.name}
        </Typography>

        <Typography
          sx={{
            mb: "1.5rem",
          }}
          color="#ffda85"
        >
          ${Number(Product.price).toFixed(2)}
        </Typography>
        {/* <Rating value={rating} readOnly /> */}

        <Typography>
          Supply Left:{" "}
          {Product.availability ? (
            <span className=" text-green-600">available</span>
          ) : (
            <span className=" text-red-600">Out Of Stock</span>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Sheet>
          <SheetTrigger>More Details</SheetTrigger>
          <SheetContent
            side={"left"}
            className=" overflow-auto hide-scrollbar h-screen"
          >
            <SheetHeader>
              <div className=" flex gap-2">
                <Button onClick={handleEdit}>EDIT</Button>
                {editMode && <Button onClick={handleSave}>SAVE</Button>}
              </div>
              <SheetTitle>
                <Typography>ID: {Product._id}</Typography>
              </SheetTitle>
              <SheetDescription>
                <span className=" mr-2">Stock:</span>
                {editMode ? (
                  <Switch defaultValue={Product.availability}  onChange={(checked) => handleChange("availability", checked)}
                  />
                ) : Product.availability ? (
                  <span className=" text-green-600">available</span>
                ) : (
                  <span className=" text-red-600">Out Of Stock</span>
                )}
              </SheetDescription>
            </SheetHeader>

            <CardContent>
             {editMode &&  <UploadWidget
                customElement={<MdAddPhotoAlternate />}
                onUploadSuccess={handleUploadSuccess}
              />}
              <Swiper
                photos={Product.photos}
                editMode={editMode}
                editedProduct={editedProduct}
                setEditedProduct={setEditedProduct}
                
              />
              <span>
                product name: <br />
              </span>
              {editMode ? (
                <Input
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                ></Input>
              ) : (
                <Typography>{Product.name}</Typography>
              )}
              <span>
                description: <br />
              </span>{" "}
              {editMode ? (
                <TextArea
                  rows={4}
                  value={editedProduct.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              ) : (
                <Typography variant="body2">{Product.description}</Typography>
              )}
              <span>
                category: <br />
              </span>
              {editMode ? (
                <Input
                  value={editedProduct.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  required
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: 14,
                  }}
                  color="#997d3d"
                  gutterBottom
                >
                  {Product.category}
                </Typography>
              )}
              <span className=" mr-2">Rent:</span>
              {editMode ? (
                <>
                  {" "}
                  <Switch
                    defaultValue={Product.rentable}
                    className=" mb-1 mt-1"
                    onChange={(checked) => handleChange("rentable", checked)}
                  />
                  <br />
                </>
              ) : Product.rentable ? (
                <span className=" text-green-600">
                  Available to rent <br />{" "}
                </span>
              ) : (
                <span className=" text-red-600">
                  sell only <br />
                </span>
              )}
              <span className=" mr-2">Price:</span>
              {editMode ? (
                <Input
                  type="number"
                  value={editedProduct.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              ) : (
                <Typography
                  sx={{
                    mb: "1.5rem",
                  }}
                  color="#ffda85"
                >
                  ${Number(Product.price).toFixed(2)}
                </Typography>
              )}
            </CardContent>
          </SheetContent>
        </Sheet>
      </CardActions>
      <Popper id={id} open={open} anchorEl={anchorEl}></Popper>
    </Card>
  );
};

export default function ProductDisplay() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectProductLoading);
  const products = useAppSelector(selectAllProducts);

  return (
    <div>
      <Box m="1.5rem 2.5rem">
        {products || !isLoading ? (
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
          >
            {products.map((product) => (
              <ProductCard Product={product} key={product._id} />
            ))}
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </div>
  );
}
