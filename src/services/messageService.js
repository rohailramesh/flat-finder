export default class MessageService {

    url = "https://flat-finder-server.onrender.com";

    async addMessage(sender_id, content, recipient_id){
        const data = await fetch(`${this.url}/conversation/${sender_id}/${recipient_id}`)
        const conversation = await data.json()
        console.log({conversation})
        const response = await fetch(`${this.url}/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ conversation_id: conversation.id, content, sender_id })
        })

        
        if(response.ok){
            const result = await response.json()
            return result
        }

        return response
    }

    async getConversationById(conversation_id){
        try{
            const data = await fetch(`${this.url}/conversation?conversation_id=${conversation_id}`) 
            const conversation = await data.json()
            return conversation
        } catch (error){
            console.log("Error getting conversation 🔴🔴: ", error)
        }
    }

    async getMessage() {
        const response = await fetch(`${this.url}/message`)

        if(response.ok){
            const message = await response.json()
            return message
        }

        return response
    }

}