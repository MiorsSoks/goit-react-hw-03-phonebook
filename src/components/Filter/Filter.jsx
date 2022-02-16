import PropTypes from "prop-types";
import { Label } from "./Filter.styled";

export default function Filter({ filter, addFilter }) {
  return (
    <div>
      <Label htmlFor="filter">Find contacts by name</Label>
      <input value={filter} onChange={addFilter} type="text" name="filter" />
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  addFilter: PropTypes.func.isRequired,
};
