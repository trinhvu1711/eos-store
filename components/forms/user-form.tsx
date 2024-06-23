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
export const IMG_MAX_LIMIT = 5;
const addformSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, { message: "Your name must be at least 3 characters" }),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters" }),
  role: z.string().min(1, { message: "Please select a role" }),
  phone: z.string()
      .min(10, { message: "Please enter a valid phone number" })
    .regex(/^[0-9]+$/, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
const updateformSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, { message: "Your name must be at least 3 characters" }),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters" }),
  role: z.string().min(1, { message: "Please select a role" }),
  phone: z.string()
      .min(10, { message: "Please enter a valid phone number" })
    .regex(/^[0-9]+$/, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email" }),
});
type UserFormValues = z.infer<typeof addformSchema>;

interface UserFormProps {
  initialData: any | null;
}
const API_BASE_URL = "http://localhost:8088/api/v1/users";
const useRoles = () => {
  const { data: session } = useSession();
  const [roles, setRoles] = useState<Role[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
       if (session && session.accessToken) {
        try {
          const roles = await getAllRoles(session.accessToken);
          setRoles(roles!);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch Roles");
        } finally {
          setIsLoading(false);
        }
       } else {
         setError("Sessions not found");
      }
    };

    fetchRoles();
  }, [session]);
  return { roles, isLoading, error };
};

  export const UserForm: React.FC<UserFormProps> = ({
    initialData,
  }) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product." : "Add a new product";
    const toastMessage = initialData ? "Product updated." : "Product created.";
    const action = initialData ? "Save changes" : "Create";
    const { roles, isLoading: rolesLoading, error: rolesError } = useRoles();
    const [role, setRole] = useState<string | null>(null);
    const defaultValues = initialData
      ? initialData
      : {
        id: "",
      };
    const form = useForm<UserFormValues>({
      resolver: zodResolver(initialData ? updateformSchema : addformSchema),
      defaultValues,
    });
    const { data: session } = useSession();
    const token = session?.accessToken ?? '';
    async function processInitialData(initialData: UserFormValues, token: string) {
    try {
      console.log('Initial data:', initialData);
      const data = await getAdminUser(Number(initialData.id), token);
      console.log(token)
      console.log('Fetched data:', data);
      if (data) {
        form.setValue("name", data.fullName);
        form.setValue("address", data.address);
        form.setValue("role", data.role.id.toString());
        form.setValue("phone", data.phoneNumber);
        form.setValue("email", data.email);
      }
    } catch (error) {
      console.error('Failed to process initial data:', error);
    }
  }
        processInitialData(initialData,token);
    
    const onSubmit = async (data: UserFormValues) => {
      try {
        setLoading(true);

        if (!token) {
          console.error("Token is not available");
          return;
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        if (initialData) {
          const user = {
          name: data.name, 
          address: data.address, 
          role: data.role,
          phone: data.phone,
          email: data.email,
        };
          const userData = JSON.stringify(user);
          
          const res = await axios.put(`${API_BASE_URL}/${initialData.id}`, userData, config);
        } else {
          const user = {
          name: data.name, 
          address: data.address, 
          role: data.role,
          phone: data.phone,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        };
         const userData= JSON.stringify(user);
          const res = await axios.post(`${API_BASE_URL}`, userData, config);
        }
        
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
      router.push(`/admin/user`);
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
        await axios.delete(`${API_BASE_URL}/delete/${initialData.id}`,config);
        
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        type="email"
                        placeholder="Email Address"
                        {...field}
                      />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading || !!initialData}
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading || !!initialData}
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="md:grid md:grid-cols-2 gap-8">
              <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(value) => {
                        setRole(value);
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
                        {roles?.map((role) => (
                          <SelectItem key={role.id} value={role.id.toString()}>
                            {role.name}
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