import { asyncGetInputByLabelClearAndType } from "@/utils/test-utils";
import { PopoverVirtualElement } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PopperForm from ".";

describe("PopperForm", () => {
  const virtualElementMock: PopoverVirtualElement = {
    getBoundingClientRect: () => ({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    }),
    nodeType: Node.ELEMENT_NODE,
  };

  test.each(["Título", "Início", "Fim", "Cor"])(
    "should render %s input",
    (fieldLabel) => {
      render(
        <PopperForm
          id="test"
          open={true}
          event={null}
          anchorEl={virtualElementMock}
        />
      );
      const textField = screen.getByLabelText(fieldLabel);
      expect(textField).toBeInTheDocument();
    }
  );

  it("should fill fields, submit form and call onSubmit with correctly data", async () => {
    const handleSubmitMock = jest.fn();
    const user = userEvent.setup();

    render(
      <PopperForm
        id="test"
        handleSubmit={handleSubmitMock}
        open={true}
        event={null}
        anchorEl={virtualElementMock}
      />
    );
    await asyncGetInputByLabelClearAndType("Título", "Mock Event");
    await asyncGetInputByLabelClearAndType("Início", "0100");
    await asyncGetInputByLabelClearAndType("Fim", "0200");

    const colorInput = screen.getByLabelText("Cor");
    fireEvent.input(colorInput, { target: { value: "#ffffff" } });

    const button = screen.getByText("Salvar");
    await user.click(button);

    expect(handleSubmitMock).toHaveBeenCalledWith({
      name: "Mock Event",
      startTime: "01:00",
      endTime: "02:00",
      bgColor: "#ffffff",
    });
  });

  it("should fill fields, submit form and call onClickAway", async () => {
    const handleClickAwayMock = jest.fn();
    const user = userEvent.setup();

    render(
      <PopperForm
        id="test"
        onClickAway={handleClickAwayMock}
        open={true}
        event={null}
        anchorEl={virtualElementMock}
      />
    );
    await asyncGetInputByLabelClearAndType("Título", "Mock Event");
    await asyncGetInputByLabelClearAndType("Início", "0100");
    await asyncGetInputByLabelClearAndType("Fim", "0200");

    const colorInput = screen.getByLabelText("Cor");
    fireEvent.input(colorInput, { target: { value: "#ffffff" } });

    const button = screen.getByText("Salvar");
    await user.click(button);

    expect(handleClickAwayMock).toHaveBeenCalled();
  });

  it("should call onDelete", async () => {
    const handleDeleteMock = jest.fn();
    const user = userEvent.setup();

    render(
      <PopperForm
        id="test"
        handleDelete={handleDeleteMock}
        open={true}
        event={null}
        anchorEl={virtualElementMock}
      />
    );

    const button = screen.getByRole("button", { name: /delete/i });
    await user.click(button);

    expect(handleDeleteMock).toHaveBeenCalled();
  });

  it("should call onClickAway", async () => {
    const handleClickAwayMock = jest.fn();
    const user = userEvent.setup();
    const body = document.body;

    render(
      <PopperForm
        id="test"
        onClickAway={handleClickAwayMock}
        open={true}
        event={null}
        anchorEl={virtualElementMock}
      />
    );

    await user.click(body);

    expect(handleClickAwayMock).toHaveBeenCalled();
  });
});
