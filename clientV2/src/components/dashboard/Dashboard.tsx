import React from "react";
import styles from "../../css/dashboard/Dashboard.module.scss";
import DashboardSummary from "../summary/DashboardSummary";

type Props = {};

// HOME PAGE OF DASHBOARD (eg. /dashboard)
// - Displays summary:
//    - Recently viewed/modified snippets
//    - Commonly used snippets/lists/tags
//    - New users created
//    - Recent changes to user or team settings

const Dashboard = ({}: Props) => {
	return (
		<div className={styles.Dashboard}>
			<div className={styles.Dashboard_main}>
				<h1>Dashboard (Main)</h1>
				{/*  */}
				<DashboardSummary />
			</div>
		</div>
	);
};

export default Dashboard;

Dashboard.defaultProps = {};

Dashboard.propTypes = {};
