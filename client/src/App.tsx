//client/src/App.tsx

//Core
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";


//Router object
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/login",
    element: <div>Login page</div>
  },
  {
    path: "/search",
    element: <div>Search page</div>
  },
  {
    path: "/pokemon",
    element: <div>Pokemon page</div>
  },
  {
    path: "/favorites",
    element: <div>Favorites page</div>
  },
]);

//Main app component
function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
