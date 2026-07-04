import { getMessages } from "@/app/lib/db";
import MessageForm from "./messageForm";
import { Suspense } from "react";

export default async function Home() {
  const messagePromise = getMessages()
  return (
    <main style={{ padding: "20px" }}>
      <h1>Guestbook</h1>
      <Suspense fallback={
        <div>
          <p>Loading messages...</p>
          <p></p>please wait!
        </div>
      }>
        <MessageForm messagePromise={messagePromise} />
      </Suspense>
    </main>
  )
}
