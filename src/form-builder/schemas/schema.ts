import type { JSONSchema7 } from "json-schema";

export const schema: JSONSchema7 = {
    type: "object",
    properties: {
        streetAddress: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },

        gender: {
            enum: ["male", "female", "else"]
        },

        phones: {
            type: "array",
            minItems: 1,
            maxItems: 3,
            items: { type: "string", minLength: 1, maxLength: 255 }
        },

        parents: {
            type: "array",
            minItems: 0,
            maxItems: 2,
            items: {
                type: "object",
                properties: {
                    relation: { enum: ["mother", "father"] },
                    age: { type: "integer" },
                    name: { type: "string" },
                    secondName: { type: "string" },

                    grandFather: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                            age: { type: "integer" },
                            secondName: { type: "string" },
                            retired: { type: "boolean" }
                        }
                    },

                    grandMother: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                            age: { type: "integer" },
                            secondName: { type: "string" },
                            retired: { type: "boolean" }
                        }
                    }
                }
            }
        }
    },
    required: ["streetAddress", "city", "state"]
};
