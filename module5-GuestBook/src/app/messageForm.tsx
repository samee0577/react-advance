"use client"
import addMessage from "./lib/db"
import { useActionState } from "react"

export default function MessageForm() {
    
    async function handleSubmit(prevState: null, formData: FormData): Promise<null> {
        const text = formData.get("guestName") as string
        if (text.trim() === '') {
            alert('Input cannot be blank!');
            return null;
        }
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
        </form>
    )

}