import { Error401 } from "../Error401";
import { act, render } from "@testing-library/react";

describe(`<${Error401.name} />`, () => {
  const factoryComponent = () => render(<Error401 />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
