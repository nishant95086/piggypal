const Income = require('../model/income');
const Todo = require('../model/to-do');
const Saving = require('../model/saving');
const Udhar = require('../model/udhar');
const Wish = require('../model/wish-list');
const Investment = require('../model/investment');

exports.getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Run all queries in parallel
    const [incomes, todos, savings, udhars, wishes, investments] = await Promise.all([
      Income.find({ userId }),
      Todo.find({ userId }),
      Saving.find({ userId }),
      Udhar.find({ userId }),
      Wish.find({ userId }),
      Investment.find({ userId }),
    ]);

    // Summaries
    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
    const totalSaving = savings.reduce((sum, item) => sum + item.amount, 0);
    const totalUdhar = udhars.reduce((sum, item) => sum + item.amount, 0);
    const totalWishAmount = wishes.reduce((sum, item) => sum + item.amount, 0); // ✅ fixed
    const totalInvestment = investments.reduce((sum, item) => sum + item.amount, 0);

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      summary: {
        totalIncome,
        totalSaving,
        totalUdhar,
        totalWishAmount,
        totalInvestment,
      },
      details: {
        incomes,
        todos,
        savings,
        udhars,
        wishes,
        investments,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
      error: err.message,
    });
  }
};
