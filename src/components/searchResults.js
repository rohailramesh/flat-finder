// import { Card } from "antd";
import Listing from "@/models/Listing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";
import FavListings from "./FavListings";
import {
  ChakraProvider,
  Stack,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Image,
  Card,
  Text,
} from "@chakra-ui/react";
import FavListingService from "@/services/FavListingService";
const SearchResultPage = (props) => {

  //TODO: find a way to check which listings are already favorited by the user logged in...
  const favIds = props.favListings.map(item => item.listing.id)

  const {listings, setFavListings, user_id, } = props
  const displayListings = listings.map((listing) => listing);
  const favListingSevice = new FavListingService()
  
  const showListingsInfo = (listingId) => {
    console.log(listingId);
  };

  async function handleFav(listingId) {
      if (favIds.includes(listingId)){
        const result = await favListingSevice.removeFavListing(user_id, listingId)
        console.log("Result of removal! ", result)
        setFavListings((prev) => prev.filter(item => item.listing.id !== listingId))
      } else {
        const result = await favListingSevice.addFavListing(user_id, listingId);
        setFavListings((prev) => prev.concat(result.data)) 
      }
  }

  return (
    <>
      {displayListings.slice(0, 3).map((listing) => (
        <Card
          className="card hover-bg hover-up"
          key={listing.id}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          style={{ marginTop: "20px", width: '100%' }}
        >
          <Image
            objectFit="cover"
            // maxW={{ base: "100%", lg: "150px" }}
            style={{ width: "300px" }}
            src={listing.images[2]}
            alt="Caffe Latte"
          />

          <Stack style={{width: '100%'}}>
            <CardBody style={{paddingBottom: 0}}>
              <div>
                <p>
                  <Heading size="lg">{listing.title}</Heading>
                  <Heading size="md">£{listing.monthly_price}</Heading>
                </p>
              </div>
              <div>
                <p>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> &nbsp;
                  {listing.address.second_line}, {listing.address.city}
                </p>
              </div>
              {/* <br /> */}
              <div>
                <p>
                  {listing.key_features.beds}
                  &nbsp;
                  <FontAwesomeIcon icon={faBed} />
                  &nbsp; &nbsp;
                  {listing.key_features.bathrooms}
                  &nbsp;
                  <FontAwesomeIcon icon={faBath} />
                </p>
              </div>
              {/* <br /> */}
              <p>Available now (L/S)</p>
            </CardBody>

            <CardFooter  style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              {/* <div> */}
                <Button
                  variant="solid"
                  //   colorScheme="blue"
                  style={{
                    color: "white",
                    backgroundColor: "#1677ff",
                    // marginBottom: "60px",
                    // marginTop: "-30px",
                  }}
                  onClick={() => showListingsInfo(listing.id)}
                  >
                  More info
                </Button>
                {favIds.includes(listing.id) ? 
                  <StarFilled className="custom-icon" onClick={() => handleFav(listing.id)} /> :
                  <StarOutlined className="custom-icon" onClick={() => handleFav(listing.id)}/>
                }
            {/* </div> */}
            </CardFooter>
          </Stack>
          <br></br>
        </Card>
      ))}
    </>
  );
};

export default SearchResultPage;
