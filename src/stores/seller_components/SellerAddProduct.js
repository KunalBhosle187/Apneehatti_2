import { Button } from "@material-ui/core";
import $ from "jquery";
import React, { useEffect, useRef, useState } from "react";
import { uploadProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const SellerAddProduct = () => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState({});
  const [imageURLs, setImageURLs] = useState([]);
  const [imgUpload, setImgUpload] = useState(true);
  const [inputValues, setInputValues] = useState({});

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const productUpload = useSelector((state) => state.productUpload);
  const { loading, error, success } = productUpload;

  const main_Category = products && [
    ...new Set(products.map((item) => item.mainCategory)),
  ];
  const sub_Category = products && [
    ...new Set(products.map((item) => item.subCategory)),
  ];

  const stores = products && [...new Set(products.map((item) => item.store))];
  console.log(stores);

  // rich text editor
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  console.log("IMg", imageURLs);
  console.log("imagArr", images);
  const dispatch = useDispatch();

  const imagesUpload = (e) => {
    setImages([...e.target.files]);
    setImgUpload(false);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
      price:
        inputValues.actualPrice -
        (inputValues.actualPrice * inputValues.off) / 100,
    });
  };

  const uploadProductHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key of Object.keys(images)) {
      data.append("image", images[key]);
    }
    data.append("title", inputValues.title);
    data.append("vdo", inputValues.vdo);
    data.append("mainCategory", inputValues.mainCategory);
    data.append("subCategory", inputValues.subCategory);

    // editorState : convertToRaw(editorState.getCurrentContent())

    data.append(
      "description",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
    data.append("price", inputValues.price);
    data.append("actualPrice", inputValues.actualPrice);
    data.append("off", inputValues.off);
    data.append("store", inputValues.store);
    data.append("countInStock", inputValues.countInStock);
    dispatch(uploadProduct(data));
    console.log("uploaded Product", data);
  };

  const editorDescription = () => {
    setInputValues({
      ...inputValues,
      description: JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      ),
    });
  };

  useEffect(() => {
    console.log(convertToRaw(editorState.getCurrentContent()));
    console.log(editorState);
    if (images.length < 1) return;
    images.map((x) => setImage(x[0]));
    const newImageUrls = [];
    images?.map((x) => newImageUrls.push(URL.createObjectURL(x)));
    setImageURLs(newImageUrls);
  }, [images, editorState]);

  $("#imgUpload").click(function (evt) {
    evt.stopImmediatePropagation();
    $("input#uploadImg").click();
  });

  const uploadedSuccessfully = () => {
    alert("Product Uploaded Successfully");
    setTimeout(window.location.reload(), 200);
  };

  return (
    <>
      {success
        ? // <div className="uploadingStatus">
          //   <h5>Product Uploaded Successfully</h5>
          // </div>
          uploadedSuccessfully()
        : null}

      <form
        encType="multipart/form-data"
        method="POST"
        onSubmit={uploadProductHandler}
      >
        <div className="addProduct">
          <div className="add__product__container">
            <div className="add__product__info ">
              <h5>Basic Product Info</h5>
              <div className="add__product__block">
                <label for="exampleFormControlInput1" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Product Name"
                  name="title"
                  onChange={handleOnChange}
                  // required
                />
              </div>

              <div className="selector__flex add__product__block">
                <div classname="">
                  <label for="category_selector" className="form-label">
                    Main Category
                  </label>

                  <input
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Main Category"
                    type="text"
                    name="mainCategory"
                    list="mainCategory"
                    onChange={handleOnChange}
                  />
                  <datalist id="mainCategory">
                    {main_Category.map((x, i) => (
                      <option key={i}>{x}</option>
                    ))}
                  </datalist>
                </div>
                <div classname="">
                  <label for="category_selector" className="form-label">
                    Sub Category
                  </label>

                  <input
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Sub Category"
                    type="text"
                    name="subCategory"
                    list="subCategory"
                    onChange={handleOnChange}
                  />
                  <datalist id="subCategory">
                    {sub_Category.map((x, i) => (
                      <option key={i}>{x}</option>
                    ))}
                  </datalist>
                </div>
                <div>
                  <label for="exampleFormControlInput1" className="form-label">
                    Actual Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Actual Price"
                    name="actualPrice"
                    defaultValue={0}
                    onChange={handleOnChange}
                    // required
                  />
                </div>
                <div>
                  <label for="exampleFormControlInput1" className="form-label">
                    Off in %
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Off"
                    name="off"
                    defaultValue={0}
                    onChange={handleOnChange}
                    // required
                  />
                </div>
              </div>

              <div className="selector__flex add__product__block">
                <div>
                  <label for="exampleFormControlInput1" className="form-label">
                    Discounted Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Discounted Price"
                    name="price"
                    value={inputValues.price || 0}

                    // required
                  />
                </div>

                <div>
                  <label for="exampleFormControlInput1" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Quantity"
                    name="countInStock"
                    onChange={handleOnChange}

                    // required
                  />
                </div>
                <div>
                  <section className="upload__section">
                    <div>
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Video link
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Youtube embedded"
                        name="vdo"
                        onChange={handleOnChange}
                      />
                    </div>
                  </section>
                </div>
                <div className="add__product__block">
                  <label for="brand_selector" className="form-label">
                    Brand
                  </label>
                  <input
                    list="brandlist"
                    class="form-control"
                    type="text"
                    name="store"
                    onChange={handleOnChange}
                    placeholder="Select Brand"
                    // required
                  />
                  <datalist id="brandlist">
                    {stores.map((x, i) => (
                      <option key={i} value={x}>
                        {x}
                      </option>
                    ))}
                  </datalist>
                </div>

                <div className="add__product__images">
                  <section className="">
                    <input
                      onChange={(e) => {
                        imagesUpload(e);
                        handleOnChange(e);
                      }}
                      id="uploadImg"
                      type="file"
                      accept="image/*"
                      multiple
                      name="image"
                      style={{ display: "none" }}
                      // required
                    />

                    <Button className="sellerBtn" fullWidth id="imgUpload">
                      <span>
                        <i class="fas fa-file-upload"></i>
                        <p>Upload Images</p>
                      </span>
                    </Button>
                  </section>
                </div>
              </div>
              <div className="mb-4">
                <label for="feturedCheckbox" className="form-label">
                  Featured Details
                </label>
                <div className="d-flex justify-content-around">
                  <div className="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      onChange={handleOnChange}
                      name="newArrival"
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      New Arrival
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      onChange={handleOnChange}
                      name="bestSeller"
                      id="flexCheckChecked"
                      checked
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                      Best Seller
                    </label>
                  </div>
                </div>
              </div>

              <div className="add__product__block">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Description
                </label>

                <div
                  style={{
                    border: "1px solid gainsboro",
                    padding: "2px",
                  }}
                >
                  <Editor
                    onEditorStateChange={onEditorStateChange}
                    editorState={editorState}
                    // onEditorStateChange={setEditorState}
                    onChange={editorDescription}
                    placeholder="Write product description"
                    editorClassName="bg-white mt-6 shadow-sm "
                    editorStyle={{ minHeight: "300px" }}
                  />
                </div>
              </div>
              <div align="center">
                <button type="submit" className="btn w-50">
                  <span className="align-center">Upload Product</span>
                </button>
              </div>
            </div>

            <div className="productPreview">
              <h4>Product Preview</h4>
              <div className="productBlock__1">
                <h6>Product Images</h6>
                <div className="productImages__container__flex">
                  {inputValues.image &&
                    imageURLs.map((x) => (
                      <img
                        src={x}
                        alt="product Images"
                        width="100%"
                        height="100%"
                      />
                    ))}
                </div>
                <h6>Product Name</h6>
                <h5>{inputValues.title || "Product Title"}</h5>
                <h6>Product Category</h6>
                <h5>{inputValues.mainCategory || "Category"}</h5>

                <div className="two-col">
                  <div>
                    <h6>Product Price</h6>
                    <h5>{inputValues.actualPrice || 0}</h5>
                  </div>

                  <div>
                    <h6>Product Discounted Price</h6>
                    <h5>{inputValues.price || 0}</h5>
                  </div>
                </div>

                <h6>Product Description</h6>
                {inputValues.description ? (
                  <h5
                    dangerouslySetInnerHTML={{
                      __html: draftToHtml(JSON.parse(inputValues.description)),
                    }}
                  ></h5>
                ) : (
                  <h5>Product Description</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SellerAddProduct;
