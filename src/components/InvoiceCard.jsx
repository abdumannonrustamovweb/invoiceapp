import { useEffect, useState } from "react";
import { getInvoices } from "../request";
import CardSkleton from "./CardSkleton";
import Mycard from "../components/MyCard";
import { useAppStore } from "../lib/zustend";
import NotFound from "./NotFound";

function InvoiceCard() {
  const { fillter, invoices, setInvoices } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getInvoices(fillter.trim().replaceAll(" ", ""))
      .then((res) => {
        setInvoices(res);
        setError(null);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fillter, setInvoices]);

  if (loading) return <CardSkleton />;

  if (error) {
    return (
      <h1 className="text-3xl text-center text-red-500">
        Qayerdadur hatolik ketdi
      </h1>
    );
  }

  if (invoices.length === 0) return <NotFound />;

  return (
    <div className="base_container flex flex-col gap-[16px]">
      {invoices.map((el) => {
        const { createdAt, clientAddress, clientName, status, id, items } = el;

        const total = items?.reduce((acc, item) => {
          return acc + item.quantity * item.price;
        }, 0);

        return (
          <Mycard
            key={id}
            createdAt={createdAt}
            postCode={clientAddress?.postcode}
            clientName={clientName}
            total={total}
            status={status}
            id={id}
          />
        );
      })}
    </div>
  );
}

export default InvoiceCard;
