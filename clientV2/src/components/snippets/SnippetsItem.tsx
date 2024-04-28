import { useState } from "react";
import styles from "../../css/snippets/SnippetsItem.module.scss";
import sprite from "../../assets/icons/dashboard.svg";
import sprite2 from "../../assets/icons/all.svg";
import { ISnippet } from "../../features/snippets/types";
import { addEllipsis } from "../../utils/utils_processing";
import { getRelativeDistanceToNow } from "../../utils/utils_dates";
import { NavLink } from "react-router-dom";

type Props = {
	snippet: ISnippet;
};

type TTagProps = {
	tagNames: string[] | never[];
};

const Tags = ({ tagNames = [] }: TTagProps) => {
	if (!tagNames || tagNames.length <= 0) {
		return null;
	}
	return (
		<ul className={styles.Tags}>
			<li className={styles.Tags_label}>
				<svg className={styles.Tags_label_icon}>
					<use xlinkHref={`${sprite2}#icon-style`}></use>
				</svg>
			</li>
			{tagNames &&
				tagNames.map((tag, idx) => (
					<li key={tag + idx} className={styles.Tags_name}>
						{tag}
						{idx < tagNames.length - 1 && ","}
					</li>
				))}
		</ul>
	);
};

const fave = "favorite";
const notFave = "favorite_outline";

type FaveProps = {
	isFave: boolean;
	toggleIsFave: () => void;
};
const FaveButton = ({ isFave = true, toggleIsFave }: FaveProps) => {
	return (
		<button type="button" onClick={toggleIsFave} className={styles.FaveButton}>
			<svg className={styles.FaveButton_icon}>
				<use xlinkHref={`${sprite}#icon-${isFave ? fave : notFave}`}></use>
			</svg>
		</button>
	);
};

const getSnippetPath = (name: string): string => {
	const lower = name.toLowerCase();
	const withHypens = lower.replace(/\s/gm, "-");
	return withHypens;
};

const SnippetsItem = ({ snippet }: Props) => {
	const { snippetID, snippetName, createdDate } = snippet;
	const [isFave, setIsFave] = useState<boolean>(false);

	const handleIsFave = () => {
		setIsFave(!isFave);
	};

	return (
		<NavLink to={`${getSnippetPath(snippetName)}`}>
			<div className={styles.SnippetsItem}>
				<div className={styles.SnippetsItem_top}>
					<div className={styles.SnippetsItem_top_title}>
						{addEllipsis(snippetName, 45)}
					</div>
					<span className={styles.SnippetsItem_top_createdDate}>
						{getRelativeDistanceToNow(createdDate)}
					</span>
				</div>
				<div className={styles.SnippetsItem_bottom}>
					<div className={styles.SnippetsItem_bottom_tags}>
						<Tags
							tagNames={Number(snippetID) % 2 === 0 ? ["ts", "react"] : []}
						/>
					</div>
					<div className={styles.SnippetsItem_bottom_actions}>
						<FaveButton isFave={isFave} toggleIsFave={handleIsFave} />
					</div>
				</div>
			</div>
		</NavLink>
	);
};

export default SnippetsItem;

SnippetsItem.defaultProps = {};

SnippetsItem.propTypes = {};
