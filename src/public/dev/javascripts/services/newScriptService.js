app.service('newScript', ['$http', '$firebase', function($http, $firebase) {
  var self = this;
  var ref = new Firebase("https://luminous-heat-3537.firebaseio.com");
  var sync = $firebase(ref);
  this.script = sync.$asObject();

  this.updateUserPrescriptions = function(manifest) {
    // $http.post("LINK TO MONGODB", {INFO ABOUT SCRIPT & USER})
  };

  this.newOrder = function(rx) {

      $http.post('/orders', rx)
      .success(function(data, status, headers, config) {
        self.orderData = data;

        self.script.rxPopup = true;
        self.script.$save().then(function(ref) {}, function(error) {});
        console.log(self.script);
        // var obj = $firebase(ref).$asObject();
        // obj.prescriptions = "true";
        // obj.$save().then(function(ref) {
        //   ref.key() === obj.$id; // true
        // }, function(error) {
        //   console.log("Error:", error);
        // });
      });
  };

  this.orderScript = function() {
    console.log("Script ordered!");
    // PLACE ORDER WITH POSTMATES
  };

}]);
