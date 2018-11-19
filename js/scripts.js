$(function(){
  console.log('scripts loaded');
  var myKey = config.MY_KEY;
  var npsData;
  var parks = [];
  var query = '';
  var msg = '';
  var html = '';

  // make working search bar
  $('button').click(function(){
    //when user clicks submit get the value of the search
    query = $('#query').val();
    console.log(query);
    var url = 'https://api.nps.gov/api/v1/parks?q=' + query + '&api_key=' + myKey;
    console.log(url);

    //make the AJAX request
    $.ajax({
      type: 'GET',
      dataType: 'json',
      data: npsData,
      url: url,
      success: function(npsData){
        html = '';
        parks = npsData.data;
        console.log(parks);
        if(parks.length == 0){
          html += 'No parks matched your query';
        }
        parks.forEach(function(park){
          console.log(park.description);
          html += '<div><a href="' + park.url + '" target="_blank"><strong>' + park.fullName + '</strong>';
          html += '<div>' + park.description + '</div><br/></a></div>';
        });//closing of for each
        $('#results').html(html);
      },//end of success
      error: function(msg){
        console.log('WTF');
      }//end of error
    });//end of AJAX request
  });//end of button click

  var url2 = 'https://api.fda.gov/drug/event.json?api_key=' + myKey + '&search=oxycontin&limit=100';
  var fdaData;
  var drugs = [];
  $.ajax({
    type: 'GET',
    dataType: 'json',
    data: fdaData,
    url: url2,
    success: function(fdaData){
      drugs = fdaData.results;
      console.log(drugs);
      drugs.forEach(function(drug){
        console.log(drug.patient.reaction[0].reactionmeddrapt);
      });
    },//end of success
    error: function(msg){
      console.log('404 error');
    }//end of error
  });//end of AJAX request


});//end of document.ready
