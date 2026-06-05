import { use, useState } from "react"
import type { Task } from "./features/task"
import { TaskContext } from "./features/task"
import { SettingContext } from "./features/settings"

function App() {

  const context = use(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  const { state: taskState, dispatch: taskDispatch } = context

  const [text, setText] = useState("")

  const languageContext = use(SettingContext)
  if (!languageContext) {
    throw new Error("useSetting must be used within a SettingProvider")
  }
  const { state: settingState, dispatch: settingDispatch } = languageContext

  return (
    <>
      <div style={{ border: "1px solid black", borderRadius: 20, padding: 10, width: "auto", margin: "10px auto", backgroundColor: "lightblue" }}>
        <h1>language:{settingState.language === "EN" ? "English" : "French"}</h1>
        <button onClick={() => settingDispatch({ type: "TOGGLE_LANG", payload: settingState.language })}>TOGGLE LANGUAGE</button>
      </div>
      {taskState.tasks.map((t: Task) => (
        <div key={t.id} style={{ borderRadius: 20, border: "1px solid black", padding: 10, width: 200, margin: "10px auto", backgroundColor: t.done ? "lightgreen" : "lightcoral", color: t.done ? "grey" : "white" }}>
          <li>
            {t.text}
            <button onClick={() => { taskDispatch({ type: "TOGGLE_TASK", payload: t.id }) }}>{t.done ? " Done" : " Not done"}</button>
          </li>
          <button onClick={() => taskDispatch({ type: "REMOVE_TASK", payload: t.id })}>REMOVE</button>
        </div>
      ))
      }
      <input onChange={(e) => setText(e.target.value)} value={text} onKeyDown={(e) => {
        if (e.key === "Enter") {
          createTask()
        }
      }} />
      <button onClick={createTask}>ADD TASK</button>
    </>
  )


  function createTask() {
    if (text.trim()) {
      taskDispatch({ type: "ADD_TASK", payload: text })
      setText("")
    }
  }
}

export default App
