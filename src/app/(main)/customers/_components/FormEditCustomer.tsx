"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { Spinner } from "~/components/LoadingIndicator";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  company_name: z.string(),
  is_active: z.boolean(),
});

export function FormEditCustomer({
  id,
  name,
  email,
  isActive,
  company_name,
}: {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  company_name: string;
}) {
  const [selectedId, setSelectedId] = useState("");

  const utils = api.useUtils();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name,
      email,
      is_active: isActive,
      name,
    },
  });

  const { mutate, isPending } = api.customer.updateCustomer.useMutation({
    onSuccess: () => {
      toast.success("Successfully edit customer");
      utils.invalidate();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      mutate({
        id: selectedId,
        name: values.name,
        email: values.email,
        isActive: values.is_active,
        company: values.company_name,
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  // useEffect(() => {
  //   if (selectedId === id) {
  //     refetch();
  //   }
  // }, [selectedId]);
  useEffect(() => {
    if (selectedId === id) {
      form.setValue("name", name);
    }
  }, [name]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => setSelectedId(id)} variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Customer {name}</DialogTitle>
          <DialogDescription asChild>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 py-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Aleyna"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Customer's name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="aleyna@gmail.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Customer's email</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="unixpadel"
                          type=""
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Customer's company name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Is Customer Active</FormLabel>
                        <FormDescription>
                          Enable switch if customer active
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  {isPending ? <Spinner /> : "Edit"}
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
