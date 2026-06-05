import { type Engineer } from "./type";
import EngineerCard from"./EngineerCard";

const engineers: Engineer[] = [
  { id: 1, name: "Alice", role: "Frontend", status: "available", skills: ["React", "TypeScript"] },
  { id: 2, name: "Bob", role: "Backend", status: "busy", skills: [] },
  { id: 3, name: "Charlie", role: "Fullstack", status: "offline", skills: ["Node", "React"] },
];

function App() {
  return (
    <>
      {engineers.map((enggg) => (
        <EngineerCard key={enggg.id} {...enggg} />
      ))}
    </>
  );
}

export default App;
