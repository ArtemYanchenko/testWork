import { Stack, Typography, Paper } from "@mui/material";
import type { JSONSchema7 } from "json-schema";
import {
    asJSONSchema,
    isObjectSchema,
    isArraySchema,
    titleFromName,
} from "./utils";
import { PrimitiveField } from "./PrimitiveField";
import { ArrayField } from "./ArrayField";
import { type Control, type FieldValues, type Path, type ArrayPath } from "react-hook-form";

type Props<T extends FieldValues = FieldValues> = {
    baseName: Path<T> | "";
    schema: JSONSchema7 & { type: "object" };
    control: Control<T>;
    errors: unknown;
};

export function ObjectFields<T extends FieldValues = FieldValues>({
                                                                      baseName,
                                                                      schema,
                                                                      control,
                                                                      errors,
                                                                  }: Props<T>) {
    const requiredSet = new Set(schema.required || []);
    const entries = Object.entries(schema.properties || {});

    return (
        <Stack spacing={2}>
            {entries.map(([key, def]) => {
                const fieldSchema = asJSONSchema(def);
                if (!fieldSchema) return null;
                const fieldName = (baseName ? `${baseName}.${key}` : key) as Path<T>;
                const fieldErrors = (errors as Record<string, unknown> | undefined)?.[key];
                const isReq = requiredSet.has(key);

                if (isObjectSchema(fieldSchema)) {
                    return (
                        <Paper key={fieldName} variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="subtitle1">{titleFromName(key)}</Typography>
                            <ObjectFields baseName={fieldName} schema={fieldSchema} control={control} errors={fieldErrors} />
                        </Paper>
                    );
                }

                if (isArraySchema(fieldSchema)) {
                    return (
                        <ArrayField
                            key={fieldName}
                            name={fieldName as ArrayPath<T>}
                            schema={fieldSchema}
                            control={control}
                            errors={fieldErrors}
                        />
                    );
                }

                return (
                    <PrimitiveField
                        key={fieldName}
                        name={fieldName}
                        schema={fieldSchema}
                        control={control}
                        errors={fieldErrors}
                        required={isReq}
                    />
                );
            })}
        </Stack>
    );
}
