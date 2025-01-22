"use client"
import AuthForm from "@/components/AuthForm"
import { signUp } from "@/lib/actions/auth"
import { signupSchema } from "@/lib/validations"
import React from "react"

const Page = () => (
  <AuthForm
    type="SIGN_UP"
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
      universityId: 0,
      universityCard: "",
    }}
    schema={signupSchema}
    onSubmit={signUp}
  />
)
export default Page
