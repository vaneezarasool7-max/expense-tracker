const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

// Every route below needs a valid token
router.use(auth);

// Add an expense
router.post("/", async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;

    if (!title || amount === undefined) {
      return res.status(400).json({ message: "Title and amount are required" });
    }

    const expense = await Expense.create({
      user: req.userId,
      title,
      amount,
      category,
      date,
      note,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all my expenses (newest first)
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Edit one of my expenses
router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete one of my expenses
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;