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
import { AdminCategory, AdminVariant } from "@/lib/type";
import { getAllCategories } from "@/lib/services/admin/category";
import { getAllVariants } from "@/lib/services/admin/variant";
import { MultiSelect } from "@/components/multi-select";
export const IMG_MAX_LIMIT = 5;
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Your name must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Product description must be at least 3 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  variants: z.array(z.string()).min(1, { message: "Please select at least one variant" }),
  thumbnail:  z
    .string()
    .min(1, { message: "Product thumbnail must be selected" }),
  images: z.array(z.string())
    .max(IMG_MAX_LIMIT, {
    message: `You can only upload ${IMG_MAX_LIMIT} images`,
    })
    .min(1, {
      message: "At least one image must be added."
    }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
}
const API_BASE_URL = "http://localhost:8088/api/v1/admin/products";
const useCategories = () => {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<AdminCategory[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
       if (session && session.accessToken) {
        try {
          const categories = await getAllCategories(session.accessToken);
          setCategories(categories!);
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

    fetchCategories();
  }, [session]);
  return { categories, isLoading, error };
};
const useVariants = () => {
  const { data: session } = useSession();
  const [variants, setVariants] = useState<AdminVariant[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVariants = async () => {
       if (session && session.accessToken) {
        try {
          const variants = await getAllVariants(session.accessToken);
          setVariants(variants!);
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

    fetchVariants();
  }, [session]);
  return { variants, isLoading, error };
};

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        WEBP, JPEG, PNG, JPG up to 4MB
      </p>
    </>
  );
};
  export const ProductForm: React.FC<ProductFormProps> = ({
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
    const { categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
    const { variants, isLoading: variantsLoading, error: variantsError } = useVariants();
    const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
    const [thumbnail, setThumbnail] = useState<File[] | null>(null);
    const [images, setImages] = useState<File[] | null>(null);
    const dropZoneThumbnailConfig = {
      maxFiles: 1,
      maxSize: 1024 * 1024 * 4,
      multiple: false,
      acceptedFiles: 'image/jpeg, image/png, image/webp, image/jpg',
    };
    const dropZoneImagesConfig = {
      maxFiles: 5,
      maxSize: 1024 * 1024 * 4,
      multiple: true,
      acceptedFiles: 'image/jpeg, image/png, image/webp, image/jpg',
    };
    const defaultValues = initialData
      ? initialData
      : {
        name: "",
        description: "",
        price: 0,
        thumbnail:"",
        images: [],
        category: "",
        variants: [],
      };
    const variantsList = variants.map(variant => ({
      label: variant.name,
      value: variant.id.toString()
    }));
    const form = useForm<ProductFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues,
    });
    
    const { data: session } = useSession();
    const token = session?.accessToken;
    console.log("token", token)
    const onSubmit = async (data: ProductFormValues) => {
  try {
    setLoading(true);
    let formData = new FormData();

    const product = {
      name: data.name, 
      description: data.description, 
      category_id: data.category,
      variants: data.variants,
    };
      const productBlob = new Blob([JSON.stringify(product)], { type: "application/json" });


    formData.append('product', productBlob);

    if (thumbnail && thumbnail.length > 0) {
      formData.append('thumbnail', thumbnail[0]);
    }
    images?.forEach((image) => {
      formData.append('files', image);
    });
    
    if (!token) {
      console.error("Token is not available");
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post(`${API_BASE_URL}`, formData, config);
    console.log("product", res);
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
  router.push(`/admin/product`);
  toast({
    title: "Congratulations!",
    description: "New product has been successfully created.",
  });
};

    // const onDelete = async () => {
    //   try {
    //     setLoading(true);
    //       await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
    //     router.refresh();
    //     router.push(`/${params.storeId}/products`);
    //   } catch (error: any) {
    //   } finally {
    //     setLoading(false);
    //     setOpen(false);
    //   }
    // };

    return (
      <>
        {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
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
                        placeholder="Product Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Product description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* @ts-ignore  */}
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
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
                  name="variants"
                  render={({ field }) => (
                                <FormItem>
                  <FormLabel>Variant</FormLabel>
                  <MultiSelect
                    options={variantsList}
                    onValueChange={(value) => {
                      setSelectedVariants(value); 
                      field.onChange(value); 
                    }}
                    defaultValue={field.value || selectedVariants}
                    placeholder="Select Variants"
                    variant="inverted"
                    animation={2}
                    maxCount={2}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <FileUploader
                    value={thumbnail}
                    onValueChange={(files) => {
                      if (files) {
                        setThumbnail([files[0]]);
                        field.onChange(files[0].name);
                        console.log([files[0]]);
                      }
                      }}
                    dropzoneOptions={dropZoneThumbnailConfig}
                    className="relative bg-background rounded-lg p-2"
                  >
                    <FileInput className="outline-dashed outline-1 outline-white">
                      <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                        <FileSvgDraw />
                      </div>
                    </FileInput>
                    <FileUploaderContent>
                      {thumbnail && thumbnail.length > 0 && (
                        <FileUploaderItem key={0} index={0}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{thumbnail[0]?.name}</span>
                        </FileUploaderItem>
                      )}
                    </FileUploaderContent>
                  </FileUploader>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUploader
                    value={images}
                    onValueChange={(files) => {
                      if (files) {
                        setImages(files);
                        field.onChange(files.map((file) => file.name));
                      }
                    }}
                    dropzoneOptions={dropZoneImagesConfig}
                    className="relative bg-background rounded-lg p-2"
                  >
                    <FileInput className="outline-dashed outline-1 outline-white">
                      <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                        <FileSvgDraw />
                      </div>
                    </FileInput>
                    <FileUploaderContent>
                      {images &&
                        images.length > 0 &&
                        images.map((file, i) => (
                          <FileUploaderItem key={i} index={i}>
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{file.name}</span>
                          </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                  </FileUploader>
                </FormControl>
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