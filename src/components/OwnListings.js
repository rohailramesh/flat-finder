// import { Card } from "antd";
import React from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Empty } from 'antd'
const contentStyle = {
  height: "160px",
  //   width: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  display: "flex",
  maxWidth: "max-content",
};
import { Divider, Space, Tag } from "antd";
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
import { items } from "@/utils";

function OwnListings ({ ownListings }) {

  const [dotPosition, setDotPosition] = useState("left");
  const [indexC1, setIndexC1] = useState(0);
  const [indexC2, setIndexC2] = useState(0);
  const [indexC3, setIndexC3] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndexC1(selectedIndex);
  };
  return (
    <div>
      <Divider
        orientation="middle"
        style={{
          textAlign: "left",
          fontFamily: "IBM_Plex_Serif",
          fontSize: "18px",
        }}
      >
        Own listings
      </Divider>
      <div style={{ display: "flex", marginLeft: "-8px", textAlign: "center", justifyContent: 'center' }}>
        {!ownListings.length ?
          <Empty description={<p style={{color: 'gray'}}>Personal listings will show here</p>} /> 
          : ownListings.slice(0, 3).map((listing) => (
            <Carousel
            style={{
              width: "350px",
                padding: "5px",
                overflow: "scroll",
                whiteSpace: "nowrap",
              }}>
            
            <Carousel.Item activeIndex={indexC1} onSelect={handleSelect}>
              <img
                className="d-block w-150"
                src={listing.images[0]}
                alt="First slide"
                style={{ width: "500px", height: "200px" }}
              />
              <Carousel.Caption>
                <p>{listing.title}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item activeIndex={indexC2} onSelect={handleSelect}>
              <img
                className="d-block w-100"
                src={listing.images[1]}
                alt="Second slide"
                style={{ width: "500px", height: "200px" }}
              />

              <Carousel.Caption>
                <p>£{listing.monthly_price}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item activeIndex={indexC3} onSelect={handleSelect}>
              <img
                className="d-block w-100"
                src={listing.images[2]}
                alt="Third slide"
                style={{ width: "500px", height: "200px" }}
              />

              <Carousel.Caption>
                {/* <p>{listing.address.postcode}</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        ))}
      </div>
    </div>
  );
};

export default OwnListings;

