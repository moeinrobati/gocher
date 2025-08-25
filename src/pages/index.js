// pages/index.js
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/create",
      permanent: false, // اگه میخوای برای همیشه ثابت بشه بذار true
    },
  };
}

export default function Home() {
  return null;
}
