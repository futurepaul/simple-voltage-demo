import type { NextPage } from "next";
import Head from "next/head";
import FetchInvoiceMacaroon from "../components/FetchInvoiceMacaroon";
import CreatePaymentRequest from "../components/CreatePaymentRequest";

type HomeProps = {
  invoiceMacaroon?: string;
};

const invoiceMacaroon = process.env.INVOICE_MACAROON_HEX || "";

export async function getStaticProps<HomeProps>() {
  console.log(invoiceMacaroon);
  return {
    props: {
      invoiceMacaroon,
    },
  };
}

const Home: NextPage<HomeProps> = ({ invoiceMacaroon }) => {
  return (
    <div className="container">
      <Head>
        <title>Lightning Demo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <hgroup>
          <h1>Lightning Good Times!</h1>
          <p>
            Make sure you&apos;ve set up <code>.env.local</code>
          </p>
        </hgroup>

        {!invoiceMacaroon ? <FetchInvoiceMacaroon /> : <CreatePaymentRequest />}
      </main>
    </div>
  );
};

export default Home;
