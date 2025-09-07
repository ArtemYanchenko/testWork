import type { JSONSchema7, JSONSchema7Definition } from "json-schema";

export function isObjectSchema(
  schema?: JSONSchema7,
): schema is JSONSchema7 & { type: "object" } {
  return schema?.type === "object" && !!schema.properties;
}

export function isArraySchema(
  schema?: JSONSchema7,
): schema is JSONSchema7 & { type: "array" } {
  return schema?.type === "array" && !!schema.items;
}

export function isEnum(schema?: JSONSchema7): boolean {
  return Array.isArray((schema as JSONSchema7 | undefined)?.enum);
}

export function isNumberLike(schema?: JSONSchema7): boolean {
  return schema?.type === "number" || schema?.type === "integer";
}

export function asJSONSchema(
  def?: JSONSchema7Definition,
): JSONSchema7 | undefined {
  return typeof def === "boolean" ? undefined : def;
}

export function titleFromName(name: string): string {
  const last = name.split(".").pop() || name;
  return last
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getMinMaxProps(schema?: JSONSchema7): {
  inputProps: Record<string, number | string>;
} {
  const inputProps: Record<string, number | string> = {};
  if (!schema) return { inputProps };
  if (schema.minLength != null) inputProps.minLength = schema.minLength;
  if (schema.maxLength != null) inputProps.maxLength = schema.maxLength;
  if (schema.minimum != null) inputProps.min = schema.minimum;
  if (schema.maximum != null) inputProps.max = schema.maximum;
  if (schema.multipleOf != null) inputProps.step = schema.multipleOf;
  return { inputProps };
}

export function emptyValueForSchema(schema?: JSONSchema7): unknown {
  if (!schema) return undefined;
  if (isArraySchema(schema)) return [];
  if (isObjectSchema(schema)) return {};
  if (isNumberLike(schema)) return undefined;
  if (schema.type === "boolean") return false;
  if (schema.type === "string") return "";
  return "";
}

export function getErrorMessage(err: unknown): string | undefined {
  const msg = (err as { message?: unknown } | undefined)?.message;
  return typeof msg === "string" ? msg : undefined;
}
