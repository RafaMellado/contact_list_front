import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  BsFillJournalBookmarkFill,
  BsFillTrashFill,
  BsPencilSquare,
} from "react-icons/bs";
import { Contact } from "../Services/Interfaces/Contact";

export interface ContactBookContactCardProps {
  item: Contact;
  translations: string;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ContactBookContactCard({
  item,
  translations,
  onClick,
  onEdit,
  onDelete,
}: ContactBookContactCardProps) {
  const { t } = useTranslation();

  return (
    <>
      <Card
        data-testid="contact-book-contact-card"
        className="platform-card"
        onClick={() => onClick()}
      >
        <Card.Body className="d-flex justify-content-between flex-column">
          <div className="d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <BsFillJournalBookmarkFill className="mt-1 me-2 platform-card-book-icon" />
                <h5 className="platform-card-text">
                  {item.givenname} {item.surname}
                </h5>
              </div>
            </div>

            <div className="mt-4">
              <small className="text-secondary">
                {t<string>(`${translations}.email`)}
              </small>
              <p className="mb-0">{item.email}</p>

              <small className="mt-2 d-block text-secondary">
                {t<string>(`${translations}.phone`)}
              </small>
              <p className="mb-0">{item.phone}</p>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-2 platform-card-icons ">
            <BsPencilSquare
              role="button"
              className="platform-card-icon"
              data-testid="contact-book-contact-card-edit-icon"
              onClick={(event) => {
                event.stopPropagation();

                onEdit();
              }}
            />

            <BsFillTrashFill
              className="ms-2 platform-card-icon"
              data-testid="contact-book-contact-card-delete-icon"
              role="button"
              onClick={(event) => {
                event.stopPropagation();

                onDelete();
              }}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
