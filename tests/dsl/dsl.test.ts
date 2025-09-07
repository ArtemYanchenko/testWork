import { readFileSync } from "fs";
import { join } from "path";
import Ajv from "ajv";
import addFormats from "ajv-formats";

function makeAjv() {
    const ajv = new Ajv({ allErrors: true, strict: true, strictRequired: false });

    addFormats(ajv);
    return ajv;
}

describe("Dashboard DSL JSON Schema", () => {
    const schemaPath = join(__dirname, "../../src/dsl/schema.json");
    const dataPath = join(__dirname, "../../src/dsl/dashboard-example.json");

    const schema = JSON.parse(readFileSync(schemaPath, "utf-8"));
    const ajv = makeAjv();
    const validate = ajv.compile(schema);

    test("valid dashboard passes", () => {
        const okData = JSON.parse(readFileSync(dataPath, "utf-8"));
        expect(validate(okData)).toBe(true);
    });

    test("missing version fails", () => {
        const data = JSON.parse(readFileSync(dataPath, "utf-8"));
        delete data.version;
        expect(validate(data)).toBe(false);
    });

    test("both layout and width/height should FAIL (oneOf)", () => {
        const data = JSON.parse(readFileSync(dataPath, "utf-8"));
        const chart = data.sections[0].charts[0];
        chart.width = 12;
        chart.height = 6;
        expect(validate(data)).toBe(false);
    });

    test("unknown chart type fails", () => {
        const data = JSON.parse(readFileSync(dataPath, "utf-8"));
        data.sections[0].charts[0].type = "pie";
        expect(validate(data)).toBe(false);
    });
});
