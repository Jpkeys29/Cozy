import React from "react";
import Title from "./Title";
import Banner from "./Banner";
import { useLocation, Link } from "react-router-dom";

export default function PostingSearched() {
  const location = useLocation();
  const addressData = location.state || [];
  console.log("addressData:", addressData);
  return (
    <div className="flat-detail">
      <div className="page-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-title">Places</h1>
              <h2 className="page-description">Best places in the area</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {addressData?.map((item, i) => (
            <article key={i} className="text-center col-lg-4 col-12 col-md-6 ">
              <div className="item-image">
                <img
                  className="img-fluid"
                  src="/img/product1.jpeg"
                  // src={item.image}
                  alt="flat"
                />
              </div>

              <div className="item-description">
                <div>
                  <p >{item.neighborhood}</p>
                  <p >{item.price}</p>
                  <span >{item.description}</span>
                </div>
                <div>
                  <Link className="item-title" to="/posting-details">
                    <button className="btn btn-detail">View</button>
                  </Link>
                </div>
              </div>

              {/* <p>Neighborhood: {item.neighborhood}</p>  */}
              {/* <p>Description: {item.description} </p>
              <i>Price: {item.price}</i> */}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
