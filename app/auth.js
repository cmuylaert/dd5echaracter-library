export default {
  isLoggedIn(){
    return !!localStorage.token;
  },
  getToken(){
    return localStorage.token;
  },
  login(username, password, callback){
    const ajaxRequest =
    $.ajax({
        type: "POST",
        url: "/login",
        data: JSON.stringify({username, password}),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      });
    ajaxRequest.done(function (data) {
         localStorage.token = data.id;
         callback(true);
    });
    ajaxRequest.fail(function (error) {
      delete localStorage.token;
        callback(false);
            console.log(error);
    });

  },
    register(username, password, callback){
        const ajaxRequest =
            $.ajax({
                type: "POST",
                url: "/signup",
                data: JSON.stringify({username, password}),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
        ajaxRequest.done(function (data) {
            localStorage.token = data.id;
            callback(true);
        });
        ajaxRequest.fail(function (error) {
            delete localStorage.token;
            callback(false);
            console.log(error);
        });

    },
  logout(){
    delete localStorage.token;
    const ajaxRequest =
    $.ajax({
        type: "GET",
        url: "/logout",
      });
    ajaxRequest.done(function () {
    });
    ajaxRequest.fail(function (error) {
      console.log(error);
    });
  }
}