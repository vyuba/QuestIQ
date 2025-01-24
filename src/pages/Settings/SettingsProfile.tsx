import avater from "/src/assets/avater-1.svg";
import { useUser } from "../../store";
import { useGetDatabase } from "../../hooks/useDatabase";
import { useQuery } from "@tanstack/react-query";

function SettingsProfile() {
  const { user } = useUser();

  const { getUserData } = useGetDatabase();

  const { data } = useQuery({
    queryKey: ["userdata"],
    queryFn: () => getUserData(user),
  });

  const profileData = data?.documents[0];

  console.log(profileData);

  const rank =
    profileData?.total_xp >= 400
      ? 100
      : profileData?.total_xp >= 100
      ? 50
      : profileData?.total_xp <= 50
      ? 20
      : 10;

  return (
    <div>
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className=" bg-background-color rounded-t-3xl border-l border-r border-t border-border-color flex items-center justify-center ">
          <img className="py-5 px-6 " src={avater} alt="" />
        </div>
        <div className="w-full flex flex-col gap-2 p-4 h-full bg-background-color rounded-xl border border-border-color">
          <span className="font-medium">{profileData?.name}</span>
          <div className="flex flex-row items-center justify-between border-b-2 pb-3 border-secondary-color">
            <p className="text-sm ">{profileData?.email}</p>
            <p
              className={` text-sm font-medium  px-2 rounded-full border  ${
                user?.emailVerification
                  ? "border-success-color text-success-color  bg-success-dark-color"
                  : "border-danger-color bg-danger-dark-color text-danger-color "
              }`}
            >
              {user?.emailVerification ? "verified" : "unverified"}
            </p>
          </div>
          <div className="w-full capitalize py-3 flex flex-row gap-2 items-center">
            <span>lv.Noob</span>
            <div className="w-full relative rounded-full py-1 overflow-hidden border border-border-color">
              <div
                className="absolute top-0 left-0 h-full bg-accent-color transition-all duration-300"
                style={{
                  width: `${rank}%`,
                }}
              ></div>
            </div>
            <span>intermediate</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row gap-2 items-center py-3">
        <div className="flex-1 p-3 rounded-xl bg-background-color border border-border-color ">
          <div>
            <span>🔥</span>
            <span className="capitalize font-medium text-lg">streak</span>
          </div>
          <div className="capitalize w-full flex items-baseline justify-center">
            <span className="text-[55px] font-medium">
              {profileData?.streak_count}
            </span>
            <span className="capitalize font-medium">Days</span>
          </div>
        </div>
        <div className="flex-1 p-3 rounded-xl bg-background-color border border-border-color ">
          <div>
            <span>⚡</span>
            <span className="capitalize font-medium text-lg">total xp</span>
          </div>
          <div className="capitalize w-full flex items-baseline justify-center">
            <span className="text-[55px] font-medium">
              {profileData?.total_xp}
            </span>
            <span className="capitalize font-medium">pts</span>
          </div>
        </div>
      </div>
      <button className="w-full items-center bg-accent-color py-3 rounded-lg border-2 capitalize font-medium  border-border-color">
        invite your friends
      </button>
    </div>
  );
}

export default SettingsProfile;
