//GET
function getJSON (url) {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(this.responseText, this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }

        xhr.send()
    })

}
//POST
function postJSON(url, data) {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open("POST", url, true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText), this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }

        xhr.send(JSON.stringify(data))
    })
}


// getJSON('/api/v1/xxx')    // => 这里面是就try
// .catch( error => {
//   // dosomething          // => 这里就是catch到了error，如果处理error以及返还合适的值
// })
// .then( value => {
//   // dosomething          // 这里就是final
// })




//ES6教程上的
const getJSON = function(url) {
    const promise = new Promise(function(resolve, reject){
      const handler = function() {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      const client = new XMLHttpRequest();
      client.open("GET", url);
      client.onreadystatechange = handler;
      client.responseType = "json";
      client.setRequestHeader("Accept", "application/json");
      client.send();
  
    });
  
    return promise;
  };
  
  getJSON("/posts.json").then(function(json) {
    console.log('Contents: ' + json);
  }, function(error) {
    console.error('出错了', error);
  });