import styles from "./admin-dashboard.module.scss";
import BasicTabs from "./tabs";

const AdminDashboard = () => {
  return (
    <div className={styles.adminDashboardContainer}>
      <BasicTabs />
    </div>
  );
};

export default AdminDashboard;
