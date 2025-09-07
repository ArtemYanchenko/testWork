import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { JSONSchema7 } from "json-schema";
import {
  isEnum,
  isNumberLike,
  titleFromName,
  getErrorMessage,
} from "../../utils";

import { EnumSelectField } from "./EnumSelectField";
import { BooleanCheckboxField } from "./BooleanCheckboxField";
import { TextNumberField } from "./TextNumberField";

export type BaseFieldProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  schema: JSONSchema7;
  control: Control<T>;
  errors: unknown;
  required?: boolean;
  labelOverride?: string;
};

export function PrimitiveField<T extends FieldValues = FieldValues>({
  name,
  schema,
  control,
  errors,
  required,
  labelOverride,
}: BaseFieldProps<T>) {
  const label = labelOverride ?? schema.title ?? titleFromName(name);
  const helper = getErrorMessage(errors);

  if (isEnum(schema)) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <EnumSelectField
            field={field}
            schema={schema}
            label={label}
            required={!!required}
            helper={helper}
          />
        )}
      />
    );
  }

  if (schema.type === "boolean") {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <BooleanCheckboxField
            field={field}
            label={label}
            required={!!required}
            helper={helper}
          />
        )}
      />
    );
  }

  const numberLike = isNumberLike(schema);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextNumberField
          field={field}
          schema={schema}
          label={label}
          required={!!required}
          helper={helper}
          isNumber={numberLike}
        />
      )}
    />
  );
}
