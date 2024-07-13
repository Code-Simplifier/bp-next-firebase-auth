"use client";

// NEXT
import { useState } from "react";
import Link from "next/link";

// ACTIONS
import { authenticateUser } from "@/actions/auth";

// FORM
import { z } from "zod";
import { loginSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// UI
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormData) {
    setIsSubmitting(true);
    try {
      authenticateUser(values).then((response) => {
        if (response.error) {
          form.reset();
          toast({
            title: "Error",
            description: response.error,
            variant: "destructive",
          });
          setIsSubmitting(false);
        } else {
          form.reset();
          toast({
            title: "Success",
            description: response.success,
          });
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[40%]"
      >
        <h1 className="text-center text-4xl font-thin uppercase tracking-wide">
          login
        </h1>
        <br />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br />
        <div className="flex items-center space-x-4">
          <div className="h-[1px] w-[40%] bg-zinc-300" />
          <Link
            href={"/register"}
            className="text-zinc-500 hover:underline underline-offset-4"
          >
            or register
          </Link>
          <div className="h-[1px] w-[40%] bg-zinc-300" />
        </div>
        <br />
        <Button type="submit" className="w-full">
          {isSubmitting ? (
            <Icon
              icon="system-uicons:loader"
              className="animate-spin text-background text-xl"
            />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
