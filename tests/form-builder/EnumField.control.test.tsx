import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormBuilder } from "../../src/form-builder/FormBuilder";
import { schema } from "../../src/form-builder/schemas/schema";

test("enum поле ведет себя контролируемо", async () => {
  const onSubmit = jest.fn();
  render(<FormBuilder schema={schema} onSubmit={onSubmit} />);

  const genderSelect = screen.getByRole("combobox", { name: /Gender/i });

  await userEvent.click(genderSelect);
  await userEvent.click(screen.getByRole("option", { name: "male" }));
  expect(genderSelect).toHaveTextContent(/male/i);

  await userEvent.click(genderSelect);
  await userEvent.click(screen.getByRole("option", { name: "female" }));
  expect(genderSelect).toHaveTextContent(/female/i);

  await userEvent.click(genderSelect);
  await userEvent.click(screen.getByRole("option", { name: "male" }));
  expect(genderSelect).toHaveTextContent(/male/i);
});
