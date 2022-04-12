import { Error403 } from "../Error403";
import { act, render } from "@testing-library/react";

describe(`<${Error403.name} />`, () => {
  const factoryComponent = () => render(<Error403 />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
