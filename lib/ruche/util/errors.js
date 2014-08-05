/*jshint multistr:true */
module.exports = {

  100: {
    message: 'Error code not found',
    more: '\
The error code is not registered. Check the documentation to see the full list \
of the available error codes.'
    // data: { code: invalidCode }
  },

  101: {
    message: 'Invalid software name format',
    more: '\
The software name you gave is not valid: It must be `software(-version)\
(-option1_option2)(-platform)`.'
    // data: { software: invalidSoftware }
  },

  110: {
    message: 'Can\'t reach URL',
    more: '\
The Ruche client tried to connect to the repository but failed. Maybe the \
repository\'s server is down or your configuration wrong.'
    // data: { url: invalidUrl }
  },

  210: {
    message: 'Can\'t read file',
    more: '\
Ruche tried to read a file but can not reach it. Re-installing Ruche may \
be a solution.'
    // data: { file: invalidFile }
  },

  211: {
    message: 'Can\'t parse JSON file',
    more: '\
Ruche tried to parse a JSON file and failed. This likely occurs because the \
file is not a valid JSON object.'
    // data: { json: invalidJson }
  },

  212: {
    message: 'Can\'t save file',
    more: '\
Ruche tried to save a file failed.'
    // data: { file: invalidFile }
  },

  220: {
    message: 'Cache expired',
    more: 'The cache file is expired.'
  },
  // data: { file: invalidFile }

  230: {
    message: 'Software not found',
    more: '\
None of the available versions of this software matches the requirements you \
specify.'
    // data: { software: invalidSoftware }
  }

};
