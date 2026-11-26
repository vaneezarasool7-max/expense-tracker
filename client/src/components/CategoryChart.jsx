import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#4f46e5", "#16a34a", "#f59e0b", "#dc2626", "#0891b2"];

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
    <div>
      <h3>Spending by Category</h3>
      <PieChart width={320} height={280}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label>
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