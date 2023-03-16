import { headers } from "../../next.config";

export default class User {
  constructor() {}

  async register(name, email, password) {
    const response = await fetch("http://127.0.0.1:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (response.ok) {
      const data = await response.json();

      console.log("Successful");
      return data;
    } else {
      console.log("Error");
    }
  }
}
