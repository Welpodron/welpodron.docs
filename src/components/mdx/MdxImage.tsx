import Image from "next/image";

export const MdxImage = ({
  children,
  alt,
  src,
  ...props
}: {
  alt: string;
  src: string;
  children: React.ReactNode;
}) => (
  <Image
    alt={alt}
    src={src}
    sizes="100vw"
    style={{ width: "100%", height: "auto" }}
    {...props}
  />
);

MdxImage.displayName = "Mdx.Image";
