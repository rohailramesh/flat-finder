import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import UserService from "@/services/user";

export default function FlatifyDashboard() {

  const userService = new UserService()
  const supabase = useSupabaseClient()
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar_url: ''
  })

  useEffect(() => {
    (async () => {
      const user = await userService.getAuthUser(supabase)
      setUser({email: user.email, ...user.user_metadata})
    })()
  }, [])

  async function handleLogout() {
    const result = await userService.logout(supabase);
  }

  return (
    <div>
      <h1>NEW DASHBOARD WOOO</h1>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
      <h3></h3>
      <button onClick={handleLogout}>LOGOUT FAM XD</button>
    </div>
  );
}
