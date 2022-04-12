import { Content } from "../Content";
import { act, render } from "@testing-library/react";
import type { ContentProps } from "../Content";

describe(`<${Content.name} />`, () => {
  const contentProps: ContentProps = {
    children: <div>test</div>,
  };

  const factoryComponent = (props: ContentProps = contentProps) =>
    render(<Content {...props} />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
