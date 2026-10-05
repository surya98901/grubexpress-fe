import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { signInData } from "@/types/AuthFormData";
import useSignIn from "@/hooks/use-signIn";


const SignIn = ({ userType }: { userType: string }) => {
  const [formData, setFormData] = useState<signInData>({
    emailId: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const signIn = useSignIn(formData, userType);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmission = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!formData.emailId || !formData.password) {
      setError("Email and password are required");
      return;
    }
    const result = await signIn();
    if (result) {
      setError(result);
    }
    
  };
  return (
    <div className="flex flex-col w-[100vw] items-center justify-center bg-green-700 p-4 h-[90vh]">
      <FieldSet className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur-md">
        <FieldLegend className="mb-6 text-center text-5xl font-bold tracking-tight text-zinc-100 bg-black p-2 rounded-lg">
          {userType} Sign In
        </FieldLegend>

        <form onSubmit={onSubmission} className="space-y-4">
          <FieldGroup className="space-y-2">
            <Field className="space-y-1.5">
              <FieldLabel
                htmlFor="email"
                className="text-xs font-medium uppercase tracking-wider text-zinc-400"
              >
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                className="border-zinc-800 bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-400"
                name="emailId"
                value={formData.emailId}
                onChange={handleInput}
              />
            </Field>

            <Field className="space-y-1.5">
              <div className="flex items-center justify-between">
                <FieldLabel
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-400"
                >
                  Password
                </FieldLabel>
                <a
                  href="#"
                  className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="border-zinc-800 bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-400"
                name="password"
                value={formData.password}
                onChange={handleInput}
              />
            </Field>
          </FieldGroup>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full mt-2 bg-zinc-100 font-medium text-zinc-900 hover:bg-zinc-200 transition-colors"
          >
            Continue
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link to={`/auth?mode=signup&role=${userType}`}>
            <p className="font-medium text-zinc-300 hover:underline">
              Create one
            </p>
          </Link>
        </p>
      </FieldSet>
    </div>
  );
};
export default SignIn;
