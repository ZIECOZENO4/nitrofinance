"use client";
import React from 'react';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";


type ActiveItem = string | null;

interface NavItem {
  name: string;
  path: string;
}
const styles = {
  navLink: `text-white flex mx-[10px]`,
  badge: `rounded-full bg-blue-600 h-1 w-1 absolute bottom-5 right-0 top-1 ring-4`,
  navItem: `relative mr-1 cursor-pointer hover:opacity-60`,
  nav: `flex justify-center items-center gap-[20px]`,
  headerWrapper: `md:flex md:justify-between h-full max-w-screen-xl mx-auto px-4 hidden`,
  inputContainer: `flex items-center justify-center p-2 rounded `,
  input: `bg-transparent outline-none text-white w-70 ml-3`,
  cursorPointer: `mr-5 cursor-pointer`,
};

const  SecondNavBar = () => {
  const [activeItem, setActiveItem] = useState<ActiveItem>(null);
    const currentPath = usePathname();
  
    const navItems: NavItem[] = [
      { name: "Trade", path: "/swap" },
      { name: "Pool", path: "/pool" },
      { name: "Borrow", path: "/borrow" },
      { name: "Debt Position", path: "/debt" }
    ];

  return (
    <div className='flex-row justify-between  h-20 flex md:gap-[80px] w-full p-[20px] md:px-[30px] px-[20px] sticky top-0 z-50 fixed'>
  <div className="gap-2 align-middle items-center text-center flex flex-row">
  <Link href="/" className="flex flex-row ">
 <img src='/images/Capture.PNG' className='h-8 w-8 mr-1' alt='logo' />
           <span className='mt-1 text-xl'>Kannon</span>  
   
          </Link>
  </div>
  <div className={styles.headerWrapper}>

  <nav className="flex items-center">
  {navItems.map((item) => (
    <motion.div
      key={item.name}
      className="relative mx-4"
      onHoverStart={() => setActiveItem(item.name)}
      onHoverEnd={() => setActiveItem(null)}
    >
      <Link
        href={item.path}
        className={`text-md hover:scale-110 transition-all duration-300 ease-in-out font-bold ${
          currentPath === item.path 
            ? "text-white px-2 py-1 rounded-md bg-purple-300 bg-opacity-30" 
            : "bg-transparent bg-purple-300 bg-clip-text"
        }`}
      >
        <span className="relative">
          {item.name}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
            initial={{ width: "0%" }}
            animate={{ width: activeItem === item.name ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </span>
      </Link>
    </motion.div>
  ))}
</nav>


</div>

<div className="flex items-center justify-end md:gap-4 gap-2">
      <motion.div
            whileHover={{ backgroundColor: "rgba(45, 212, 191, 0.1)" }}
            whileTap={{ scale: 0.95 }}
           className="w-auto  text-white rounded-md flex">
        <div className="flex items-center justify-center ">
      <div className="relative p-[1px] rounded-xl overflow-hidden">
        <div className="absolute inset-0 p-4 rounded-lg bg-gradient-to-r from-purple-400 via-purple-600 to-purple-900"></div>
        <div className="relative bg-black rounded-xl p-2 px-8 flex gap-3 items-center ">
      
          <img src='/images/metamask.PNG' className='md:h-6 md:w-6 h-4 w-4 mr-1 md:mr-2' alt='wallet' />
              <span className="text-white text-sm md:text-xl md:font-bold">0X9cr5....5re3t5</span>
        </div>
      </div>
    </div>
            </motion.div>
       
        </div>

    </div>
  );
};

export default  SecondNavBar;