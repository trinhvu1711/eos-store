"use client";
import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/file-input";
import { Paperclip } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";
import { useSession } from "next-auth/react";

import { AlertModal } from "@/components/modal/alert-modal";
import { getAllRoles } from "@/lib/services/admin/data";
import { getAdminUser } from "@/lib/data";
import { Role } from "@/lib/type";
import { de } from "date-fns/locale";
export const IMG_MAX_LIMIT = 5;
const formSchema = z.object({
  status: z.string(),
  paid: z.string(),
  fullName: z.string(),
  phoneNumber: z.string(),
  trackingNumber: z.string().optional(),
  orderDate: z.string(),
});
type OrderFormValues = z.infer<typeof formSchema>;

interface OrderFormProps {
  initialData: any | null;
}
const API_BASE_URL = "http://localhost:8088/api/v1/users";

const statusDelivery = [
  { id: "pending", name: "Pending" },
  { id: "shipping", name: "Shipping" },
  { id: "delivered", name: "Delivered" },
  { id: "cancelled", name: "Cancelled" },
  ];
const statusPayment = [
  { id: "true", name: "Paid" },
  { id: "false", name: "Unpaid"}
]
  export const OrderForm: React.FC<OrderFormProps> = ({
    initialData,
  }) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const title = initialData ? "Edit order" : "Create order";
    const description = initialData ? "Edit a order." : "Add a new order";
    const toastMessage = initialData ? "order updated." : "order created.";
    const action = initialData ? "Update" : "Create";
    const [status, setStatus] = useState<string | null>(null);
    const [paid, setPaid] = useState<string>('');
    const defaultValues = initialData
      ? initialData
      : {
        id: "",
        fullName: "",
        phoneNumber: "",
        trackingNumber: "",
        status: "",
        orderDate:"",
        paid:  "false",
      };
    const form = useForm<OrderFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues,
    });
    console.log(defaultValues)
    const { data: session } = useSession();
    const token = session?.accessToken ?? '';
    const onSubmit = async (data: OrderFormValues) => {
      try {
        setLoading(true);

        if (!token) {
          console.error("Token is not available");
          return;
        }

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const order = {
          orderId: initialData.id,
          status: data.status,
          paid: data.paid==='true'?true:false,
        }
          const userData = JSON.stringify(order);
          
          const res = await axios.post(`${API_BASE_URL}/${initialData.id}`, userData, config);
        
        
        
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      } finally {
        setLoading(false);
      }
      router.refresh();
      router.push(`/admin/order`);
      toast({
        title: "Congratulations!",
        description: "New user has been successfully created.",
      });
    };

    const onDelete = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        await axios.delete(`${API_BASE_URL}/delete-user/${initialData.id}`,config);
        
        router.refresh();
        router.push(`/admin/user`);
      } catch (error: any) {
      } finally {
        setLoading(false);
        setOpen(false);
      }
    };

    return (
      <>
        <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
        <div className="flex items-center justify-between">
          <Heading title={title} description={description} />
          {initialData && (
            <Button
              disabled={loading}
              variant="destructive"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
          
            <div className="md:grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                         disabled={loading || !!initialData}
                        placeholder="Full Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                         disabled={loading || !!initialData}
                        placeholder="Phone Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="orderDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Date</FormLabel>
                    <FormControl>
                      <Input
                         disabled={loading || !!initialData}
                        placeholder="Order Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trackingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tracking Number</FormLabel>
                    <FormControl>
                      <Input
                         disabled={loading || !!initialData}
                        placeholder="Tracking Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(value) => {
                        setStatus(value);
                        field.onChange(value);
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value }
                            placeholder="Select a role"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* @ts-ignore  */}
                        {statusDelivery?.map((status) => (
                          <SelectItem key={status.id} value={status.id.toString()}>
                            {status.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paid</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(value) => {
                        setPaid(value);
                        field.onChange(value);
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* @ts-ignore  */}
                        {statusPayment?.map((status) => (
                          <SelectItem key={status.id} value={status.id.toString()}>
                            {status.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </form>
        </Form>
      </>
    );
  };