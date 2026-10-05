import type { signUpData } from "@/types/AuthFormData";
export function signUpFormValidation(formData: signUpData): string | null {
  const { firstName, lastName,phone, emailId, password } = formData;
  Object.entries(formData).forEach(([key, value]) => {
    if (!value) {
      return `${key} is required`;
    }
  });
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailId)) {
    return "Invalid email address";
  }
  if (!/^\d{10}$/.test(phone)) {
    return "Invalid phone number";
  }
  if (firstName && !/^[A-Z]+$/i.test(firstName.replace(/\s/g, ""))) {
    return "First name should only contain alphabets and spaces";
  }
  if (lastName && !/^[A-Z]+$/i.test(lastName.replace(/\s/g, ""))) {
    return "Last name should only contain alphabets";
  }
  if (emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) {
    return "Invalid email format";
  }
  if (
    password &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    )
  ) {
    return "Password must be between 6 and 20 characters and include at least one lowercase letter, one uppercase letter, and one number";
  }

  return null;
}
