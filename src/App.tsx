import { createContext, useState } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import "./scss/app.scss";

// Interface for Serarch Context
type SearchContextInterface = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

// I could do Search logic in redux...
// But i'm left it here to understand the logic of the work in the future
export const SearchContext = createContext<SearchContextInterface>(
  {} as SearchContextInterface
);

function App() {
  // State for search input
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route index element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
