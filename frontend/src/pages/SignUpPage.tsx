import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import React, { useState  } from "react"
import type { CreateUserCredentials, validatorError } from "../interfaces/Interface"
import { Link } from "react-router"
import toast from "react-hot-toast"
import { signUp, googleLogin } from "@/lib/api.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LoaderCircle  } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { SiThealgorithms } from "react-icons/si";
import validator from 'validator';
import {auth, signInWithPopup, provider} from '../../firebase/firebase.config.ts'



export default function SignUpPage() {

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

  const{mutate:signUpUser, isPending} = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Account Created Successfully");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
      setCredentials({email: "", password: "", confirmPassword: ""})
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handlleOnchangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev)=>({...prev, email: e.target.value}));
    if(!validator.isEmail(e.target.value)) {
      if(e.target.value == "") {
        setValidatorError((prev)=>({...prev, email: false}))
      }
      else{
        setValidatorError((prev)=>({...prev, email: true}))
      }
    } else {
      setValidatorError((prev)=>({...prev, email: false}))
    }
  }

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

  const {mutate:googleLoginUser, isPending:isPendingGoogle} = useMutation({
    mutationFn: googleLogin,
    onSuccess: () => {
      toast.success("Account Created Successfully");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
      setCredentials({email: "", password: "", confirmPassword: ""})
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email;
    if(email){
      googleLoginUser({email});
    }
  };


  return (
    <div className="flex items-center justify-center w-screen h-screen " >
      <div className="w-full max-w-md space-y-5 font-Rubik">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2 ">
          <SiThealgorithms size={50} color="red" />
          <h4 className="text-lg font-semibold tracking-tight">
            Create an account 
          </h4>
          <div className="flex items-center gap-2 ">
            <p className="text-sm ">Already have an account ?  </p>
            <Link to="/login" className="text-sm underline underline-offset-4">Log In</Link> 
          </div>
        </div>
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" required placeholder="Email" onChange={handlleOnchangeEmail} />
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
          <Button className="w-full cursor-pointer" type="submit" disabled={isPending || isPendingGoogle}>{isPending || isPendingGoogle ? <div className="flex items-center gap-2">  <LoaderCircle className="animate-spin" /> Creating Account... </div> :'Create Account' }</Button>
        </form> 
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-sm text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div> 
        <Button variant="outline" className="flex items-center w-full gap-2 cursor-pointer" disabled={isPendingGoogle || isPending} onClick={handleGoogleLogin}> <FcGoogle/> Continue with Google</Button>
      </div>
    </div>
  )
}
