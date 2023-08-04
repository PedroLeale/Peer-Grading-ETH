import { type SubmitHandler, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

import axios from "axios";
import { signTypedData } from "@wagmi/core";
import { domain, types } from "@/types/signUpTypedData";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/services/contexts/AuthContext/context";
import { useAccount } from "wagmi";
import { ColoredBadge } from "../ColoredBadge";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  signature: string;
}

export default function SignUpForm() {
  const { address } = useAccount();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IFormInput>();

  const { login } = useAuth();

  const onSubmit: SubmitHandler<IFormInput> = async (data, e) => {
    e?.preventDefault();
    try {
      const signature = await signTypedData({
        domain,
        value: {
          ...data,
        },
        types,
      });
      data.signature = signature;

      const res = await axios.post("/api/sign-up", data);

      login(res.data.jwt);
      // Set a cookie

      toast.success("signed up!");
    } catch (e: any) {
      if (e.response.data.error) {
        toast.error(e.response.data.error);
        return;
      }
      if (e.message) toast.error(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-2">
        <span>
          your current connected wallet below will be associated to your account
          and used for login:
        </span>
        <div>
          <ColoredBadge>{address}</ColoredBadge>
        </div>
      </div>

      <FormControl isInvalid={!isValid}>
        <FormLabel htmlFor="name">First name</FormLabel>
        <Input
          id="name"
          placeholder="first name"
          {...register("firstName", {
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </FormErrorMessage>

        <FormLabel htmlFor="lastName">Last name</FormLabel>
        <Input
          id="lastName"
          placeholder="last name"
          {...register("lastName", {
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </FormErrorMessage>

        <FormLabel htmlFor="lastName">email</FormLabel>
        <Input
          id="email"
          placeholder="email"
          {...register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.email && <span>{errors.email.message}</span>}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
