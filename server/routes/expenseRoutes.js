const express = require("express");

const prisma = require("../prismaClient");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {

  try {

    const { amount, category, note, date } = req.body;

    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        category,
        note,
        date: new Date(date),
        userId: req.user.id
      }
    });

    res.status(201).json(expense);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

router.get("/", authMiddleware, async (req, res) => {

  try {

    const expenses = await prisma.expense.findMany({
      where: {
        userId: req.user.id
      },
      orderBy: {
        date: "desc"
      }
    });

    res.json(expenses);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const { amount, category, note, date } = req.body;

    const expense = await prisma.expense.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: {
        amount: parseFloat(amount),
        category,
        note,
        date: new Date(date)
      }
    });

    res.json(expense);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    await prisma.expense.delete({
      where: {
        id: parseInt(req.params.id)
      }
    });

    res.json({
      message: "Expense deleted"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;