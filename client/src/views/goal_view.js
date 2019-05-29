const PubSub = require('../helpers/pub_sub.js')


const GoalView = function (element) {
    this.element = element;
}

GoalView.prototype.bindEvents = function(){
    PubSub.subscribe('GoalModel:goal', (event) => {
        const dbGoal = event.detail[0];
        const goalInput = document.querySelector('input#goal_input');
        goalInput.value = dbGoal.goal;
        const goalSubmitButton = document.querySelector('button#goal_submit')
        goalSubmitButton.value = dbGoal._id
    })

    this.element.addEventListener('submit', (event) => {
        const newGoal = event.target
        console.log("newGoal",this.element);
        const newGoalObject = this.getGoal(newGoal);
        PubSub.publish('GoalView:goalset', newGoalObject)
        event.target.reset()
    })
}










GoalView.prototype.getGoal = function(newGoal){
    const goalObject = {
        _id: newGoal.goal_submit.value,
        goal: newGoal.goal.value
    }
    return goalObject
}


module.exports = GoalView;
