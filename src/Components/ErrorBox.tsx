import { useTranslation } from "react-i18next";

export interface ErrorBoxProps {
  errors: { [key: string]: Array<{ error: string }> };
  field: string;
  params?: object;
}

export function ErrorBox({ errors, field, params }: ErrorBoxProps) {
  const { t } = useTranslation();

  return (
    <>
      {errors[field]?.map((item: { error: string }, index: number) => {
        return (
          <div
            data-testid={`error-box-${field}`}
            className="text-danger mt-2 mb-0"
            key={index}
          >
            <span>
              {t<string>(`errors.${item.error}`, { field, ...params })}
            </span>
          </div>
        );
      })}
    </>
  );
}
