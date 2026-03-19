"use client";

import { useForm } from 'react-hook-form';
import { createClient } from "@/lib/supabase/client";
import { useEffect } from 'react';
import { addBlog, fetchBlogWithType } from '@/api/blog/blog';
import ImageToUrl from '@/utils/imgtourl';
import { blog } from '@/types/blog';
// Add this line at the top
// interface uploadblogProp extends blog{
//   Blogimage:string
// }
interface UploadBlogFormData {
  title: string;
  description: string;
  type: 'Spotlight' | 'News' | 'Trailor';
  imageUrl?: string | null;
  Blogimage?: FileList; // for file input
}
export default function FileUploadPage() {
  // const spotlight = await fetchBlogWithType('spotlight')
  // console.log(spotlight)
  const { register, reset, handleSubmit, formState: { isSubmitSuccessful } } = useForm<UploadBlogFormData>(
    {
      defaultValues: {
        title: '',
        description: '',
        type: 'Spotlight' as const,
        Blogimage: undefined
      },
    }
  );
const onSubmit = async (data: UploadBlogFormData) => {
  let imageUrl: string | null = null;
  
  if (data.type !== 'Trailor' && data.Blogimage?.[0]) {
    const url = await ImageToUrl(data.Blogimage[0]);
    imageUrl = url || null;
  }

  const blogData:blog = {
    id: 0,
    title: data.title,
    description: data.description,
    type: data.type,
    imageUrl: imageUrl,
    videoUrl: '',
    created_at: new Date().toISOString(),
    likes: 0,
  };

  addBlog(blogData);
};

  useEffect(() => {
    reset();

  }, [isSubmitSuccessful, reset])


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-1'>
      <label>Blog Data</label>
      <input type="text" placeholder="Blog Title" {...register("title", { required: true, min: 1 })} />
      <input type="text" placeholder="Blog Description" {...register("description", { required: true, min: 10 })} />
      <select {...register("type", { required: true })}>
        <option value="Spotlight">Spotilight</option>
        <option value="News">News</option>
        <option value="Trailor">Trailor</option>
      </select>
      <input type="file"  {...register('Blogimage')} />
      <input type='submit' className='p-2 border-gray-300' />
    </form>
  );
}