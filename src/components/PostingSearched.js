import React from "react";
import Title from "./Title";
import Banner from "./Banner";

export default function PostingSearched({ addressData }) {

  return (
    <div>
      {/* <h4>Posting Searched</h4> */}
      <p>{addressData?.title} </p>
      <p>{addressData?.area}</p>
      <p>{addressData?.neighborhood}</p>
      <p>{addressData?.description} </p>
      <p>{addressData?.availability} </p>
      <p></p>
    </div>
  );
}
