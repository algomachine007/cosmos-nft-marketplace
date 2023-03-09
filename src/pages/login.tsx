import { useCookies } from "react-cookie";

import { parseCookies } from "../../helpers/index";
const Login = ({ data }: any) => {
  console.log("Data", JSON.parse(data.userInfo));

  //Method 1: Client-side cookie decoding
  const [cookie, setCookie] = useCookies(["userInfo"]);

  return (
    <div>
      <button
        onClick={() => {
          setCookie("userInfo", JSON.stringify({ name: "Benneth Uzochukwu" }), {
            path: "/",
            maxAge: 3600, // 1hr,
            sameSite: true,
          });
        }}
      >
        Cookie
        {/* Store Cookie {cookie.userInfo["name"].split(" ")[0]} */}
      </button>
    </div>
  );
};

export default Login;

//This gets us the cookie from server before the app even mounts, it has access to the req and res objects in our app.
//Method 2 : Serverside cookie decoding
Login.getInitialProps = async ({ req, res }: any) => {
  const data = parseCookies(req);

  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" });
      res.end();
    }
  }

  return {
    data: data && data,
  };
};
