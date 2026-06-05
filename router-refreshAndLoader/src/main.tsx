import {RouterProvider, createBrowserRouter} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home,{HomeLoader} from "./pages/Home";
import About from "./pages/About";
import ReactDOM from "react-dom/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <Home/>,
        loader: HomeLoader
      },
      {
        path: "/about",
        element: <About/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
