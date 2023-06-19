import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Hello, Next.js!</h1>
      <Link href="/about">Link to ABOUT</Link>
      <Link href="/users">Users</Link>
    </main>
  );
}
