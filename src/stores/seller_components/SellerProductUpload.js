import React from "react";

const sellerProductUpload = () => {
 
  const sellerProduct = {}
 
  const getProduct = (e) => {
    sellerProduct[e.target.name] = e.target.value
  }

  const sellerSubmitHandler = (e) =>{
    e.preventDefault()
    console.log(sellerProduct)
  } 


  return (
    <div>
      <div className="productUpload col-lg-12 row">
        <div className="col-lg-2"></div>
        <div className="col-lg-5">
          <input type="file" />
        </div>
        <div className="col-lg-5 ">
          <div className="productUpload__Block">
            <h2 className="productUpload__BlockTitle">Price and stock information </h2>
            <div className="productUpload__Grid">
              <div className="inputForm col-sm">
                <label for ="mrp">MRP (&#8377;)</label>
                <br />
                <input
                  className="form-control "
                  id="mrp"
                  size="small"
                  fullWidth
                  className="form_input"
                  type="number"
                  name="MRP"
                  required
                  onChange={getProduct}
                />
              </div>
              <div className="inputForm col-sm">
                <label for="sellingPrice" >Selling Price (&#8377;)</label>
            <br />
            <input className="form-control "
              id="sellingPrice"
              size="small"
              fullWidth
              className="form_input"
              type="number"
              name="Selling Price"
              required
              onChange={getProduct}
            />
          </div>
          <div className="inputForm col-sm">
            <label for="stock">Stock</label>
            <br />
            <input className="form-control "
              size="small"
              id="stock"
              fullWidth
              className="form_input"
              type="number"
              name="Stock"
              required
              onChange={getProduct}
            />
          </div>
                           
            </div>
          </div>
          <div className="productUpload__Block">
              <h2 className="productUpload__BlockTitle">Product Description</h2>
              <div className="productUpload__Grid">
              <div className="inputForm col-sm">
            <label for="prdName" >Product Name</label>
            <br />
            <input className="form-control "
              id="prdName"
              size="small"
              fullWidth
              className="form_input"
              type="text"
              name="Product_Name"
              required
              onChange={getProduct}
            />
          </div>
           <div className="inputForm col-sm">
             <label for="category">Category</label>
            <br />
            <input className="form-control "
              id="category"
              size="small"
              fullWidth
              className="form_input"
              type="text"
              name="Product_Category"
              required
              onChange={getProduct}
            />
          </div>
          <div className="inputForm col-sm">
            <label for ="qty">Quantity</label>
            <br />
            <input className="form-control "
              id="qty"
              size="small"
              fullWidth
              className="form_input"
              type="number"
              name="Product_Quantity"
              required
              onChange={getProduct}
            />
          </div>
          <div className="inputForm col-sm">
            <label for="desc">Description</label>
            <br />
            <input className="form-control "
              id="desc"
              size="small"
              fullWidth
              className="form_input"
              type="text"
              name="Product_Description"
              required
              onChange={getProduct}
            />
          </div>
          <button onClick={sellerSubmitHandler}>Submit</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sellerProductUpload;
