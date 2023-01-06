import Navbar from "./components/HomePage/Navbar";
import Cards from "./components/HomePage/Cards";
import SearchBar from "./components/HomePage/SearchBar";

const App = () => {
  return (
    <div>
      <Navbar />

      <SearchBar />
      <Cards />
    </div>
  );
};

export default App;
