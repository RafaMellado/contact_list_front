import { Error500 } from "../Error500";
import { act, render } from "@testing-library/react";

describe(`<${Error500.name} />`, () => {
  const factoryComponent = () => render(<Error500 />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
