'use client';

import Image from 'next/image';
import Link from 'next/link';

import { CtfImage } from '../features/contentful';

import { ImageFieldsFragment } from '@src/lib/__generated/sdk';
import { motion } from 'framer-motion';
import { fadeUpAnimation } from '@src/app/helper/animation';

export default function HomeSection({ homeImage }: { homeImage: ImageFieldsFragment }) {
  const isVideo = homeImage?.contentType?.includes('video');

  return (
    <section className="relative h-screen w-screen bg-cover bg-center grayscale">
      {isVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover">
          <source src={homeImage.url} type="video/mp4" />
        </video>
      ) : (
        <CtfImage nextImageProps={{ className: 'object-cover', fill: true }} {...homeImage} />
      )}
      <Link href="/menu">
        <div className="flex w-full justify-center pt-[5vh]">
          <div className="relative h-[15vh] w-[25vh]">
            <Image src="/assets/images/logo_white.png" fill alt="Pattivana" sizes="25vh" />
          </div>
        </div>
        {/* Centered text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-10 text-center"
          {...fadeUpAnimation}>
          <h1 className="text-lg text-white opacity-75 lg:text-4xl">
            Real memories were made from real experiences
          </h1>
        </motion.div>
      </Link>
    </section>
  );
}
