// import { Card } from "antd";
import React from "react";
import Listing from "@/models/Listing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
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
  Collapse,
} from "@chakra-ui/react";
import { useState } from "react";
import ListingInfo from "./ListingInfo";
const SearchResultPage = (props) => {
  const [selectedListing, setSelectedListing] = useState(null);
  const listings = props.listings;
  console.log(listings);
  const displayListings = listings.map((listing) => listing);
  return (
    <>
      {selectedListing ? (
        <ListingInfo
          listing={selectedListing}
          setSelectedListing={setSelectedListing}
        />
      ) : (
        displayListings.slice(0, 3).map((listing) => (
          <Card
            key={listing.id}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            style={{ marginTop: "20px" }}
          >
            <Image
              objectFit="cover"
              // maxW={{ base: "100%", lg: "150px" }}
              style={{ width: "300px" }}
              src={listing.images[2]}
              alt="Caffe Latte"
            />

            <Stack>
              <CardBody>
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
                <br />
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
                <br />
                <p>Available now (L/S)</p>
              </CardBody>

              <CardFooter>
                <Button
                  variant="solid"
                  //   colorScheme="blue"
                  style={{
                    color: "white",
                    backgroundColor: "#1677ff",
                    // marginBottom: "60px",
                    // marginTop: "-30px",
                  }}
                  onClick={() => setSelectedListing(listing)}
                >
                  More info
                </Button>
              </CardFooter>
            </Stack>
            <br></br>
          </Card>
        ))
      )}
    </>
  );
};

export default SearchResultPage;
