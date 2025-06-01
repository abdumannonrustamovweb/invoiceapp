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
import { data, useNavigate } from "react-router-dom";

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
      if (sending.mode === "add") {
        addInvoice(sending.data)
          .then((res) => {
            UpdateInvoices(res);
            setLoading(true);
            toast.success("Malumot muvoffaqiyatli qoshildi");
            setSheetOpen(false);
          })
          .catch(({ message }) => {
            toast.error(message);
          })
          .finally(() => {
            setLoading(false);
            setSending(null);
          });
      } else if (sending.mode === "edit") {
        updateById({ id: info.id, newData: sending.data })
          .then((res) => {
            UpdateInvoices(res);
            setLoading(true);
            toast.success("Malumot muvoffaqiyatli ozgartirildi");
            setSheetOpen(false);
          })
          .catch(({ message }) => {
            toast.error(message);
          })
          .finally(() => {
            setLoading(false);
            setSending(null);
          });
      }
    }
  }, [sending ? JSON.stringify(sending) : sending]);

  return (
    <form
      onSubmit={handleSubmit}
      className="form__container pt-[56px] overflow-y-auto hide-scrollbar"
    >
      <h1 className="mb-[46px] mt-[56px]">New Invoice</h1>

      <div className="w-full">
        <h3 className="text-[#7C5DFA] font-bold text-[12px] mb-[24px]">
          Bill From
        </h3>
        <div className="flex flex-col gap-[24px] mb-[48px]">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="senderAddres-street">Street Address</Label>
            <Input
              defaultValue={senderAddress?.street}
              className="w-full"
              name="senderAddres-street"
              type="text"
              id="senderAddres-street"
              placeholder="Street Address"
            />
          </div>
          <div className="flex items-center gap-[24px]">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddres-city">City</Label>
              <Input
                defaultValue={senderAddress?.city}
                className="w-full"
                name="senderAddres-city"
                type="text"
                id="senderAddres-city"
                placeholder="City"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="clientAddress-postCode">Post Code</Label>
              <Input
                defaultValue={senderAddress?.postCode}
                className="w-full"
                name="clientAddress-postCode"
                type="text"
                id="clientAddress-postCode"
                placeholder="Post Code"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddres-country">Country</Label>
              <Input
                defaultValue={senderAddress?.country}
                className="w-full"
                name="senderAddres-country"
                type="text"
                id="senderAddres-country"
                placeholder="Country"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-[#7C5DFA] font-bold text-[12px] mb-[24px]">
            Bill To
          </h3>
          <div className="flex flex-col gap-[24px]">
            <div className="grid w-full max-w-full items-center gap-1.5">
              <Label htmlFor="clientName">Client’s Name</Label>
              <Input
                defaultValue={clientName}
                className="w-full"
                name="clientName"
                type="text"
                id="clientName"
                placeholder="Client’s Name"
              />
            </div>
            <div className="grid w-full max-w-full items-center gap-1.5 mb-[24px]">
              <Label htmlFor="clientEmail">Client’s Email</Label>
              <Input
                defaultValue={clientEmail}
                className="w-full"
                name="clientEmail"
                type="email"
                id="clientEmail"
                placeholder="Client’s Email"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[24px] mb-[48px]">
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="clientAddress-street">Street Address</Label>
              <Input
                defaultValue={clientAddress?.street}
                className="w-full"
                name="clientAddress-street"
                type="text"
                id="clientAddress-street"
                placeholder="Street Address"
              />
            </div>
            <div className="flex items-center gap-[24px]">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="clientAddress-city">City</Label>
                <Input
                  defaultValue={clientAddress?.city}
                  className="w-full"
                  name="clientAddress-city"
                  type="text"
                  id="clientAddress-city"
                  placeholder="City"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="clientAddress-postCode">Post Code</Label>
                <Input
                  defaultValue={clientAddress?.postCode}
                  className="w-full"
                  name="clientAddress-postCode"
                  type="text"
                  id="clientAddress-postCode"
                  placeholder="Post Code"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="clientAddress-country">Country</Label>
                <Input
                  defaultValue={clientAddress?.country}
                  className="w-full"
                  name="clientAddress-country"
                  type="text"
                  id="clientAddress-country"
                  placeholder="Country"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[24px] mx-auto max-w-full">
        <div className="flex items-end w-full gap-[24px]">
          <div className="w-1/2">
            <Label htmlFor="createdAt">Invoice Date</Label>
            <Input
              className="w-full mt-[8px]"
              defaultValue={createdAt}
              name="createdAt"
              type="date"
              id="createdAt"
            />
          </div>
          <Select name="paymentTerms" defaultValue={paymentTerms?.toString()}>
            <SelectTrigger className="w-1/2 ">
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

        <div className="grid w-full items-center gap-1.5">
          <div className="w-full flex flex-col gap-[10px]">
            <Label htmlFor="description">Project Description</Label>
            <Input
              defaultValue={description}
              className="w-full"
              name="description"
              type="text"
              id="description"
              placeholder="Project Description"
            />
          </div>
        </div>
      </div>

      <ItemList info={items} onItemsChange={setItems} />

      {info ? (
        <div className="flex justify-end items-center gap-[8px] mb-[34px] mt-[39px]">
          <Button
            type="button"
            onClick={() => setSheetOpen(false)}
            className="rounded-3xl"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            id="edit"
            type="submit"
            className="bg-[#7C5DFA] rounded-3xl"
            variant="default"
          >
            {loading ? "Loading..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div className="flex justify-between items-center gap-[8px] mb-[34px] mt-[39px]">
          <Button
            type="button"
            onClick={() => setSheetOpen(false)}
            className="rounded-3xl"
            variant="outline"
          >
            Discard
          </Button>
          <div className="flex items-center gap-[8px]">
            <Button
              disabled={loading}
              id="draft"
              type="submit"
              className="rounded-3xl"
              variant="secondary"
            >
              {loading ? "Loading.." : "Save as Draft"}
            </Button>
            <Button
              disabled={loading}
              id="pending"
              type="submit"
              className="bg-[#7C5DFA] rounded-3xl"
              variant="default"
            >
              {loading ? "Loading..." : "Save & Send"}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

export default Form;
