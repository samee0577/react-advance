import { getMessages } from "@/app/lib/db";
import MessageForm from "./messageForm";

export default async function Home() {
  const messages = await getMessages()
  return (
      <main style={{ padding: "20px" }}>
        <h1>Guestbook</h1>
        <MessageForm />
        <ul>
          {messages.map((m) => (
            <li key={m.id}>
              {m.text}
            </li>
          ))}
        </ul>
      </main>
  )
}
