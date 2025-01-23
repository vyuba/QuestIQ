import { Inbox } from "lucide-react";

function DashboardInbox() {
  return (
    <div className="w-full flex flex-row gap-3  h-[calc(100dvh-100px)] p-5 ">
      <div className="bg-secondary-color flex-1 p-5 h-full rounded-lg border border-border-color"></div>
      <div className="bg-secondary-color flex-1  p-5 h-full rounded-lg border border-border-color relative">
        <Inbox
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text-secondary-color"
          size={70}
        />
      </div>
    </div>
  );
}

export default DashboardInbox;
