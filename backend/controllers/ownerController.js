const Store = require("../models/Store");
const Rating = require("../models/Rating");
const User = require("../models/User");

const dashboard = async (req, res) => {

  try {

    const ownerId = req.user.id;

    const store = await Store.findOne({
      where: {
        owner_id: ownerId
      }
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found"
      });
    }

    const ratings = await Rating.findAll({
      where: {
        store_id: store.id
      }
    });

    let averageRating = 0;

    if (ratings.length > 0) {

      const total = ratings.reduce(
        (sum, item) => sum + item.rating,
        0
      );

      averageRating = total / ratings.length;
    }

    const usersWhoRated = [];

    for (const rating of ratings) {

      const user = await User.findByPk(
        rating.user_id
      );

      if (user) {

        usersWhoRated.push({
          userName: user.name,
          email: user.email,
          rating: rating.rating
        });

      }

    }

    res.json({
      storeName: store.name,
      averageRating,
      usersWhoRated
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

module.exports = {
  dashboard
};