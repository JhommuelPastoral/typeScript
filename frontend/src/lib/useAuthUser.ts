import { useQuery } from "@tanstack/react-query";
import { myProfile } from "../lib/api";

export default function useAuthUser() {

  const userAuth = useQuery({
    queryKey: ["authUser"],
    queryFn: myProfile,
    retry: false
  })

  return{authData: userAuth.data, authLoading: userAuth.isLoading, authError: userAuth.error}
  
}