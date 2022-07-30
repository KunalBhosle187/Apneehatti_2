import React from 'react'

const AdminFooter = () => {
    return (
        <div className="footer">
        <div className="footer_categories">
          <h5>Categories</h5>
          <li>Fashion</li>
          <li>Grocery</li>
          <li>Tech</li>
          <li>Sports</li>
          <li>Food Delivery</li>
        </div>
        <div className="footer_support">
          <h5>Support</h5>
          <li>Whatsapp</li>
          <li>Call Us</li>
          <li>Email</li>
        </div>
        <div className="footer_policy">
          <h5>Policy</h5>
          <li>Terms & Condition</li>
          <li>Privacy policy</li>
        </div>
        <div className="footer_social">
          <h5>Follow on social</h5>
          <img src="/pictures/icons/Facebook.png" width="32px" height="32px" alt="" />
          <img src="/pictures/icons/instagram.png" width="32px" height="32px" alt="" />
          <img src="/pictures/icons/linkedin.png" width="32px" height="32px" alt="" />
          <img src="/pictures/icons/twitter.png" width="32px" height="32px" alt="" />
        </div>
      </div>
    )
}

export default AdminFooter
