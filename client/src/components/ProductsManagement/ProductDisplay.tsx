import { useAppSelector } from "../../store/hooks";
import {
  selectAllProducts,
  Product,
  selectProductLoading,
} from "../../features/product/productSlice";
import Swiper from "./Swiper";
import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
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

const ProductCard = ({ Product }: { Product: Product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <Card
      sx={{
        backgroundImage: "none",
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
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
          Supply Left: {Product.availability ? "available" : "Out Of Stock"}
        </Typography>
      </CardContent>
      <CardActions>
        <Sheet>
          <SheetTrigger>More Details</SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>{Product.name}</SheetTitle>
              <SheetDescription>
                {Product.availability ? "available" : "Out Of Stock"}
              </SheetDescription>
            </SheetHeader>
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
              <CardContent>
                <Swiper photos={Product.photos} />
                <Typography>ID: {Product._id}</Typography>
                <Typography variant="body2">
                  description: <br />
                  {Product.description}
                </Typography>

               
              </CardContent>
            </Box>
          </SheetContent>
        </Sheet>
      </CardActions>
      <Popper id={id} open={open} anchorEl={anchorEl}></Popper>
     
    </Card>
  );
};

export default function ProductDisplay() {
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
              <ProductCard Product={product} />
            ))}
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </div>
  );
}
