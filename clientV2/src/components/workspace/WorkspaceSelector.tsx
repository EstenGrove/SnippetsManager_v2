import React from "react";
import styles from "../../css/workspace/WorkspaceSelector.module.scss";
import Selector from "../shared/Selector";

type TUserWorkspace = {
	id: number;
	name: string;
	createdDate: Date | string | null;
	updatedDate: Date | string | null;
	members: string[];
};

type Props = {
	selectedWorkspace: TUserWorkspace;
	userWorkspaces: TUserWorkspace[];
};

const WorkspaceSelector = ({}: Props) => {
	return (
		<div className={styles.WorkspaceSelector}>
			<svg className={styles.WorkspaceSelector_icon}>
				{/* <use xlinkHref={`${sprite}#icon-`}></use> */}
			</svg>
			<Selector />
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default WorkspaceSelector;

WorkspaceSelector.defaultProps = {};

WorkspaceSelector.propTypes = {};
