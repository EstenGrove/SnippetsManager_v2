import { ChangeEvent, useRef, useEffect } from "react";
import styles from "../../css/searchCenter/SearchCenterInput.module.scss";
import sprite from "../../assets/icons/dashboard.svg";

type Props = {
	searchVal: string;
	handleSearch: (e: ChangeEvent) => void;
};

const SearchCenterInput = ({ searchVal, handleSearch }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (inputRef.current) {
			inputRef.current.focus();
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.SearchCenterInput}>
			<svg className={styles.SearchCenterInput_icon}>
				<use xlinkHref={`${sprite}#icon-search`}></use>
			</svg>
			<input
				ref={inputRef}
				type="text"
				name="searchCenter"
				id="searchCenter"
				value={searchVal}
				onChange={handleSearch}
				className={styles.SearchCenterInput_input}
			/>
		</div>
	);
};

export default SearchCenterInput;

SearchCenterInput.defaultProps = {};

SearchCenterInput.propTypes = {};
