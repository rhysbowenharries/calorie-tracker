const PubSub = require('../helpers/pub_sub.js')
const UpdateFormView = require('./update_form_view.js');

const EntryView = function (element) {
  this.element = element
}

EntryView.prototype.render = function (data, index) {  
  const tile = document.createElement('form')
  tile.classList.add('update-form')
  tile.id = index
  console.log(data);
  

  const div1 = this.createDiv(tile);
  const div2 = this.createDiv(tile);
  const div3 = this.createDiv(tile);
  const div4 = this.createDiv(tile);
  const div5 = this.createDiv(tile);
  this.createLabel('Name:', div1);
  this.createOurElement(data.foodName, `nameElement${index}`, div1)
  this.createLabel('Calories:', div2);
  this.createOurElement(data.calories, `caloriesElement${index}`, div2)
  this.createLabel('Date:', div3);
  this.createOurElement(data.date, `dateElement${index}`, div3)

  const photo = document.createElement('img');
  photo.src = data.photo;
  div4.appendChild(photo)

  const deleteButton = this.makeButton(data, index, "Delete", div5)
  deleteButton.addEventListener('click', (event) => {
    PubSub.publish('EntryView:delete', event)
  })

  const updateButton = this.makeButton(data, index, "Update", div5)
  updateButton.addEventListener('click', (event) => {
    event.preventDefault();
    const updateForm = new UpdateFormView(this.element, tile);
    updateForm.renderUpdateForm(data);
  })
  
  this.element.appendChild(tile)
}

EntryView.prototype.createLabel = function(name, tile){
  const label = document.createElement('label');
  label.textContent = name;
  tile.appendChild(label);
}

EntryView.prototype.createOurElement = function(input, classList, tile){
  const name = document.createElement('h5')
  name.textContent = input
  name.classList.add(classList);
  tile.appendChild(name)
}

EntryView.prototype.makeButton = function(data, index, content, tile){
  const deleteButton = document.createElement('button')
  deleteButton.value = data._id
  deleteButton.textContent = content
  deleteButton.classList.add(`${content}${index}`)
  tile.appendChild(deleteButton)
  return deleteButton;
}

EntryView.prototype.createDiv = function(tile){
  const div = document.createElement('div');
  div.id = 'concat';
  tile.appendChild(div);
  return div;
}

module.exports = EntryView;
