import * as React from "react";
import "./addProduct.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IProduct } from "../../../../utils/model/product.model";
import { Autocomplete, ImageList, ImageListItem } from "@mui/material";
import { useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import { IStore } from "../../../../utils/model/store.model";

export default function ProductFormDialog(props: {
  handleClose: () => void;
  addProduct: (product: IProduct, images: File[]) => void;
  isEditing: boolean;
  updateProduct: (product: IProduct, images: File[]) => void;
}) {
  const productDetails: IProduct = useSelector((store: IStore) => {
    return store.productsSlice.productDetails;
  });
  const [productName, setProductName] = React.useState(
    props.isEditing ? productDetails?.productName : ""
  );
  const [description, setDescription] = React.useState(
    props.isEditing ? productDetails?.description : ""
  );
  const [brand, setBrand] = React.useState(
    props.isEditing ? productDetails?.brand : ""
  );
  const [price, setPrice] = React.useState(
    props.isEditing ? productDetails?.price : 0
  );
  const [discountedPrice, setDiscountedPrice] = React.useState(
    props.isEditing ? productDetails?.discountedPrice : 0
  );
  const [quantity, setQuantity] = React.useState(
    props.isEditing ? productDetails?.quantity : 0
  );
  const [images, setImages] = React.useState<Array<File>>([]);
  const [oldimages, setOldImages] = React.useState<Array<any>>([]);
  const [catTags, setCatTags] = React.useState<Array<string>>([]);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files: any = event.target.files;
      setImages([...images, ...files]);
    }
  };

  React.useEffect(() => {
    const imagesT = productDetails?.productImages?.map((image: any) => {
      return `data:${image?.type};base64,${image?.picByte}`;
    });
    setOldImages(imagesT);
  }, [productDetails]);

  const cancelOldImage = (index: number) => {
    setOldImages(oldimages.filter((_, i) => i !== index));
  };

  const cancelImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Dialog
      open={true}
      maxWidth={props.isEditing ? "xl" : "lg"}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          // const formData = new FormData(event.currentTarget);
          // let formJson: any = Object.fromEntries((formData as any).entries());
          const payloadToSend: IProduct = {
            productName: productName,
            productId: props.isEditing ? productDetails?.productId : -1,
            productImages: props.isEditing
              ? productDetails?.productImages.filter((image) => {
                  return oldimages.includes(
                    `data:${image?.type};base64,${image?.picByte}`
                  );
                })
              : [],
            price: price,
            discountedPrice: discountedPrice,
            rating: props.isEditing ? productDetails?.rating : 0,
            categoryTags: catTags,
            userIds: props.isEditing ? productDetails?.userIds : [],
            brand: brand,
            description: description,
            quantity: quantity,
          };
          console.log(payloadToSend);

          props.isEditing
            ? props.updateProduct(
                payloadToSend,
                // {
                //   ...formJson,
                //   productId: productDetails?.productId,
                //   rating: productDetails?.rating,
                //   productImages: productDetails?.productImages.filter(
                //     (image) => {
                //       return oldimages.includes(
                //         `data:${image?.type};base64,${image?.picByte}`
                //       );
                //     }
                //   ),
                //   categoryTags: catTags,
                //   userIds: productDetails.userIds,
                // },
                images
              )
            : props.addProduct(
                payloadToSend,
                // { ...formJson, rating: 0, categoryTags: catTags, userIds: [] },
                images
              );
          props.handleClose();
        },
      }}
    >
      <DialogTitle sx={{ marginBottom: "0.5em" }}>Add Product</DialogTitle>
      <DialogContent sx={{ display: "flex", alignItems: "flex-start" }}>
        <div>
          <TextField
            autoFocus
            required
            margin="dense"
            id="productName"
            name="productName"
            value={productName}
            label="Product Name"
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            sx={{ marginTop: "1em" }}
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            fullWidth
            multiline
            maxRows={6}
            variant="standard"
          />
          <TextField
            sx={{ marginTop: "1em" }}
            required
            margin="dense"
            id="brand"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            label="Brand"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            sx={{ marginTop: "1em" }}
            required
            margin="dense"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            label="Price ($)"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            sx={{ marginTop: "1em" }}
            required
            margin="dense"
            id="discountedPrice"
            name="discountedPrice"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(+e.target.value)}
            label="Discounted Price ($)"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            sx={{ marginTop: "1em" }}
            required
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
            type="number"
            fullWidth
            variant="standard"
          />
          <Autocomplete
            sx={{ marginTop: "1em" }}
            multiple
            limitTags={4}
            id="tags-standard"
            options={["shoes", "perfumes", "watch", "android", "phone"]}
            getOptionLabel={(option) => option}
            onChange={(_, newValue) => {
              setCatTags(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select Suitabe Category Tags"
                placeholder="Category Tags"
              />
            )}
          />
          <Button
            sx={{ marginTop: "2em" }}
            variant="contained"
            component="label"
          >
            <span>Upload Images</span>
            <input type="file" multiple onChange={uploadImage} hidden />
          </Button>
        </div>
        {props.isEditing && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "120%",
              position: "relative",
            }}
          >
            <h3
              style={{
                position: "absolute",
                top: "-5%",
                left: "8%",
              }}
            >
              Existing Images
            </h3>
            <ImageList
              sx={{
                height: 450,
              }}
              className="imageList"
              cols={3}
              rowHeight={164}
            >
              {oldimages?.map((item: string, index: number) => (
                <div className="imageItem" key={`im_${index}`}>
                  <CancelIcon
                    className="cancel"
                    onClick={() => cancelOldImage(index)}
                  />
                  <ImageListItem sx={{ padding: "0.4em" }}>
                    <img src={item} alt={item} loading="lazy" />
                  </ImageListItem>
                </div>
              ))}
            </ImageList>
          </div>
        )}
        <ImageList
          sx={{
            width: "120%",
            height: 450,
          }}
          className="imageList"
          cols={3}
          rowHeight={164}
        >
          {images.map((item: File, index: number) => (
            <div className="imageItem" key={item.name}>
              <CancelIcon
                className="cancel"
                onClick={() => cancelImage(index)}
              />
              <ImageListItem sx={{ padding: "0.4em" }}>
                <img
                  src={URL.createObjectURL(item)}
                  alt={item.name}
                  loading="lazy"
                />
              </ImageListItem>
            </div>
          ))}
        </ImageList>
      </DialogContent>
      <DialogActions sx={{ marginTop: "0.5em" }}>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button type="submit">{props.isEditing ? "Update" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
}
