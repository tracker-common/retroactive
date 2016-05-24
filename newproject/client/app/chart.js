import React from 'react';
import { Bar, Radar } from 'react-chartjs'

var Chart = React.createClass({
  render() {
    let labels = [];

    this.props.skills.forEach((label, i) => {
      labels[i] = this.toTitleCase_(label);
    });

    let comparisonData = [];
    this.props.comparisonData.split(",").forEach((val) => {
      let parsed = parseInt(val, 10);

      if (isNaN(parsed)) {
        comparisonData.push(null);
      } else {
        comparisonData.push(parsed);
      }
    });

    let dataSets = [this.generateDataset_([
      "rgba(151,187,205,0.2)",
      "rgba(151,187,205,1)",
      "rgba(151,187,205,1)",
      "rgba(220,220,220,1)"], this.valuesFromLevels())];


    dataSets.push(this.generateDataset_([
      "rgba(216, 113, 75, 0.0)",
      "rgba(216, 113, 75, 0.6)",
      "rgba(216, 113, 75, 0.6)",
      "rgba(220,220,220,.7)"], comparisonData));

    let data = {
      labels: labels,
      datasets: dataSets
    };

    // <Bar data={data} options={this.barChartOptions_()} width="500" height="500" />
    return(
      <div style={{display: 'inline-block'}} className="Chart__container">
        <Radar data={data} redraw options={this.chartOptions_()} width="600" height="600" className="Chart" />
      </div>
    );
  },

  valuesFromLevels() {
    let dataArray = [];

    for (var index in this.props.skills) {
      let skillName = this.props.skills[index];
      let skillLevel = this.props.assessment[skillName];
      let numericSkillLevel = this.props.skillLevels.indexOf(skillLevel)


      let scrubbedValue = numericSkillLevel === -1 ? 0 :  numericSkillLevel + 1;

      dataArray[index] = scrubbedValue;
    }

    return dataArray;
  },

  generateDataset_(color, data) {
    return {
      label: "Skill Assessment",
      fillColor: color[0],
      strokeColor: color[1],
      pointColor: color[2],
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: color[3],
      data: data
    }
  },

  chartOptions_() {
    return {
      animationSteps: 30,

      //Boolean - Whether to show lines for each scale point
      scaleShowLine : true,

      //Boolean - Whether we show the angle lines out of the radar
      angleShowLineOut : true,

      //Boolean - Whether to show labels on the scale
      scaleShowLabels : false,

      // Boolean - Whether the scale should begin at zero
      scaleBeginAtZero : true,

      //String - Colour of the angle line
      angleLineColor : "rgba(190,190,190,1)",
      scaleLineColor: "rgba(190,190,190,1)",

      //Number - Pixel width of the angle line
      angleLineWidth : 1,

      //String - Point label font declaration
      pointLabelFontFamily : "'Arial'",

      //String - Point label font weight
      pointLabelFontStyle : "normal",

      //Number - Point label font size in pixels
      pointLabelFontSize : 14,

      //String - Point label font colour
      pointLabelFontColor : "#666",

      //Boolean - Whether to show a dot for each point
      pointDot : true,

      //Number - Radius of each point dot in pixels
      pointDotRadius : 5,

      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth : 1,

      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius : 20,

      //Boolean - Whether to show a stroke for datasets
      datasetStroke : true,

      //Number - Pixel width of dataset stroke
      datasetStrokeWidth : 2,

      //Boolean - Whether to fill the dataset with a colour
      datasetFill : true,

      //String - A legend template
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",

      // Boolean - If we want to override with a hard coded scale
      scaleOverride: true,

      // ** Required if scaleOverride is true **
      // Number - The number of steps in a hard coded scale
      scaleSteps: 4,
      // Number - The value jump in the hard coded scale
      scaleStepWidth: 1,
      // Number - The scale starting value
      scaleStartValue: 0,
    }
  },

  toTitleCase_(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});

export default Chart
