import React from "react";


function UserFooter() {
  return (
    <div className="footer">
      <div className="footer_category">
        <h5 >Services</h5>
        <li>App Development</li>
        <li>Web Development</li>
        <li>UI/UX Development</li>
        <li>Graphic Designer</li>
       
      </div>
      <div className="footer_support">
        <h5 >Support</h5>
        <li>Whatsapp</li>
        <li>Call Us</li>
        <li>Email</li>
      </div>
      <div className="footer_policy">
        <h5 >About us</h5>
        <li >Company Info</li>
        <li >Privacy policy</li>
        <li >Terms & Condition</li>
      </div>
    </div>
  );
}

export default UserFooter;
