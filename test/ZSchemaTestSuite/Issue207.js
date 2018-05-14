"use strict";

module.exports = {
  description: "async validators do not work inside oneOf",
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
    // try removing the oneOf, starts working (allOf also works)
    oneOf: [
      {
        type: "string",
        format: "string-length"
      }
    ]

    // just these without oneOf work
    // type: "string",
    // format: "string-length"
  },
  tests: [
    {
      description:
        "should pass custom format as string length is greater than 10",
      data: "123456789012345",
      valid: true
    },
    {
      description:
        "should fail custom format as string length is lower than 10",
      data: "12345",
      valid: false
    }
  ]
};
