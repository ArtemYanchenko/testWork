import type { JSONSchema7 } from "json-schema";
import {
    isObjectSchema,
    isArraySchema,
    isEnum,
    isNumberLike,
    asJSONSchema,
    titleFromName,
    getMinMaxProps,
    emptyValueForSchema,
    getErrorMessage,
} from "../../src/form-builder/utils";

describe("utils", () => {
    test("isObjectSchema возвращает true только для object с properties", () => {
        const schema: JSONSchema7 = { type: "object", properties: { a: { type: "string" } } };
        expect(isObjectSchema(schema)).toBe(true);
        expect(isObjectSchema({ type: "object" } as JSONSchema7)).toBe(false);
        expect(isObjectSchema({ type: "string" } as JSONSchema7)).toBe(false);
    });

    test("isArraySchema возвращает true только для array с items", () => {
        const schema: JSONSchema7 = { type: "array", items: { type: "string" } };
        expect(isArraySchema(schema)).toBe(true);
        expect(isArraySchema({ type: "array" } as JSONSchema7)).toBe(false);
        expect(isArraySchema({ type: "string" } as JSONSchema7)).toBe(false);
    });

    test("isEnum корректно определяет enum", () => {
        expect(isEnum({ enum: ["a", "b"] } as JSONSchema7)).toBe(true);
        expect(isEnum({ type: "string" } as JSONSchema7)).toBe(false);
    });

    test("isNumberLike работает для number и integer", () => {
        expect(isNumberLike({ type: "number" } as JSONSchema7)).toBe(true);
        expect(isNumberLike({ type: "integer" } as JSONSchema7)).toBe(true);
        expect(isNumberLike({ type: "string" } as JSONSchema7)).toBe(false);
    });

    test("asJSONSchema возвращает undefined для boolean схемы", () => {
        expect(asJSONSchema(false)).toBeUndefined();
        expect(asJSONSchema({ type: "string" })).toEqual({ type: "string" });
    });

    test("titleFromName преобразует имя в читаемый заголовок", () => {
        expect(titleFromName("streetAddress")).toBe("Street Address");
        expect(titleFromName("phones_1")).toBe("Phones 1");
        expect(titleFromName("User.Name")).toBe(" Name");
    });

    test("getMinMaxProps возвращает ограничения", () => {
        const schema: JSONSchema7 = { minLength: 2, maxLength: 5, minimum: 1, maximum: 10, multipleOf: 2 };
        expect(getMinMaxProps(schema).inputProps).toEqual({
            minLength: 2,
            maxLength: 5,
            min: 1,
            max: 10,
            step: 2,
        });
    });

    test("emptyValueForSchema возвращает корректные значения", () => {
        expect(emptyValueForSchema({ type: "array", items: { type: "string" } })).toEqual([]);
        expect(emptyValueForSchema({ type: "object", properties: {} })).toEqual({});
        expect(emptyValueForSchema({ type: "number" })).toBeUndefined();
        expect(emptyValueForSchema({ type: "integer" })).toBeUndefined();
        expect(emptyValueForSchema({ type: "boolean" })).toBe(false);
        expect(emptyValueForSchema({ type: "string" })).toBe("");
    });

    test("getErrorMessage достаёт строку из ошибки", () => {
        expect(getErrorMessage({ message: "Ошибка" })).toBe("Ошибка");
        expect(getErrorMessage({ message: 123 })).toBeUndefined();
        expect(getErrorMessage(undefined)).toBeUndefined();
    });
});
