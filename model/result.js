export default function createResult (success, data) {
  var result = {};
  result.success = success;
  result.data = data;
  return result;
};