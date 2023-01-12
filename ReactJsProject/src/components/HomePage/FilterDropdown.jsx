import { Filter } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { setUpCategory } from "../../helpers/SetUpCategory";

function FilterDropdown({ filterValueSelected }) {
  const [restaurantCategory, setRestaurantCategory] = useState([]);

  useEffect(() => {

    setUpCategory(setRestaurantCategory);

  }, []);

  const onFilterValueChange = (event) => {
    console.log(event.target.value);
    filterValueSelected(event.target.value);
  };
  return (
    <select onChange={onFilterValueChange} className="btn btn-primary">
      <option value="-1">All</option>
      {restaurantCategory.map((data) => {
        return (
          <option key={data.id} value={data.id}>
            {data.name}
          </option>
        );
      })
      }
    </select>
  );
}

export default FilterDropdown;
