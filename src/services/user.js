
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

    const { res } = await supabase
    .from('profiles')
    .insert({ email, name, user_id: data.user.id })

    console.log("Registration result: ", {data, error})
    return data.user
  }

  async login(supabase, email, password){
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    console.log("Login result: ", {data, error})
    return data.user
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
