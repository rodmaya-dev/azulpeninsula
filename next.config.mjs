/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Cuando las imágenes de departamentos/asesores se sirvan desde un
    // storage externo (S3, Cloudinary, etc. en la fase de Node.js),
    // el dominio se agrega aquí para que next/image pueda optimizarlas.
    remotePatterns: [],
  },
};

export default nextConfig;
