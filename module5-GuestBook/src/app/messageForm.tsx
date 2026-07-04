"use client"
import addMessage, { Message } from "./lib/db"
import { use, useActionState , useOptimistic } from "react"

export default function MessageForm({ messagePromise }: { messagePromise: Promise<Message[]> }) {
    const messages = use(messagePromise)
    const [optimisticMessages, setOptimisticMessages] = useOptimistic(
        messages,
        (currentMessages, newMessage) => [
            ...currentMessages,
            {id:crypto.randomUUID(), text:newMessage as string}
        ]
    )

    async function handleSubmit(prevState: null, formData: FormData): Promise<null> {
        const text = formData.get("guestName") as string
        if (text.trim() === '') {
            alert('Input cannot be blank!');
            return null;
        }
        setOptimisticMessages(text)
        await addMessage(text).then((text) => {
            console.log("new message added:", text)
        });
        return null
    }

    const [, formAction, isPending] = useActionState<null, FormData>(handleSubmit, null)
    return (
        <form action={formAction}>
            <input placeholder="enter your guest name" name="guestName" type="text" />
            <button
                type="submit"
                disabled={isPending}>
                {isPending ?
                    "Submitting..." :
                    "Submit"}
            </button>
            <ul>
                {optimisticMessages.map(m => (
                    <li key={m.id}>{m.text}</li>
                ))}
            </ul>
        </form>
    )

}