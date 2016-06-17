import React from 'react';
var Timer = React.createClass({
    componentDidMount: function(){

        // componentDidMount is called by react when the component 
        // has been rendered on the page. We can set the interval here:

        this.timer = setInterval(this.tick, 50);
    },

    componentWillUnmount: function(){

        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:

        clearInterval(this.timer);
    },

    tick: function(){

        // This function is called every 50 ms. It updates the 
        // elapsed counter. Calling setState causes the component to be re-rendered
        this.props.setElapsed(new Date() - this.props.start);
    },

    render: function() {
        
        var elapsed = Math.round(this.props.timeElapsed/ 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        var minutes = (elapsed / 600).toFixed(0);
        var seconds = ((elapsed /10) % 60).toFixed(0);   

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.

        return (<div>
                {
                    this.props.timerShow &&
                    ( 
                        <b className="timer_box">{minutes}: {seconds}</b>
                    )
                }
            </div>);
    }
});

export default Timer;