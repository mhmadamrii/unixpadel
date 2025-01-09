"use client";

import * as z from "zod";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/LoadingIndicator";
import { api } from "~/trpc/react";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z.object({
  name: z.string(),
  sales_email: z.string(),
  target_sales: z.coerce.number().min(100).max(10000),
});

export function FormSales() {
  const utils = api.useUtils();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sales_email: "",
      target_sales: 0,
    },
  });

  const { mutate, isPending } = api.sales.createSales.useMutation({
    onSuccess: () => {
      toast.success("Successfully create sales");
      form.reset();
      utils.invalidate();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      mutate({
        name: values.name,
        email: values.sales_email,
        target: values.target_sales,
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Sales
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Sales</DialogTitle>
          <DialogDescription asChild>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 py-3"
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
                          placeholder="mehmet"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Sales name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sales_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="mehmet@gmail.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Sales email</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="target_sales"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="$45.000"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Target sales per month</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  {isPending ? <Spinner /> : "Submit"}
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
