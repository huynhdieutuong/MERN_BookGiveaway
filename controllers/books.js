const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const form = formidable({ multiples: true });

const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Book = require('../models/Book');

exports.getBooks = asyncHandler(async (req, res, next) => {});

exports.getBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id)
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
    const { title, description, author, category } = fields;

    const book = new Book({
      title,
      description,
      author,
      category,
      user: req.user._id,
    });

    const imageUrls = await uploadImages(files.images, book);

    // Create new book
    if (files.images) book.imageUrls = imageUrls;
    await book.save();

    res.status(201).json({
      success: true,
      data: book,
    });
  });
});

exports.editBook = asyncHandler(async (req, res, next) => {
  form.parse(req, async (err, fields, files) => {
    const book = await Book.findById(req.params.id)
      .populate('category')
      .populate({ path: 'user', select: 'name username' });

    if (!book) return next(new ErrorResponse('Book not found', 404));

    const imageUrls = await uploadImages(files.images, book, true);

    // Edit book
    const { title, description, author, category } = fields;

    if (title) book.title = title;
    if (description) book.description = description;
    if (author) book.author = author;
    if (category) book.category = category;
    if (files.images) book.imageUrls = imageUrls;

    await book.save();

    res.status(200).json({
      success: true,
      data: book,
    });
  });
});

exports.deleteBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) return next(new ErrorResponse('Book not found', 404));

  await book.remove();

  res.status(200).json({
    success: true,
    message: 'Book deleted',
  });
});

// Upload images
const uploadImages = async (filesImages, book, edit = false) => {
  const imageUrls = edit ? [...book.imageUrls] : [];

  // Validate images
  if (filesImages) {
    const images = [];

    for (const image of filesImages) {
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
      name = `book_${book._id}_${path.split('_')[1]}`;

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

  return imageUrls;
};
