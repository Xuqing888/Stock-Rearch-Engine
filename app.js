

(function () {
  'use strict';
  angular
      .module('inputform', ['ngMaterial'])
      .controller('DemoCtrl', DemoCtrl);

  function DemoCtrl ($timeout, $q, $log, $http) {
      var self = this;

      self.simulateQuery = false;
      self.isDisabled    = false;

      self.querySearch   = querySearch;
      self.selectedItemChange = selectedItemChange;
      self.searchTextChange   = searchTextChange;
      self.focus = focus;


      function querySearch (query) {
        if(query.trim() === '') return;
          var deferred = $q.defer();
          $.ajax({
            type 		: 'GET',
            url 		: 'http://127.0.0.1:8081/autocomplete/'+ $("#getquote input").val(),
            success     :function(data){
                console.log("autocomplete return result is: "+data);
                data = data.map(function (t) {
                    return t["Symbol"] + " - " + t["Name"] + " (" + t["Exchange"] + ")";
                })
                deferred.resolve(data);

            }

          })
          return deferred.promise;
          $http.get(url)
              .then(function (res) {
                  var data = res.data;
                  data = data.map(function (t) {
                      return t["Symbol"] + " - " + t["Name"] + " (" + t["Exchange"] + ")";
                  })
                  deferred.resolve(data);
              })
        //   return deferred.promise;
      }

      function searchTextChange(text) {
          $log.info('Text changed to ' + text);
          if(text.trim() !== '') {
              $('#submitb').prop('disabled', false);
              $('#hint').css("visibility", "hidden");
              $('md-autocomplete-wrap').css('border', '');
          }
          else {
              $('#submitb').prop('disabled', true);
              $('#hint').css("visibility", "visible");
              $('md-autocomplete-wrap').css('border', '2px solid blue');
          }
      }

      function selectedItemChange(item) {
        $log.info('Item changed to ' + item);
        $log.info(item.split('-')[0].trim());
         $('#getquote input').val(item.split('-')[0].trim());
      }
      
      function focus() {
          console.log("is focused");
          $('md-autocomplete-wrap').css('border', '2px solid blue');
      }


  }
})();


  