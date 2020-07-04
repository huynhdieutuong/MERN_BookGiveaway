const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const form = formidable({ multiples: true });

const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Book = require('../models/Book');

exports.getBooks = asyncHandler(async (req, res, next) => {});

exports.getBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findOne({ slug: req.params.slug })
    .populate('category')
    .populate({ path: 'user', select: 'name username' });

  if (!book) return next(new ErrorResponse('Book not found', 404));

  res.status(200).json({
    success: true,
    data: book,
  });
});

exports.createBook = asyncHandler(async (req, res, next) => {
  form.parse(req, async (err, fields, files) => {
    const imageUrls = [];

    // Validate images
    if (files.images) {
      const images = [];

      for (const image of files.images) {
        let { size, path, name, type } = image;

        // Make sure the file is a photo
        if (!type.startsWith('image'))
          return next(
            new ErrorResponse(
              `${name} isn't image. Please upload only image files.`,
              400
            )
          );

        // Check image size
        if (size > process.env.MAX_SIZE * 1024 * 1024)
          return next(
            new ErrorResponse(
              `${name} over ${process.env.MAX_SIZE} MB. Please upload images less than ${process.env.MAX_SIZE} MB.`,
              400
            )
          );

        // Create custom filename
        name = `book_${req.user._id}_${path.split('_')[1]}`;

        images.push({ name, path });
      }

      // Upload images to cloudinary
      for (const image of images) {
        result = await cloudinary.uploader.upload(image.path, {
          public_id: 'BookGiveaway/Books/' + image.name,
        });

        imageUrls.push(result.url);
      }
    }

    // Create new book
    const { title, description, author, category } = fields;

    const book = await Book.create({
      title,
      description,
      author,
      category,
      imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: book,
    });
  });
});

exports.editBook = asyncHandler(async (req, res, next) => {});

exports.deleteBook = asyncHandler(async (req, res, next) => {});
