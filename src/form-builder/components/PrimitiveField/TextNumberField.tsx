import { TextField } from "@mui/material";
import type { ControllerRenderProps, Path } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import type { JSONSchema7 } from "json-schema";
import { getMinMaxProps } from "../../utils";
import type { ChangeEvent } from "react";

type Props<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>;
  schema: JSONSchema7;
  label: string;
  required: boolean;
  helper?: string;
  isNumber: boolean;
};

export function TextNumberField<T extends FieldValues>({
  field,
  schema,
  label,
  required,
  helper,
  isNumber,
}: Props<T>) {
  const { inputProps } = getMinMaxProps(schema);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (isNumber) {
      if (schema.type === "string") {
        field.onChange(raw);
        return;
      }

      const parsed = raw === "" ? undefined : Number(raw);
      field.onChange(Number.isNaN(parsed as number) ? undefined : parsed);
    } else {
      field.onChange(raw);
    }
  };

  return (
    <TextField
      fullWidth
      size="small"
      label={`${label}${required ? " *" : ""}`}
      error={!!helper}
      helperText={helper}
      type={isNumber ? "number" : "text"}
      slotProps={{ htmlInput: inputProps }}
      value={(field.value ?? "") as string | number}
      onChange={handleChange}
      onBlur={field.onBlur}
    />
  );
}
