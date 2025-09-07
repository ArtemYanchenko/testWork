import { type FC, useMemo } from "react";
import { useForm, type FieldValues, type DefaultValues } from "react-hook-form";
import { ajvResolver } from "@hookform/resolvers/ajv";
import { Box, Stack, Typography, Divider, Button, Paper } from "@mui/material";
import type { JSONSchema7 } from "json-schema";
import type { JSONSchemaType } from "ajv";
import { ObjectFields } from "./components/ObjectFields.tsx";
import { isObjectSchema, emptyValueForSchema } from "./utils";

type FormBuilderProps<TForm extends FieldValues = FieldValues> = {
  schema: JSONSchema7;
  defaultValues?: DefaultValues<TForm>;
  onSubmit: (values: TForm) => void;
  title?: string;
};

function buildInitialDefaults<TForm extends FieldValues>(
  schema: JSONSchema7,
  provided?: DefaultValues<TForm>,
): DefaultValues<TForm> | undefined {
  if (provided) return provided;
  const v = emptyValueForSchema(schema);
  return v as unknown as DefaultValues<TForm>;
}

export const FormBuilder: FC<FormBuilderProps> = ({
  schema,
  defaultValues,
  onSubmit,
  title,
}) => {
  const resolver = useMemo(
    () =>
      ajvResolver<FieldValues>(
        schema as unknown as JSONSchemaType<FieldValues>,
        { allErrors: true, strict: false },
        { mode: "sync" },
      ),
    [schema],
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver,
    defaultValues: buildInitialDefaults(schema, defaultValues),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const submit = handleSubmit(onSubmit as (values: FieldValues) => void);
  const handleReset = () => reset(buildInitialDefaults(schema, defaultValues));

  if (!isObjectSchema(schema)) {
    return <Typography color="error">Root schema must be an object</Typography>;
  }

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Typography variant="h4" align="center" sx={{ pb: 3 }}>
        Form Builder
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Stack spacing={2}>
          {title && (
            <>
              <Typography variant="h6">{title}</Typography>
              <Divider />
            </>
          )}

          <ObjectFields
            baseName=""
            schema={schema as JSONSchema7 & { type: "object" }}
            control={control}
            errors={errors}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Submit
            </Button>
            <Button type="button" variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
