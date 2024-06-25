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
import { set } from "date-fns";
import { AlertModal } from "@/components/modal/alert-modal";
export const IMG_MAX_LIMIT = 5;
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Your name must be at least 3 characters" }),
  slug: z
    .string()
    .min(3, { message: "Product description must be at least 3 characters" }),
  thumbnail:  z
    .string()
    .min(1, { message: "Product thumbnail must be selected" }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: any | null;
}
const API_BASE_URL = "http://localhost:8088/api/v1/categories";

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
  export const CategoryForm: React.FC<CategoryFormProps> = ({
    initialData,
  }) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit a category." : "Add a new category";
    const toastMessage = initialData ? "Category updated." : "Category created.";
    const action = initialData ? "Save changes" : "Create";
    const [thumbnail, setThumbnail] = useState<File[] | null>(null);
    const [isThumbnailUploaded, setIsThumbnailUploaded] = useState(false);
    const dropZoneThumbnailConfig = {
      maxFiles: 1,
      maxSize: 1024 * 1024 * 4,
      multiple: false,
      acceptedFiles: 'image/jpeg, image/png, image/webp, image/jpg',
    };
    const defaultValues = initialData
      ? initialData
      : {
        id: "",
        name: "",
        slug: "",
        thumbnail: "",
      };
    const form = useForm<CategoryFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues,
    });
    
    const { data: session } = useSession();
    const token = session?.accessToken;
    async function urlToFile(url: string, filename: string) {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], filename, { type: blob.type });
    }

    async function processInitialData(initialData: CategoryFormValues) {
      const baseUrl = "http://localhost:8088/api/v1/products/images/";
    
      // Xử lý thumbnail
      if (initialData.thumbnail) {
        const thumbnailFile = await urlToFile(baseUrl + initialData.thumbnail, initialData.thumbnail);
        setThumbnail([thumbnailFile]);
      }
    }
    useEffect(() => {
      if (initialData) {
        processInitialData(initialData);
      }
    }, [initialData]);
    const onSubmit = async (data: CategoryFormValues) => {
      try {
        setLoading(true);
        let formData = new FormData();

        const category = {
          name: data.name,
          slug: data.slug
        };
        const categoryBlob = new Blob([JSON.stringify(category)], { type: "application/json" });


        formData.append('category', categoryBlob);

        if (thumbnail && thumbnail.length > 0 && isThumbnailUploaded) {
          formData.append('thumbnail', thumbnail[0]);
        }
        
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
        if (initialData) {
          const res = await axios.post(`${API_BASE_URL}/update/${initialData.id}`, formData, config);
        } else {
          const res = await axios.post(`${API_BASE_URL}/create`, formData, config);
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
      router.push(`/admin/category`);
      toast({
        title: "Congratulations!",
        description: "New category has been successfully created.",
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
        await axios.delete(`${API_BASE_URL}/delete/${initialData.id}`, config);
        
        router.refresh();
        router.push(`/admin/category`);
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
                        placeholder="Category Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Category Slug"
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
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={thumbnail}
                      onValueChange={(files) => {
                        if (files && files.length > 0) {
                          setThumbnail([files[0]]);
                          setIsThumbnailUploaded(true);
                          field.onChange(files[0].name);
                          console.log([files[0]]);
                        } else {
                          setThumbnail([]);
                          setIsThumbnailUploaded(false);
                          field.onChange('');
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
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </form>
        </Form>
      </>
    );
  };
