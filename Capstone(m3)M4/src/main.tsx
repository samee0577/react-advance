import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TaskProvider } from './features/task/TaskContext.tsx'
import { SettingProvider } from './features/settings'

createRoot(document.getElementById('root')!).render(
  <SettingProvider>
    <TaskProvider>
      <App />
    </TaskProvider>
  </SettingProvider>,
)