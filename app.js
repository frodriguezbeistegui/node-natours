const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path') 

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes')

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))
// serving static files
app.use(express.static(path.join(__dirname, 'public')));

//  1) Global MIDDLEWARES
// Security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body NavigationPreloadManager, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization againsta NoSQL query Injection
app.use(mongoSanitize());

// Data sanitization againsts XXS
app.use(xss());

// Prevent parameter polition
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);


// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3) ROUTES
app.get('/', (req,res)=>{
  res.status(200).render('base', {
    tour: 'The Forest Hiker',
    user: 'Facu'
  })
})

app.get('/overview', (req,res)=>{
  res.status(200).render('overview', {
    title: 'All Tours'
  })
})

app.get('/tour', (req,res)=>{
  res.status(200).render('tour', {
    title: 'The Forest Hiker'
  })
})

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
