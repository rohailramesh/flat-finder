import { Ticket } from "@/models/Ticket";

export default class TicketService{

    url = 'http://127.0.0.1:3001'

    constructor() {}

    async addTicket(title, content){
        const response = await fetch(`${this.url}/ticket`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, 
                content
            })
        })
        
        return response
    }

}