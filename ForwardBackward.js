'use strict';
// Block Factory - https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
// ... Names have been changed to clarify which are nemes
// ... Comments have been added to clarify actions
Blockly.defineBlocksWithJsonArray
([
  {
    // "typeForwardBackward" is the name for javascript.javascriptGenerator.forBlock{}
    "type": "typeForwardBackward",
    // The words "Forward or backward" are displayed on Block screen
    "message0": "Forward or backward %1",
    "args0": [
      {
        "type": "field_dropdown",
        // "nameForwardBackward" is in javascript.javascriptGenerator.forBlock{}
        "name": "nameForwardBackward",
        "options": [
          [
            "forward",
            "nameMoveForward"
          ],
          [
            "backward",
            "nameMoveBackward"
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
javascript.javascriptGenerator.forBlock['typeForwardBackward'] = function(block, generator) {
  const dropdown_forwardbackward = block.getFieldValue('nameForwardBackward');
  // TODO: Assemble javascript into code variable.
  return dropdown_forwardbackward === 'nameMoveForward'
         ? 'fSinCosArrowMovement(0, -1);\n'
         : dropdown_forwardbackward === 'nameMoveBackward'
           ? 'fSinCosArrowMovement(0, 1);\n'
           : '\n';
};
