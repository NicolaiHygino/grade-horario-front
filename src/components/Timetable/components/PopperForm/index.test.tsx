import { render, screen } from "@testing-library/react";
import PopperForm from ".";

describe("PopperForm", () => {
  test.each(["Título", "Início", "Fim", "Cor"])(
    "should render %s input",
    (fieldLabel) => {
      render(<PopperForm id="test" open={true} event={null} anchorEl={null} />);
      const textField = screen.getByLabelText(fieldLabel);
      expect(textField).toBeInTheDocument();
    }
  );
});
