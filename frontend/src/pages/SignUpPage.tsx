import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import React, { useState  } from "react"
import type { CreateUserCredentials } from "../interfaces/Interface"
import { Link } from "react-router"
import toast from "react-hot-toast"
import { signUp } from "@/lib/api.ts"
import { useMutation } from "@tanstack/react-query"
import { GalleryVerticalEnd } from 'lucide-react';

export default function SignUpPage() {

  const [credentials, setCredentials] = useState<CreateUserCredentials> ({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const{mutate:signUpUser} = useMutation({
    mutationFn: signUp,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault()
    if(!credentials.email || !credentials.password || !credentials.confirmPassword) {
      toast.error("Enter Valid Credentials")
      return 
    }
    if(credentials.password !== credentials.confirmPassword) {
      toast.error("Password do not match")
      return 
    }
    signUpUser({email: credentials.email, password: credentials.password})
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
            <p className="text-sm ">Already have an account ?  </p>
            <Link to="/login" className="text-sm underline underline-offset-4">Log In</Link> 
          </div>
        </div>
        <form action="" className="space-y-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" required placeholder="Email" onChange={(e) => setCredentials({...credentials, email: e.target.value})} />
          </div>
          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" required placeholder="Password" onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input type="password" id="confirmPassword" required placeholder="Confirm Password" onChange={(e) => setCredentials({...credentials, confirmPassword: e.target.value})} />
          </div>
          <Button className="w-full">Create Your Account</Button>
        </form> 
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-sm text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div> 
        <Button variant="outline" className="flex w-full gap-2">  Continue with Google</Button>
      </div>
    </div>
  )
}
