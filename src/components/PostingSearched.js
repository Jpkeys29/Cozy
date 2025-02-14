import React from "react";
import Title from "./Title";
import Banner from "./Banner";
import { useLocation } from 'react-router-dom';

export default function PostingSearched() {
  const location = useLocation();
  const addressData = location.state || [];
  console.log('addressData:',addressData);
  return(
    <div>
      <h2>Places</h2>
      <section>
        {addressData?.map((item, i) => (
        <article key={i}>
          <p>Neighborhood: {item.neighborhood}</p> 
          <p>Description: {item.description} </p>
          <i>Price: {item.price}</i>
        </article>
      ))}
      </section>
    </div>
  )
}
