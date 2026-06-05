import { useLoaderData } from "react-router-dom";

export async function HomeLoader() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/2");
    const user = await res.json();
    return user;
}
export default function Home() {
    const user = useLoaderData() as { name: string, email: string };
    return (
        <>
            <h1>Home Page</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </>
    )
}