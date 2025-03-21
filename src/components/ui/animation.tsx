"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface AnimateInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?:
    | "fade-in"
    | "fade-up"
    | "fade-down"
    | "blur-in"
    | "float"
    | "float-slow"
    | "none";
  threshold?: number;
  once?: boolean;
}

export const AnimateInView = ({
  children,
  className,
  delay = 0,
  animation = "fade-up",
  threshold = 0.1,
  once = true,
}: AnimateInViewProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: animation === "fade-up" ? 30 : animation === "fade-down" ? -30 : 0, 
      filter: animation === "blur-in" ? "blur(10px)" : "none" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "none", 
      transition: { delay: delay / 1000, duration: 0.5, easing: "ease-out" } 
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={cn("transition-opacity will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
};
