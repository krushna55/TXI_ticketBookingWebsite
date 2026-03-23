
import '../../globals.css'
import { Suspense } from 'react';
import {DisplayBlog} from '@/sections/blog/DisplayBlog';


export default function BlogPage() {
    return (
        // <>h</>
        <Suspense fallback={'loading...'}>
            <DisplayBlog />
        </Suspense>
    );
}