import axios from "axios";
import config from "../../config/config";

export const ApiService = {
  get,
  post,
  del,
  put,
  patch,
  postFormData,
  postExternal,
  getImage,
  postFile,
  postArray,
};
const custmHeader = {};

function getImage(apiEndpoint) {
  return axios
    .get(config.baseUrl + apiEndpoint, {
      headers: {
        "Content-Type": "image/png",
        ...custmHeader,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
}

function get(apiEndpoint) {
  return axios
    .get(config.baseUrl + apiEndpoint, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
}

function post(apiEndpoint, payload, formData = false) {
  var bodyFormData = new FormData();
  let request = null;
  if (formData) {
    for (let v in payload) {
      bodyFormData.append(v, payload[v]);
    }
    request = postFormData(config.baseUrl + apiEndpoint, bodyFormData);
  } else {
    request = axios.post(
      config.baseUrl + apiEndpoint,

      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          ...custmHeader,
        },
      }
    );
  }
  return request;
}
function postArray(apiEndpoint, payload) {
  var bodyFormData = new FormData();
  let request = null;
  request = axios.post(
    config.baseUrl + apiEndpoint,

    JSON.stringify(payload),
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        ...custmHeader,
      },
    }
  );
  return request;
}
function put(apiEndpoint, payload) {
  let request = null;
  request = axios.put(config.baseUrl + apiEndpoint, JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      ...custmHeader,
    },
  });

  request
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
  return request;
}

function patch(apiEndpoint, payload) {
  let request = null;
  request = axios.patch(config.baseUrl + apiEndpoint, JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      ...custmHeader,
    },
  });

  request
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
  return request;
}

function del(apiEndpoint, payload, withoutQuerystring = false) {
  let request = null;
  let url = config.baseUrl + apiEndpoint;
  let i = 0;
  for (var key in payload) {
    if (i == 0) {
      url += "?";
    }
    if (withoutQuerystring === true) {
      url = config.baseUrl + apiEndpoint + "/" + payload[key];
    } else {
      url += key + "=" + payload[key];
    }

    i++;
  }
  request = axios.delete(url, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      ...custmHeader,
    },
  });
  request
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
  return request;
}
function postFormData(url, bodyFormData) {
  const request = axios({
    method: "post",
    url: url,
    data: bodyFormData,

    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      ...custmHeader,
    },
  });
  return request;
}

function postFile(apiEndpoint, file, payload) {
  var data = new FormData();
  data.append("file", file);
  for (var key in payload) {
    data.append(key, payload[key]);
  }

  const request = axios({
    method: "post",
    url: config.baseUrl + apiEndpoint,
    data: data,

    headers: {
      accept: "application/json",
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      ...custmHeader,
    },
  });
  return request;
}

function postExternal(url, payload, formData = false) {
  var bodyFormData = new FormData();
  let request = null;
  if (formData) {
    for (let v in payload) {
      bodyFormData.set(v, payload[v]);
    }
    request = axios({
      method: "post",
      url: url,
      data: bodyFormData,

      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        ...custmHeader,
      },
    });
  } else {
    request = axios.post(
      url,

      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ...custmHeader,
        },
      }
    );
  }
  return request;
}
