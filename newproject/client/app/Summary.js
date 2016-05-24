import React from 'react';

var styles = {
  container: {
    backgroundColor: '#EEEEEE',
    border: '1px solid #AAAAAA',
    margin: '20px 40px',
    padding: 20,
    width: '40%',
    fontFamily: '"Lucida Console", Monaco, monospace',
    position: 'relative',
    minHeight: 40,
    clear: 'both',
  },
  selectText: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'lightYellow',
    padding: 5,
    border: '1px solid #000',
    cursor: 'pointer',
  },
  complete: {
    marginTop: 0,
    color: 'green',
    backgroundColor: '#CCFFCC',
    padding: '5px 20px',
    display: 'inline-block',
  }

};

var Summary = React.createClass({
  render() {
    return(
      <div style={styles.container} className="Summary__container">
        {this.props.isComplete ? <h2 className="noprint" style={styles.complete}>✓ All Done!</h2> : null}
        <div className="noprint" style={styles.selectText} onClick={this.selectText_}>Select All</div>
        <span id="assessmentText">
          {this.keys_().map((key, i) => {
            let value = this.props.assesments[key];
            let score = this.props.skillLevels.indexOf(value);

            return (<div key={i}>{key}: {value} [{score + 1}/{this.props.skillLevels.length}]</div>);
          })}
          <div><br />{this.url_()}</div>
        </span>
      </div>
    );
  },

  url_() {
    let url = "http://pivotskillz.cfapps.io/";
    let params = [];
    if (this.props.name) {
      params.push('name='+this.props.name);
    }
    if (this.props.role) {
      params.push('role='+this.props.role);
    }

    let skills = [];
    this.props.skills.forEach((skillName) => {
      let skillValueName = this.props.assesments[skillName];
      let skillValue = skillValueName && this.props.skillLevels.indexOf(skillValueName) + 1;
      skills.push(skillValue || 'null');
    });
    params.push('skills='+skills.join(','))

    if (params.length) {
      url += "?";
      url += params.join('&');
    }

    return url;
  },

  keys_() {
    return Object.keys(this.props.assesments);
  },

  // Source: http://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
  selectText_() {
    let text = document.getElementById('assessmentText');
    let range;
    let selection;

    if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
  }
});

export default Summary
