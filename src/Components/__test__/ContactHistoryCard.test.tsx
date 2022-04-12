import { ContactHistoryCard } from "../ContactHistoryCard";
import { act, render } from "@testing-library/react";
import type { ContactHistoryCardProps } from "../ContactHistoryCard";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe(`<${ContactHistoryCard.name} />`, () => {
  const contactHistoryCardProps: ContactHistoryCardProps = {
    item: {
      givenname: "First",
      surname: "Second",
      email: "Test email",
      phone: "Test phone",
      created_at: new Date().toString(),
    },
    translations: "contactHistory",
  };

  const factoryComponent = (
    props: ContactHistoryCardProps = contactHistoryCardProps
  ) => render(<ContactHistoryCard {...props} />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
