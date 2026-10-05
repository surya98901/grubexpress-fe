import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { signUpData } from "@/types/AuthFormData";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSignUp from "@/hooks/use-signUp";
import { signUpFormValidation } from "@/assets/utils/helpers";

const SignUp = ({ userType }: { userType: string }) => {
  const [formData, setFormData] = useState<signUpData>({
    firstName: "",
    lastName: "",
    userName: "",
    phone: "",
    emailId: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const signUp = useSignUp(formData, userType);

  const onSubmission = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const validationError = signUpFormValidation({
      ...formData,
    });

    if (validationError) {
      setError(validationError);
      return;
    }
    const result = await signUp();
    if (result) {
      setError(result);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex flex-col w-full items-center justify-center bg-black p-4 h-[90vh]">
      <FieldSet className="w-[40vw] rounded-xl border border-zinc-500 bg-zinc-900/60 p-6 shadow-2xl gap-2 backdrop-blur-xl">
        <FieldLegend className="mb-1 text-center text-5xl font-bold tracking-tight text-zinc-100 bg-black p-2 rounded-lg">
          Sign up
        </FieldLegend>

        <form onSubmit={onSubmission} className="space-y-4">
          <FieldGroup className="space-y-1">
            <section className="flex gap-2 ">
              <Field className="space-y-1">
                <FieldLabel
                  htmlFor="first-name"
                  className="text-xs font-medium tracking-wider text-zinc-400"
                >
                  First Name
                </FieldLabel>
                <Input
                  id="first-name"
                  placeholder="First Name"
                  className="border-zinc-800 bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-400"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Field>
              <Field className="space-y-1">
                <FieldLabel
                  htmlFor="last-Name"
                  className="text-xs font-medium tracking-wider text-zinc-400"
                >
                  Last Name
                </FieldLabel>
                <Input
                  id="last-Name"
                  placeholder="Last Name"
                  className="border-zinc-800 bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-400"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Field>
            </section>

            <Field className="space-y-1">
              <FieldLabel
                htmlFor="user-name"
                className="text-xs font-medium tracking-wider text-zinc-400"
              >
                user Name
              </FieldLabel>
              <Input
                id="user-Name"
                placeholder="User Name"
                className="border-zinc-800 bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-400"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </Field>
            <Field className="space-y-1">
              <FieldLabel
                htmlFor="phno"
                className="text-xs font-medium tracking-wider text-zinc-400"
              >
                phone
              </FieldLabel>
              <Input
                id="phno"
                placeholder="phone"
                className="border-zinc-800 bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-400"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Field>
            <Field className="space-y-1">
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
                onChange={handleChange}
              />
            </Field>

            <Field className="space-y-1">
              <div className="flex items-center justify-between">
                <FieldLabel
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-400"
                >
                  Password
                </FieldLabel>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="border-zinc-800 bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-400"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
          already have an account?
          <Link to={`/auth?mode=signin&role=${userType}`}>
            <span className="font-medium text-zinc-300 hover:underline">
              signin
            </span>
          </Link>
        </p>
      </FieldSet>
    </div>
  );
};
export default SignUp;
