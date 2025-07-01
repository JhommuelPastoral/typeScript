import { Button } from "@/components/ui/button"
import { logOut } from "../lib/api.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
export default function Dashboard() {
  const queryClient = useQueryClient();
  const{mutate:logOutUser} = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      toast.success("Logout Successful");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    },
  });
  // const handleOnChange = (e: React.KeyboardEvent<HTMLInputElement>) =>{

  // }
  return (
    <div>
      Hello World
      {/* <input type="text" onKeyDown={handleOnChange} /> */}
      <Button onClick={()=>{logOutUser()}}>Log Out</Button>
    </div>
  )
}
