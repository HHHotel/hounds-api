const HOUND_BASE_URL = "http://hhh-scheduler-testing.herokuapp.com";
import * as hounds from "./src/hounds";
import * as HHH from "./src/types/HHHTypes";

async function main() {
    // hounds.axiosConfig.baseURL = HOUND_BASE_URL;
    const user: HHH.IHoundUser = await hounds.login("admin", "DogsKickass5359");
    const auth = {
        username: user.username,
        token: user.token,
    };

    const weekStart = new Date(new Date().toLocaleDateString());
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    console.log(await hounds.findEvents("blitzen", auth));
}

main().catch((err) => {
    console.error("ERROR", err);
});
