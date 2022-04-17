import { BsXOctagonFill } from "react-icons/bs";
import { ErrorPage } from "./Components/ErrorPage";

export function Error404() {
  return <ErrorPage code={404} Icon={BsXOctagonFill} />;
}
