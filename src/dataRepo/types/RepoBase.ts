import SuccessCode from "../SuccessCode";

export default interface RepoBase {
  successCode: SuccessCode;
  reset: () => void;
  refresh: () => void;
}
