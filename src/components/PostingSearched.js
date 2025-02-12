import React from "react";
import Title from "./Title";
import Banner from "./Banner";

export default function PostingSearched({ addressData }) {
  console.log(addressData);
  return(
    <div>
      <h2>Places</h2>
      <section>
        {addressData?.map(item => (
        <article key={item.id}>
          <p>Neighborhood: {item.neighborhood}</p> 
          <i>Price: {item.price}</i>
        </article>
      ))
      }
      </section>
    </div>
  )
}
