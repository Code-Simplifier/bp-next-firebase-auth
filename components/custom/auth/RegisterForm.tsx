"use client";

// NEXT
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ACTIONS
import { createUser } from "@/actions/auth";

// FORM
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas";

// UI
import { Icon } from "@iconify/react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

type FormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormData) {
    setIsSubmitting(true);

    try {
      createUser(values).then((response) => {
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

          router.push("/");
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
          register
        </h1>
        <br />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          <div className="h-[1px] w-[42%] bg-zinc-300" />
          <Link
            href={"/"}
            className="text-zinc-500 hover:underline underline-offset-4"
          >
            or login
          </Link>
          <div className="h-[1px] w-[42%] bg-zinc-300" />
        </div>
        <br />
        <Button type="submit" className="w-full">
          {isSubmitting ? (
            <Icon
              icon="system-uicons:loader"
              className="animate-spin text-background text-xl"
            />
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
}
