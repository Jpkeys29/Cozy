import FlatList from "./FlatList"
import Banner from "./Banner"
import React from "react"
import TeamList from "./TeamList"
import References from "./References"
import BestFlatList from "./BestFlatList"
import PostingSearched from "./PostingSearched"
import { useState } from "react";

const Home=()=>{
    const [addressData, setAddressData] = useState(null);

    return (
        <React.Fragment>
            <Banner setAddressData={setAddressData} />
            {/* <PostingSearched/> */}
            {/* <FlatList/> */}
            {/* <BestFlatList/> */}
            {/* <TeamList addressData={addressData} /> */}
            <References />
        </React.Fragment>
    )
}

export default Home;