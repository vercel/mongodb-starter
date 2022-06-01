import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { LoadingDots } from "@/components/icons";
import BlurImage from "../blur-image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  return (
    <nav
      className="flex items-center justify-end px-4 h-12 sm:px-6 lg:px-8"
      aria-label="Navbar"
    >
      {status !== "loading" &&
        (session?.user ? (
          <button
            className="w-8 h-8 rounded-full overflow-hidden"
            onClick={() => signOut()}
          >
            <BlurImage
              src={
                session.user.image ||
                `https://avatar.tobi.sh/${session.user.name}`
              }
              alt={session.user.name || "User"}
              width={300}
              height={300}
            />
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={() => {
              setLoading(true);
              signIn("github");
            }}
            className={`${
              loading
                ? "bg-gray-200 border-gray-300"
                : "bg-black hover:bg-white border-black"
            } w-16 h-8 py-1 text-white hover:text-black border rounded-md text-sm transition-all`}
          >
            {loading ? <LoadingDots color="gray" /> : "Log In"}
          </button>
        ))}
    </nav>
  );
}
