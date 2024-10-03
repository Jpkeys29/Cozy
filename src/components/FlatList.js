import { useState, useEffect } from "react";
import Title from "./Title"
// import FlatItem from "./FlatItem"
// import FlatDetail from "./FlatDetail";

const FlatList = () => {
    const [area, setArea] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const title = {
        text: "Current Listings",
        // description: "Lorem ipsum dolor sit ame"
    }
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/get_posting");
                const result = await response.json();
                // console.log(result)
                setArea(result)
                console.log(result.postings)
                if (result.postings) {
                    const areaList = result.postings.map(posting => posting.area);
                    setArea(areaList);
                }
            } catch (error) {
                console.log('Error fetching area or neighborhood:', error);
            }
        };
        fetchLocation();
    }, []);


    const handleLocationChange = (e) => {
        setSearchTerm(e.target.value);
    }
    return (
        <section>
            {/* <input
                type="text"
                placeholder="Type Location"
                value={searchTerm}
                onChange={handleLocationChange}
                style={{
                    padding: '20px',
                    fontSize: '16px',
                    width: '200px',
                }}
            /> */}

            <Title title={title.text} description={title.description} />

            {/* <ul>
                {area.length === 0 ? (<p>Loading...</p>) : (area.slice(0,5).map((l, index) => (
                <li key={l.id || index }>{l.area} </li>
            ))) }
            </ul> */}
            {/* <div className="container"> */}
            {/* <div className="row">
                    <FlatItem slug="lorem-ipsum-1" />
                    <FlatItem slug="lorem-ipsum-2" />
                    <FlatItem slug="lorem-ipsum-3" />
                    <FlatItem slug="lorem-ipsum-4" />
                    <FlatItem slug="lorem-ipsum-5" />
                    <FlatItem slug="lorem-ipsum-6" />  
                </div> */}
            {/* </div> */}
        </section>
    )

}

export default FlatList;