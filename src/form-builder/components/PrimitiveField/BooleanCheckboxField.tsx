import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import type { ChangeEvent } from "react";

type Props<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>;
  label: string;
  required: boolean;
  helper?: string;
};

export function BooleanCheckboxField<T extends FieldValues>({
  field,
  label,
  required,
  helper,
}: Props<T>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    field.onChange(e.target.checked);

  return (
    <FormControl error={!!helper}>
      <FormControlLabel
        control={
          <Checkbox checked={Boolean(field.value)} onChange={handleChange} />
        }
        label={`${label}${required ? " *" : ""}`}
      />
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );
}
