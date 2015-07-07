// Read the input as a JSON object
session.input.readAsJSON (function (error, json) {
    if (error) {
      // an error occurred when parsing the content, e.g. invalid JSON object
      // uncatched error will stop the processing and the error will be logged
      throw error;
    }
    // Add data to the input object and write to the ouput context
    json.extra = "Extra value";
    session.output.write(json);
});
