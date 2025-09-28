import PorfileCard from "@/components/ProfileCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookiesList = await cookies();

  const requestUser = await fetch("http://localhost:3000/profile", {
    headers: {
      cookie: cookiesList.toString(),
    },
    cache: "no-store",
    credentials: "include",
  });

  const user = await requestUser.json();

  return <PorfileCard user={user} />;
}
