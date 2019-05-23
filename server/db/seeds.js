use foodTracker
db.dropDatabase();


db.foodTracker.insertMany([
  {
    name: "burger",
    calories: 1200,
    date: "23/05/2019"
  },
  {
    name: "cesar salad",
    calories: 700,
    date: "23/05/2019"
  }
    
])
