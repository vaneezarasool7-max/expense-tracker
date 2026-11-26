import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const CATEGORY_COLORS = {
  Food: "#f97316",
  Transport: "#3b82f6",
  Bills: "#ef4444",
  Shopping: "#a855f7",
  Other: "#22c55e",
};

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
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={CATEGORY_COLORS[entry.name] || "#94a3b8"}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default CategoryChart;