import { ErrorPage } from "./Components/ErrorPage";
import { GiStopSign } from "react-icons/gi";

export function Error401() {
  return <ErrorPage code={401} Icon={GiStopSign} />;
}
