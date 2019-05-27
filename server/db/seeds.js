use foodTracker
db.dropDatabase();


db.food.insertMany([
  {
    foodName: "burger",
    calories: 1200,
    date: "23/05/2019"
  },
  {
    foodName: "cesar salad",
    calories: 700,
    date: "23/05/2019"
  }
    
])
