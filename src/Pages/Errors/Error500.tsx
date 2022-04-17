import { MdError } from "react-icons/md";
import { ErrorPage } from "./Components/ErrorPage";

export function Error500() {
  return <ErrorPage code={500} Icon={MdError} />;
}
