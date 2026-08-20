import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Create an article | Harmoniq",
  description: "Create and publish a new article on Harmoniq.",
};

type Props = {
  children: ReactNode;
};

export default function CreateArticleLayout({ children }: Props) {
  return children;
}
