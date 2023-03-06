import axios from "axios";
import getStripe from "../../utils/get-stripe";
import cosmosData from "./../../lib/cosmos";

type TData = {
  objects: {
    slug: string;
    title: string;
    content: string;
  }[];
};

const cartItems = {
  price: "price_1MiDVfDMW3TinYJTrXL8d1Nd",
  quantity: 2,
};

function Checkout({ cart }: any) {
  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();

      const checkoutSession = await axios.post("/api/checkout_sessions", {
        cart,
      });

      alert(JSON.stringify(checkoutSession.data.url));

      if (checkoutSession.data.url) {
        const result = await stripe?.redirectToCheckout({
          sessionId: checkoutSession.data.id,
        });

        if (result?.error) {
          alert(result.error.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        action="/api/checkout_sessions"
        onSubmit={handleCheckout}
        method="post"
      >
        <label htmlFor="">Checkout</label>
        <button type="submit" style={{ padding: 15, cursor: "pointer" }}>
          Checkout Option 1
        </button>
      </form>

      <button
        onClick={handleCheckout}
        style={{ padding: 15, cursor: "pointer" }}
      >
        Checkout Option 2
      </button>
    </div>
  );
}

export default function Home({ data }: { data: TData }) {
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

      <Checkout cart={cartItems} />
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
