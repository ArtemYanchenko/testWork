import { useCallback, useEffect, useRef } from "react";
import {
  useFieldArray,
  type Control,
  type FieldValues,
  type ArrayPath,
  type Path,
} from "react-hook-form";
import { Stack, Typography, Paper, Button, IconButton } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import type { JSONSchema7, JSONSchema7Definition } from "json-schema";
import {
  asJSONSchema,
  isObjectSchema,
  isArraySchema,
  titleFromName,
} from "../utils.ts";
import { PrimitiveField } from "./PrimitiveField";
import { ObjectFields } from "./ObjectFields.tsx";

type FieldProps<T extends FieldValues = FieldValues> = {
  name: ArrayPath<T>;
  schema: JSONSchema7;
  control: Control<T>;
  errors: unknown;
};

export function ArrayField<T extends FieldValues = FieldValues>({
  name,
  schema,
  control,
  errors,
}: FieldProps<T>) {
  const itemsDef: JSONSchema7Definition | undefined = Array.isArray(
    schema.items,
  )
    ? schema.items[0]
    : schema.items;
  const itemsSchema = asJSONSchema(itemsDef);

  const { fields, append, remove } = useFieldArray<T, ArrayPath<T>>({
    control,
    name,
    keyName: "id",
  });

  const minItems = schema.minItems ?? 0;
  const maxItems = schema.maxItems ?? Infinity;

  const handleAdd = useCallback(() => {
    if (fields.length >= maxItems) return;
    append("" as T[ArrayPath<T>][number]);
  }, [fields.length, maxItems, append]);

  const didInitRef = useRef(false);

  useEffect(() => {
    if (didInitRef.current) return;
    if (minItems > 0 && fields.length === 0) {
      handleAdd();
    }
    didInitRef.current = true;
  }, [minItems, fields.length, handleAdd]);

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1">
          {titleFromName(name)}
          {minItems > 0 ? " *" : ""}
        </Typography>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          size="small"
          onClick={handleAdd}
          disabled={fields.length >= maxItems}
        >
          Add
        </Button>
      </Stack>

      {fields.map((field, index) => {
        const itemName = `${name}.${index}` as Path<T>;
        const itemErrors = (errors as Record<number, unknown> | undefined)?.[
          index
        ];

        return (
          <Paper key={field.id} variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle2">
                  {`${titleFromName(name)} ${index + 1}`}
                </Typography>
                <IconButton
                  onClick={() => fields.length > minItems && remove(index)}
                  disabled={fields.length <= minItems}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>

              {isObjectSchema(itemsSchema) ? (
                <ObjectFields
                  baseName={itemName}
                  schema={itemsSchema}
                  control={control}
                  errors={itemErrors}
                />
              ) : isArraySchema(itemsSchema) ? (
                <ArrayField
                  name={itemName as ArrayPath<T>}
                  schema={itemsSchema}
                  control={control}
                  errors={itemErrors}
                />
              ) : (
                <PrimitiveField
                  name={itemName}
                  schema={itemsSchema as JSONSchema7}
                  control={control}
                  errors={itemErrors}
                  labelOverride={`${titleFromName(name).replace(/s$/, "")} ${index + 1}`}
                />
              )}
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}
