import { useEffect, useState, useRef } from "react"
import banner from "../banner.jpg"
import { Link, json } from "react-router-dom";
import {
    GoogleMap,
    useJsApiLoader,
    StandaloneSearchBox,
} from "@react-google-maps/api"
import { useNavigate, Navigate } from "react-router-dom"
import TeamList from "./TeamList";
import PostingSearched from "./PostingSearched";


const libraries = ["places"];

const Banner = () => {
    const [addressData, setAddressData] = useState(null);
    const [pics, setPics] = useState([])
    const [ updatedFormattedAddres, setUpdatedFormattedAddress ] = useState('')

    const apiKey = process.env.REACT_APP_GOOGLEMAPS_API_KEY;

    const inputref = useRef(null)

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey,
        libraries
    })

    const handleOnPlacesChanged = () => {
        let address = inputref.current.getPlaces()
        console.log("address:", address)

        if (address && address.length > 0) {
            const formattedAddress = address[0].vicinity || address[0].formatted_address;
            console.log("Formatted Address:", formattedAddress);
            setUpdatedFormattedAddress(formattedAddress)
        } else {
            console.log('No address found')
        }
    }

    const FetchFormattedAddress = async () => {
        const dataObject = {
            formattedAddress: updatedFormattedAddres,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/api/check_address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataObject),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch address data');
            }
            const data = await response.json();
            console.log(data)
            setAddressData(data);

            // console.log('Backend response:', data)
        } catch (error) {
            console.log('Error:', error)
        }
    };

    return (
        <div className="banner d-flex align-items-center" style={{ backgroundImage: `url(${banner})` }}>
            <div className="bg-custom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="banner-area text-center pt-4 pb-4">
                                <p>Find the best rooms in New York City</p>
                                <h2 className="mt-2 mb-4 banner-title"><strong> Roomye</strong> </h2>
                                <div className="search-area">
                                    {isLoaded && (
                                        <StandaloneSearchBox
                                            onLoad={(ref) => inputref.current = ref}
                                            onPlacesChanged={handleOnPlacesChanged}
                                        >
                                            <input type="text" className="inp-search" placeholder="Search" />
                                        </StandaloneSearchBox>
                                    )}
                                    <button className="btn-search m-2" onClick={FetchFormattedAddress}
                                    >Search All</button>
                                </div> 
                                <div>
                                    <PostingSearched addressData={addressData} />
                                </div>                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};








// const [search, setSearch] = useState();
// const [find, setFind] = useState([]);
// const [word, setWord] = useState("");
// useEffect(() => {
//     setSearch(["a","b","test", "mb"])
// }, [])
// const findSearch = (e) => {
//     setWord(e.target.value)
//     const filteredCountries = search.filter(item => item.indexOf(e.target.value) > -1 ? item : null);
//     e.target.value.length === 0 ? setFind([]) : setFind(filteredCountries);
// }
// const findResult = () => {
//     if (find.length === 0 && word.length > 0) {
//         return <div className="find-search">Not Found</div>
//     }
//     if (find.length > 0) {
//         return <div className="find-search">
//             {
//                 find.map(item => {
//                     return <Link key={item} to="#">{item}</Link>
//                 })
//             }
//         </div>
//     }
// }
// return (
//     <div className="banner d-flex align-items-center" style={{ backgroundImage: `url(${banner})` }}>
//         <div className="bg-custom">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-6 mx-auto">
//                         <div className="banner-area text-center pt-4 pb-4">
//                             <p>Find the best rooms in New York City</p>
//                             <h2 className="mt-2 mb-4 banner-title"><strong> Roomye</strong> </h2>
//                             <div className="search-area">
//                                 <input value={word} onChange={(e) => findSearch(e)} type="text" className="inp-search" placeholder="Search" />
//                                 <button className="btn-search m-2">Search All</button>
//                             </div>
//                             {findResult()}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// )

export default Banner;