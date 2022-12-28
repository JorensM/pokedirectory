//client/src/App.tsx

//Core
import { createBrowserRouter, RouterProvider } from "react-router-dom";


//Router object
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Homepage</div>
  },
  {
    path: "/register",
    element: <div>Register page</div>
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
