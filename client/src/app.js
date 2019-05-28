const FoodModel = require('./models/food_model.js');
const GoalModel = require('./models/goal_model.js');
const ListView = require('./views/list_view.js');
const FormView = require('./views/form_view.js');
const GoalView = require('./views/goal_view.js')
const NavBarView = require('./views/nav_bar_view.js')
const DateRangeModel = require('./models/date_range_model.js')


document.addEventListener("DOMContentLoaded", () => {
  let today = new Date().toISOString().substr(0, 10);
  document.querySelector("#date").value = today;

  const navBarView = new NavBarView('nav#nav-bar')
  navBarView.bindEvents()

  const dateRangeModel = new DateRangeModel()
  dateRangeModel.bindEvents();

  const goalForm = document.querySelector('form#goalSet')
  const goalView = new GoalView(goalForm)
  goalView.bindEvents();

  const list = document.querySelector('table#food-data')
  const listView = new ListView(list)
  listView.bindEvents()

  const form = document.querySelector('form.input-form')
  const formView = new FormView(form)
  formView.bindEvents()

  const goalUrl = 'http://localhost:3000/api/target'
  const goal_model = new GoalModel(goalUrl);
  goal_model.bindEvents();
  goal_model.getGoal();

  const foodUrl = 'http://localhost:3000/api/food'
  const model = new FoodModel(foodUrl);
  model.bindEvents();
  model.getData();



})
