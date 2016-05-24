import React from 'react';

const styles = {
  header: {
    textTransform: 'capitalize',
    fontSize: 24
  },
  controls: {
    margin: '20px 0 20px 0'
  },
  button: {
    boxShadow: "inset 0px 39px 0px -24px #067d6f",
    backgroundColor: "#026d62",
    borderRadius: "4px",
    border: "1px solid #ffffff",
    display: "inline-block",
    cursor: "pointer",
    color: "#ffffff",
    fontFamily: "Arial",
    fontSize: "15px",
    padding: "6px 15px",
    textDecoration: "none",
    textShadow: "0px 1px 0px #02302b",
    marginRight: 20,
    userSelect: 'none',
    outline: 'none',
  },
  disabled: {
    boxShadow: "inset 0px 39px 0px -24px #999",
    backgroundColor: "#999",
    borderRadius: "4px",
    border: "1px solid #ffffff",
    display: "inline-block",
    cursor: "default",
    color: "#eee",
    fontFamily: "Arial",
    fontSize: "15px",
    padding: "6px 15px",
    textDecoration: "none",
    marginRight: 20,
    userSelect: 'none',
    outline: 'none',
    opacity: '0.4'
  },
  resetButton: {
    boxShadow: "inset 0px 39px 0px -24px lightBlue",
    backgroundColor: "lightBlue",
    borderRadius: "4px",
    border: "1px solid #ffffff",
    display: "inline-block",
    cursor: "pointer",
    color: "teal",
    fontFamily: "Arial",
    fontSize: "15px",
    padding: "6px 15px",
    textDecoration: "none",
    marginRight: 20,
    userSelect: 'none',
    outline: 'none',
  },
  label: {
    textTransform: 'capitalize',
    fontWeight: 600,
    fontSize: 18,
  },
  labelText: {
    paddingLeft: '10px'
  },
  list: {
    marginTop: 5,
  },
  item: {
    fontSize: 14,
  }
};

var Skill = React.createClass({
  render() {
    let {
      skillName,
      skillDescriptions,
      skillLevels,
      currentLevel,
      onClickNext,
      onClickPrev,
      onClickReset
    } = this.props;

    let prevStyles = styles.button;
    let nextStyles = styles.button;

    if (this.props.isFirstSkill) {
      prevStyles = styles.disabled;
      onClickPrev = () => {};
    }

    if (this.props.isLastSkill) {
      nextStyles = styles.disabled;
      onClickNext = () => {};
    }

    return(
      <div style={{display: 'inline-block'}} className="noprint">

        <div>
          <div style={styles.controls}>
            <button style={prevStyles} onClick={onClickPrev}>Previous</button>
            <button style={nextStyles} onClick={onClickNext}>Next</button>
            <button style={styles.resetButton} onClick={onClickReset}>Reset</button>
          </div>
        <h2 style={styles.header}>{skillName}</h2>

          {skillLevels.map((skillLevel, i) => {
            let boundSelect = this.setLevel_.bind(this, skillLevel);

            return (
              <div key={skillLevel}>

                <label style={styles.label} htmlFor={'skillLevel_'+skillName+i}>
                  <input type='radio'
                      id={'skillLevel_'+skillName+i} 
                      name={'skillLevel_'+skillName}
                      onClick={boundSelect}
                      checked={skillLevel === currentLevel ? "CHECKED" : ""} />
                  <span style={styles.labelText}>{skillLevel}</span>
                </label>

                <ul style={styles.list}>
                  {skillDescriptions[skillLevel].map((part, i) => {
                    return (
                      <li key={i} style={styles.item}>{part}</li>
                    );
                  })}
                </ul>

              </div>
            );
          })}
        </div>
      </div>
    );
  },

  setLevel_(skillLevel) {
    this.props.onSkillSet(skillLevel);
  }
})

export default Skill;
