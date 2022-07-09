const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data form collection
  const tours = await Tour.find();
  // 2) Build templete

  // 3) Render that template using tour data form 1)

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'reviews rating user'
  });

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});
