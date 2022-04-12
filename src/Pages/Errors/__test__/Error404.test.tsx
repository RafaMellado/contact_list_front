import { Error404 } from "../Error404";
import { act, render } from "@testing-library/react";

describe(`<${Error404.name} />`, () => {
  const factoryComponent = () => render(<Error404 />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
