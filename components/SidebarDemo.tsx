"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function SidebarNav() {
  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-200 dark:text-neutral-200" />
      ),
    },
    {
      label: "Pricing",
      href: "/pricing",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-200 dark:text-neutral-200" />
      ),
    },
    {
      label: "Sign In",
      href: "/signin",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-200 dark:text-neutral-200" />
      ),
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-200 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "Chris Bender",
              href: "/dashboard",
              icon: (
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop"
                  className="h-7 w-7 shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-neutral-200"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-yellow-400 dark:bg-yellow-400" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-neutral-200 dark:text-neutral-200"
      >
        CB
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-neutral-200"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-yellow-400 dark:bg-yellow-400" />
    </a>
  );
};
