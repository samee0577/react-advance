"use client"
import addMessage from "./lib/db"

export default async function MessageForm() {

    async function handleSubmit(formData: FormData) {
        const text = formData.get("guestName") as string
        await addMessage(text)
        console.log("submitting...:", text)
    }

    return (
        <form action={handleSubmit}>
            <input placeholder="enter your guest name" name="guestName" type="text" />
            <button type="submit">submit</button>
        </form>
    )

}