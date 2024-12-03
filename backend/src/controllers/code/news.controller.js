const News = require("../../models/database/News");

//TODO: Get all news
const getAllNews = async (req, res, next) => {
  try {
    const news = await News.find(); // Retrieves all fields for all news documents
    return news;
  } catch (err) {
    throw new Error("Error fetching all news:", err);
  }
};

//TODO: Get all news title, banner, ID
const getNewsTitlesAndBanners = async (req, res, next) => {
  try {
    const news = await News.find({}, "_id title banner"); // Select specific fields
    return news;
  } catch (err) {
    throw new Error("Error fetching news titles and banners:", err);
  }
};

//TODO: Get a specific news with ID
const getSpecificNewsById = async (req, res, next) => {
  try {
    const news = await News.findById(id); // Fetch document by its ID
    if (!news) {
      throw new Error("News not found");
    }
    return news;
  } catch (err) {
    throw new Error("Error fetching specific news:", err);
  }
};

//TODO: Create a news
const createNews = async (req, res, next) => {
  try {
    const news = new News(newsData); // Initialize a new document
    await news.save(); // Save to the database
    return news;
  } catch (err) {
    throw new Error("Error creating news:", err);
  }
};

//TODO: Change a news
const updateNewsById = async (req, res, next) => {
  try {
    const news = await News.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validations
    });
    if (!news) {
      throw new Error("News not found for update");
    }
    return news;
  } catch (err) {
    throw new Error("Error updating news:", err);
  }
};

//TODO: Delete a news
const deleteNewsById = async (req, res, next) => {
  try {
    const news = await News.findByIdAndDelete(id);
    if (!news) {
      throw new Error("News not found for deletion");
    }
    return news;
  } catch (err) {
    throw new Error("Error deleting news:", err);
  }
};

module.exports = {
  getAllNews,
  getNewsTitlesAndBanners,
  getSpecificNewsById,
  createNews,
  updateNewsById,
  deleteNewsById,
};
