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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import { Option, AdminVariant, AdminOption } from "@/lib/type";
import { getAllCategories } from "@/lib/services/admin/category";
import { getAllVariants } from "@/lib/services/admin/variant";
import { MultiSelect } from "@/components/multi-select";
import { set } from "date-fns";
import { AlertModal } from "@/components/modal/alert-modal";
import { getColors, getConfigutations } from "@/lib/services/admin/data";
export const IMG_MAX_LIMIT = 5;
const formSchema = z.object({
  configuration: z.string().min(1, { message: "Please select a configuration" }),
  color: z.string().min(1, { message: "Please select a color" }),
  available_for_sale: z.string(),
  price: z.coerce.number(),
  discount: z.coerce.number().refine(value => value > 0 && value < 100, {
  message: "Discount must be greater than 0 and less than 1",
}),
  currency: z.string(),
});

type VariantFormValues = z.infer<typeof formSchema>;

interface VariantFormProps {
  initialData: any | null;
}
const API_BASE_URL = "http://localhost:8088/api/v1/variants";
const availableStatus = [
  { id: "true", name: "Available" },
  { id: "false", name: "Not Available"}
]
const typeCurrency = [
  { id: "USD", name: "Dollar" },
  { id: "VND", name: "Việt Nam Đồng" },
  ];
const useConfigurations = () => {
  const { data: session } = useSession();
  const [configurations, setConfiguration] = useState<AdminOption[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfigutations = async () => {
       if (session && session.accessToken) {
        try {
          const configuration = await getConfigutations(session.accessToken);
          setConfiguration(configuration!);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch categories");
        } finally {
          setIsLoading(false);
        }
       } else {
         setError("Sessions not found");
      }
    };

    fetchConfigutations();
  }, [session]);
  return { configurations, isLoading, error };
};
const useColors = () => {
  const { data: session } = useSession();
  const [colors, setColor] = useState<AdminOption[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColor = async () => {
       if (session && session.accessToken) {
        try {
          const color = await getColors(session.accessToken);
          setColor(color!);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch categories");
        } finally {
          setIsLoading(false);
        }
       } else {
         setError("Sessions not found");
      }
    };

    fetchColor();
  }, [session]);
  return { colors, isLoading, error };
};

  export const VariantForm: React.FC<VariantFormProps> = ({
    initialData,
  }) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const title = initialData ? "Edit variant" : "Create variant";
    const description = initialData ? "Edit a variant." : "Add a new variant";
    const toastMessage = initialData ? "Variant updated." : "Variant created.";
    const action = initialData ? "Save changes" : "Create";
    const { configurations, isLoading: configurationsLoading, error: configurationsError } = useConfigurations();
    const [configuration, setConfiguration] = useState<string | null>(null);
    const { colors, isLoading: colorsLoading, error: colorsError } = useColors();
    const [color, setColor] = useState<string | null>(null);
     const [currency, setCurrency] = useState<string | null>(null);
    const [available, setAvailable] = useState<string>('');
    const defaultValues = initialData
      ? initialData
      : {
        configuration: "",
        color:"",
        available_for_sale: "",
        price: 0,
        discount: 0,
        currency: "",
      };
    const form = useForm<VariantFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues,
    });
    
    const { data: session } = useSession();
    const token = session?.accessToken;
    
    const onSubmit = async (data: VariantFormValues) => {
      try {
        setLoading(true);

        const variant = {
          options: [ parseFloat(data.configuration),  parseFloat(data.color)],
          available_for_sale: data.available_for_sale=="true"?true:false,
          price: data.price,
          discount: parseFloat((data.discount / 100).toFixed(2)),
          currency: data.currency,
        };
        const variantData= JSON.stringify(variant);
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
          const res = await axios.put(`${API_BASE_URL}/${initialData.id}`, variantData, config);
        } else {
          const res = await axios.post(`${API_BASE_URL}`, variantData, config);
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
      router.push(`/admin/variant`);
      toast({
        title: "Congratulations!",
        description: "New Variant has been successfully created.",
      });
    };

    return (
      <>
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount(%)</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="configuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Configuration</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(value) => {
                        setConfiguration(value);
                        field.onChange(value);
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value }
                            placeholder="Select a configuration"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* @ts-ignore  */}
                        {configurations?.map((configuration) => (
                          <SelectItem key={configuration.id} value={configuration.id.toString()}>
                            {configuration.value}
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
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(value) => {
                        setConfiguration(value);
                        field.onChange(value);
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value }
                            placeholder="Select a color"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* @ts-ignore  */}
                        {colors?.map((color) => (
                          <SelectItem key={color.id} value={color.id.toString()}>
                            {color.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="available_for_sale"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(value) => {
                        setAvailable(value);
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
                        {availableStatus?.map((status) => (
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
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(value) => {
                        setCurrency(value);
                        field.onChange(value);
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value }
                            placeholder="Select a currency"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* @ts-ignore  */}
                        {typeCurrency?.map((currency) => (
                          <SelectItem key={currency.id} value={currency.id.toString()}>
                            {currency.name}
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