"use client";

import { Button } from "@/components/atoms/buttons/Button";
import { TextInput } from "@/components/atoms/inputs/TextInput";
import { useForm } from "react-hook-form";

interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordForm() {
  const { register, handleSubmit } = useForm<ChangePasswordFormData>();

  const onSubmit = (data: ChangePasswordFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <div className="flex flex-col gap-4">
        <TextInput {...register("oldPassword")} placeholder="Stare hasło" />
        <TextInput {...register("newPassword")} placeholder="Nowe hasło" />
        <TextInput
          {...register("confirmPassword")}
          placeholder="Powtórz nowe hasło"
        />
      </div>
      <Button type="submit">Zapisz</Button>
    </form>
  );
}
