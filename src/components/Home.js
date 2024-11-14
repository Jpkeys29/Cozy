import FlatList from "./FlatList"
import Banner from "./Banner"
import React from "react"
import TeamList from "./TeamList"
import References from "./References"
import BestFlatList from "./BestFlatList"

const Home=()=>{
    return (
        <React.Fragment>
            <Banner/>
            {/* <FlatList/> */}
            {/* <BestFlatList/> */}
            <TeamList/>
            <References />
        </React.Fragment>
    )
}

export default Home;