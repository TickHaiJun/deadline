"use client"
// pages/index.js
import { MDXProvider } from '@mdx-js/react';
import Content from '../content/test.mdx';
import MDXComponents from '../../components/animata/widget/MDXComponents';
import matter from 'gray-matter';


const HomePage = () => {

  return (
    <div className='w-screen h-screen p-[30px]'>
      <MDXProvider components={MDXComponents}>

        <Content />
      </MDXProvider>
    </div>
  );
};

export default HomePage;

