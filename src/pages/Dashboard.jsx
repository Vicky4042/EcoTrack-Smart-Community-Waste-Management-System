import StatsCard from "../components/StatsCard";

function Dashboard() {
  return (
    <div className="grid grid-3">
      <StatsCard title="Total Complaints" value="25" />
      <StatsCard title="Pending" value="10" />
      <StatsCard title="Completed" value="15" />
    </div>
  );
}

export default Dashboard;
