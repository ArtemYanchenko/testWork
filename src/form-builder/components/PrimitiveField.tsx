import {
    Controller,
    type Control,
    type FieldValues,
    type Path,
} from "react-hook-form";
import {
    TextField,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import type { JSONSchema7 } from "json-schema";
import {
    getMinMaxProps,
    isEnum,
    isNumberLike,
    titleFromName,
    getErrorMessage,
} from "../utils.ts";

type FieldProps<T extends FieldValues = FieldValues> = {
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
                                                                    }: FieldProps<T>) {
    const label = labelOverride ?? schema.title ?? titleFromName(name);
    const helper = getErrorMessage(errors);

    if (isEnum(schema)) {
        const values = (schema.enum || []) as (string | number | boolean)[];
        const kind = typeof values[0];

        return (
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth error={!!helper} size="small">
                        <InputLabel id={`${field.name}-label`}>
                            {`${label}${required ? " *" : ""}`}
                        </InputLabel>
                        <Select
                            labelId={`${field.name}-label`}
                            label={`${label}${required ? " *" : ""}`}
                            displayEmpty
                            value={(field.value ?? "") as unknown as string | number}
                            onChange={(e) => {
                                const raw = e.target.value;
                                let next: unknown = raw;
                                if (raw === "") next = undefined;
                                else if (kind === "number") {
                                    const n = Number(raw);
                                    next = Number.isNaN(n) ? undefined : n;
                                } else if (kind === "boolean") {
                                    next = String(raw) === "true";
                                }
                                field.onChange(next);
                            }}
                            onBlur={field.onBlur}
                            inputRef={field.ref}
                            name={field.name}
                        >
                            <MenuItem value="">
                                <em>—</em>
                            </MenuItem>
                            {values.map((v) => (
                                <MenuItem
                                    key={String(v)}
                                    value={
                                        kind === "boolean" ? String(v) : (v as string | number)
                                    }
                                >
                                    {String(v)}
                                </MenuItem>
                            ))}
                        </Select>
                        {helper && <FormHelperText>{helper}</FormHelperText>}
                    </FormControl>
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
                    <FormControl error={!!helper}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Boolean(field.value)}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                            }
                            label={`${label}${required ? " *" : ""}`}
                        />
                        {helper && <FormHelperText>{helper}</FormHelperText>}
                    </FormControl>
                )}
            />
        );
    }

    const { inputProps } = getMinMaxProps(schema);
    const type = isNumberLike(schema) ? "number" : "text";

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    fullWidth
                    size="small"
                    label={`${label}${required ? " *" : ""}`}
                    error={!!helper}
                    helperText={helper}
                    type={type}
                    slotProps={{ htmlInput: inputProps }}
                    value={(field.value ?? "") as string | number}
                    onChange={(e) => {
                        if (isNumberLike(schema)) {
                            const raw = e.target.value;
                            const parsed = raw === "" ? undefined : Number(raw);
                            field.onChange(Number.isNaN(parsed as number) ? undefined : parsed);
                        } else {
                            field.onChange(e.target.value);
                        }
                    }}
                    onBlur={field.onBlur}
                />
            )}
        />
    );
}
