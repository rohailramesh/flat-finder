import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const ListingInfo = ({ listing, setSelectedListing }) => {
  return (
    <div>
      <h1>{listing.title}</h1>
      <Button onClick={() => setSelectedListing(false)}>Return</Button>
    </div>
  );
};

export default ListingInfo;
