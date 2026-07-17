"use client";

import { useState } from "react";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

/**
 * Renders an <img> that automatically falls back to /no-image.svg
 * if the original src fails to load or is missing.
 */
export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/no-image.svg",
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [errored, setErrored] = useState(!src);

  const handleError = () => {
    if (!errored) {
      setErrored(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
