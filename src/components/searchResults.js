// import { Card } from "antd";
import React from "react";
import Listing from "@/models/Listing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ListingInfo from "./ListingInfo";
import FavListings from "./FavListings";
import SearchListingCard from "./SearchListingCard";

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
import { Empty, Pagination } from "antd";
import FavListingService from "@/services/FavListingService";
import { useDispatch, useSelector } from "react-redux";
import { addFavListing, unfavListing } from "@/redux/favListingSlice";
const SearchResultPage = (props) => {

  // const [selectedListing, setSelectedListing] = useState(null);
  const selectedListing = useSelector(state => state.selectedListing)
  const { listings, setFavListings, user_id, forum } = props;
  const [sliceIndex, setSliceIndex] = useState(3);

  const searchedListings = listings.filter(
    (listing) => listing.address.city == props.searchValue
  );


  async function handlePagination(pageNumber, pageSize) {
    console.log({ pageNumber, pageSize });
    setSliceIndex(pageNumber * 3);
  }
  return (
    <>
      {Object.keys(selectedListing).length ? (
        <ListingInfo
          listing={selectedListing}
          userId={user_id}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "90%",
            gap: "1rem",
          }}
        >
          <div
            style={{
              /* flexGrow: 1, */ display: "flex",
              flexDirection: "column",
              marginBottom: "5rem",
            }}
          >
            {!props.searchValue ? (
              <Empty
                description={
                  <p style={{ color: "gray" }}>Search for something :D</p>
                }
              />
            ) : !searchedListings.length ? (
              <Empty
                description={
                  <p style={{ color: "gray" }}>
                    No listings in {props.searchValue}
                  </p>
                }
              />
            ) : (
              searchedListings
                .slice(sliceIndex - 3, sliceIndex)
                .map((listing) => (<SearchListingCard listing={listing}/>)))}
          </div>
          <Pagination
            /* style={{justifySelf: 'flex-end'}} */ style={{
              position: "absolute",
              bottom: "5.5rem",
            }}
            defaultCurrent={1}
            current={sliceIndex/3}
            defaultPageSize={3}
            total={searchedListings.length}
            onChange={handlePagination}
          />
        </div>
      )}
    </>
  );
};

export default SearchResultPage;
