export default function StackList({ techStack }: { techStack: string[] }) {
    return (
        <>
            <h2>Tech Stack:</h2>
            <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
                {techStack.map((stack) => <li className="stackList" key={crypto.randomUUID()} >{stack}</li>)}
            </div>
        </>
    );
}