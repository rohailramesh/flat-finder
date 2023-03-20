import Listing from "@/models/Listing"

export default class ListingService {


  url = 'http://127.0.0.1:3001'

  constructor() {}

  /**
   * @returns {Promise<Listing[]>} an array of Listing objects
   */
  async getListings() {
    const response = await fetch(`${url}/listing`)
    console.log(response)
    return response
  }

  /**
   * @param {Listing} listing - a listing object! 
   * @returns {Promise}
   */
  async addListing(listing) {
    const response = await fetch(`${url}/listing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(listing)
    })

    return response
  }




}