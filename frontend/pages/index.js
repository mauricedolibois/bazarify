import Sidebar from "../components/sidebar";
import Dashboard from "../components/dashboard";
import AblaufSeite1 from "@/components/ablaufSeite1";
import AblaufSeite2 from "@/components/ablaufSeite2";
import AblaufSeite3 from "@/components/ablaufSeite3";
import AblaufSeite4 from "@/components/ablaufSeite4";
import AblaufSeite5 from "@/components/ablaufSeite5";
import ButtonV1 from "@/components/buttonV1";
import ButtonV2 from "@/components/buttonV2";
import ButtonV3 from "@/components/buttonV3";
import ButtonV4 from "@/components/buttonV4";
import ButtonV5 from "@/components/buttonV5";
import FormInput from "@/components/FormInput";


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



      {//Ab hier sind nur Tests
      }

      <div className="">
        <p className="bg-red-200 w-screen h-screen">Ab hier ist nur Zeug zum Testen</p>

        <div className="flex flex-row">
          <Sidebar>Test</Sidebar>
          <div className="px-32 pt-32">
            <AblaufSeite1></AblaufSeite1>
          </div>
        </div>
        <div className="flex flex-row">
          <Sidebar>Test</Sidebar>
          <div className="px-32 pt-32">
            <AblaufSeite2></AblaufSeite2>
          </div>
        </div>
        <div className="flex flex-row">
          <Sidebar>Test</Sidebar>
          <div className="px-32 pt-32">
            <AblaufSeite3></AblaufSeite3>
          </div>
        </div>
        <div className="flex flex-row">
          <Sidebar>Test</Sidebar>
          <div className="px-32 pt-32">
            <AblaufSeite4></AblaufSeite4>
          </div>
        </div>
        <div className="flex flex-row">
          <Sidebar>Test</Sidebar>
          <div className="px-32 pt-32">
            <AblaufSeite5></AblaufSeite5>
          </div>
        </div>
        <div className="flex flex-row">
          <Sidebar>Test</Sidebar>
          <div className="px-32 pt-32">
            <ButtonV1></ButtonV1>
            <ButtonV2></ButtonV2>
            <ButtonV3></ButtonV3>
            <ButtonV4></ButtonV4>
            <ButtonV5></ButtonV5>
            <FormInput name="Test"></FormInput>
            <FormInput name="Test2"></FormInput>
          </div>
        </div>
      </div>
    </>
  );
}