function Loader() {
  return (
    <div className="fixed z-[100000000] inset-0 bg-background-color flex flex-col items-center justify-center h-full">
      <div className="loader"></div>
      <span className="font-patriot text-2xl text-text-color logo-text absolute bottom-10">
        QuestIQ
      </span>
    </div>
  );
}

export default Loader;
