'use client';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimateInView } from '../ui/animation';
import { Button, buttonVariants } from '../ui/button';

const HeroSection = () => {
  const [imageSrc, setImageSrc] = useState('/app-screenshot.png');

  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10" />

      {/* Floating Elements */}
      <div className="absolute right-[10%] top-1/3 -z-10 size-64 rounded-full  blur-3xl" />
      <div className="absolute bottom-1/3 left-[5%] -z-10 size-72 rounded-full  blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-20">
          <AnimateInView animation="fade-up" className="mb-4">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Simplify Your Finances
            </span>
          </AnimateInView>

          <AnimateInView animation="fade-up" delay={100}>
            <h1 className=" mb-6 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Track Expenses
              {' '}
              <span className="text-primary">Effortlessly</span>
            </h1>
          </AnimateInView>

          <AnimateInView animation="fade-up" delay={200}>
            <p className="mx-auto mb-8 max-w-2xl text-balance text-lg text-muted-foreground">
              Gain clarity on your spending patterns and take control of your finances with our intuitive expense tracking platform.
            </p>
          </AnimateInView>

          <AnimateInView animation="fade-up" delay={300} className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/login" className={buttonVariants({ size: 'lg' })}>
              Get Started
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </AnimateInView>
        </div>

        <AnimateInView animation="blur-in" delay={500} className="relative mx-auto max-w-4xl">
          <div className="relative rounded-2xl p-2 shadow-lg">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={imageSrc}
                alt="ExpenseVision Dashboard"
                width={600}
                height={400}
                className="h-auto w-full object-cover"
                onError={() => setImageSrc('https://placehold.co/1200x675/e4eeff/0066ff.png?text=ExpenseVision+Dashboard')}
              />
            </div>

            {/* Floating icon elements */}
            {/* <div className="absolute -left-6 -top-6 rounded-xl p-3 shadow-sm">
              <Wallet className="size-6 text-primary" />
            </div>
            <div className=" absolute -bottom-6 -right-6 rounded-xl p-3 shadow-sm">
              <BarChart3 className="size-6 text-primary" />
            </div>
            <div className="  absolute -right-6 top-1/2 rounded-xl p-3 shadow-sm delay-1000">
              <PieChart className="size-6 text-primary" />
            </div> */}
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default HeroSection;
