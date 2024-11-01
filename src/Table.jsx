import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

function Table() {
  let columnName = [
    "Sku",
    "Description",
    "In",
    "Out",
    "Avaliable",
    "CreatedAt",
  ];
  const [rows, setRows] = useState([]);

  // modal variable
  const [open, setOpen] = useState(false);
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const closeCard = () => {
    setSku("");
    setDescription("");
    setAmount(0);
    setOpen(false);
  };

  const submit = () => {
    // do request
    let request = {
      sku: "string",
      description: "string",
      in: 0,
      out: 0,
    };

    request.sku = sku;
    request.description = description;

    if (amount > 0) {
      request.in = amount;
    } else {
      request.out = amount;
    }

    axios
      .post("http://localhost:5139/api/stock", request, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //
    closeCard();
  };

  const getStockApi = () => {
    axios
      .get("http://localhost:5139/api/stock")
      .then((response) => {
        console.log(response.data);
        setRows(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSkuApi = () => {
    axios
      .get("http://localhost:5139/api/stock/sku")
      .then((response) => {
        console.log(response.data);
        setRows(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="relative overflow-x-auto">
      <div>
        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-red-600"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        รับ / เบิกสินค้า
                      </DialogTitle>
                      {
                        // form data
                        // sku
                      }
                      <div className="mt-2">
                        <div>
                          <label
                            htmlFor="sku"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Sku
                          </label>
                          <div className="mt-2">
                            <input
                              id="sku"
                              name="sku"
                              value={sku}
                              onChange={(e) => setSku(e.target.value)}
                              type="text"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                      </div>
                      {
                        // form data
                        // description
                      }
                      <div className="mt-2">
                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Description
                          </label>
                          <div className="mt-2">
                            <input
                              id="description"
                              name="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              type="text"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                      </div>
                      {
                        // form data
                        // amount
                      }
                      <div className="mt-2">
                        <div>
                          <label
                            htmlFor="amount"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Amount
                          </label>
                          <div className="mt-2">
                            <input
                              id="amount"
                              name="amount"
                              type="number"
                              value={amount}
                              onChange={(e) =>
                                setAmount(parseInt(e.target.value))
                              }
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => submit()}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    ทำรายการ
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    ยกเลิกรายการ
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
        <div className="grid justify-items-end py-5">
          <button
            type="button"
            onClick={() => getSkuApi()}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            แสดงรายการสินค้า
          </button>
          <button
            type="button"
            onClick={() => getStockApi()}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            แสดงรายการรับ/เบิก
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            รับ / เบิกสินค้า
          </button>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columnName.map((name) => {
              return (
                <th key={name} scope="col" className="px-6 py-3">
                  {name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <tr
                key={row.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {row.sku}
                </th>
                <td className="px-6 py-4"> {row.description}</td>
                <td className="px-6 py-4"> {row.in}</td>
                <td className="px-6 py-4"> {row.out}</td>
                <td className="px-6 py-4"> {row.avaliable}</td>
                <td className="px-6 py-4"> {row.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
