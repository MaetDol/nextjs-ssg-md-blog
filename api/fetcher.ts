interface RequestOption extends RequestInit {
  useExternal?: true;
}

function request(url: string, option: RequestOption = {}) {
  const targetUrl = option.useExternal ? url : `/${process.env.basePath}${url}`;

  return fetch(targetUrl, option).then((res) => {
    if (res.ok) return res;

    throw res;
  });
}

export function jsonRequest(url: string, option?: RequestOption) {
  return request(url, option)
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

export function textRequest(url: string, option?: RequestOption) {
  return request(url, option)
    .then((res) => res.text())
    .catch((e) => {
      throw e;
    });
}
