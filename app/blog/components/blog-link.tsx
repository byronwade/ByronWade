"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image, { getImageProps } from "next/image";
import type { Post } from "@/app/blog/types";

interface BlogLinkProps {
	post: Post;
	loading?: "eager" | "lazy";
	priority?: boolean;
}

interface HTMLImageElementWithPriority extends HTMLImageElement {
	fetchPriority?: "high" | "low" | "auto";
}

export function getPostImageProps(imageUrl: string, postTitle: string) {
	return getImageProps({
		width: 48,
		height: 48,
		quality: 65,
		src: imageUrl,
		alt: `Blog post image for ${postTitle}`,
	});
}

export function BlogLink({ post, loading = "lazy", priority = false }: BlogLinkProps) {
	// Prefetch the main post image
	const prefetchProps = getImageProps({
		height: 256,
		width: 256,
		quality: 80,
		src: post.image ?? "/placeholder.svg",
		alt: `Blog post image for ${post.title}`,
	});

	useEffect(() => {
		if (typeof window === "undefined") return;

		try {
			const imgProps = prefetchProps.props;
			const imgElement = document.createElement("img") as HTMLImageElementWithPriority;

			// Set image properties
			imgElement.fetchPriority = "low";
			imgElement.decoding = "async";
			imgElement.src = imgProps.src as string;

			if (imgProps.sizes) {
				imgElement.sizes = imgProps.sizes;
			}
			if (imgProps.srcSet) {
				imgElement.srcset = imgProps.srcSet;
			}

			// Optional: append to DOM temporarily for preloading
			imgElement.style.display = "none";
			document.body.appendChild(imgElement);

			// Cleanup
			return () => {
				if (imgElement.parentNode) {
					imgElement.parentNode.removeChild(imgElement);
				}
			};
		} catch (error) {
			console.error("Failed to preload image:", error);
		}
	}, [prefetchProps.props]);

	return (
		<Link prefetch={true} href={`/blog/${post.handle}`} className="group flex h-[130px] w-full flex-row border px-4 py-2 hover:bg-muted/50">
			<div className="py-2">
				<Image src={post.image ?? "/placeholder.svg"} alt={`Blog post image for ${post.title}`} width={48} height={48} quality={65} loading={loading} priority={priority} className="h-auto w-12 flex-shrink-0 object-cover" />
			</div>
			<div className="px-2" />
			<div className="flex flex-grow flex-col items-start py-2">
				<div className="text-sm font-medium group-hover:underline">{post.title}</div>
				<p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
				<div className="mt-auto text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</div>
			</div>
		</Link>
	);
}
