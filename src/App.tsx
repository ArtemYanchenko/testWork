import { schema } from "./form-builder/schemas/schema.ts";
import { FormBuilder } from "./form-builder/FormBuilder.tsx";

export default function App() {
  return (
    <FormBuilder
      schema={schema}
      onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
    />
  );
}
