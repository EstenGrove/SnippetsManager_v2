import React from "react";
import styles from "../../css/editor/EditorButton.module.scss";
import sprite from "../../assets/icons/editor.svg";

type Props = { icon: string };

interface Icons {
	[key: string]: string;
}

const icons: Icons = {
	listNumbers: "format_list_numbered",
	listBullets: "format_list_bulleted",
	blockquote: "format_quote",
	color: "format_color_text",
	photo: "insert_photo",
	space: "space_bar",
	strike: "strikethrough_s",
	table: "table_chart",
	title: "title",
	attachment: "attachment1",
};

const EditorButton = ({ icon }: Props) => {
	return (
		<button className={styles.EditorButton}>
			<svg className={styles.EditorButton_icon}>
				<use xlinkHref={`${sprite}#icon-${icons[icon]}`}></use>
			</svg>
			{/*  */}
			{/*  */}
		</button>
	);
};

export default EditorButton;

EditorButton.defaultProps = {};

EditorButton.propTypes = {};
