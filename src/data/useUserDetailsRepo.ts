import sleep from "sleep-promise";
import synchronisedPromiseMaker from "../dataRepo/utils/synchronisedPromiseMaker";
import useRepo from "../dataRepo/hooks/useRepo";
import Repo from "../dataRepo/types/Repo";
import UserDetails from "./types/UserDetails";

const fetchUserDetails = synchronisedPromiseMaker(
  async (): Promise<UserDetails> => {
    // eslint-disable-next-line no-console
    console.log("Fetching user details...");

    await sleep(2000);

    if (Math.floor(Math.random() * 10) % 5 === 0) {
      throw Error("Failed to load user details");
    }

    return {
      email: "hi@example.com",
      name: "Sample name",
      totalVotes: 200,
    };
  }
);

const useUserDetailsRepo = (): Repo<UserDetails> =>
  useRepo<UserDetails>("userDetails", fetchUserDetails);

export default useUserDetailsRepo;
