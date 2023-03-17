
import User from "@/models/User"

export default class UserService {
  constructor() {}

  async register(supabase, name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      //options specifies "user_metadata" property
      options: {
        data: {
          name,
      }
    }
    })
    const response = await supabase
    .from('profiles')
    .insert({ email, name, user_id: data.user.id, last_sign_in_at: data.user.last_sign_in_at }).select().eq("user_id", data.user.id)
    
    const user_data = response.data[0]
    const user = new User(user_data)
    console.log("Inserted profile, got back: ", response, " and a user: ", user_data)
    // console.log("Registration result: ", {data, error}

    return user
  }

  async login(supabase, email, password){
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    // const response = await supabase.from('profiles').update({ last_sign_in_at: data.user.last_sign_in_at }).eq('id', data.user.id)
    // console.log("Here is the response: ", response)
    // const user_data = response.data[0]
    const user = new User(data.user)
    // console.log("Inserted profile, got back: ", response, " and a user: ", user_data)
    return user
  }

  async getAuthUser(supabase){
    const { data } = await supabase.auth.getUser()
    console.log({data})
    return data.user;
  }

  async logout(supabase) {
    const { error } = await supabase.auth.signOut()
  }
}
