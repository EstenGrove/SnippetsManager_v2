import {
	LegacyRef,
	MutableRefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import styles from "../../css/shared/Selector.module.scss";
import sprite from "../../assets/icons/all.svg";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type Option = {
	option: string;
	isSelected: boolean;
	handleSelect: () => void;
};

const Option = ({ option, isSelected = false, handleSelect }: Option) => {
	return (
		<li
			data-selected={isSelected}
			className={styles.Option}
			onClick={handleSelect}
		>
			<div className={styles.Option_value}>{option}</div>
			{isSelected && (
				<svg className={styles.Option_isSelected}>
					<use xlinkHref={`${sprite}#icon-check_circle`}></use>
				</svg>
			)}
		</li>
	);
};

type SelectorOpts = {
	selectedOption: string | null;
	options: string[];
	closeOptions: () => void;
	handleSelect: (option: string) => void;
};
const SelectorOptions = ({
	selectedOption,
	options,
	closeOptions,
	handleSelect,
}: SelectorOpts) => {
	const modalRef = useRef<MutableRefObject<HTMLDivElement> | undefined>(null);
	const isOutside = useOutsideClick(modalRef);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (isOutside) {
			closeOptions();
		}

		return () => {
			isMounted = false;
		};
	}, [closeOptions, isOutside]);

	return (
		<div ref={modalRef} className={styles.SelectorOptions}>
			<ul className={styles.SelectorOptions_list}>
				{options &&
					options.map((option, idx) => (
						<Option
							key={`${option}--${idx}`}
							option={option}
							isSelected={selectedOption === option}
							handleSelect={() => handleSelect(option)}
						/>
					))}
			</ul>
		</div>
	);
};

type Props = {
	placeholder?: string;
	options: string[] | [];
	selectOption: (option: string) => void;
};

const Selector = ({ placeholder = "Select option", options }: Props) => {
	const [selectedOption, setSelectedOption] = useState<string>(placeholder);
	const [showOptions, setShowOptions] = useState<boolean>(false);

	const handleSelect = (option: string) => {
		if (selectedOption === option) {
			return setSelectedOption("");
		}
		setSelectedOption(option);
	};

	const openOptions = () => {
		setShowOptions(true);
	};
	const closeOptions = () => {
		setShowOptions(false);
	};

	return (
		<div className={styles.Selector}>
			<button
				type="button"
				onClick={openOptions}
				className={styles.Selector_input}
			>
				<span>{selectedOption}</span>
				<svg className={styles.Selector_input_icon}>
					<use xlinkHref={`${sprite}#icon-unfold_more`}></use>
				</svg>
			</button>
			{/*  */}
			{showOptions && (
				<SelectorOptions
					options={options}
					selectedOption={selectedOption}
					closeOptions={closeOptions}
					handleSelect={handleSelect}
				/>
			)}
		</div>
	);
};

export default Selector;

Selector.defaultProps = {};

Selector.propTypes = {};
