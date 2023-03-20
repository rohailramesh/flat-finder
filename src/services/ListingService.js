import Listing from "@/models/Listing"

export default class ListingService {


  url = 'http://127.0.0.1:3001'

  constructor() {}

  /**
   * @returns {Listing[]} an array of Listing objects
   */
  async getListings() {
    const response = await fetch(`${url}/listing`)
    console.log(response)
    return response
  }
}