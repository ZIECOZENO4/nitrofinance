"use client"
import React, { useState } from 'react';
import { Chip, ChipProps } from "@nextui-org/react";

interface CustomChipProps extends Omit<ChipProps, 'children'> {
  text: string;
  hoverText: string;
}

const CustomChip: React.FC<CustomChipProps> = ({ text, hoverText, ...props }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="relative">
      {isHovered && (
        <div className="absolute text-[9px] flex bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#1d1f1f] text-white text-xl rounded">
          {hoverText}
        </div>
      )}
      <Chip
        {...props}
        className={`flex-grow text-xl bg-[#1d1f1f] p-1 rounded-sm ${props.className || ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text}
      </Chip>
    </div>
  );
};

export default CustomChip;