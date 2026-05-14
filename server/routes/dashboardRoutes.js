const express = require("express");

const prisma = require("../prismaClient");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/summary", authMiddleware, async (req, res) => {

  try {

    // total spent
    const totalExpenses = await prisma.expense.aggregate({
      where: {
        userId: req.user.id
      },
      _sum: {
        amount: true
      }
    });

    // category breakdown
    const categoryBreakdown = await prisma.expense.groupBy({
      by: ["category"],
      where: {
        userId: req.user.id
      },
      _sum: {
        amount: true
      }
    });

    const formattedBreakdown = categoryBreakdown.map(item => ({
      category: item.category,
      total: item._sum.amount
    }));

    res.json({
      totalSpent: totalExpenses._sum.amount || 0,
      categoryBreakdown: formattedBreakdown
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;