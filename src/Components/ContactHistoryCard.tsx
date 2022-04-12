import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { extractDateAndTimeFromDate } from "../Helpers/date";
import { ContactHistory } from "../Services/Interfaces/ContactHistory";

export interface ContactHistoryCardProps {
  item: ContactHistory;
  translations: string;
}

export function ContactHistoryCard({
  item,
  translations,
}: ContactHistoryCardProps) {
  const { t } = useTranslation();
  const { date, time } = extractDateAndTimeFromDate(item.created_at);

  return (
    <Card className="mb-3">
      <Card.Body>
        <h4>
          {t<string>(`${translations}.historyDay`, {
            date,
            time,
          })}
        </h4>
        <p>
          {item.givenname} {item.surname}
        </p>
        <p>{item.email}</p>
        <p>{item.phone}</p>
      </Card.Body>
    </Card>
  );
}
