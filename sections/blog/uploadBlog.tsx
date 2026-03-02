"use client";

import { useForm } from 'react-hook-form';
import { createClient } from "@/lib/supabase/client";
import { useEffect } from 'react';
import { addBlog, fetchBlogWithType } from '@/api/blog';
import ImageToUrl from '@/utils/imgtourl';
import { blog } from '@/types/blog';
// Add this line at the top

export default function FileUploadPage() {
  // const spotlight = await fetchBlogWithType('spotlight')
  // console.log(spotlight)
  const { register, reset, handleSubmit, formState: { isSubmitSuccessful } } = useForm(
    {
      defaultValues: {
        title: '',
        description: '',
        type: 'Spotlight',
        Blogimage: null
      },
    }
  );
  const onSubmit = async (data: blog) => {

    let imageUrl;
    if (data.type !== "Trailor") {
      imageUrl = await ImageToUrl(data.Blogimage[0])
    }else{
      imageUrl=null
    }
    // console.log(data)
    const { Blogimage, ...blogData } = data;
    console.log({ ...blogData, imageUrl })
    addBlog({ ...blogData, imageUrl })
  }

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