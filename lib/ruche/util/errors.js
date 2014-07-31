/*jshint multistr:true */
module.exports = {

  100: {
    message: 'Error code not found',
    more: '\
The error code is not registered. Check the documentation to see the full list \
of the availables error codes.'
  },

  101: {
    message: 'Unvalid software name format',
    more: '\
The software name you gave is not valid: It must be `software(-version)\
(-option1_option2)(-platform)`.'
  },

  210: {
    message: 'Can\'t read file',
    more: '\
Ruche tried to read a file but can not reach it. Re-installing Ruche may \
be a solution.'
  },

  211: {
    message: 'Can\'t parse JSON file',
    more: '\
Ruche tried to parse a JSON file failed. This likely occurs because the file \
is not a valid JSON object.'
  },

  220: {
    message: 'Cache expired',
    more: 'The cache file is expired.'
  },

  230: {
    message: 'Software not found',
    more: '\
None of the available versions of this software matches the requirements you \
specify.'
  }

};
