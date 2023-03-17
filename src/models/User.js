export default class User {

    id;
    name;
    email;
    avatar_url;
    last_sign_in_at;
    // message_inbox;

    constructor(user) {
        this.id = user.id
        this.name = user.name
        this.email = user.email
        this.avatar_url = user.avatar_url
        this.last_sign_in_at = user.last_sign_in_at
        // this.message_inbox = user.message_inbox
    }

}