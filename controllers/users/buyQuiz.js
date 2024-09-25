const Users = require("../../models/auth/users");
const buyQuiz = require("../../models/quiz/buyQuiz");
const BuyQuiz = require("../../models/quiz/buyQuiz");

exports.buyQuizController = async (req, res) => {
  const { adminId, purchaseAmount } = req.body;
  const userId = req.user; 

  try { 
    // Retrieve user without sensitive information
    const user = await Users.findById(userId).select("-password -role -isActive -purchasedQuiz -lastLogin -__v");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the user has already purchased a course from the particular admin
    const existingPurchase = await buyQuiz.findOne({ userId, adminId });
    if (existingPurchase) {
      return res.status(400).json({ msg: "Quiz already purchased." });
    }

    // Create a new BuyQuiz record
    const newBuyQuiz = new BuyQuiz({
      userId,
      adminId,
      purchaseAmount,
      createdBy: userId, 
    });

    // Save the purchase record
    await newBuyQuiz.save();

    // Return a response without sensitive user data
    return res.status(201).json({
      msg: "Course purchased successfully",
      data: {
        id: newBuyQuiz._id, // Include only the ID of the purchase
        userId: newBuyQuiz.userId,
        adminId: newBuyQuiz.adminId,
        purchaseAmount: newBuyQuiz.purchaseAmount,
        createdBy: newBuyQuiz.createdBy,
        createdDate: newBuyQuiz.createdDate,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
