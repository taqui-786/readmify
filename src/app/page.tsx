import LogoutBtn from "@/components/LogoutBtn";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Home() {
const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
console.log({session});

  return (
    <main>Landing Page <LogoutBtn/></main>
  );
}
