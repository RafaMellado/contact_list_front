import { Card } from "react-bootstrap";
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";

interface ContactBookCardProps {
  name: string;
  editFn: () => void;
  deleteFn: () => void;
}

export function ContactBookCard({
  name,
  editFn,
  deleteFn,
}: ContactBookCardProps) {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between w-100">
          <h3>{name}</h3>

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
      </Card.Body>
    </Card>
  );
}
