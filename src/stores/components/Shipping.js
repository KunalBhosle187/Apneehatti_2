import  React ,{useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../actions/cartAction";
import {
  Button,
  Card,
  Input,
} from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckoutStep from "../components/shared/CheckoutStep";
import { withRouter } from "react-router";
import {savePaymentMethod} from "../actions/cartAction"
import validator from "validator"
import Alert from "@material-ui/lab/Alert";




const Shipping = ({ history }) => {
 console.log("hello")
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // const payment = "/payment";
  
  const [paymentMethod, setPaymentMethod] = useState('')
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
  const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [shippingMobile, setShippingMobile] = useState(
    shippingAddress.shippingMobile
  );
  const [message,setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(
      
      saveShippingAddress({
        address,
        city,
        postalcode,
        country,
        fullName,
        shippingMobile,
      })
    );

    if(!validator.matches(fullName,  /^[a-zA-Z ]{2,40}$/)){
      setMessage("Invalid Name")
  }else if(!validator.matches(city, '^[a-zA-Z]+$')){
    setMessage("Invalid City")
  }else if(!validator.isPostalCode(postalcode , 'IN')){
    setMessage("Invalid Postalcode")
  }else if(!validator.matches(address, `[A-Za-z0-9'\.\-\s\,]`)){
     setMessage("Don't use specialize symbols in Address like - &(%#$^)")
   }else if(!validator.isMobilePhone(shippingMobile ,['en-IN'])) {
    setMessage("Invalid Mobile Number");
  }else if(!paymentMethod){
    setMessage("Please Select Payment Method")
  }else{
    dispatch(savePaymentMethod(paymentMethod))
    history.push("shipping/placeorder")
  };
  }

  
  return (<>








  <div className="shipping__container py-2">
    <div className="shippingForm container-md glassMorphism" >
     
      <h3 className="text-center">Checkout</h3>
      <h4>Shipping Address</h4>
      {message ? <Alert severity="error">{message}</Alert> : " " }
      <form onSubmit={submitHandler} className="container-fluid row col-sm-12 align-items-center">
        <div className="shippingForm col-lg-8 col-sm-12"> 
          <div className="shippingField inputField col-sm">
            <h5>Full Name</h5>
            <br />
            <input className="form-control glassMorphism"
             
              fullWidth
              className="form_input"
              style={{boxShadow:"gainsboro 0px 0px 5px 1px"}}
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="shippingField inputField">
            <h5>Mobile Number</h5>
            <br />
            <input className="form-control glassMorphism"
              variant="outlined"
              id="outlined-basic"
              size="small"
              fullWidth
              maxLength="10"
              className="form_input"
              style={{boxShadow:"gainsboro 0px 0px 5px 1px"}}
              type="text"
              value={shippingMobile}
              onChange={(e) => setShippingMobile(e.target.value)}
              required
              
            />
          </div>
        

        <div className="shippingField inputField">
          <h5>Address</h5>
          <br />
          <input className="form-control glassMorphism"
            variant="outlined"
            id="outlined-basic"
            size="small"
            fullWidth
            className="form_input"
            style={{boxShadow:"gainsboro 0px 0px 5px 1px"}}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

          <div className="shippingField inputField">
            <h5>Country</h5>
            <br />
            <input className="form-control glassMorphism"
              variant="outlined"
              id="outlined-basic"
              size="small"
              fullWidth
              id="country"
              className="form_input"
              style={{boxShadow:"gainsboro 0px 0px 5px 1px"}}
              type="text"
              value="India"
              disabled
             
            />
          </div>

          <div className="shippingField inputField">
            <h5>City</h5>
            <br />
            <input className="form-control glassMorphism"
              variant="outlined"
              id="outlined-basic"
              size="small"
              fullWidth
              className="form_input"
              style={{boxShadow:"gainsboro 0px 0px 5px 1px"}}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="shippingField inputField">
            <h5>PostalCode</h5>
            <br />
            <input className="form-control glassMorphism"
              variant="outlined"
              id="outlined-basic"
              size="small"
              fullWidth
              maxLength="6"
              className="form_input"
              style={{boxShadow:"gainsboro 0px 0px 50px 5px"}}
              type="text"
              value={postalcode}
              onChange={(e) => setPostalcode(e.target.value)}
              required
            />
          </div>
        </div>
        
       
                 <div className="paymentBlock col-lg-3 col-sm">
                      <h4>Payment Method</h4>
                     <RadioGroup 
                       row aria-label="position" name="position" defaultValue="top">
                     <FormControlLabel  id="Credit div or paypal" onChange={(e)=>setPaymentMethod(e.target.value)} value="Credit card or paypal" control={<Radio color="primary" />} label="Credit card or Paypal" />
                     <FormControlLabel id="Cash On Delivery" onChange={(e)=>setPaymentMethod(e.target.value)} value="Cash On Delivery" control={<Radio color="primary" />} label="Cash On Delivery" />
                     </RadioGroup>
                
        
        <Button type="submit" variant="contained" className="btns">
          Continue
        </Button>


        </div>
      </form>
    </div>
    </div>
  </>);
};

export default withRouter(Shipping);
