
export default class User {
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

    console.log({data, error})
    return data
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
