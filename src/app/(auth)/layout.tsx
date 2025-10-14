import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import { Stack } from "@/shared/components/ui/stack";

export const metadata: Metadata = {
  title: "Login - Boilerplate padrão",
  description: "Boilerplate padrão para projetos front-end",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack
      as="section"
      justify="center"
      alignment="center"
      className="min-h-screen bg-background-secondary p-4"
    >
      {children}
    </Stack>
  );
}
