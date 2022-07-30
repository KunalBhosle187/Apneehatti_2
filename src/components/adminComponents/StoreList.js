import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Stores } from "../../actions/storesAction";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter"

const StoreList = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.stores);
  const { loading, error, storesList } = stores;

  var storeData = storesList.map((item) => console.log(item.category));
  const [storeCategory, setStoreCategory] = useState("all");

  useEffect(() => {
    dispatch(Stores());
  }, [dispatch]);

  return (
    <div className="storeMainContainer storebg ">
      <AdminHeader />

      <div className="col-lg-12 ">
        <div className="storeContainer">
          <div className="storeSidebar col-lg-2 d-flex  flex-column ps-5 my-2">
            <h5 className="fw-bold" >
              Category
            </h5>

            <div className="categoryBlock d-flex flex-column">
              <h7 onClick={() => setStoreCategory("all")}>All</h7>
              <div className="dropdown">
                <h7
                  className=" dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Beauty
                </h7>
                <ul
                  style={{ background: "none" }}
                  className="dropdown-menu storeDropdown"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => setStoreCategory("organicStore")}>
                    Organic Store
                  </li>
                  <li onClick={() => setStoreCategory("aromaticStore")}>
                    Aromatic Store
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-10 col-sm-12">
            <div className="storelistContainer">
              <h5 className="mb-2 categoryHeading">{storeCategory}</h5>
              <div className="col-lg-10 storeCardGrid">
                {storeCategory != "all"
                  ? storesList
                      .filter((item) => item.category == storeCategory)
                      .map((items) => (
                        <div
                          key={items._id}
                          className="storeCard  border d-flex flex-column align-items-center justify-content-center"
                        >
                          <div className="storeCardImg">
                            <Link to={`./store`}>
                              <img
                                src={items.image}
                                width="100%"
                                height="100px"
                              />
                            </Link>
                          </div>
                          <h7 className="storeCardName my-1">{items.store}</h7>
                          <p className="storeCardCategory">{items.category}</p>
                        </div>
                      ))
                  : storesList.map((items) => (
                      <div
                        key={items._id}
                        className="storeCard  col-sm-3 border d-flex flex-column align-items-center justify-content-center mx-2 my-2"
                      >
                        <div className="storeCardImg">
                          <Link to={`./store`}>
                            <img
                              src={items.image}
                              width="100%"
                              height="100px"
                            />
                          </Link>
                        </div>
                        <h7 className="storeCardName my-1">{items.store}</h7>
                        <p className="storeCardCategory">{items.category}</p>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter/>
    </div>
  );
};

export default StoreList;
