import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormBuilder } from "../../src/form-builder/FormBuilder";
import { schema } from "../../src/form-builder/schemas/schema";

function renderForm(onSubmit: (v: unknown) => void) {
  return render(
    <FormBuilder schema={schema} onSubmit={onSubmit} title="Test Form" />,
  );
}

test("отрисовывает обязательные поля объекта", () => {
  const onSubmit = jest.fn();
  renderForm(onSubmit);

  expect(screen.getByLabelText(/Street Address \*/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/City \*/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/State \*/i)).toBeInTheDocument();

  expect(
    screen.getByRole("heading", { name: /Phones \*/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /Phones 1/i }),
  ).toBeInTheDocument();
});

test("успешный submit с корректными значениями", async () => {
  const onSubmit = jest.fn();
  renderForm(onSubmit);

  await userEvent.type(screen.getByLabelText(/Street Address \*/i), "Main st.");
  await userEvent.type(screen.getByLabelText(/City \*/i), "NYC");
  await userEvent.type(screen.getByLabelText(/State \*/i), "NY");

  const genderSelect = screen.getByRole("combobox");
  await userEvent.click(genderSelect);
  await userEvent.click(screen.getByRole("option", { name: "male" }));

  const phoneInputs = screen.getAllByLabelText(/Phone/i);
  await userEvent.type(phoneInputs[0], "123-456");

  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit.mock.calls[0][0]).toMatchObject({
    streetAddress: "Main st.",
    city: "NYC",
    state: "NY",
    gender: "male",
    phones: ["123-456"],
  });
});
