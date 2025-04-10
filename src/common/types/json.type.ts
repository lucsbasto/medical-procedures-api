export type JSONValue = string | number | boolean | JSONObject | JSONArray;

export type JSONObject = { [x: string]: JSONValue };

export type JSONArray = Array<JSONValue>;
