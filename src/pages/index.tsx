import { Inter } from "next/font/google";
import cosmosData from "./../../lib/cosmos";

const inter = Inter({ subsets: ["latin"] });

type TData = {
  objects: {
    slug: string;
    title: string;
    content: string;
  }[];
};

export default function Home({ data }: { data: TData }) {
  console.log(data);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 50,
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      {data.objects.map((elem) => (
        <div key={elem.slug} style={{ margin: 20 }}>
          <h2>{elem.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: elem.content,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      data: await cosmosData(),
    },
  };
};
