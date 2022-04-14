import { ContactCard } from "../ContactCard";
import { act, render } from "@testing-library/react";
import type { ContactCardProps } from "../ContactCard";

describe(`<${ContactCard.name} />`, () => {
  const contactCardProps: ContactCardProps = {
    item: {
      id: 1,
      givenname: "First",
      surname: "Second",
      email: "Test email",
      phone: "Test phone",
      contact_book_id: 1,
    },
    translations: "contactsShow",
  };

  const factoryComponent = (props: ContactCardProps = contactCardProps) =>
    render(<ContactCard {...props} />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
