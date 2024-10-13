"use client";
import React from 'react';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Image from 'next/image';

type ActiveItem = string | null;

interface NavItem {
  name: string;
  path: string;
}
const styles = {
  navLink: `text-[#F7F2DA] flex mx-[10px]`,
  badge: `rounded-full bg-blue-600 h-1 w-1 absolute bottom-5 right-0 top-1 ring-4`,
  navItem: `relative mr-1 cursor-pointer hover:opacity-60`,
  nav: `flex justify-center items-center gap-[20px]`,
  headerWrapper: `md:flex md:justify-between h-full max-w-screen-xl mx-auto px-4 hidden`,
  inputContainer: `flex items-center justify-center p-2 rounded `,
  input: `bg-transparent outline-none text-[#F7F2DA] w-70 ml-3`,
  cursorPointer: `mr-5 cursor-pointer`,
};

const  HomeNavBar = () => {
  const [activeItem, setActiveItem] = useState<ActiveItem>(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const currentPath = usePathname();
  
    const navItems: NavItem[] = [
      { name: "Home", path: "/" },
      { name: "Create", path: "/create" },
      { name: "Liquidity", path: "/liquidity" },
      { name: "Listing", path: "/listing" },
      { name: "Comment", path: "/website-comment" },
      { name: "Contact", path: "/contact" }
    ];

  return (
    <div className='flex-row justify-between  h-20 flex md:gap-[80px] w-full p-[20px] md:px-[30px] px-[20px] sticky top-0 z-50 fixed'>
  <div className="gap-2 align-middle items-center text-center flex flex-row">
  <Link href="/" className="flex flex-row ">
 <img src='/images/Capture.PNG' className='h-8 w-8 mr-1' alt='logo' />
           <span className='mt-1'>Kannon</span>  
   
          </Link>
  </div>



      <div className="flex items-center justify-end gap-4">
        <div className="md:w-auto hidden text-[#F7F2DA] rounded-md sm:flex w-12">
        <div className="flex items-center justify-center ">
      <div className="relative p-[1.5px] rounded overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-900"></div>
        <div className="relative bg-black rounded p-2 flex gap-3 items-center ">
          <span className="text-white text-sm font-bold ml-1">0</span>
          <img src='/images/cross.PNG' className='h-6 w-8 ' alt='cross' />
        </div>
      </div>
    </div>
            </div>
             <div className="md:w-auto hidden text-[#F7F2DA] rounded-md sm:flex w-12">
        <div className="flex items-center justify-center ">
      <div className="relative p-[1.5px] rounded overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-900"></div>
        <div className="relative bg-black rounded p-2 px-4 flex gap-3 items-center ">
  
          <img src='/images/circle.PNG' className='h-6 w-6 ' alt='circle' />
        </div>
      </div>
    </div>
            </div>
           <div className="md:w-auto hidden text-[#F7F2DA] rounded-md sm:flex w-12">
        <div className="flex items-center justify-center ">
      <div className="relative p-[1px] rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-900"></div>
        <div className="relative bg-black rounded-xl p-2 px-8 flex gap-3 items-center ">
      
          <img src='/images/metamask.PNG' className='h-6 w-8 mr-2' alt='wallet' />
              <span className="text-white text-sm font-bold">0X9cr5....5re3t5</span>
        </div>
      </div>
    </div>
            </div>
        </div>

    </div>
  );
};

export default  HomeNavBar;