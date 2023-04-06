import FavListingService from "./FavListingService";
import MessageService from "./messageService";
import UserService from "./UserService";

const favListingSevice = new FavListingService();
const userService = new UserService();
const messageService = new MessageService();

export { favListingSevice, userService, messageService };
