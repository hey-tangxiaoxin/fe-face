const ajax = function (options) {
  return new Promise((resolve, reject) => {
    let xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Mircsoft.XMLHTTP"); //ie
    }
    const { url, method, data } = options;
    if (method.toLowerCase() === "post") {
      xhr.open(method, url);
      xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
      xhr.send(data);
    } else {
      let param = [];
      for (const [key, val] of Object.entries(data)) {
        param.push(`${key}=${val}`);
      }
      xhr.open(method, `${url}?${param.join("&")}`);
      xhr.send();
    }
    xhr.onreadystatechange = function () {
      resolve(xhr.responseText);
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
  });
};
