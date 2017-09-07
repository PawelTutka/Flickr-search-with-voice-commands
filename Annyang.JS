$(function() {
  $("a[href=#menuExpand]").click(function(e) {
    $(".menu").toggleClass("menuOpen");
    e.preventDefault();
  });
});
$(".swap").click(function() {
  var _this = $(this);
  var current = _this.attr("src");
  var swap = _this.attr("data-swap");
  _this.attr("src", swap).attr("data-swap", current);
});

// KONTROLER

(function() {
    var app = angular.module("kreator", []);

    app.service('TestService', function(){
       this.clickOk = function() 
       {
         // Tutaj będą operacje wywołania funkcji z Wit.ai,
         // narazie zwracany jest zwykły komunikat tekstowy
         return "Click OK" ;
        }
     });
  
    var MainController = function($scope, TestService) {
       
           $scope.clickDom = function() {

            //Wywołanie funkcji z serviceu związanej z wit.ai
            //serviceName.actionDom
            
               
            //Nazwa wykonanej akcji
               $scope.message = actionDom;
              };
        
      
      $scope.clickOk = function() {

            //Wywołanie funkcji z serviceu związanej z wit.ai
            //serviceName.actionDom
            
             var message = TestService.clickOk();
          
            //Nazwa wykonanej akcji
               $scope.message2 = message;
              };
      
      
      
      //Akcje serwisu wit.ai
           var actionDom = function () {
              "Funkcja serwisu wit.ai"
        };
          
       var commands = {
        'Kliknij ok': function(){
          $scope.clickOk();
          $scope.$apply();
        },
         'Kliknij dom': function(){
           $scope.clickDom();
           $scope.$apply();
         },
         'pokaż *search': showFlickr,
   }
       annyang.debug();

  
    annyang.addCommands(commands);

    
    annyang.setLanguage('pl');

   
    annyang.start();
    };
  
 
    
    app.controller("MainController", MainController);
}());


//ANNYANG


  
    

    var showFlickr = function (tag) {
        $('#row').show();
        $('#flickrLoader p').text('Searching for ' + tag).fadeIn('fast');
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a828a6571bb4f0ff8890f7a386d61975&sort=interestingness-desc&per_page=9&format=json&callback=jsonFlickrApi&tags=' + tag;
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            jsonpCallback: 'jsonFlickrApi',
            contentType: "application/json",
            dataType: 'jsonp'
        });
        scrollTo("#row");
    };

    var jsonFlickrApi = function (results) {
        $('#flickrLoader p').fadeOut('slow');
        var photos = results.photos.photo;
        $.each(photos, function (index, photo) {
            $(document.createElement("img"))
                .attr({ src: '//farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_s.jpg' })
                .addClass("row")
                .appendTo(row);
        });
    };
   
    var commands = {
        
        'pokaż *search': showFlickr,
       
        
    };

   
    annyang.debug();

  
    annyang.addCommands(commands);

    
    annyang.setLanguage('pl');

   
    annyang.start();
  

    


