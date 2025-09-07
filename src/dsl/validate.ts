import { readFileSync } from "node:fs";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const schema = JSON.parse(readFileSync("./schema-fixed.json", "utf-8"));
const dash = JSON.parse(readFileSync("./dashboard-example-fixed.json", "utf-8"));

const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);

const validate = ajv.compile(schema);
const ok = validate(dash);

if (ok) {
    console.log("✅ Dashboard JSON is valid.");
} else {
    console.error("❌ Validation errors:");
    console.error(validate.errors);
    process.exit(1);
}
