import UserProfile from "@/components/custom/home/UserProfile";
import SignOut from "@/components/custom/auth/SignOut";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center w-[90%] md:w-[40%] p-4 rounded-xl bg-slate-900">
      <h1 className="text-center text-4xl font-thin uppercase tracking-wide">
        dashboard
      </h1>

      <div className="h-[1px] w-full bg-slate-800 my-5" />

      <UserProfile />

      <div className="h-[1px] w-full bg-slate-800 my-5" />

      <SignOut />
    </div>
  );
}
