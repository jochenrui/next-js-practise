import { getAllUsers, getPostsByUser, getUser } from "@/lib/usersApi";
import React, { Suspense } from "react";
import UserPosts from "./component/UserPosts";
import { Metadata } from "next";

import { notFound } from "next/navigation";

/*
data revalidation can be set at "segment-level"
overwrites default to 120 seconds revalidation intervals
*/
export const revalidate = 120;

interface IUserPage {
  params: {
    userId: string;
  };
}

// generate dynamic metadata for each subpage
export async function generateMetadata({
  params: { userId },
}: IUserPage): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId);
  const user = await userData;

  // apply error handling for metadata
  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: user.name,
    description: `This is the page of ${user.name}`,
  };
}

export default async function UserPage({ params: { userId } }: IUserPage) {
  const userData: Promise<User> = getUser(userId);
  const postData: Promise<Post[]> = getPostsByUser(userId);

  //approach 1: fetch in parallel
  //const [user, userPosts] = await Promise.all([userData, postData]);

  //approach 2: fetch sequentially, use suspense
  const user = await userData;

  if (!user) return notFound();

  return (
    <section>
      <h2>
        <h1>{user.name}</h1>
        <br />
        <Suspense fallback={<h2>Loading...</h2>}>
          {/* approach 2: allows to load posts one by one*/}
          <UserPosts promise={postData}></UserPosts>
        </Suspense>
      </h2>
    </section>
  );
}

/* 
To turn dynamically rendered pages into statically rendered pages, 
we can define the possible parameters(userIds)

even though the posts are now statically pre-rendered,
it will still revalidate the data periodically and update 
the static render, IF revalidate is set (Incremental Static Regeneration ISR strategy)
*/
export async function generateStaticParams() {
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;

  // check all IDs beforehand, so that Next.js can do static server rendering
  return users.map((user) => ({ userId: user.id.toString() }));
}
