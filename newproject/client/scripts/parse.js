#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var route = path.resolve(process.cwd(), './career-paths');
var data = {};

var files = fs.readdirSync(route);

files.forEach((filename) => {

  if(filename.match(/^CORE-SKILL/)) {

    var role = filename.match(/^CORE-SKILL-([A-Z]+)-/)[1];

    var fileRoute = path.resolve(process.cwd(), './career-paths/'+filename);

    var skillData = {
      name: "",
      explanation: "",
      skills: {}
    };

    var fileContents = fs.readFileSync(fileRoute, 'utf8');
    var currentSkill = null;

    fileContents.split(/\n/).forEach((line) => {

      if (line.match(/^\# /)) { // core skill name
        var myRegexp = /\# CORE SKILL: ([a-zA-Z ]+)$/;
        var match = myRegexp.exec(line);

        if (match) {
          skillData.name = match[1].toLowerCase();
        }
      } else if (line.match(/^\*/)) { // skill summary
        var myRegexp = /\*(.*)\*$/;
        var match = myRegexp.exec(line);

        if (match) {
          skillData.explanation = match[1];
        }
      } else if (line.match(/^\#\# /)) { // skill level header
        var myRegexp = /\#\# Level [0-9]+ - (.*)$/;
        var match = myRegexp.exec(line);

        if (match) {
          skillData.skills[match[1].toLowerCase()] = [];
          currentSkill = match[1].toLowerCase();
        }
      } else if (line.match(/^\- /)) { // skill level description
        var myRegexp = /^\- (.*)$/;
        var match = myRegexp.exec(line);

        if (match) {
          skillData.skills[currentSkill].push(match[1]);
        }
      }
    });

    data[role] = data[role] || [];
    data[role].push(skillData);
  }
});

var outputFile = path.resolve(process.cwd(), './app/rawData.js');
fs.writeFileSync(outputFile, 'export default'+JSON.stringify(data)+';\n\n', 'utf8');
