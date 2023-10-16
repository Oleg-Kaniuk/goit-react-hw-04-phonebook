import { LabelSearch, InputSearch } from "./Filter.styled";

export const Filter = ({ filter, onChangeFilter }) => (
    <LabelSearch>
        Find contacts by name:
        <InputSearch
            type="text"
            name="filter"
            value={filter}
            title="Enter the name"
            required
            onChange={onChangeFilter}
        />
    </LabelSearch>
);