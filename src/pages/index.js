// pages/index.js
import dynamic from "next/dynamic";

const CopyInitData = dynamic(() => import("../components/CopyInitData"), { ssr: false });

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/create",
      permanent: false, // اگه میخوای برای همیشه ثابت بشه بذار true
    },
  };
}

export default function Home() {
  return (
    <>
      <CopyInitData />
    </>
  );
}
