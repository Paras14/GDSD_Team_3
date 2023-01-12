import { Filter } from "react-bootstrap-icons";

function FilterDropdown({ filterValueSelected }) {
  const onFilterValueChange = (event) => {
    console.log(event.target.value);
    filterValueSelected(event.target.value);
  };
  return (
    <select onChange={onFilterValueChange} className="btn btn-primary">
      <option value="all">All</option>
      <option value="chinese">Chinese</option>
      <option value="russian">Russian</option>
    </select>
  );
}

export default FilterDropdown;
