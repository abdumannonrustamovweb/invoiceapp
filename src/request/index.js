const baseURL = import.meta.env.VITE_BASE_URL;
// hammasini olsh
export async function getInvoices( query = "") {
  const req = await fetch(baseURL  + (query ? `?status=${query}` : ""));
  if (req.status === 200) {
    const result = await req.json();
    return result.data;
  } else {
    throw new Error("qayerdadur hatolik ketdi");
  }
}
// ID orqali olish
export async function getInvoice( id) {
  const req = await fetch(baseURL  + `/${id}`);
  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("qayerdadur hatolik ketdi");
  }
}

// O'chirish
export async function deleteById({ id }) {
  const req = await fetch(baseURL + `/${id}`, {
    method: "DELETE",
  });
  if (req.status === 200) {
    return "success";
  } else {
    throw new Error("qayerdadur hatolik ketdi");
  }
}

// Yangilash
export async function updateById({ id, newData }) {
  const req = await fetch(baseURL + `/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("qayerdadur hatolik ketdi");
  }
}


// Qo‘shish
export async function addInvoice(data) {
  const req = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("qayerdadur hatolik ketdi");
  }
}
