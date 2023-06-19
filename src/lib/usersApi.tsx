/* 
by default Next.js enforces cache: 'force-cache' to cache data from requests
to prevent "stale data" on fetches where data changes frequently, we can use:
    - fetch(url, {cache: 'no-cache'})
to poll data we can use:
    Next.js will check every 60 seconds if there's new data
    - fetch(url, {next: {revalidate: 60}})
*/

const basicFetch = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) return undefined;
  return res.json();
};

const getAllUsers = async () => {
  return basicFetch("https://jsonplaceholder.typicode.com/users");
};

const getUser = async (id: string) => {
  return basicFetch(`https://jsonplaceholder.typicode.com/users/${id}`);
};

const getPostsByUser = async (id: string) => {
  return basicFetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
};

export { getAllUsers, getUser, getPostsByUser };
