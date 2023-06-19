import React from "react";

interface IUserPosts {
  promise: Promise<Post[]>;
}

export default async function UserPosts({ promise }: IUserPosts) {
  const posts = await promise;

  const renderPosts = posts.map((post) => (
    <article key={post.id}>
      <p>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </p>
      <br />
    </article>
  ));

  return (
    <div>
      <h1>UserPosts</h1>
      <br />
      {renderPosts}
    </div>
  );
}
