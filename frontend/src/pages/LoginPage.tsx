import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import React, { useState  } from "react"
import type { UserCredentials } from "../interfaces/Interface"
import { Link } from "react-router"
export default function LoginPage() {

  const [credentials, setCredentials] = useState<UserCredentials> ({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault()
    if(!credentials.email || !credentials.password) {
      console.log("Please enter email and password")
      return 
    }
  }


  return (
    <div className="flex items-center justify-center w-screen h-screen border" >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to="/signup">
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={credentials.email}
                  onChange={(e) => setCredentials((prev) => ({...prev, email: e.target.value}))}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="inline-block ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" 
                  type="password" 
                  required
                  onChange={(e) => setCredentials((prev) => ({...prev, password: e.target.value}))}
                  value={credentials.password}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col ">
          <Button variant="secondary" className="w-full" >
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
