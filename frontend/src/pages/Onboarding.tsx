import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import React, { useState  } from "react"
import type { CreateUserCredentials, validatorError } from "../interfaces/Interface"
import { Link } from "react-router"
import toast from "react-hot-toast"
import { createGoogleUser, logOut } from "@/lib/api.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LoaderCircle  } from 'lucide-react';
import { SiThealgorithms } from "react-icons/si";
import validator from 'validator';
import useAuthUser from "@/lib/useAuthUser"

export default function Onbaording() {
  const {authData} = useAuthUser();
  const [credentials, setCredentials] = useState<CreateUserCredentials> ({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [validatorError, setValidatorError] = useState<validatorError>({
    email: false,
    password: false,
    confirmPassword: false
  });

  const queryClient = useQueryClient();

  const{mutate:createGoogleUserData, isPending} = useMutation({
    mutationFn: createGoogleUser,
    onSuccess: () => {
      toast.success("Account Created Successfully");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
      setCredentials({email: "", password: "", confirmPassword: ""})
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const {mutate:logOutUser} = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })



  const handleOnchangePassword = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setCredentials((prev)=>({...prev, password: e.target.value}));
    if(!validator.isStrongPassword(e.target.value, {minLength: 6,minLowercase: 1,minUppercase: 1,minNumbers: 1, minSymbols:0})) {
      if(e.target.value == "") {
        setValidatorError((prev)=>({...prev, password: false}))
      }
      else{
        setValidatorError((prev)=>({...prev, password: true}))
      }
    } else {
      setValidatorError((prev)=>({...prev, password: false}))
    }
  }

  const handleOnchangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setCredentials((prev)=>({...prev, confirmPassword: e.target.value}));
    if(credentials.password !== e.target.value) {
      if(e.target.value == "") {
        setValidatorError((prev)=>({...prev, confirmPassword: false}))
      }
      else{
        setValidatorError((prev)=>({...prev, confirmPassword: true}))
      }
    } else {
      setValidatorError((prev)=>({...prev, confirmPassword: false}))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault()
    if(!credentials.password || !credentials.confirmPassword) {
      toast.error("Enter Valid Credentials")
      return 
    }
    if(credentials.password !== credentials.confirmPassword) {
      toast.error("Password do not match")
      return 
    }
    createGoogleUserData({password: credentials.password})
  }


  const handleRemoveCookie = () => {
    logOutUser();
  }


  return (
    <div className="flex items-center justify-center w-screen h-screen " >
      <div className="w-full max-w-md space-y-5 font-Rubik">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2 ">
          <SiThealgorithms size={50} color="red" />
          <h4 className="text-lg font-semibold tracking-tight">
            Finish setting up your account
          </h4>
          <div className="flex items-center gap-2 ">
            <p className="text-sm ">Already have an account ?  </p>
            <Link to="/login" className="text-sm underline underline-offset-4" onClick={handleRemoveCookie}>Log In</Link> 
          </div>
        </div>
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email"  placeholder="Email" disabled value={authData?.user?.email}  />
            <small className={`text-sm text-[rgb(207,10,10)] ${validatorError.email ? "block " : "hidden "}`}> Invalid Email Address</small>
          </div>
          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" required placeholder="Password" onChange={handleOnchangePassword} />
            <small className={`text-sm text-[rgb(207,10,10)]  ${validatorError.password ? "block " : "hidden "}`}> Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number</small>
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input type="password" id="confirmPassword" required placeholder="Confirm Password" onChange={handleOnchangeConfirmPassword} />
            <small className={`text-sm text-[rgb(207,10,10)]  ${validatorError.confirmPassword ? "block " : "hidden "}`}> Password do not match</small>
          </div>
          <Button className="w-full cursor-pointer" type="submit" disabled={isPending}>{isPending ? <div className="flex items-center gap-2">  <LoaderCircle className="animate-spin" /> Creating Account... </div> :'Create Account' }</Button>
        </form> 

      </div>
    </div>
  )
}
