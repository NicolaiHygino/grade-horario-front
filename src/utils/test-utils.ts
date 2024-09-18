import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

export const asyncGetInputByLabelClearAndType = async (
  label: string,
  text: string
) => {
  const input = screen.getByLabelText(label);
  user.clear(input);
  await user.type(input, text);
};

export const asyncGetButtonByTextAndClick = async (text: string) => {
  const button = screen.getByText(text);
  await user.click(button);
};
