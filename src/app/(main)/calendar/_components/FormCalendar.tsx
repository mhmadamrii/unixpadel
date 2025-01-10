"use client";

import SignatureInput from "~/components/ui/signature-input";

import { useRouter } from "next/navigation";
import { Spinner } from "~/components/LoadingIndicator";
import { Input } from "~/components/ui/input";
import { format } from "date-fns";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { useRef } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

const formSchema = z.object({
  sales_name: z.string().min(1),
  customer_name: z.string().min(1),
  date_event: z.coerce.date(),
  type_event: z.string().min(1),
  note: z.string().min(1),
  signature: z.string(),
  sales_amount: z.coerce.number(),
});

export function FormCalendar() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date_event: new Date(),
      type_event: "contact",
      note: "",
      signature: "",
      customer_name: "",
      sales_name: "",
      sales_amount: 0,
    },
  });

  const { mutate, isPending } = api.calendar.createEvent.useMutation({
    onSuccess: () => {
      toast.success("Successfully create event");
      form.reset();
      router.refresh();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      mutate({
        sales_name: values.sales_name,
        customer_name: values.customer_name,
        date_event: values.date_event,
        type_event: values.type_event,
        note: values.note,
        amount: values.sales_amount,
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const { data: calendarEvents } = api.sales.getCalendarEvents.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Event</CardTitle>
        <CardDescription>Create an event for your customer</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-full space-y-3 py-3"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="sales_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sales Name</FormLabel>
                      <Select
                        value={field.value}
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {calendarEvents?.sales.map((sale) => (
                            <SelectItem key={sale.id} value={sale.id}>
                              {sale.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Sales name who making an event
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="customer_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer</FormLabel>
                      <Select
                        value={field.value}
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {calendarEvents?.customers.map((customer) => (
                            <SelectItem
                              key={customer.id}
                              value={`${customer.company}`}
                            >
                              {customer.name} - {customer.company}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Customer name who follows up the sales
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="date_event"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date Event</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={isPending}
                              variant={"outline"}
                              className={cn(
                                "w-full text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        When this event happened
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="type_event"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Event</FormLabel>
                      <Select
                        value={field.value}
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Visit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="contact">Contact</SelectItem>
                          <SelectItem value="visit">Visit</SelectItem>
                          <SelectItem value="po">Purchase Order</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select type of event you will add
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Note</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Our Telemarketing following up the customer"
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add additional note for this event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full flex-col justify-end gap-2 sm:flex-row">
              <div>
                <FormField
                  control={form.control}
                  name="sales_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sales Amount</FormLabel>
                      <FormControl>
                        <Input
                          disabled={form.getValues("type_event") !== "po"}
                          placeholder="$200"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        How many sales has achieved?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-end justify-end">
                <FormField
                  control={form.control}
                  name="signature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Signature Approval</FormLabel>
                      <FormControl>
                        <SignatureInput
                          canvasRef={canvasRef}
                          onSignatureChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Please sign here to verify it's a valid
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full sm:w-[100px]" type="submit">
                  {isPending ? <Spinner /> : "Create Event"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
