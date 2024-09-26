import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

// const initialState = {
//   cities: [],
//   isLoading: false,
//   currentCity: {},
// };

// function reducer(state, action) {}

function CitiesProvider({ children }) {
  // const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
  //   reducer,
  //   initialState
  // );

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Épp kiválasztott City kettő helyen is kell azért kerül ide (Global State)
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  //Konkrét City-t id alapján kérje le az API-ról - ezt is átadhatjuk a context-nek
  //   async function getCity(id) {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(`${BASE_URL}/cities${id}`);
  //       const data = await res.json();
  //       setCurrentCity(data);
  //     } catch {
  //       alert("There was an error loading data...");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //Ez a felső helyett, mivel így valamiért ne madd vissza hibát.
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities?id=${id}`);
      const data = await res.json();
      setCurrentCity(data[0]);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error crearing the city...");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error deleting city...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesCOntext was used outside the CitiesProvider");

  // console.log(context);
  return context;
}

export { CitiesProvider, useCities };
