import FavListingService from "./FavListingService";
import MessageService from "./messageService";
import UserService from "./UserService";
import TicketService from "./TicketService";
import ListingService from "./ListingService";
import GoogleMapsService from "./GoogleMapsService";

const favListingSevice = new FavListingService();
const userService = new UserService();
const messageService = new MessageService();
const ticketService = new TicketService();
const listingService = new ListingService();
const googleMapsService = new GoogleMapsService();
const date = new Date();

export { favListingSevice, userService, messageService, ticketService, listingService, googleMapsService, date};
