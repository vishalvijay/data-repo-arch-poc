import RepoBase from "./RepoBase";

export default interface Repo<T> extends RepoBase {
  data?: T;
}
