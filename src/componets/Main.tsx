type MainProps = {
  children: React.ReactNode;
};
export const Main = ({ children }: MainProps) => (
    <main className={"main"}>
      <div className={"content-wrapper"}>{children}</div>
    </main>
  );

