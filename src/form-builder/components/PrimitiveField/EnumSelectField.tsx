import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type { ControllerRenderProps, Path } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import type { JSONSchema7 } from "json-schema";

type Props<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>;
  schema: JSONSchema7;
  label: string;
  required: boolean;
  helper?: string;
};

export function EnumSelectField<T extends FieldValues>({
  field,
  schema,
  label,
  required,
  helper,
}: Props<T>) {
  const values = (schema.enum || []) as (string | number | boolean)[];
  const kind = typeof values[0];

  const handleChange = (e: SelectChangeEvent) => {
    const raw = e.target.value;
    let next: unknown = raw;

    if (raw === undefined || raw === "") {
      next = undefined;
    } else if (kind === "number") {
      const n = Number(raw);
      next = Number.isNaN(n) ? undefined : n;
    } else if (kind === "boolean") {
      next = String(raw) === "true";
    }

    field.onChange(next);
  };

  return (
    <FormControl fullWidth error={!!helper} size="small">
      <InputLabel id={`${field.name}-label`}>
        {`${label}${required ? " *" : ""}`}
      </InputLabel>

      <Select
        labelId={`${field.name}-label`}
        label={`${label}${required ? " *" : ""}`}
        displayEmpty
        value={field.value ?? ""}
        onChange={handleChange}
        onBlur={field.onBlur}
        inputRef={field.ref}
        name={field.name}
      >
        {values.map((v) => (
          <MenuItem
            key={String(v)}
            value={kind === "boolean" ? String(v) : (v as string | number)}
          >
            {String(v)}
          </MenuItem>
        ))}
      </Select>

      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );
}
