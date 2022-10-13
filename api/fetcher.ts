interface RequestOption extends RequestInit {
  useExternal?: true;
}

function request(url: string, option: RequestOption = {}) {
  const targetUrl = option.useExternal ? url : `/${process.env.basePath}${url}`;

  return fetch(targetUrl, option);
}

export function jsonRequest(url: string, option?: RequestOption) {
  return request(url, option)
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      return null;
    });
}

export function textRequest(url: string, option?: RequestOption) {
  return request(url, option)
    .then((res) => res.text())
    .catch((e) => {
      console.error(e);
      return "";
    });
}
