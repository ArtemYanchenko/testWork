import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormBuilder } from "../../src/form-builder/FormBuilder";
import { schema } from "../../src/form-builder/schemas/schema";

test("кнопка удаления недоступна при количестве элементов, равном minItems", async () => {
  const onSubmit = jest.fn();
  render(<FormBuilder schema={schema} onSubmit={onSubmit} />);

  const phonesSection = screen
    .getByRole("heading", { name: /Phones \*/i })
    .closest("div")!;
  const addButton = within(phonesSection).getByRole("button", {
    name: /^Add$/i,
  });

  const card1 = screen
    .getByRole("heading", { name: /Phones 1/i })
    .closest("div")!;
  const buttons1 = within(card1).getAllByRole("button");
  const removeBtn1 = buttons1[buttons1.length - 1];
  expect(removeBtn1).toBeDisabled();

  const phone1 = screen.getByLabelText(/Phone 1/i);
  await userEvent.type(phone1, "123");
  await userEvent.click(addButton);

  const card2 = await screen.findByRole("heading", { name: /Phones 2/i });
  const card2Container = card2.closest("div")!;
  const buttons2 = within(card2Container).getAllByRole("button");
  const removeBtn2 = buttons2[buttons2.length - 1];
  expect(removeBtn2).toBeEnabled();
});
