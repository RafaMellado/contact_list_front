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
    <Card data-testid="contact-history-card" className="mb-3">
      <Card.Body>
        <h4>
          {t<string>(`${translations}.historyDay`, {
            date,
            time,
          })}
        </h4>

        <small className="text-secondary">
          {t<string>(`${translations}.name`)}
        </small>
        <p>
          {item.givenname} {item.surname}
        </p>

        <small className="text-secondary">
          {t<string>(`${translations}.email`)}
        </small>
        <p>{item.email}</p>

        <small className="text-secondary">
          {t<string>(`${translations}.email`)}
        </small>
        <p>{item.phone}</p>
      </Card.Body>
    </Card>
  );
}
