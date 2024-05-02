import { CSSProperties, ChangeEvent } from "react";
import cssModule from "../../css/shared/SearchInput.module.scss";
import sprite from "../../assets/icons/all.svg";

type Props = {
	id?: string;
	name?: string;
	searchVal: string;
	placeholder?: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	styles?: CSSProperties;
};

const SearchInput = ({
	name = "search",
	id = "search",
	searchVal,
	handleSearch,
	placeholder = "Search...",
	styles,
}: Props) => {
	return (
		<div className={cssModule.SearchInput}>
			<div className={cssModule.SearchInput_inputWrapper} style={styles}>
				<svg className={cssModule.SearchInput_inputWrapper_icon}>
					<use xlinkHref={`${sprite}#icon-search`}></use>
				</svg>
				<input
					type="text"
					id={id}
					name={name}
					value={searchVal}
					onChange={handleSearch}
					className={cssModule.SearchInput_inputWrapper_input}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
};

export default SearchInput;

SearchInput.defaultProps = {};

SearchInput.propTypes = {};
