import LoginForm from "@/components/LoginForm";
import { Typography } from "@mui/material";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookiesList = await cookies();

  const requestUser = await fetch("http://localhost:3000/profile", {
    headers: {
      cookie: cookiesList.toString(),
    },
    cache: "no-store",
    credentials: "include",
  });

  if (requestUser.ok) {
    return redirect("/profile");
  }

  // Aplicar um redux ou zustand aqui para salvar o json da chamada e não precisa chamar novamente...

  return <LoginForm />;
}
