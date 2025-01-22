"use client"
import AuthForm from "@/components/AuthForm"
import { signInWithCredentials } from "@/lib/actions/auth"
import { signinSchema } from "@/lib/validations"
import React from "react"

const Page = () => (
  <AuthForm
    type="SIGN_IN"
    defaultValues={{
      email: "",
      password: "",
    }}
    schema={signinSchema}
    onSubmit={signInWithCredentials}
  />
)

export default Page
