import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const asyncGetInputByLabelAndType = async (
  label: string,
  text: string
) => {
  const user = userEvent.setup();
  const input = screen.getByLabelText(label);
  await user.type(input, text);
};
