import React, { useState } from "react";
import { Layout, Space } from "antd";
import { Card, Col, Row, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const { Footer } = Layout;
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};
const cardData = [
  {
    title: "Listing 1",
    content: <img src="./house.png" alt="Listing 1" width="100px" />,
  },
  {
    title: "Listing 2",
    content: <img src="./house.png" alt="Listing 2" width="100px" />,
  },
  {
    title: "Listing 3",
    content: <img src="./house.png" alt="Listing 3" width="100px" />,
  },
  {
    title: "CaListingrd 4",
    content: <img src="./house.png" alt="Listing 4" width="100px" />,
  },
];

const RecentListingsComponent = () => {
  const [start, setStart] = useState(0); // Index of the first visible card
  const [end, setEnd] = useState(3); // Index of the last visible card
  const [visible, setVisible] = useState([true, true, true, true]);

  const onClose = (i) => {
    const newVisible = [...visible];
    newVisible[i] = false;
    setVisible(newVisible);
    // Check if the closed card is at the start or end of the visible range
    if (i === start && start < end) {
      setStart(start + 1);
    } else if (i === end - 1 && start < end) {
      setEnd(end - 1);
    }
  };

  // Function to handle click of the "Next" button
  const handleNext = () => {
    if (end < 4) {
      // Check if there are more cards to show
      setStart(start + 1);
      setEnd(end + 1);
    }
  };

  // Function to handle click of the "Previous" button
  const handlePrev = () => {
    if (start > 0) {
      // Check if there are more cards to show
      setStart(start - 1);
      setEnd(end - 1);
    }
  };
  return (
    <>
      <Row gutter={16} justify="center" style={{ marginBottom: 24 }}>
        {cardData.map((card, i) => {
          if (i >= start && i < end && visible[i]) {
            // Show cards only within the start and end range and if the corresponding visible state is true
            return (
              <Col span={6} key={i}>
                <Card
                  title={card.title}
                  bordered={false}
                  style={{ width: 200, height: 180 }}
                  // extra={<CloseOutlined onClick={() => onClose(i)} />}
                >
                  {card.content}
                </Card>
              </Col>
            );
          }
          return null;
        })}
      </Row>
      <Row justify="center">
        <Col>
          <Button onClick={handlePrev} disabled={start === 0}>
            {"<"}
          </Button>
        </Col>
        <Col>
          <Button onClick={handleNext} disabled={end === 4}>
            {">"}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default RecentListingsComponent;
