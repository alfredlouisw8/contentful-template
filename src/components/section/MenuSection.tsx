'use client';

import { Menu } from 'types';
import { CtfImage } from '../features/contentful';
import Link from 'next/link';
import { getMenus } from '@src/app/helper/utils';
import { ImagesFieldsFragment } from '@src/lib/__generated/sdk';
import { motion } from 'framer-motion';
import { listContainerVariants } from '@src/app/helper/animation';
import { useEffect, useState } from 'react';

interface MenuSectionProps {
  images: ImagesFieldsFragment | undefined | null;
}
export default function MenuSection({ images }: MenuSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  const menus = getMenus(images, isMobile);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 1024);
    }
  }, []);

  return (
    <motion.div className="flex h-screen w-full flex-col lg:flex-row">
      {menus.map(
        ({ image, title, description, show, link }, index) =>
          show && (
            <Link href={link} key={index} className="flex-1">
              <div
                className={`group relative flex h-full flex-col justify-center border-b border-r border-b-cream border-r-cream bg-center pl-10 transition-all active:grayscale-0 lg:justify-start lg:gap-10 lg:p-5 lg:pt-[18vh] lg:grayscale `}>
                <CtfImage
                  nextImageProps={{
                    className: 'object-cover hidden group-hover:block z-[-1]',
                    fill: true,
                  }}
                  {...image}
                />
                <h1 className="text-lg text-primary lg:text-3xl">{title}</h1>
                <h3 className="max-w-[50%] text-sm text-cream-dark lg:max-w-full lg:text-xl">
                  {description}
                </h3>
              </div>
            </Link>
          ),
      )}
    </motion.div>
  );
}
