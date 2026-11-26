import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#ef4444", "#dc2626", "#f87171", "#b91c1c", "#fca5a5"];

function CategoryChart({ expenses }) {
  const totals = {};
  expenses.forEach((exp) => {
    totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
  });

  const data = Object.keys(totals).map((name) => ({
    name,
    value: totals[name],
  }));

  if (data.length === 0) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Spending by Category</h3>
      <PieChart width={320} height={280} style={{ margin: "0 auto" }}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          label
          stroke="#0b0f1a"
          strokeWidth={2}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default CategoryChart;