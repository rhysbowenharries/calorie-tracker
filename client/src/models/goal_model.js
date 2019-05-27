const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const GoalModel = function(url){
    this.url = url;
    this.request = new RequestHelper(this.url);
}

GoalModel.prototype.bindEvents = function(){
    PubSub.subscribe('GoalView:goalset', (event) => {
        const updateGoal = event.detail
        console.log('updateGoal',updateGoal);
        const goalObject = this.createGoalObject(updateGoal);
        this.request.put(updateGoal._id, goalObject)
            .then((goal) => {
                PubSub.publish('GoalModel:goal', goal)
            })
      })
}


GoalModel.prototype.getGoal = function() {
    this.request.get()
      .then( (goal) => {
        PubSub.publish('GoalModel:goal', goal);
      })
}

GoalModel.prototype.createGoalObject = function(updateGoal){
    const goal = {
        goal: parseInt(updateGoal.goal)
    }
    console.log(goal);
    
    return goal;
}

module.exports = GoalModel;