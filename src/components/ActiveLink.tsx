"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function ActiveLink({ href, children, className }: Props) {
  const pathname = usePathname();

  // normalize trailing slashes
  const normalize = (p: string) => (p && p.length > 1 ? p.replace(/\/+$/, "") : p || "/");
  const isActive = normalize(pathname || "/") === normalize(href);

  return (
    <Link href={href} aria-current={isActive ? "page" : undefined} className={className}>
      {children}
    </Link>
  );
}
