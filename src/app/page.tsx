import { createPageMetadata } from "@/lib/seo/metadata";
import RunderHome from "@/components/home/RunderHome";
import { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Blur Image - Online Image Blurring Tool",
  description:
    "Blur images online with our easy-to-use editor. Apply blur effects, adjust intensity, and download your edited images in various formats.",
  path: "/",
  keywords: [
    "blur image",
    "image editor",
    "photo editor",
    "online image blur",
    "image processing",
  ],
});

export default function Home() {
  return <RunderHome />;
}
