import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const loadExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses", {
        headers,
      });
      setExpenses(res.data);
    } catch (err) {
      console.log("Could not load expenses", err);
    }
  };

    useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(res.data);
      } catch (err) {
        console.log("Could not load expenses", err);
      }
    };
    fetchExpenses();
  }, [token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/expenses",
        { title, amount: Number(amount), category },
        { headers }
      );
      setTitle("");
      setAmount("");
      loadExpenses();
    } catch (err) {
      console.log("Could not add expense", err);
    }
  };

  return (
    <div>
      <h2>My Expenses</h2>

      <form onSubmit={handleAdd}>
        <input
          placeholder="Title (e.g. Lunch)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Transport</option>
          <option>Bills</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>
        <br />
        <button type="submit">Add Expense</button>
      </form>

      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ul>
          {expenses.map((e) => (
            <li key={e._id}>
              {e.title} - Rs. {e.amount} ({e.category})
            </li>
          ))}
        </ul>
      )}
      </div>
  ) ;
}
export default Dashboard;
