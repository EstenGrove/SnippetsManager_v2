import React, {
	ChangeEvent,
	ChangeEventHandler,
	useEffect,
	useRef,
	useState,
} from "react";
import styles from "../../css/searchCenter/SearchCenter.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useHotKeys } from "../../hooks/useHotKeys";
import SearchCenterInput from "./SearchCenterInput";

// # Inspiration: https://dribbble.com/shots/23730940-Search-and-command-menu

type Props = {
	closeSearchCenter: () => void;
};

const SearchCenter = ({ closeSearchCenter }: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const isOutside = useOutsideClick(modalRef);
	const wasEscaped = useHotKeys(["Escape"]);
	const [searchVal, setSearchVal] = useState("");

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchVal(e.target.value);
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (isOutside || wasEscaped) {
			closeSearchCenter();
		}

		return () => {
			isMounted = false;
		};
	}, [closeSearchCenter, isOutside, wasEscaped]);

	return (
		<div ref={modalRef} className={styles.SearchCenter}>
			<div className={styles.SearchCenter_top}>
				<SearchCenterInput
					searchVal={searchVal}
					handleSearch={handleSearch as ChangeEventHandler}
				/>
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default SearchCenter;

SearchCenter.defaultProps = {};

SearchCenter.propTypes = {};
