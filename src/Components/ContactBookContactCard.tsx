import { Card } from "react-bootstrap";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Contact } from "../Services/Interfaces/Contact";

interface ContactBookCardProps {
  item: Contact;
  cardFn: () => void;
  editFn: () => void;
  deleteFn: () => void;
}

export function ContactBookContactCard({
  item,
  cardFn,
  editFn,
  deleteFn,
}: ContactBookCardProps) {
  return (
    <>
      <Card onClick={() => cardFn()}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">
              {item.givenname} {item.surname}
            </h3>

            <div>
              <BsPencilSquare
                role="button"
                onClick={(event) => {
                  event.stopPropagation();

                  editFn();
                }}
              />

              <BsFillTrashFill
                className="ms-2"
                role="button"
                onClick={(event) => {
                  event.stopPropagation();

                  deleteFn();
                }}
              />
            </div>
          </div>

          <p>{item.email}</p>
          <p>{item.phone}</p>
        </Card.Body>
      </Card>
    </>
  );
}
