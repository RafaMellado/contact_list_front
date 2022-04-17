import { RiForbidFill } from "react-icons/ri";
import { ErrorPage } from "./Components/ErrorPage";

export function Error403() {
  return <ErrorPage code={403} Icon={RiForbidFill} />;
}
