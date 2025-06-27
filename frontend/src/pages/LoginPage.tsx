import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import React, { useState  } from "react"
import type { UserCredentials } from "../interfaces/Interface"
import { Link } from "react-router"
import toast from "react-hot-toast"
import { login } from "@/lib/api.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GalleryVerticalEnd, LoaderCircle  } from 'lucide-react';

export default function SignUpPage() {

  const [credentials, setCredentials] = useState<UserCredentials> ({
    email: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const{mutate:loginUser, isPending} = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login Successful");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
      setCredentials({email: "", password: ""})
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault()
    if(!credentials.email || !credentials.password) {
      toast.error("Enter Valid Credentials")
      return 
    }
    loginUser({email: credentials.email, password: credentials.password})
  }


  return (
    <div className="flex items-center justify-center w-screen h-screen " >
      <div className="w-full max-w-md space-y-5 font-Rubik">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2 ">
          <GalleryVerticalEnd className="" />
          <h4 className="text-lg font-semibold tracking-tight">
            Welcome to Acme Inc.
          </h4>
          <div className="flex items-center gap-2 ">
            <p className="text-sm ">Do&apos;nt have an account yet?  </p>
            <Link to="/signup" className="text-sm underline underline-offset-4">Sign Up</Link> 
          </div>
        </div>
        <form action="" className="space-y-5" onSubmit={handleSubmit} >
          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" required placeholder="Email" value={credentials.email} onChange={(e) => setCredentials((prev)=> ({...prev, email: e.target.value}))}/>
          </div>
          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" required placeholder="Password" value={credentials.password} onChange={(e) => setCredentials((prev)=> ({...prev, password: e.target.value}))}  />
          </div>
          <Button className="w-full cursor-pointer" type="submit" disabled={isPending}>{isPending ? <div className="flex items-center gap-2">  <LoaderCircle className="animate-spin" /> Logging in ... </div> :'Login' }</Button>
        </form> 
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-sm text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div> 
        <Button variant="outline" className="flex w-full gap-2 cursor-pointer">  Continue with Google</Button>
      </div>
    </div>
  )
}
