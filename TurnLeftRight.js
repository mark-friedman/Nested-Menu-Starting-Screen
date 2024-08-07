'use strict';
// Block Factory - https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
// ... Names have been changed to clarify which are nemes
// ... Comments have been added to clarify actions
Blockly.defineBlocksWithJsonArray
([
  {
    // "typeTurnLeftRight" is the name for javascript.javascriptGenerator.forBlock{}
    "type": "typeTurnLeftRight",
    // The words "Turn left or right" are displayed on Block screen
    "message0": "Turn left or right %1",
    "args0": [
      {
        "type": "field_dropdown",
        // "nameDirection" is in javascript.javascriptGenerator.forBlock{}
        "name": "nameDirection",
        "options": [
          [
            "left",
            "nameTurnLeft"
          ],
          [
            "right",
            "nameTurnRight"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }
]);

// Used to generate and run JavaScript
javascript.javascriptGenerator.forBlock['typeTurnLeftRight'] = function(block, generator) {
  var dropdown_direction = block.getFieldValue('nameDirection');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};