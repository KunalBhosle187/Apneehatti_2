import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { listProducts, listSearchProducts } from "../actions/productActions";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import { updateProduct } from "../actions/productActions";
import draftToHtml from "draftjs-to-html";

const SellerEditProduct = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const { productId } = useParams();

  const [inputValues, setInputValues] = useState({});
  const [check, setCheck] = useState(false);

  // rich text editor
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
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

  const editorDescription = () => {
    setInputValues({
      ...inputValues,
      description: JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      ),
    });
  };

  const updateProductHandler = (e) => {
    e.preventDefault();
    if (inputValues) {
      dispatch(updateProduct(inputValues, productId));
    } else {
      console.log("inputValue is Empty");
    }
  };

  return (
    <>
      {products
        .filter((x) => x._id == productId)
        .map((x) => (
          <form
            encType="multipart/form-data"
            method="POST"
            onSubmit={updateProductHandler}
          >
            <div className="addProduct">
              <div className="add__product__container">
                <div className="add__product__info ">
                  <h5>Edit Product Info</h5>
                  <div className="add__product__block">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder={x.title}
                      name="title"
                      onChange={handleOnChange}
                      // required
                    />
                  </div>

                  <div className="selector__flex add__product__block">
                    <div classname="">
                      <label for="category_selector" className="form-label">
                        Category
                      </label>
                      <select
                        id="category_selector"
                        class="form-select"
                        aria-label="Default select example"
                        onChange={handleOnChange}
                        name="category"

                        // required
                      >
                        <option selected>{x.category}</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Handlooms">Handlooms</option>
                        <option value="Food Product">Food Product</option>
                        <option value="Kangra painting">Kangra painting</option>
                        <option value="Tea">Tea</option>
                        <option value="Raw Honey">Raw Honey</option>
                        <option value="Herbal Tisane">Herbal Tisane</option>
                        <option value="Skin Care">Skin Care</option>
                        <option value="Dark Chocolate">Dark Chocolate</option>
                        <option value="Home Decor">Home Decor</option>
                        <option value="Happiness Box">Happiness Box</option>
                        <option value="Build Your Own Box">
                          Build Your Own Box
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div classname="">
                      <label for="gender_selector" className="form-label">
                        Gender
                      </label>
                      <select
                        id="gender_selector"
                        class="form-select"
                        aria-label="Default select example"
                        onChange={handleOnChange}
                        // required
                        name="gender"
                      >
                        <option selected>Select option</option>
                        <option value="male">Male</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                      </select>
                    </div>
                  </div>

                  <div className="selector__flex add__product__block">
                    <div>
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Actual Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder={x.actualPrice || 0}
                        name="actualPrice"
                        onChange={handleOnChange}
                        // required
                      />
                    </div>

                    <div>
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Discounted Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder={x.price}
                        name="price"
                        value={x.price || inputValues.price}

                        // required
                      />
                    </div>

                    <div>
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Off in %
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder={x.off || 0}
                        name="off"
                        onChange={handleOnChange}
                        // required
                      />
                    </div>
                    <div>
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder={x.countInStock}
                        name="countInStock"
                        onChange={handleOnChange}

                        // required
                      />
                    </div>
                    <div>
                      <section className="upload__section">
                        <h5>Upload Video</h5>

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
                        onChange={editorDescription}
                        placeholder="Write product description"
                        editorClassName="bg-white mt-6 shadow-sm "
                        editorStyle={{ minHeight: "300px" }}
                      />
                    </div>
                  </div>
                  <div align="center">
                    <button type="submit" className="btn w-50">
                      <span className="align-center">SAVE CHAGES</span>
                    </button>
                  </div>
                </div>

                <div className="productPreview">
                  <h4>Product Preview</h4>
                  <div className="productBlock__1">
                    <h6>Product Images</h6>
                    <div className="productImages__container__flex">
                      {x.image.map((x) => (
                        <img
                          src={x}
                          alt="product Images"
                          width="100%"
                          height="100%"
                        />
                      ))}
                    </div>
                    <h6>Product Name</h6>
                    <h5>{inputValues.title || x.title}</h5>
                    <h6>Product Category</h6>
                    <h5>{inputValues.category || x.category}</h5>

                    <div className="two-col">
                      <div>
                        <h6>Product Price</h6>
                        <h5>{inputValues.actualPrice || x.actualPrice || 0}</h5>
                      </div>

                      <div>
                        <h6>Product Discounted Price</h6>
                        <h5>{inputValues.price || x.price || 0}</h5>
                      </div>
                    </div>

                    <h6>Product Description</h6>
                    {inputValues.description ? (
                      <h5
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            JSON.parse(inputValues.description)
                          ),
                        }}
                      ></h5>
                    ) : (
                      <h5
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(JSON.parse(x.description)),
                        }}
                      ></h5>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        ))}
    </>
  );
};

export default SellerEditProduct;
