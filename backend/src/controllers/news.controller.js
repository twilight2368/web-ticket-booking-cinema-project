const News = require("../models/database/News");

//TODO: Get all news
const getAllNews = async (req, res, next) => {
  try {
    const news = await News.find(); // Retrieves all fields for all news documents
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

//TODO: Get all news title, banner, ID
const getNewsTitlesAndBanners = async (req, res, next) => {
  try {
    const news = await News.find({}, "_id title image_url"); // Select specific fields
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

//TODO: Get all news title, banner, ID with pagination
const getNewsTitlesAndBannersPagination = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Get page and limit from query parameters, with defaults
    const news = await News.find({}, "_id title image_url")
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(parseInt(limit)); // Limit results to the specified number
    const totalCount = await News.countDocuments(); // Get total count of documents

    res.status(200).json({
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
      totalItems: totalCount,
      items: news,
    });
  } catch (error) {
    next(error);
  }
};

//TODO: Get a specific news with ID
const getSpecificNewsById = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract ID from route parameters
    const news = await News.findById(id); // Fetch document by its ID
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

//TODO: Create a news
const createNews = async (req, res, next) => {
  try {
    const newsData = req.body; // Retrieve news data from request body
    const news = new News(newsData); // Initialize a new document
    await news.save(); // Save to the database
    res.status(201).json(news);
  } catch (error) {
    next(error);
  }
};

//TODO: Delete a news
const deleteNewsById = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract ID from route parameters
    const news = await News.findByIdAndDelete(id);
    if (!news) {
      return res.status(404).json({ message: "News not found for deletion" });
    }
    res.status(200).json({ message: "News deleted successfully", news });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNews,
  getNewsTitlesAndBanners,
  getNewsTitlesAndBannersPagination,
  getSpecificNewsById,
  createNews,
  deleteNewsById,
};
