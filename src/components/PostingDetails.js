import { useLocation, Link } from "react-router-dom";
import PostingSearched from "./PostingSearched";

export default function PostingDetails() {
    const location = useLocation();
  const addressData = location.state || [];
  console.log("addressData:", addressData);
  return (
    <div>
        <h2>Posting Details </h2>
    </div>
  )
}