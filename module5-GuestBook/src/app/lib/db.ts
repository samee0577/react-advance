//just a ts interface 
export type Message={
    id:string
    text:string
}

//this is the database
let messages:Message[]=[
    {
        id:"1",
        text:"this is guestbook"
    },{
        id:"2",
        text:"welcome to my project"
    }
]

//fake fetching data
export async function getMessages():Promise<Message[]>{
    await new Promise(res=>setTimeout(res,1000))
    return messages
}


export default async function addMessage(text:string):Promise<Message>{
    await new Promise(res=>setTimeout(res,1000))
    const newMessage={id:crypto.randomUUID(),text}
    messages=[...messages,newMessage]
    return newMessage
} 