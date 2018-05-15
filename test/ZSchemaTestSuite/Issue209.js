"use strict";

module.exports = {
  description: "async validator returns wrong path",
  async: true,
  options: {
    asyncTimeout: 2000
  },
  setup: function(validator, Class) {
    // asynchronous validator
    Class.registerFormat("string-length", function(str, callback) {
      setTimeout(function() {
        callback(str.length > 10);
      }, 1);
    });

    // same as above but synchronous (comment out the validator above and try with this instead)
    // Class.registerFormat("string-length", function(str) {
    //   return str.length > 10;
    // });
  },
  schema: {
    description: "Some schema",
    type: "object",
    properties: {
      userId: {
        type: "string",
        format: "string-length"
      }
    },
    required: ["userId"]
  },
  tests: [
    {
      description: "Wrong path in custom format async validator",
      data: { userId: "1" },
      valid: false,
      after: function(err) {
        expect(err[0].path).toEqual("#/userId");
      }
    }
  ]
};
