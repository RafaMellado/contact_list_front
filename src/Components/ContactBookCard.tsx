import { Card } from "react-bootstrap";
import {
  BsPencilSquare,
  BsFillTrashFill,
  BsFillJournalBookmarkFill,
} from "react-icons/bs";

export interface ContactBookCardProps {
  name: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function ContactBookCard({
  name,
  onEdit,
  onDelete,
}: ContactBookCardProps) {
  return (
    <Card className="platform-card">
      <Card.Body className="d-flex justify-content-between flex-column">
        <div className="d-flex">
          <BsFillJournalBookmarkFill className="mt-1 me-2 platform-card-book-icon" />
          <h5 className="platform-card-text">{name}</h5>
        </div>

        <div className="d-flex justify-content-end mt-2 platform-card-icons ">
          <BsPencilSquare
            role="button"
            className="platform-card-icon"
            data-testid="contact-book-card-edit-icon"
            onClick={(event) => {
              event.stopPropagation();

              onEdit();
            }}
          />

          <BsFillTrashFill
            className="ms-2 platform-card-icon"
            role="button"
            data-testid="contact-book-card-delete-icon"
            onClick={(event) => {
              event.stopPropagation();

              onDelete();
            }}
          />
        </div>
      </Card.Body>
    </Card>
  );
}
