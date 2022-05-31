export const getBlurDataURL = async (url: string | null) => {
  if (!url) {
    return null;
  }
  const prefix = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`;
  const suffix = url.split(prefix)[1];
  const response = await fetch(
    `${prefix}w_210,e_blur:5000,q_auto,f_auto/${suffix}`
  );
  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:image/png;base64,${base64}`;
};
