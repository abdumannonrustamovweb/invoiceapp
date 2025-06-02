import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { Label } from "../components/ui/label";
import { Input } from "./ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { prepareData } from "../lib/utils";
import { useAppStore } from "../lib/zustend";
import { addInvoice, updateById } from "../request";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Form({ info, setSheetOpen }) {
  const { setInvoices, items: zunstItems, UpdateInvoices } = useAppStore();
  const [items, setItems] = useState(info?.items || []);
  const navigate = useNavigate();

  const {
    senderAddress,
    clientAddress,
    clientEmail,
    clientName,
    paymentTerms,
    description,
    paymentDue,
    createdAt,
  } = info || {};

  const [sending, setSending] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = {};

    if (!info) {
      result.status = e.nativeEvent.submitter.id;
    }

    formData.forEach((value, key) => {
      if (key === "quantity" || key === "price" || key === "paymentTerms") {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    });

    result.items = zunstItems;
    const readyData = prepareData(result);
    setSending({
      mode: e.nativeEvent.submitter.id === "edit" ? "edit" : "add",
      data: readyData,
    });
  }

  useEffect(() => {
    if (sending) {
      const sendFn =
        sending.mode === "add"
          ? () =>
              addInvoice(sending.data)
                .then((res) => {
                  UpdateInvoices(res);
                  toast.success("Ma'lumot muvoffaqiyatli qo‘shildi");
                  setSheetOpen(false);
                })
                .catch(({ message }) => toast.error(message))
          : () =>
              updateById({ id: info.id, newData: sending.data })
                .then((res) => {
                  UpdateInvoices(res);
                  toast.success("Ma'lumot muvoffaqiyatli o‘zgartirildi");
                  setSheetOpen(false);
                })
                .catch(({ message }) => toast.error(message));

      setLoading(true);
      sendFn().finally(() => {
        setLoading(false);
        setSending(null);
      });
    }
  }, [sending ? JSON.stringify(sending) : sending]);

  return (
    <form
      onSubmit={handleSubmit}
      className="form__container pt-14 overflow-y-auto hide-scrollbar px-4 md:px-8 lg:px-16"
    >
      <h1 className="mb-10 mt-14 text-xl md:text-2xl font-bold">New Invoice</h1>

      <div className="w-full">
        <h3 className="text-[#7C5DFA] font-bold text-sm mb-6">Bill From</h3>
        <div className="flex flex-col gap-6 mb-12">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="senderAddres-street">Street Address</Label>
            <Input
              defaultValue={senderAddress?.street}
              name="senderAddres-street"
              type="text"
              id="senderAddres-street"
              placeholder="Street Address"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <Label htmlFor="senderAddres-city">City</Label>
              <Input
                defaultValue={senderAddress?.city}
                name="senderAddres-city"
                type="text"
                id="senderAddres-city"
                placeholder="City"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="clientAddress-postCode">Post Code</Label>
              <Input
                defaultValue={senderAddress?.postCode}
                name="clientAddress-postCode"
                type="text"
                id="clientAddress-postCode"
                placeholder="Post Code"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="senderAddres-country">Country</Label>
              <Input
                defaultValue={senderAddress?.country}
                name="senderAddres-country"
                type="text"
                id="senderAddres-country"
                placeholder="Country"
              />
            </div>
          </div>
        </div>

        <h3 className="text-[#7C5DFA] font-bold text-sm mb-6">Bill To</h3>
        <div className="flex flex-col gap-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="clientName">Client’s Name</Label>
            <Input
              defaultValue={clientName}
              name="clientName"
              type="text"
              id="clientName"
              placeholder="Client’s Name"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="clientEmail">Client’s Email</Label>
            <Input
              defaultValue={clientEmail}
              name="clientEmail"
              type="email"
              id="clientEmail"
              placeholder="Client’s Email"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="clientAddress-street">Street Address</Label>
            <Input
              defaultValue={clientAddress?.street}
              name="clientAddress-street"
              type="text"
              id="clientAddress-street"
              placeholder="Street Address"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <Label htmlFor="clientAddress-city">City</Label>
              <Input
                defaultValue={clientAddress?.city}
                name="clientAddress-city"
                type="text"
                id="clientAddress-city"
                placeholder="City"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="clientAddress-postCode">Post Code</Label>
              <Input
                defaultValue={clientAddress?.postCode}
                name="clientAddress-postCode"
                type="text"
                id="clientAddress-postCode"
                placeholder="Post Code"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="clientAddress-country">Country</Label>
              <Input
                defaultValue={clientAddress?.country}
                name="clientAddress-country"
                type="text"
                id="clientAddress-country"
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-10">
        <div className="flex flex-col md:flex-row items-start md:items-end w-full gap-6">
          <div className="w-full md:w-1/2">
            <Label htmlFor="createdAt">Invoice Date</Label>
            <Input
              className="mt-2"
              defaultValue={createdAt}
              name="createdAt"
              type="date"
              id="createdAt"
            />
          </div>
          <div className="w-full md:w-1/2">
            <Label>Payment Terms</Label>
            <Select name="paymentTerms" defaultValue={paymentTerms?.toString()}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Payment Terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Net 1 Day</SelectItem>
                  <SelectItem value="7">Net 7 Days</SelectItem>
                  <SelectItem value="14">Net 14 Days</SelectItem>
                  <SelectItem value="30">Net 30 Days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full">
          <Label htmlFor="description">Project Description</Label>
          <Input
            defaultValue={description}
            className="mt-2"
            name="description"
            type="text"
            id="description"
            placeholder="Project Description"
          />
        </div>
      </div>

      <ItemList info={items} onItemsChange={setItems} />

      <div className="mt-10 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <Button
          type="button"
          onClick={() => setSheetOpen(false)}
          className="rounded-3xl w-full md:w-auto"
          variant={info ? "secondary" : "outline"}
        >
          {info ? "Cancel" : "Discard"}
        </Button>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {info ? (
            <Button
              disabled={loading}
              id="edit"
              type="submit"
              className="bg-[#7C5DFA] rounded-3xl w-full md:w-auto"
              variant="default"
            >
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          ) : (
            <>
              <Button
                disabled={loading}
                id="draft"
                type="submit"
                className="rounded-3xl w-full md:w-auto"
                variant="secondary"
              >
                {loading ? "Loading.." : "Save as Draft"}
              </Button>
              <Button
                disabled={loading}
                id="pending"
                type="submit"
                className="bg-[#7C5DFA] rounded-3xl w-full md:w-auto"
                variant="default"
              >
                {loading ? "Loading..." : "Save & Send"}
              </Button>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default Form;
