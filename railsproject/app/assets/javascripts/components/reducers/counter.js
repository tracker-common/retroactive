import { INCREMENT_COUNTER, DECREMENT_COUNTER, SET_COUNTER } from '../actions/counter';

export default function counter(state = 0, action) {
  switch (action.type) {
  case INCREMENT_COUNTER:
    var countObject = 0;
    var serverRequest = $.ajax({
      url : '/countIncrement',
      type : "get",
      async : false,
      success : function (result) {
        countObject = result.count;
        console.log(countObject.count);
      }
    });
    //console.log(this);
    //return this.state.counter;
    return countObject;
  case DECREMENT_COUNTER:
    return state - 1;
  case SET_COUNTER:
    return action.counter;
  default:
    return state;
  }
}
