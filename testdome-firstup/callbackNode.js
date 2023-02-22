function wrapGameAction(emitter, actionName, callback) {
    // Write your code here
      function callbackWrapper(jsonString) {
        var parsedJson;
        try {
          parsedJson = JSON.parse(jsonString);
        } catch(e) {
          
        }
        return callback(parsedJson);
        
      }
      emitter.addListener(actionName, callbackWrapper);
  }
  
  const events = require('events');
  
  let emitter = new events.EventEmitter();
  wrapGameAction(emitter, "player_1_select", console.log);
  emitter.emit("player_1_select", "{ \"row\": 1, \"column\": 1 }");
  
  module.exports.wrapGameAction = wrapGameAction;