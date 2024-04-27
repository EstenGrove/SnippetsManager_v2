import { ChangeEvent } from "react";
import styles from "../../css/lists/PanelSearch.module.scss";
import SearchInput from "../shared/SearchInput";

type Props = {
	id: string;
	name: string;
	searchVal: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PanelSearch = ({ name, id, searchVal, handleSearch }: Props) => {
	return (
		<div className={styles.PanelSearch}>
			<SearchInput
				key={`${name}_${name}`}
				id={id}
				name={name}
				searchVal={searchVal}
				handleSearch={handleSearch}
			/>
		</div>
	);
};

export default PanelSearch;

PanelSearch.defaultProps = {};

PanelSearch.propTypes = {};
