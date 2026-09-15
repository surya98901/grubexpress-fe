import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Signin = () => {
  const [isUserSignIn, setIsUserSignIn] = useState(true);
  const switchSignIn = () => {
    setIsUserSignIn(!isUserSignIn);
  };
  return (
    <div className="flex flex-col h-full w-[100vw] items-center justify-center bg-green-700 p-4">
      <Button onClick={switchSignIn} className="bg-black font-bold  border border-black hover:bg-green-700 border-2 p-2 px-5 rounded-lg text-white hover:text-black">
        user sign in
      </Button>
      {isUserSignIn ? userSignIn() : adminSignIn()}
    </div>
  );
};

const adminSignIn =()=>{
return (
   <FieldSet className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur-md">
        <FieldLegend className="mb-6 text-center text-5xl font-bold tracking-tight text-zinc-100 bg-black p-2 rounded-lg">
          Admin Sign In
        </FieldLegend>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
              />
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            className="w-full mt-2 bg-zinc-100 font-medium text-zinc-900 hover:bg-zinc-200 transition-colors"
          >
            Continue
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-medium text-zinc-300 hover:underline">
            Create one
          </a>
        </p>
      </FieldSet>
)
}
const userSignIn = ()=>{
return (
  <FieldSet className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur-md">
        <FieldLegend className="mb-6 text-center text-5xl font-bold tracking-tight text-zinc-100 bg-black p-2 rounded-lg">
          Sign In
        </FieldLegend>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
              />
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            className="w-full mt-2 bg-zinc-100 font-medium text-zinc-900 hover:bg-zinc-200 transition-colors"
          >
            Continue
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-medium text-zinc-300 hover:underline">
            Create one
          </a>
        </p>
      </FieldSet>
)
}

export default Signin;