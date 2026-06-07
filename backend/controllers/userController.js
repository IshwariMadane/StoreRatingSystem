const Store = require("../models/Store");
const Rating = require("../models/Rating");
const { Op } = require("sequelize");

// View All Stores + Search + Ratings
const getStores = async (req, res) => {

  try {

    const { search } = req.query;

    let condition = {};

    if (search) {

      condition = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`
            }
          },
          {
            address: {
              [Op.like]: `%${search}%`
            }
          }
        ]
      };

    }

    const stores = await Store.findAll({
      where: condition
    });

    console.log("================================");
    console.log("USER:", req.user);
    console.log("STORES FOUND:", stores.length);
    console.log("================================");

    const result = [];

    for (const store of stores) {

      const ratings = await Rating.findAll({
        where: {
          store_id: store.id
        }
      });

      let overallRating = 0;

      if (ratings.length > 0) {

        const total = ratings.reduce(
          (sum, r) => sum + r.rating,
          0
        );

        overallRating = (
          total / ratings.length
        ).toFixed(1);

      }

      const userRating = await Rating.findOne({
        where: {
          store_id: store.id,
          user_id: req.user.id
        }
      });

      result.push({
        storeId: store.id,
        storeName: store.name,
        address: store.address,
        overallRating,
        userSubmittedRating: userRating
          ? userRating.rating
          : null
      });

    }

    console.log("RESULT:", result);

    res.json(result);

  } catch (error) {

    console.log("GET STORES ERROR:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

// Submit Rating
const submitRating = async (req, res) => {

  try {

    const {
      user_id,
      store_id,
      rating
    } = req.body;

    const existingRating = await Rating.findOne({
      where: {
        user_id,
        store_id
      }
    });

    if (existingRating) {

      return res.status(400).json({
        message: "Rating already exists. Use update."
      });

    }

    await Rating.create({
      user_id,
      store_id,
      rating
    });

    res.status(201).json({
      message: "Rating Submitted Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

// Update Rating
const updateRating = async (req, res) => {

  try {

    const {
      user_id,
      store_id,
      rating
    } = req.body;

    const existingRating = await Rating.findOne({
      where: {
        user_id,
        store_id
      }
    });

    if (!existingRating) {

      return res.status(404).json({
        message: "Rating not found"
      });

    }

    existingRating.rating = rating;

    await existingRating.save();

    res.json({
      message: "Rating Updated Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

module.exports = {
  getStores,
  submitRating,
  updateRating
};