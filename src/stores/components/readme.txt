 {!loading ?
      <div className="singleP ">
        <div className="glassMorphism">
        <Button>
          <Link className="goback" to={`/store/${store}`}>
            <ArrowBackIosIcon /> Go back
          </Link>
        </Button>
        <div className="row col-lg-12">
          <div className="col-lg-7 d-flex align-items-center " align="center">
          <div className="col-lg-3 " >
              {productData.length > 0
                ? productData.map((item, index) => (
                    <img
                      className="mx-1 mb-3  glassMorphism "
                      src={item}
                      width="80px"
                      height="80px"
                      onClick={() => handleClick(index)}

                      
                    />
                  ))
                : null }
              {productVdoData.length > 0 ? <div className="d-flex justify-content-center align-items-center"
                onClick={() => handleClick("vdo")}
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "black",
                  color:"white",
                  borderRadius:"10px"
                }}
              >VDO</div> : null}
            </div>
            {/* some changes  */}
          <div className=" d-flex flex-column align-items-center productDetailImgContainer" >    
            { imgIndex != "vdo" ? ( productData.length > 0 && (
                  <img src={productData[imgIndex]} width="90%" height="90%" />
                )) :(
                productVdoData.length > 0 && (
                  <video  width="400px" height="500px" controls>
                    <source src={productVdoData} type="video/mp4"  />
                  </video>
                ))
            } 
             <Button 
                className="mx-3 px-3 py-2 singlePMobileButton "
                onClick={() => addToCartHandler()}
              >
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="singleP_info col-lg-5 col-sm ">
            <h4 className="mb-3 title">{product.title}</h4>
            <h5 className="mb-3 price"> &#8377;{product.price}</h5>
            <p className="mb-3">{product.description}</p>
          
            <div className="d-flex align-items-end">

              {product.countInStock > 0 && (
                <div className="">
                  <FormControl variant="outlined">
                    <h1 className="qty">Quantity</h1>
                    <Select
                      id="demo-simple-select-outlined"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}

              <Button
                className="mx-3 px-3 py-2 singlePButton"
                onClick={() => addToCartHandler()}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        </div>
      </div>
  :" "}






  //////////////////////////////placeorder

       <div className="placeorder__container py-3">
        <div className="container-md py-3 glassMorphism">
        <CheckoutStep step1 step2 step3 step4 />
          <div className="placeOrder container-md d-flex justify-content-center ">
           
          <div className="col-lg-12 row ">
            <div className="col-lg-6 px-3 py-3 glassMorphism" >
              <div className="col-12">
                <div>
                  <h6 className="reviewOder">Review your order</h6>
                  <p>
                    By placing your order, you agree to Apneehatti privacy notice
                    and conditions of use
                  </p>
                  <hr/>
                </div>
                <div className="row px-2">
                  
                    <div className="col">
                      <h7>
                        <strong>Shipping address</strong>
                      </h7>
                      <div>
                        <li>
                          {" "}
                          {cart.shippingAddress.fullName}&nbsp;
                          <br />
                        </li>
                        <li>
                          {cart.shippingAddress.address}&nbsp;
                          <br />
                        </li>
                        <li>
                          {cart.shippingAddress.city}&nbsp;
                          <br />
                        </li>
                        <li>
                          India&nbsp;,
                          {cart.shippingAddress.postalcode}&nbsp;
                          <br />
                        </li>
                        <li>
                          Phone :{cart.shippingAddress.shippingMobile}&nbsp;
                        </li>
                      </div>
                    </div>
                    <div className="col">
                      <h7>
                        <strong>Payment Method</strong>
                      </h7>
                      <ul>
                        <li>{cart.paymentMethod}</li>
                      </ul>
                    </div>
          
                </div>
                <hr/>
              </div>
              <div className=" col-12 px-3 py-3">
              <h7>
                <strong>Order Summary</strong>
              </h7>
              <div className="placeOrderSummaryListBlock">
                <ul className="d-flex justify-content-between align-items-center">
                  <li>Items :</li>
                  <li><strong>&#8377;{cart.itemPrice}</strong></li>
                </ul>
                <ul className="d-flex justify-content-between align-items-center">
                  <li>Delivery :</li>
                  <li><strong>&#8377;{cart.shippingPrice}</strong></li>
                </ul>
  
                <ul className="d-flex justify-content-between align-items-center">
                  <li>Total :</li>
                  <li><strong>&#8377;{cart.totalPrice}</strong></li>
                </ul>
                {error && <Alert severity="error" variant="filled" >{error}</Alert>}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </div>
            </div>
          
            </div>
  
            <div className="col-lg-6 ">
              {cart.cartItems.length === 0 ? (
                  <div>
                        <h7>Order Items</h7>
                        <p>Your Cart is Empty</p>
                  </div>
              ) : (
                <div className="orderList glassMorphism">
                      <h7><strong>Order Items</strong></h7>
                      <hr/>
                  {cart.cartItems.map((item, index) => (
                    <div className="orderDetail glassMorphism p-3" key={index}>
                      <img src={item.image[0]} width="100px" height="100px" alt="" />
                      <div className="orderDetailInfo">
                        <Link to={`./product/${item.product}`}>{item.title}</Link>
                        <li>
                          {item.qty} X &#8377;{item.price} = &#8377;{item.qty * item.price}
                        </li>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
           
            </div>
           
           </div>
        </div>
        </div>