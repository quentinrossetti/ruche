/*jshint multistr:true */
module.exports = {

  100: {
    message: 'Error code not found',
    more: '\
The error code is not registered. Check the documentation to see the full list \
of the availables error codes.'
  },

  210: {
    message: 'Can\'t read Ruche\'s package.json file',
    more: '\
Ruche tried to read its package.json file but can not reach it. Re-installing \
Ruche may be a solution.'
  },

  211: {
    message: 'Can\'t parse Ruche\'s package.json file',
    more: '\
Ruche tried to parse its package.json file failed. This likely occurs because\
the package.json file is not a valid JSON object.'
  }

};
