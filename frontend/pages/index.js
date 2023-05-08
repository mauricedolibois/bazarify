import Sidebar from "../components/sidebar";
import Dashboard from "../components/dashboard";

export default function Home() {
  return (
    <>
      {
        // Diese Seite hier wird standardmäßig aufgerufen, wenn man die Webseite öffnet.
      }
      <div className="flex flex-row">
        <Sidebar>Test</Sidebar>
        <div className="px-32 pt-32">
          <Dashboard></Dashboard>
        </div>
      </div>
    </>
  );
}