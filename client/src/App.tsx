//client/src/App.tsx

//Core
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Pages
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PokemonPage from "./pages/PokemonPage/PokemonPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchPage from "./pages/SearchPage/SearchPage";


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
    element: <LoginPage />
  },
  {
    path: "/search",
    element: <SearchPage/>
  },
  {
    path: "/pokemon",
    element: <PokemonPage/>
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
