import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContect";
import ProtectedRoute from "./pages/ProtectedRoute,";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// //Lazy Loading-al lesznek megcsinálva hogy több részben legyenek elküldve a serverről.
// import Product from "./pages/Product";
// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    // <div>
    //   {/* Ez mindig megjelenig a lapon tökmind1 melyik url-re megyünk */}
    //   <h1>Hello Router</h1>
    // {/* //Telepített react-router-dom-ból jönnek. */}
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* ("/") kezdő lapot jelenti http://localhost:5173 */}
              <Route path="/" element={<Homepage />} />
              {/* <Route index element={<Homepage />} /> */}
              {/* http://localhost:5173/product címen melyik komponenst töltse be <Product />. */}
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* Ha csak a http://localhost:5173/app/ lépünk ezt az elemet fogja az <Outlet >-be renderelni, URL-be nem erre van a <Navigate> */}
                {/* <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          /> */}

                {/* <Navigate> Nested Routnál gyökérbe átirányítson rögtön arra az URL-re /app/cities-be (replace kell hogy lehessen bögészőbben back-re menni) */}
                <Route index element={<Navigate replace to="cities" />} />
                {/* Nested Routes http://localhost:5173/app/cities, <Outlet > (React router-ből jön) Componentbe jelenítődnek meg abba az elembe kell ezt az elemet tenni ahova beágyaztuk a Routot itt (AppLayout.jsx) */}
                <Route path="cities" element={<CityList />} />
                {/* //Paramétert és elfogadunk a route-ba a path-ban írt formában */}
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              {/* path="*" - Minden olyan URL cím ami nem létezik ide irányítódik */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
    // </div>
  );
}

export default App;
