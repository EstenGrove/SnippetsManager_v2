import { ChangeEvent } from "react";
import styles from "../../css/shared/SearchInput.module.scss";
import sprite from "../../assets/icons/all.svg";

type Props = {
	id?: string;
	name?: string;
	searchVal: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({
	name = "searchLists",
	id = "searchLists",
	searchVal,
	handleSearch,
}: Props) => {
	return (
		<div className={styles.SearchInput}>
			<div className={styles.SearchInput_inputWrapper}>
				<svg className={styles.SearchInput_inputWrapper_icon}>
					<use xlinkHref={`${sprite}#icon-search`}></use>
				</svg>
				<input
					type="text"
					id={id}
					name={name}
					value={searchVal}
					onChange={handleSearch}
					className={styles.SearchInput_inputWrapper_input}
					placeholder="Search lists..."
				/>
			</div>
		</div>
	);
};

export default SearchInput;

SearchInput.defaultProps = {};

SearchInput.propTypes = {};
