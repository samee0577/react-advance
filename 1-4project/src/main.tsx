import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootLayout from "./Layout/RootLayout"
import Dashboard from "./pages/Dashboard"
import {NewProject} from "./pages/NewProject"
import { ProjectProvider } from "./features/projects"

const router= createBrowserRouter([
  {
    path:"/",
    element:<RootLayout />,
    children:[
      {
        index:true,
        element:<Dashboard />
      },
      {
        path:'/newProject',
        element:<NewProject />
      },
      {
        path:'/projectDetail',
        element:<h1>Project Detail temp h1</h1>
      }
    ]
  }
]) 

createRoot(document.getElementById('root')!).render(
  <ProjectProvider>  
    <RouterProvider router={router}/>
  </ProjectProvider>
)
