import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import EmailIcon from "@mui/icons-material/Email";
import PolicyIcon from "@mui/icons-material/Policy";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@mui/icons-material/YouTube";
import YouTube from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <>
      <footer>
        <div className="p-1 border-t-2">
          <div className="text-center mb-2 border-b-2 py-10 ">
            <h4 className="text-2xl font-bold mb-2">ApneeHatti</h4>
            <h5 className="text-gray-500">
              &nbsp;&nbsp;&nbsp;Apneehatti is an online marketplace that
              connects local businesses in Himachal with the big cities of India
            </h5>
            <div className="">
              <ul className="grid grid-cols-4 w-48 mx-auto pt-3">
                <li
                  className="col-lg-3 col-md-3 col-sm-3"
                  data-text="Facebook"
                  data-color="#1877f2"
                >
                  <a
                    className="facebook"
                    target="_blank"
                    href="https://www.facebook.com/Apneehatti-103048901780149"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li
                  className="col-lg-3 col-md-3 col-sm-3"
                  data-text="Twitter"
                  data-color="#0099ff"
                >
                  <a
                    className="twitter"
                    target="_blank"
                    href="https://twitter.com/ApneeHatti"
                  >
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li
                  className="col-lg-3 col-md-3 col-sm-3"
                  data-text="Instagram"
                  data-color="#e4405f"
                >
                  <a
                    className="instagram"
                    target="_blank"
                    href="https://www.instagram.com/apneehatti/"
                  >
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
                <li
                  className="col-lg-3 col-md-3 col-sm-3"
                  data-text="Youtube"
                  data-color="#ff0000"
                >
                  <a
                    className="youtube"
                    target="_blank"
                    href="https://www.linkedin.com/company/apneehatti"
                  >
                    <i class="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 p-4 border-b-2">
            <div className="">
              <h4 className="text-lg font-semibold mb-2 capitalize">
                About us
              </h4>
              <h5 className="font-normal text-sm text-gray-600 text-md py-1">
                About us
              </h5>
              <h5 className="font-normal text-sm text-gray-600 text-md py-1">
                Contact us <span>apneehatti@gmai.com</span>
              </h5>
              <h5 className="font-normal text-sm text-gray-600 text-md py-1">
                About team
              </h5>
              <h5 className="font-normal text-sm text-gray-600 text-md py-1">
                Customer support
              </h5>
            </div>
            <div className="">
              <h4 className="text-lg font-semibold mb-2 capitalize">
                Our Information
              </h4>
              <h5 className="font-normal text-sm text-gray-600 text-md py-1">
                Privacy policy
              </h5>
              <h5 className="font-normal text-sm text-gray-600 text-md py-1">
                Terms & conditions
              </h5>
              <h5 className="font-normal text-sm text-gray-600 text-md py-1">
                Return policy
              </h5>
              <h5 className="font-normal text-sm text-gray-600 text-md py-1">
                Site map
              </h5>
            </div>
          </div>
        </div>
        <div className="p-10">
          <h6 className="font-medium text-sm text-center ">
            @Copyrights 2021. All rights reserved by apneehatti LLP .
          </h6>
        </div>
      </footer>
    </>
  );
}

export default Footer;
