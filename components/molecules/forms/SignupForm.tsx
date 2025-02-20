"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "@/components/atoms/inputs/TextInput";
import { Button } from "@/components/atoms/buttons/Button";
import { useRouter } from "next/navigation";
import { signup } from "@/services/auth";

interface SignupFormData {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormProps {
  token: string;
}

export const SignupForm = ({ token }: SignupFormProps) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignupFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError("");
      const signupData = {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        token,
      };
      await signup(signupData);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Wystąpił nieoczekiwany błąd");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-error-50/10 text-error-500 p-3 rounded-lg text-sm border border-error-500/20">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Imię"
          {...register("firstName", {
            required: "Imię jest wymagane",
          })}
          error={errors.firstName}
        />

        <TextInput
          label="Nazwisko"
          {...register("lastName", {
            required: "Nazwisko jest wymagane",
          })}
          error={errors.lastName}
        />
      </div>

      <TextInput
        type="password"
        label="Hasło"
        {...register("password", {
          required: "Hasło jest wymagane",
          minLength: {
            value: 8,
            message: "Hasło musi mieć co najmniej 8 znaków",
          },
        })}
        error={errors.password}
      />

      <TextInput
        type="password"
        label="Potwierdź hasło"
        {...register("confirmPassword", {
          required: "Potwierdzenie hasła jest wymagane",
          validate: (value) =>
            value === password || "Hasła muszą być identyczne",
        })}
        error={errors.confirmPassword}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Rejestracja..." : "Zarejestruj się"}
      </Button>
    </form>
  );
};
