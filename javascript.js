

var pic=new Array;

$(document).ready(function() {
   document.getElementById("fav_table").innerHTML = generate_favtable();
  
//    $("#getquote input").val().on('change', function () {
//             console.log("i AM ALWAYS here")
        
//         });

        $('#submitButton').click(function(event) {

            
            $("#bt_fav img").attr('src', "/img/star_empty.png");
            $("#page_one").attr('class', "item");
            $("#page_two").attr('class', "item active");
            $("#myBtn2").removeAttr('disabled');
            // document.getElementById("myBtn2").innerHTML
            // console.log("switch is finished");
            // document.getElementById("table_part").innerHTML="<table class='table table-striped'><tr><th>Stock Ticker Symbol</th><td id='tda'></td></tr><tr><th>Last Price</th><td id='tdb'></td></tr><tr><th>Change(Change Percent)</th><td id='tdc'></td></tr><tr><th>Timestamp</th><td id='tdd'></td></tr><tr><th>Open</th><td id='tde'></td></tr><tr><th>Close</th><td id='tdf'></td></tr><tr><th>Day's Range</th><td id='tdg'></td></tr><tr><th>Volume</th><td id='tdh'></td></tr></table>";

            


                      event.preventDefault();
                      //PRICE
                      $.ajax({
                          type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                          //dataType    : "json",
                          url 		: 'http://127.0.0.1:8081/price/'+ $("#getquote input").val(), 
                          success     : function (data){
            
                              console.log(data);
                              //  generate_table(data);
                         
                             var name = 'Time Series (Daily)';
                             var data1 = data[name];//data of date.lol
                             var last_refresh = data['Meta Data']['3. Last Refreshed'];
                             last_refresh = last_refresh.slice(0,10);
                             var date_array = [];
                             date_array.unshift(last_refresh);
                            //  last_refresh = last_refresh.slice(0,10);
                             console.log("last-refresh is:"+last_refresh);
          
                              for (var i=0; i<180; i++){
                                  last_refresh = new Date(last_refresh);
                                  last_refresh.setDate(last_refresh.getDate() - 1);
                                  last_refresh = last_refresh.toISOString().slice(0,10);
                              if(!data1.hasOwnProperty(last_refresh)){
                                  continue;
                                  } else{
                                  date_array.unshift(last_refresh);
                                  }
                              };
                              console.log("DATE-array is:"+date_array);
          
                              var size = date_array.length;
                              var date_array_new = [];
                              for(var i=0; i<size; i++){
                                  var arr = date_array[i].split('-');
                                  date_array_new[i] = arr[1] + '/' + arr[2];
                              }
                            //   console.log(date_array_new); 
          
          
                              //generate_PRICE/VOLUME
          
                                      var SMA_array = [];
                                      var SMA_array_two = [];
                                      for(var i=0; i<size; i++){
                                          SMA_array[i] = data['Time Series (Daily)'][date_array[i]]['4. close'];
                                          SMA_array_two[i] = data['Time Series (Daily)'][date_array[i]]['5. volume'];
                                          SMA_array[i]=parseFloat(SMA_array[i]);
                                          SMA_array_two[i]=parseFloat(SMA_array_two[i]);
                                      }
                                    //   console.log(SMA_array);
                                    //   console.log(SMA_array_two);
          
          
                                      var min= Math.min.apply(null, SMA_array);
                                      var max= Math.max.apply(null, SMA_array_two);
                                      max= max*7;

                                      console.log("i am here !");
                                      
                                      
          
                                       Highcharts.chart('price', {
                                      chart: {

                                      zoomType: 'x',
                                      type: 'line'
                                      },
                                      title: {
                                      text: 'Stock Price and Volume'
                                      },
                                      subtitle: {
                                      text: '<a href="https:/www.alphavantage.co">Source: Alpha Vantage</a>',
                                      style:{
                                      color:'blue'
                                      }
                                      },
                                      xAxis: [{
                                      categories: date_array_new,
                                      labels: {
                                      formatter: function(){
                                      var arr=this.value.split('/');
                                      return arr[0] + '/' +arr[1];
                                      },
                                      align: 'left',
                                      step: 5,
                                      rotation: -45,
                                      y: 45
                                      },
                                      showFirstLabel: true,
                                      crosshair: true
                                      }],
          
                                      yAxis: [{
                                      allowDecimals: false,
                                      labels: {
                                      format: '{value}',
                                      style: {color: Highcharts.getOptions().colors[1]}
                                      },
                                      title: {
                                          text: 'Stock Price',
                                          style: {
                                          color: Highcharts.getOptions().colors[1]
                                          }
                                      },
          
                                      min: min
                                      }, {
                                      title: {
                                          text: 'Volume',
                                          style: {
                                          color: Highcharts.getOptions().colors[1]
                                          }
                                      },
          
                                      labels: {
                                      formatter: function(){return this.value/1000000+'M';},
                                      style: {color: Highcharts.getOptions().colors[1]}
                                      },
          
                                      max: max,
          
                                      opposite: true
                                      }],
          
                                      tooltip: {
                                      shared: false,
                                      xDateFormat: '%m/%d'
                                      },
          
                                      plotOptions: {
                                      series:{
                                      fillColor: 'rgb(240, 145, 142)'
                                      }
          
                                      },
          
                                      series: [{
                                      name: 'Price',
                                      type: 'area',
                                      color: 'blue',
                                      yAxis: 0,
                                      data: SMA_array,
                                      label: {
                                      enabled: false
                                      },
                                      tooltip: {}
          
                                      },{
                                      name: 'Volume',
                                      type: 'column',
                                      color: 'red',
                                      data: SMA_array_two,
                                      label: {
                                      enabled: false
                                      },
                                      yAxis: 1,
                                      tooltip: {valueDecimals: 0}
                                      }]
                                      
                                  });
                                  var pricechart ={
                                    chart: {

                                    zoomType: 'x',
                                    type: 'line'
                                    },
                                    title: {
                                    text: 'Stock Price and Volume'
                                    },
                                    subtitle: {
                                    text: '<a href="https:/www.alphavantage.co">Source: Alpha Vantage</a>',
                                    style:{
                                    color:'blue'
                                    }
                                    },
                                    xAxis: [{
                                    categories: date_array_new,
                                    labels: {
                                    formatter: function(){
                                    var arr=this.value.split('/');
                                    return arr[0] + '/' +arr[1];
                                    },
                                    align: 'left',
                                    step: 5,
                                    rotation: -45,
                                    y: 45
                                    },
                                    showFirstLabel: true,
                                    crosshair: true
                                    }],
        
                                    yAxis: [{
                                    allowDecimals: false,
                                    labels: {
                                    format: '{value}',
                                    style: {color: Highcharts.getOptions().colors[1]}
                                    },
                                    title: {
                                        text: 'Stock Price',
                                        style: {
                                        color: Highcharts.getOptions().colors[1]
                                        }
                                    },
        
                                    min: min
                                    }, {
                                    title: {
                                        text: 'Volume',
                                        style: {
                                        color: Highcharts.getOptions().colors[1]
                                        }
                                    },
        
                                    labels: {
                                    formatter: function(){return this.value/1000000+'M';},
                                    style: {color: Highcharts.getOptions().colors[1]}
                                    },
        
                                    max: max,
        
                                    opposite: true
                                    }],
        
                                    tooltip: {
                                    shared: false,
                                    xDateFormat: '%m/%d'
                                    },
        
                                    plotOptions: {
                                    series:{
                                    fillColor: 'rgb(240, 145, 142)'
                                    }
        
                                    },
        
                                    series: [{
                                    name: 'Price',
                                    type: 'area',
                                    color: 'blue',
                                    yAxis: 0,
                                    data: SMA_array,
                                    label: {
                                    enabled: false
                                    },
                                    tooltip: {}
        
                                    },{
                                    name: 'Volume',
                                    type: 'column',
                                    color: 'red',
                                    data: SMA_array_two,
                                    label: {
                                    enabled: false
                                    },
                                    yAxis: 1,
                                    tooltip: {valueDecimals: 0}
                                    }]
                                    
                                }
                                                                                      

                                //START OF PRICECHART
                                                                  var exportUrl = 'https://export.highcharts.com/';
                                                                   var optionsStr = JSON.stringify(pricechart);
                                
                                                                  dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                  $.ajax({
                                                                      type: 'POST',
                                                                      data: dataString,
                                                                      url: exportUrl,
                                                                      success: function (data) {
                                                                          console.log('get the file from url: ', exportUrl+data);
                                                                          pic[1]=exportUrl+data;
                                                                          console.log("pic[price] has comes: "+pic[1]);

                                                                      },
                                                                      error: function (err) {
                                                                          debugger;
                                                                          console.log('error', err.statusText)
                                                                      }
                                                                  });
                                //END OF PRICECHART
                                




                                              var stock_ticker_symbol=data['Meta Data']['2. Symbol'];
                                              console.log(stock_ticker_symbol);
                                              var last_refresh=data['Meta Data']['3. Last Refreshed'].slice(0,10);
                                              
                                              var last_refresh_date= last_refresh;
                                              last_refresh_forshow = last_refresh+' 16:00:00 EDT';
                                              var last_price=data['Time Series (Daily)'][last_refresh]['4. close'];
                                            //   last_price = parseFloat(last_price.toFixed(2));
                                              last_price = last_price.substr(0,last_price.indexOf(".")+3)
                                            //   last_price = parseFloat(last_price.toFixed(2));
                                              var open = data['Time Series (Daily)'][last_refresh]['1. open'];
                                              open = open.substr(0,open.indexOf(".")+3)
                                            //   open = parseFloat(open.toFixed(2));
                                              var high = data['Time Series (Daily)'][last_refresh]['2. high'];
                                              high = high.substr(0,high.indexOf(".")+3)
                                            //   high = parseFloat(high.toFixed(2));
                                              var low = data['Time Series (Daily)'][last_refresh]['3. low'];
                                              low = low.substr(0,low.indexOf(".")+3)
                                            //   low = parseFloat(low.toFixed(2));
                                              var day_range = low + " - " + high;
                                              var volume = data['Time Series (Daily)'][last_refresh]['5. volume'];
                                           
                                              var date_list = data['Time Series (Daily)'];
                                              for(var i=0; i<10;i++){
                                                  last_refresh_date = new Date(last_refresh_date);
                                                  last_refresh_date.setDate(last_refresh_date.getDate() - 1);
                                                  last_refresh_date = last_refresh_date.toISOString().slice(0,10);
                                                  console.log(last_refresh_date);
                                              if(!date_list.hasOwnProperty(last_refresh_date)){
                                                  continue;
                                              }else{
                                                  var yesterday_date=last_refresh_date;
                                                  break;
                                              }
                                              
                                            } 
                                            var last_price=data['Time Series (Daily)'][last_refresh]['4. close'];
                                            last_price = last_price.substr(0,last_price.indexOf(".")+3);
                                            var last_price_yesterday=data['Time Series (Daily)'][yesterday_date]['4. close'];
                                            last_price_yesterday = last_price_yesterday.substr(0,last_price_yesterday.indexOf(".")+3);
                                            var close = last_price-1.03;
                                            // close = close.substr(0,close.indexOf(".")+3);
                                            // console.log(last_price);
                                            // console.log(last_price_yesterday);
                                            var change = last_price-last_price_yesterday;
                          
                                            change = parseFloat(change.toFixed(2));
                                          
                                            var change_percent = change/last_price_yesterday*100;
                                            change_percent = parseFloat(change_percent.toFixed(2))+"%";
                                            change_percent=' ('+change_percent+')'
                                            if(change<0){
                                            var src = "<img src='http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png' alt='down' height='15' width='15'>"
                                            }else{
                                              src = "<img src='http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png' alt='up' height='15' width='15'>"
                                            }

                                             var tablepart="<table class='table table-striped' id='detail_table'><tr><th>Stock Ticker Symbol</th><td id='tda'>"+stock_ticker_symbol+"</td></tr><tr><th>Last Price</th><td id='tdb'>"+last_price+"</td></tr><tr><th>Change(Change Percent)</th><td id='tdc'>"+change+change_percent+src+"</td></tr><tr><th>Timestamp</th><td id='tdd'>"+last_refresh_forshow+"</td></tr><tr><th>Open</th><td id='tde'>"+open+"</td></tr><tr><th>Close</th><td id='tdf'>"+close+"</td></tr><tr><th>Day's Range</th><td id='tdg'>"+day_range+"</td></tr><tr><th>Volume</th><td id='tdh'>"+volume+"</td></tr></table>";

                                             $('#table_part').html(tablepart);

          
                                      //START OF HIGHSTACK
                                      var data2 = new Array();
                                      var arr1 = new Array();
                                      arr1 = Object.keys(data["Time Series (Daily)"]);
                                      var length = arr1.length;
                                             
                                      for(var i = 0; i<1000; i++){
                                          data2[i] = new Array();
                                          var d = new Date(arr1[i]);
                                          data2[i][0] = d.getTime()-0;
                                          data2[i][1] = data["Time Series (Daily)"][arr1[i]]["4. close"]-0;
                                      }
                                      console.log(data2);
          
                                      Highcharts.stockChart("page2_below_hist", {
                                          rangeSelector: {
                                              buttons: [{
                                                      type: 'week',
                                                      count: 1,
                                                      text: '1w'
                                                  }, {
                                                      type: 'month',
                                                      count: 1,
                                                      text: '1m'
                                                  }, {
                                                      type: 'month',
                                                      count: 3,
                                                      text: '3m'
                                                  }, {
                                                      type: 'month',
                                                      count: 6,
                                                      text: '6m'
                                                  }, {
                                                      type: 'ytd',
                                                      text: 'YTD'
                                                  },{
                                                      type: 'year',
                                                      count: 1,
                                                      text: '1y'
                                                  }, {
                                                      type: 'all',
                                                      text: 'All'
                                                  }],
                                                  selected: 0       
                                          },
                                          title: {
                                              text: stock_ticker_symbol+"  Stock Price "
                                          },
                                          subtitle: {
                                              text: '<a href="https:/www.alphavantage.co">Source: Alpha Vantage</a>',
                                              style:{
                                                  color:"blue"
                                              }
                                          },
                                          series: [{
                                                  name: stock_ticker_symbol,
                                                  data: data2.reverse(),
                                                  type: 'area',
                                                  tooltip: {
                                                      valueDecimals: 2
                                                  }
                                              }]
                                      });

                                    //   return pricechart
                                        

                          }
                          
                      })
                      .fail(function(){
                        var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get Price data</div>';
                        $('#price').html(error);
                        $('#page2_below_hist').html(error);
                        console.log("ERROR is happening!");
                      })
                      
                     
                      //NEWS
                      $.ajax({
                                      type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                                      //dataType    : "json",
                                      url 		: 'http://127.0.0.1:8081/news/'+ $("#getquote input").val(), // the url where we want to GET
                                      success     : function(data){
                                          
                                          
                                          // var data=JSON.parse(JSON.stringify(data));
          
          
                                          console.log("ALready received news section is :  "+data);
          
                                          data= JSON.parse(data);
          
                                          parser = new DOMParser();
                                          xmlDoc = parser.parseFromString(data,"text/xml");
                                          var array_title = new Array();
                                          var array_link = new Array();
                                          var array_author = new Array();
                                          var array_time = new Array();
                                          for(var i =0; i<5; i++){
                                              array_title[i]=xmlDoc.getElementsByTagName('rss')[0].getElementsByTagName('channel')[0].getElementsByTagName('item')[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
                                              array_link[i]=xmlDoc.getElementsByTagName('rss')[0].getElementsByTagName('channel')[0].getElementsByTagName('item')[i].getElementsByTagName('link')[0].childNodes[0].nodeValue;
                                              array_author[i]=xmlDoc.getElementsByTagName('rss')[0].getElementsByTagName('channel')[0].getElementsByTagName('item')[i].getElementsByTagName('sa:author_name')[0].childNodes[0].nodeValue;
                                              array_time[i]=xmlDoc.getElementsByTagName('rss')[0].getElementsByTagName('channel')[0].getElementsByTagName('item')[i].getElementsByTagName('pubDate')[0].childNodes[0].nodeValue;
                                          }
                                          var innerHTML0="<a  href="+array_link[0]+">"+array_title[0]+"</a> <br/><br/> <strong>Author:</strong> <strong>"+array_author[0]+"</strong><br/><strong>Data: "+array_time[0]+"</strong>";
                                          var innerHTML1="<a  href="+array_link[1]+">"+array_title[1]+"</a> <br/><br/> <strong>Author:</strong> <strong>"+array_author[1]+"</strong><br/><strong>Data: "+array_time[1]+"</strong>";
                                          var innerHTML2="<a  href="+array_link[2]+">"+array_title[2]+"</a> <br/><br/> <strong>Author:</strong> <strong>"+array_author[2]+"</strong><br/><strong>Data: "+array_time[2]+"</strong>";
                                          var innerHTML3="<a  href="+array_link[3]+">"+array_title[3]+"</a> <br/><br/> <strong>Author:</strong> <strong>"+array_author[3]+"</strong><br/><strong>Data: "+array_time[0]+"</strong>";
                                          var innerHTML4="<a  href="+array_link[4]+">"+array_title[4]+"</a> <br/><br/> <strong>Author:</strong> <strong>"+array_author[4]+"</strong><br/><strong>Data: "+array_time[0]+"</strong>";
                                          document.getElementById("new0").innerHTML=innerHTML0;
                                          document.getElementById("new1").innerHTML=innerHTML1;
                                          document.getElementById("new2").innerHTML=innerHTML2;
                                          document.getElementById("new3").innerHTML=innerHTML3;
                                          document.getElementById("new4").innerHTML=innerHTML4;
                                          console.log(array_title);
                                          console.log(array_link);
                                          console.log(array_author);
                                          console.log(array_time);
          
                                          
          
                    
                                      }
                                  });
                   
                         
                      //SMA
                      $.ajax({
                          type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                          //dataType    : "json",
                          url 		: 'http://127.0.0.1:8081/sma/'+ $("#getquote input").val(), // the url where we want to GET
                          success     : function(data){
                              console.log(data);
                               //data1=JSON.parse(data);
                               var name = 'Technical Analysis: SMA';
                               var data1 = data[name];//data of date.lol
                               var last_refresh = data['Meta Data']['3: Last Refreshed'];
                               var date_array = [];
                               date_array.unshift(last_refresh);
          
                               for (var i=0; i<180; i++){
                                   last_refresh = new Date(last_refresh);
                                   last_refresh.setDate(last_refresh.getDate() - 1);
                                   last_refresh = last_refresh.toISOString().slice(0,10);
                               if(!data1.hasOwnProperty(last_refresh)){
                                   continue;
                                   } else{
                                   date_array.unshift(last_refresh);              
                                   }
                               };
                               
                               var size = date_array.length;
                               var date_array_new = [];
                               for(var i=0; i<size; i++){
                                   var arr = date_array[i].split('-');
                                   date_array_new[i] = arr[1] + '/' + arr[2];
                               }
                               console.log(date_array_new); 
          
               
                               //generate_SMA()
                               
                               var SMA_array = [];
                               for(var i=0; i<size; i++){
                                   SMA_array[i] = data['Technical Analysis: SMA'][date_array[i]]['SMA'];
                                   SMA_array[i]=parseFloat(SMA_array[i]);
                               }        
                               console.log(SMA_array);
          
                               Highcharts.chart('sma', {
          
                                       chart: {
                                           zoomType: 'x',
                                           type: 'line'
                                          //  width: 400,
                                          //  height:200
                                       },
                                       title: {
                                           text: 'Simple Moving Average(SMA)'
                                       },
                                       subtitle: {
                                           text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                           style: {
                                               color:'blue'
                                           }
                                       },
                                       xAxis: {
                                           categories: date_array_new,
                                           crosshair: true
                                       },
                                       yAxis: {
                                   //        min: 'data_min',
                                   //        max: 'data_max',
                                           title: {
                                               text: 'SMA'
                                           }
                                       },
                                       tooltip: {
                                           headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                           pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                               '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                           footerFormat: '</table>',
                                           shared: true,
                                           useHTML: true
                                       },
                                       plotOptions: {
                                           line: {
                                           marker: {
                                               enabled: true,
                                               symbol: 'diamond'
                                           }
          
                                           },
                                           series: {
                                           label: {
                                           connectorAllowed: false
                                           },
                                           color: 'red'
                                           }
                                       },

                                       series: [{
                                           name: 'SMA',
                                           data: SMA_array,
                                           label: {
                                           enabled: false
                                           }
                                           
          
                                       }]
                               });
                               var smachart={
                                
                                                             chart: {
                                                                 zoomType: 'x',
                                                                 type: 'line'
                                                                //  width: 400,
                                                                //  height:200
                                                             },
                                                             title: {
                                                                 text: 'Simple Moving Average(SMA)'
                                                             },
                                                             subtitle: {
                                                                 text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                                                 style: {
                                                                     color:'blue'
                                                                 }
                                                             },
                                                             xAxis: {
                                                                 categories: date_array_new,
                                                                 crosshair: true
                                                             },
                                                             yAxis: {
                                                         //        min: 'data_min',
                                                         //        max: 'data_max',
                                                                 title: {
                                                                     text: 'SMA'
                                                                 }
                                                             },
                                                             tooltip: {
                                                                 headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                                                 pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                                     '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                                                 footerFormat: '</table>',
                                                                 shared: true,
                                                                 useHTML: true
                                                             },
                                                             plotOptions: {
                                                                 line: {
                                                                 marker: {
                                                                     enabled: true,
                                                                     symbol: 'diamond'
                                                                 }
                                
                                                                 },
                                                                 series: {
                                                                 label: {
                                                                 connectorAllowed: false
                                                                 },
                                                                 color: 'red'
                                                                 }
                                                             },
                      
                                                             series: [{
                                                                 name: 'SMA',
                                                                 data: SMA_array,
                                                                 label: {
                                                                 enabled: false
                                                                 }
                                                                 
                                
                                                             }]
                                                     };
                                                        //START OF SMACHART
                                                        
                                                                                     var exportUrl = 'https://export.highcharts.com/';
                                                                                     var optionsStr = JSON.stringify(smachart);
                                                  
                                                                                    dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                                    $.ajax({
                                                                                        type: 'POST',
                                                                                        data: dataString,
                                                                                        url: exportUrl,
                                                                                        success: function (data) {
                                                                                            console.log('get the file from url: ', exportUrl+data);
                                                                                            pic[2]=exportUrl+data;
                                                                                            console.log("pic[sma] has comes: "+pic[2]);
                                                                        
                                                                                        },
                                                                                        error: function (err) {
                                                                                            debugger;
                                                                                            console.log('error', err.statusText)
                                                                                        }
                                                                                    });
                                                  //END OF PRICECHART
                          }
                          
                      })
                      .fail(function(){
                        var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                        $('#sma').html(error);
                        console.log("ERROR is happening!");
                      });
                      //EMA
                      $.ajax({
                          type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                          //dataType    : "json",
                          url 		: 'http://127.0.0.1:8081/ema/'+ $("#getquote input").val(), // the url where we want to GET
                          success     : function(data){
                              console.log(data);
                              //data1=JSON.parse(data);
                              var name = 'Technical Analysis: EMA';
                              var data1 = data[name];//data of date.lol
                              var last_refresh = data['Meta Data']['3: Last Refreshed'];
                              var date_array = [];
                              date_array.unshift(last_refresh);
          
                              for (var i=0; i<180; i++){
                                  last_refresh = new Date(last_refresh);
                                  last_refresh.setDate(last_refresh.getDate() - 1);
                                  last_refresh = last_refresh.toISOString().slice(0,10);
                              if(!data1.hasOwnProperty(last_refresh)){
                                  continue;
                                  } else{
                                  date_array.unshift(last_refresh);              
                                  }
                              };
                              
                              var size = date_array.length;
                              var date_array_new = [];
                              for(var i=0; i<size; i++){
                                  var arr = date_array[i].split('-');
                                  date_array_new[i] = arr[1] + '/' + arr[2];
                              }
                              console.log(date_array_new); 
          
              
                              //generate_SMA()
                              
                              var SMA_array = [];
                              for(var i=0; i<size; i++){
                                  SMA_array[i] = data['Technical Analysis: EMA'][date_array[i]]['EMA'];
                                  SMA_array[i]=parseFloat(SMA_array[i]);
                              }        
                              console.log(SMA_array);
              

                              Highcharts.chart('ema', {
                                      chart: {
                                          zoomType: 'x',
                                          type: 'line'
                                          // width: 400,
                                          // height: 200
                                      },
                                      title: {
                                          text: 'Exponential Moving Average(EMA)'
                                      },
                                      subtitle: {
                                          text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                          style: {
                                              color:'blue'
                                          }
                                      },
                                      xAxis: {
                                          categories: date_array_new,
                                          crosshair: true
                                      },
                                      yAxis: {
                                  //        min: 'data_min',
                                  //        max: 'data_max',
                                          title: {
                                              text: 'EMA'
                                          }
                                      },
                                      tooltip: {
                                          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                          footerFormat: '</table>',
                                          shared: true,
                                          useHTML: true
                                      },
                                      plotOptions: {
                                          line: {
                                          marker: {
                                              enabled: true,
                                              symbol: 'diamond'
                                          }
          
                                          },
                                          series: {
                                          label: {
                                          connectorAllowed: false
                                          },
                                          color: 'red'
                                          }
                                      },

                                      series: [{
                                          name: 'EMA',
                                          data: SMA_array,
                                          label: {
                                          enabled: false
                                          }
                                          
          
                                      }]
                              });
                              var emachart={
                                chart: {
                                    zoomType: 'x',
                                    type: 'line'
                                    // width: 400,
                                    // height: 200
                                },
                                title: {
                                    text: 'Exponential Moving Average(EMA)'
                                },
                                subtitle: {
                                    text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                    style: {
                                        color:'blue'
                                    }
                                },
                                xAxis: {
                                    categories: date_array_new,
                                    crosshair: true
                                },
                                yAxis: {
                            //        min: 'data_min',
                            //        max: 'data_max',
                                    title: {
                                        text: 'EMA'
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                    footerFormat: '</table>',
                                    shared: true,
                                    useHTML: true
                                },
                                plotOptions: {
                                    line: {
                                    marker: {
                                        enabled: true,
                                        symbol: 'diamond'
                                    }
    
                                    },
                                    series: {
                                    label: {
                                    connectorAllowed: false
                                    },
                                    color: 'red'
                                    }
                                },

                                series: [{
                                    name: 'EMA',
                                    data: SMA_array,
                                    label: {
                                    enabled: false
                                    }
                                    
    
                                }]
                        };
                                                                                //START OF EMACHART
                                                        
                                                                                var exportUrl = 'https://export.highcharts.com/';
                                                                                var optionsStr = JSON.stringify(emachart);
                                             
                                                                               dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                               $.ajax({
                                                                                   type: 'POST',
                                                                                   data: dataString,
                                                                                   url: exportUrl,
                                                                                   success: function (data) {
                                                                                       console.log('get the file from url: ', exportUrl+data);
                                                                                       pic[3]=exportUrl+data;
                                                                                       console.log("pic[ema] has comes: "+pic[3]);
                                                                           
                                                                                   },
                                                                                   error: function (err) {
                                                                                       debugger;
                                                                                       console.log('error', err.statusText)
                                                                                   }
                                                                               });
                                             //END OF PRICECHART
                          }
                      })
                      .fail(function(){
                        var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                        $('#ema').html(error);
                        console.log("ERROR is happening!");
                      });
                      //STOCH
                      $.ajax({
                          type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                          //dataType    : "json",
                          url 		: 'http://127.0.0.1:8081/stoch/'+ $("#getquote input").val(), // the url where we want to GET
                          success     : function(data){
                              console.log(data);
                              //data1=JSON.parse(data);
                              console.log(data);
                              //data1=JSON.parse(data);
                              var name = 'Technical Analysis: STOCH';
                              var data1 = data[name];//data of date.lol
                              var last_refresh = data['Meta Data']['3: Last Refreshed'];
                 
                              var date_array = [];
                             date_array.unshift(last_refresh);
                             for (var i=0; i<180; i++){
                             last_refresh = new Date(last_refresh);
                             last_refresh.setDate(last_refresh.getDate() - 1);
                             last_refresh = last_refresh.toISOString().slice(0,10);
                                 if(!data1.hasOwnProperty(last_refresh)){
                                     continue;
                                     } else{
                                     date_array.unshift(last_refresh);              
                                     }
                                 };
                                 
                                 var size = date_array.length;
                                 var date_array_new = [];
                                 for(var i=0; i<size; i++){
                                     var arr = date_array[i].split('-');
                                     date_array_new[i] = arr[1] + '/' + arr[2];
                                 }
                                 console.log(date_array_new); 
          
                 
                                 //generate_SMA()
                                 
                                 var SMA_array = [];
                                 var SMA_array_two = [];
                                 for(var i=0; i<size; i++){
                                      SMA_array[i] = data['Technical Analysis: STOCH'][date_array[i]]['SlowK'];
                                      SMA_array_two[i] = data['Technical Analysis: STOCH'][date_array[i]]['SlowD'];
                                      SMA_array[i]=parseFloat(SMA_array[i]);
                                      SMA_array_two[i]=parseFloat(SMA_array_two[i]);
                                 }
                                 console.log(SMA_array);
                 
               
                                 Highcharts.chart('stoch', {
                                         chart: {
                                          zoomType: 'x',
                                             type: 'line'
                                             // width: 898,
                                             // height: 398
                                         },
                                         title: {
                                             text: 'Stochastic (STOCH)'
                                         },
                                         subtitle: {
                                             text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                             style: {
                                                 color:'blue'
                                             }
                                         },
                                         xAxis: {
                                             categories: date_array_new,
                                             crosshair: true
                                         },
                                         yAxis: {
                                     //        min: 'data_min',
                                     //        max: 'data_max',
                                             title: {
                                                 text: 'SMA'
                                             }
                                         },
                                         tooltip: {
                                             headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                             pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                                 '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                                             footerFormat: '</table>',
                                             shared: true,
                                             useHTML: true
                                         },
                                         plotOptions: {
                                             line: {
                                             marker: {
                                                 enabled: true,
                                                 symbol: 'diamond'
                                             }
          
                                             },
                                             series: [{
                                                 label: {
                                                 connectorAllowed: false
                                                 },
                                                 color: 'red'
                                                },{
                                                 label: {
                                                 connectorAllowed: false
                                                 },
                                                 color: 'blue'
                                                }]
                                         },

                                         series: [{
                                             name: 'SlowK',
                                             data: SMA_array
                                         },{
                                             name: 'SlowD',
                                             data: SMA_array_two
                                         }]
                                 });
                                 var stochchart ={
                                    chart: {
                                     zoomType: 'x',
                                        type: 'line'
                                        // width: 898,
                                        // height: 398
                                    },
                                    title: {
                                        text: 'Stochastic (STOCH)'
                                    },
                                    subtitle: {
                                        text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                        style: {
                                            color:'blue'
                                        }
                                    },
                                    xAxis: {
                                        categories: date_array_new,
                                        crosshair: true
                                    },
                                    yAxis: {
                                //        min: 'data_min',
                                //        max: 'data_max',
                                        title: {
                                            text: 'SMA'
                                        }
                                    },
                                    tooltip: {
                                        headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                        pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                            '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                                        footerFormat: '</table>',
                                        shared: true,
                                        useHTML: true
                                    },
                                    plotOptions: {
                                        line: {
                                        marker: {
                                            enabled: true,
                                            symbol: 'diamond'
                                        }
     
                                        },
                                        series: [{
                                            label: {
                                            connectorAllowed: false
                                            },
                                            color: 'red'
                                           },{
                                            label: {
                                            connectorAllowed: false
                                            },
                                            color: 'blue'
                                           }]
                                    },

                                    series: [{
                                        name: 'SlowK',
                                        data: SMA_array
                                    },{
                                        name: 'SlowD',
                                        data: SMA_array_two
                                    }]
                            };
                                                                                    //START OF STOCHCHART
                                                        
                                                                                    var exportUrl = 'https://export.highcharts.com/';
                                                                                    var optionsStr = JSON.stringify(stochchart);
                                                 
                                                                                   dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                                   $.ajax({
                                                                                       type: 'POST',
                                                                                       data: dataString,
                                                                                       url: exportUrl,
                                                                                       success: function (data) {
                                                                                           console.log('get the file from url: ', exportUrl+data);
                                                                                           pic[4]=exportUrl+data;
                                                                                           console.log("pic[stoch] has comes: "+pic[4]);
                                                                      
                                                                                       },
                                                                                       error: function (err) {
                                                                                           debugger;
                                                                                           console.log('error', err.statusText)
                                                                                       }
                                                                                   });
                                                 //END OF PRICECHART
                          }
                      })
                      .fail(function(){
                        var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                        $('#stoch').html(error);
                        console.log("ERROR is happening!");
                      });
                      //RSI
                      $.ajax({
                          type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                          //dataType    : "json",
                          url 		: 'http://127.0.0.1:8081/rsi/'+ $("#getquote input").val(), // the url where we want to GET
                          success     : function(data){
                              console.log(data);
                              //data1=JSON.parse(data);
                              var name = 'Technical Analysis: RSI';
                              var data1 = data[name];//data of date.lol
                              var last_refresh = data['Meta Data']['3: Last Refreshed'];
                              var date_array = [];
                              date_array.unshift(last_refresh);
          
                              for (var i=0; i<180; i++){
                                  last_refresh = new Date(last_refresh);
                                  last_refresh.setDate(last_refresh.getDate() - 1);
                                  last_refresh = last_refresh.toISOString().slice(0,10);
                              if(!data1.hasOwnProperty(last_refresh)){
                                  continue;
                                  } else{
                                  date_array.unshift(last_refresh);              
                                  }
                              };
                              
                              var size = date_array.length;
                              var date_array_new = [];
                              for(var i=0; i<size; i++){
                                  var arr = date_array[i].split('-');
                                  date_array_new[i] = arr[1] + '/' + arr[2];
                              }
                              console.log(date_array_new); 
          
              
                              //generate_SMA()
                              
                              var SMA_array = [];
                              for(var i=0; i<size; i++){
                                  SMA_array[i] = data['Technical Analysis: RSI'][date_array[i]]['RSI'];
                                  SMA_array[i]=parseFloat(SMA_array[i]);
                              }        
                              console.log(SMA_array);
          
                              Highcharts.chart('rsi', {
                                      chart: {
                                        zoomType: 'x',
                                          type: 'line'
            
                                      },
                                      title: {
                                          text: 'Relative Strength Index(RSI)'
                                      },
                                      subtitle: {
                                          text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                          style: {
                                              color:'blue'
                                          }
                                      },
                                      xAxis: {
                                          categories: date_array_new,
                                          crosshair: true
                                      },
                                      yAxis: {
                                  //        min: 'data_min',
                                  //        max: 'data_max',
                                          title: {
                                              text: 'RSI'
                                          }
                                      },
                                      tooltip: {
                                          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                          footerFormat: '</table>',
                                          shared: true,
                                          useHTML: true
                                      },
                                      plotOptions: {
                                          line: {
                                          marker: {
                                              enabled: true,
                                              symbol: 'diamond'
                                          }
          
                                          },
                                          series: {
                                          label: {
                                          connectorAllowed: false
                                          },
                                          color: 'red'
                                          }
                                      },
          
                                      series: [{
                                          name: 'RSI',
                                          data: SMA_array,
                                          label: {
                                          enabled: false
                                          }
                                      }]
                              });
                              var rsichart={
                                chart: {
                                  zoomType: 'x',
                                    type: 'line'
      
                                },
                                title: {
                                    text: 'Relative Strength Index(RSI)'
                                },
                                subtitle: {
                                    text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                    style: {
                                        color:'blue'
                                    }
                                },
                                xAxis: {
                                    categories: date_array_new,
                                    crosshair: true
                                },
                                yAxis: {
                            //        min: 'data_min',
                            //        max: 'data_max',
                                    title: {
                                        text: 'RSI'
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                    footerFormat: '</table>',
                                    shared: true,
                                    useHTML: true
                                },
                                plotOptions: {
                                    line: {
                                    marker: {
                                        enabled: true,
                                        symbol: 'diamond'
                                    }
    
                                    },
                                    series: {
                                    label: {
                                    connectorAllowed: false
                                    },
                                    color: 'red'
                                    }
                                },
    
                                series: [{
                                    name: 'RSI',
                                    data: SMA_array,
                                    label: {
                                    enabled: false
                                    }
                                }]
                        };
                                                                                //START OF RSICHART
                                                        
                                                                                var exportUrl = 'https://export.highcharts.com/';
                                                                                var optionsStr = JSON.stringify(rsichart);
                                             
                                                                               dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                               $.ajax({
                                                                                   type: 'POST',
                                                                                   data: dataString,
                                                                                   url: exportUrl,
                                                                                   success: function (data) {
                                                                                       console.log('get the file from url: ', exportUrl+data);
                                                                                       pic[5]=exportUrl+data;
                                                                                       console.log("pic[rsi] has comes: "+pic[5]);
                                                                             
                                                                                   },
                                                                                   error: function (err) {
                                                                                       debugger;
                                                                                       console.log('error', err.statusText)
                                                                                   }
                                                                               });
                                             //END OF PRICECHART
                          }
                      })
                      .fail(function(){
                        var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                        $('#rsi').html(error);
                        console.log("ERROR is happening!");
                      });
                      //ADX
                      $.ajax({
                          type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                          //dataType    : "json",
                          url 		: 'http://127.0.0.1:8081/adx/'+ $("#getquote input").val(), // the url where we want to GET
                          success     : function(data){
                              console.log(data);
                              //data1=JSON.parse(data);
                              var name = 'Technical Analysis: ADX';
                              var data1 = data[name];//data of date.lol
                              var last_refresh = data['Meta Data']['3: Last Refreshed'];
                              var date_array = [];
                              date_array.unshift(last_refresh);
          
                              for (var i=0; i<180; i++){
                                  last_refresh = new Date(last_refresh);
                                  last_refresh.setDate(last_refresh.getDate() - 1);
                                  last_refresh = last_refresh.toISOString().slice(0,10);
                              if(!data1.hasOwnProperty(last_refresh)){
                                  continue;
                                  } else{
                                  date_array.unshift(last_refresh);              
                                  }
                              };
                              
                              var size = date_array.length;
                              var date_array_new = [];
                              for(var i=0; i<size; i++){
                                  var arr = date_array[i].split('-');
                                  date_array_new[i] = arr[1] + '/' + arr[2];
                              }
                              console.log(date_array_new); 
          
              
                              //generate_SMA()
                              
                              var SMA_array = [];
                              for(var i=0; i<size; i++){
                                  SMA_array[i] = data['Technical Analysis: ADX'][date_array[i]]['ADX'];
                                  SMA_array[i]=parseFloat(SMA_array[i]);
                              }        
                              console.log(SMA_array);

                              Highcharts.chart('adx', {
                                      chart: {
                                        zoomType: 'x',
                                          type: 'line'
                                          // width: 898,
                                          // height: 398
                                      },
                                      title: {
                                          text: 'Average Directional Movement Index (ADX)'
                                      },
                                      subtitle: {
                                          text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                          style: {
                                              color:'blue'
                                          }
                                      },
                                      xAxis: {
                                          categories: date_array_new,
                                          crosshair: true
                                      },
                                      yAxis: {
                                  //        min: 'data_min',
                                  //        max: 'data_max',
                                          title: {
                                              text: 'ADX'
                                          }
                                      },
                                      tooltip: {
                                          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                          footerFormat: '</table>',
                                          shared: true,
                                          useHTML: true
                                      },
                                      plotOptions: {
                                          line: {
                                          marker: {
                                              enabled: true,
                                              symbol: 'diamond'
                                          }
          
                                          },
                                          series: {
                                          label: {
                                          connectorAllowed: false
                                          },
                                          color: 'red'
                                          }
                                      },

                                      series: [{
                                          name: 'ADX',
                                          data: SMA_array,
                                          label: {
                                          enabled: false
                                          }
                                          
          
                                      }]
                              });
                              var adxchart= {
                                chart: {
                                  zoomType: 'x',
                                    type: 'line'
                                    // width: 898,
                                    // height: 398
                                },
                                title: {
                                    text: 'Average Directional Movement Index (ADX)'
                                },
                                subtitle: {
                                    text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                    style: {
                                        color:'blue'
                                    }
                                },
                                xAxis: {
                                    categories: date_array_new,
                                    crosshair: true
                                },
                                yAxis: {
                            //        min: 'data_min',
                            //        max: 'data_max',
                                    title: {
                                        text: 'ADX'
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                    footerFormat: '</table>',
                                    shared: true,
                                    useHTML: true
                                },
                                plotOptions: {
                                    line: {
                                    marker: {
                                        enabled: true,
                                        symbol: 'diamond'
                                    }
    
                                    },
                                    series: {
                                    label: {
                                    connectorAllowed: false
                                    },
                                    color: 'red'
                                    }
                                },

                                series: [{
                                    name: 'ADX',
                                    data: SMA_array,
                                    label: {
                                    enabled: false
                                    }
                                    
    
                                }]
                        };
                                                                                //START OF ADXCHART
                                                        
                                                                                var exportUrl = 'https://export.highcharts.com/';
                                                                                var optionsStr = JSON.stringify(adxchart);
                                             
                                                                               dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                               $.ajax({
                                                                                   type: 'POST',
                                                                                   data: dataString,
                                                                                   url: exportUrl,
                                                                                   success: function (data) {
                                                                                       console.log('get the file from url: ', exportUrl+data);
                                                                                       pic[6]=exportUrl+data;
                                                                                       console.log("pic[adx] has comes: "+pic[6]);
                                                                              
                                                                                   },
                                                                                   error: function (err) {
                                                                                       debugger;
                                                                                       console.log('error', err.statusText)
                                                                                   }
                                                                               });
                                             //END OF PRICECHART
                          }
                      })
                      .fail(function(){
                        var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                        $('#adx').html(error);
                        console.log("ERROR is happening!");
                      });
                      //CCI
                      $.ajax({
                          type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                          //dataType    : "json",
                          url 		: 'http://127.0.0.1:8081/cci/'+ $("#getquote input").val(), // the url where we want to GET
                          success     : function(data){
                              console.log(data);
                              //data1=JSON.parse(data);
                              var name = 'Technical Analysis: CCI';
                              var data1 = data[name];//data of date.lol
                              var last_refresh = data['Meta Data']['3: Last Refreshed'];
                              var date_array = [];
                              date_array.unshift(last_refresh);
          
                              for (var i=0; i<180; i++){
                                  last_refresh = new Date(last_refresh);
                                  last_refresh.setDate(last_refresh.getDate() - 1);
                                  last_refresh = last_refresh.toISOString().slice(0,10);
                              if(!data1.hasOwnProperty(last_refresh)){
                                  continue;
                                  } else{
                                  date_array.unshift(last_refresh);              
                                  }
                              };
                              
                              var size = date_array.length;
                              var date_array_new = [];
                              for(var i=0; i<size; i++){
                                  var arr = date_array[i].split('-');
                                  date_array_new[i] = arr[1] + '/' + arr[2];
                              }
                              console.log(date_array_new); 
          
              
                              //generate_SMA()
                              
                              var SMA_array = [];
                              for(var i=0; i<size; i++){
                                  SMA_array[i] = data['Technical Analysis: CCI'][date_array[i]]['CCI'];
                                  SMA_array[i]=parseFloat(SMA_array[i]);
                              }        
                              console.log(SMA_array);
          
                              Highcharts.chart('cci', {
                                      chart: {
                                        zoomType: 'x',
                                          type: 'line'
                                          // width: 898,
                                          // height: 398
                                      },
                                      title: {
                                          text: 'Commodity Channel Index (CCI)'
                                      },
                                      subtitle: {
                                          text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                          style: {
                                              color:'blue'
                                          }
                                      },
                                      xAxis: {
                                          categories: date_array_new,
                                          crosshair: true
                                      },
                                      yAxis: {
                                  //        min: 'data_min',
                                  //        max: 'data_max',
                                          title: {
                                              text: 'CCI'
                                          }
                                      },
                                      tooltip: {
                                          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                          footerFormat: '</table>',
                                          shared: true,
                                          useHTML: true
                                      },
                                      plotOptions: {
                                          line: {
                                          marker: {
                                              enabled: true,
                                              symbol: 'diamond'
                                          }
          
                                          },
                                          series: {
                                          label: {
                                          connectorAllowed: false
                                          },
                                          color: 'red'
                                          }
                                      },

                                      series: [{
                                          name: 'CCI',
                                          data: SMA_array,
                                          label: {
                                          enabled: false
                                          }
                                          
          
                                      }]
                              });
                              var ccichart= {
                                chart: {
                                  zoomType: 'x',
                                    type: 'line'
                                    // width: 898,
                                    // height: 398
                                },
                                title: {
                                    text: 'Commodity Channel Index (CCI)'
                                },
                                subtitle: {
                                    text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                    style: {
                                        color:'blue'
                                    }
                                },
                                xAxis: {
                                    categories: date_array_new,
                                    crosshair: true
                                },
                                yAxis: {
                            //        min: 'data_min',
                            //        max: 'data_max',
                                    title: {
                                        text: 'CCI'
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                    footerFormat: '</table>',
                                    shared: true,
                                    useHTML: true
                                },
                                plotOptions: {
                                    line: {
                                    marker: {
                                        enabled: true,
                                        symbol: 'diamond'
                                    }
    
                                    },
                                    series: {
                                    label: {
                                    connectorAllowed: false
                                    },
                                    color: 'red'
                                    }
                                },

                                series: [{
                                    name: 'CCI',
                                    data: SMA_array,
                                    label: {
                                    enabled: false
                                    }
                                    
    
                                }]
                        };
                                                                                //START OF CCICHART
                                                        
                                                                                var exportUrl = 'https://export.highcharts.com/';
                                                                                var optionsStr = JSON.stringify(ccichart);
                                             
                                                                               dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                               $.ajax({
                                                                                   type: 'POST',
                                                                                   data: dataString,
                                                                                   url: exportUrl,
                                                                                   success: function (data) {
                                                                                       console.log('get the file from url: ', exportUrl+data);
                                                                                       pic[7]=exportUrl+data;
                                                                                       console.log("pic[cci] has comes: "+pic[7]);
                                                                                  
                                                                                   },
                                                                                   error: function (err) {
                                                                                       debugger;
                                                                                       console.log('error', err.statusText)
                                                                                   }
                                                                               });
                                             //END OF PRICECHART
                          }
                      })
                      .fail(function(){
                        var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                        $('#cci').html(error);
                        console.log("ERROR is happening!");
                      });
                      //BBANDS
                      $.ajax({
                          type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                          //dataType    : "json",
                          url 		: 'http://127.0.0.1:8081/bbands/'+ $("#getquote input").val(), // the url where we want to GET
                          success     : function(data){
                              console.log(data);
                              //data1=JSON.parse(data);
                              var name = 'Technical Analysis: BBANDS';
                              var data1 = data[name];//data of date.lol
                              var last_refresh = data['Meta Data']['3: Last Refreshed'];
                              var date_array = [];
                              date_array.unshift(last_refresh);
          
                              for (var i=0; i<180; i++){
                                  last_refresh = new Date(last_refresh);
                                  last_refresh.setDate(last_refresh.getDate() - 1);
                                  last_refresh = last_refresh.toISOString().slice(0,10);
                              if(!data1.hasOwnProperty(last_refresh)){
                                  continue;
                                  } else{
                                  date_array.unshift(last_refresh);              
                                  }
                              };
                              
                              var size = date_array.length;
                              var date_array_new = [];
                              for(var i=0; i<size; i++){
                                  var arr = date_array[i].split('-');
                                  date_array_new[i] = arr[1] + '/' + arr[2];
                              }
                              console.log(date_array_new);
                              
                              var SMA_array = [];
                              var SMA_array1 = [];
                              var SMA_array2 = [];
                              for(var i=0; i<size; i++){
                                   SMA_array[i] = data['Technical Analysis: BBANDS'][date_array[i]]['Real Upper Band'];
                                   SMA_array1[i] = data['Technical Analysis: BBANDS'][date_array[i]]['Real Lower Band'];
                                   SMA_array2[i] = data['Technical Analysis: BBANDS'][date_array[i]]['Real Middle Band'];
                                   SMA_array[i]=parseFloat(SMA_array[i]);
                                   SMA_array1[i]=parseFloat(SMA_array1[i]);
                                   SMA_array2[i]=parseFloat(SMA_array2[i]);
                              } 
          
                              Highcharts.chart('bbands', {
                                  chart: {
                                    zoomType: 'x',
                                    type: 'line',
                                  //   width: 898,
                                  //   height: 398
                                },
                                title: {
                                    text: 'Bollinger Bands (BBANDS)'
                                },
                                subtitle: {
                                    text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                    style: {
                                        color:'blue'
                                    }
                                },
                                xAxis: {
                                    categories: date_array_new,
                                    crosshair: true
                                },
                                yAxis: {
                            
                                    title: {
                                        text: 'BBANDS'
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                    pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                        '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                                    footerFormat: '</table>',
                                    shared: true,
                                    useHTML: true
                                },
                                plotOptions: {
                                      line: {
                                      marker: {
                                      enabled: true,
                                      symbol: 'diamond'
                                      }
                                    },
                                      series: [{
                                       label: {
                                       connectorAllowed: false
                                       },
                                       color: 'red'
                                      },{
                                       label: {
                                       connectorAllowed: false
                                       },
                                       color: 'blue'
                                      },{
                                       label: {
                                       connectorAllowed: false
                                       },
                                       color: 'black'
                                      }]
                            
                                },

                                series: [{
                                    name: 'Real Upper Band',
                                    data: SMA_array
                                },{
                                    name: 'Real Lower Band',
                                    data: SMA_array1
                                },{
                                    name: 'Real Middle Band',
                                    data: SMA_array2
                                }]
                            });
                            var bbandschart={
                                chart: {
                                  zoomType: 'x',
                                  type: 'line',
                                //   width: 898,
                                //   height: 398
                              },
                              title: {
                                  text: 'Bollinger Bands (BBANDS)'
                              },
                              subtitle: {
                                  text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                  style: {
                                      color:'blue'
                                  }
                              },
                              xAxis: {
                                  categories: date_array_new,
                                  crosshair: true
                              },
                              yAxis: {
                          
                                  title: {
                                      text: 'BBANDS'
                                  }
                              },
                              tooltip: {
                                  headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                  pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                      '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                                  footerFormat: '</table>',
                                  shared: true,
                                  useHTML: true
                              },
                              plotOptions: {
                                    line: {
                                    marker: {
                                    enabled: true,
                                    symbol: 'diamond'
                                    }
                                  },
                                    series: [{
                                     label: {
                                     connectorAllowed: false
                                     },
                                     color: 'red'
                                    },{
                                     label: {
                                     connectorAllowed: false
                                     },
                                     color: 'blue'
                                    },{
                                     label: {
                                     connectorAllowed: false
                                     },
                                     color: 'black'
                                    }]
                          
                              },

                              series: [{
                                  name: 'Real Upper Band',
                                  data: SMA_array
                              },{
                                  name: 'Real Lower Band',
                                  data: SMA_array1
                              },{
                                  name: 'Real Middle Band',
                                  data: SMA_array2
                              }]
                          };
                                                                                  //START OF BBANDSCHART
                                                        
                                                                                  var exportUrl = 'https://export.highcharts.com/';
                                                                                  var optionsStr = JSON.stringify(bbandschart);
                                               
                                                                                 dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                                 $.ajax({
                                                                                     type: 'POST',
                                                                                     data: dataString,
                                                                                     url: exportUrl,
                                                                                     success: function (data) {
                                                                                         console.log('get the file from url: ', exportUrl+data);
                                                                                         pic[8]=exportUrl+data;
                                                                                         console.log("pic[bbands] has comes: "+pic[8]);
                                                                                  
                                                                                     },
                                                                                     error: function (err) {
                                                                                         debugger;
                                                                                         console.log('error', err.statusText)
                                                                                     }
                                                                                 });
                                               //END OF PRICECHART
          
                          }
                      })
                      .fail(function(){
                        var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                        $('#bbands').html(error);
                        console.log("ERROR is happening!");
                      });
                      //MACD
                      $.ajax({
                          type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                          //dataType    : "json",
                          url 		: 'http://127.0.0.1:8081/macd/'+ $("#getquote input").val(), // the url where we want to GET
                          success     : function(data){
                              console.log(data);
                              //data1=JSON.parse(data);
                              console.log(data);
                              //data1=JSON.parse(data);
                              var name = 'Technical Analysis: MACD';
                              var data1 = data[name];//data of date.lol
                              var last_refresh = data['Meta Data']['3: Last Refreshed'];
                              var date_array = [];
                              date_array.unshift(last_refresh);
          
                              for (var i=0; i<180; i++){
                                  last_refresh = new Date(last_refresh);
                                  last_refresh.setDate(last_refresh.getDate() - 1);
                                  last_refresh = last_refresh.toISOString().slice(0,10);
                              if(!data1.hasOwnProperty(last_refresh)){
                                  continue;
                                  } else{
                                  date_array.unshift(last_refresh);              
                                  }
                              };
                              
                              var size = date_array.length;
                              var date_array_new = [];
                              for(var i=0; i<size; i++){
                                  var arr = date_array[i].split('-');
                                  date_array_new[i] = arr[1] + '/' + arr[2];
                              }
                              console.log(date_array_new);
                              
                              var SMA_array = [];
                              var SMA_array1 = [];
                              var SMA_array2 = [];
                              for(var i=0; i<size; i++){
                                   SMA_array[i] = data['Technical Analysis: MACD'][date_array[i]]['MACD_Signal'];
                                   SMA_array1[i] = data['Technical Analysis: MACD'][date_array[i]]['MACD_Hist'];
                                   SMA_array2[i] = data['Technical Analysis: MACD'][date_array[i]]['MACD'];
                                   SMA_array[i]=parseFloat(SMA_array[i]);
                                   SMA_array1[i]=parseFloat(SMA_array1[i]);
                                   SMA_array2[i]=parseFloat(SMA_array2[i]);
                              } 
          
                              Highcharts.chart('macd', {
                                  chart: {
                                    zoomType: 'x',
                                    type: 'line'
                                  //   width: 898,
                                  //   height: 398
                                },
                                title: {
                                    text: 'Moving Average Convergence/Divergence (MACD)'
                                },
                                subtitle: {
                                    text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                    style: {
                                        color:'blue'
                                    }
                                },
                                xAxis: {
                                    categories: date_array_new,
                                    crosshair: true
                                },
                                yAxis: {
                            
                                    title: {
                                        text: 'MACD'
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                    pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                        '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                                    footerFormat: '</table>',
                                    shared: true,
                                    useHTML: true
                                },
                                plotOptions: {
                                      line: {
                                      marker: {
                                      enabled: true,
                                      symbol: 'diamond'
                                      }
                                    },
                                      series: [{
                                       label: {
                                       connectorAllowed: false
                                       },
                                       color: 'red'
                                      },{
                                       label: {
                                       connectorAllowed: false
                                       },
                                       color: 'blue'
                                      },{
                                       label: {
                                       connectorAllowed: false
                                       },
                                       color: 'black'
                                      }]
                            
                                },

                                series: [{
                                    name: 'Real Upper Band',
                                    data: SMA_array
                                },{
                                    name: 'Real Lower Band',
                                    data: SMA_array1
                                },{
                                    name: 'Real Middle Band',
                                    data: SMA_array2
                                }]
                            });
                            var macdchart={
                                chart: {
                                  zoomType: 'x',
                                  type: 'line'
                                //   width: 898,
                                //   height: 398
                              },
                              title: {
                                  text: 'Moving Average Convergence/Divergence (MACD)'
                              },
                              subtitle: {
                                  text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                  style: {
                                      color:'blue'
                                  }
                              },
                              xAxis: {
                                  categories: date_array_new,
                                  crosshair: true
                              },
                              yAxis: {
                          
                                  title: {
                                      text: 'MACD'
                                  }
                              },
                              tooltip: {
                                  headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                  pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                      '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                                  footerFormat: '</table>',
                                  shared: true,
                                  useHTML: true
                              },
                              plotOptions: {
                                    line: {
                                    marker: {
                                    enabled: true,
                                    symbol: 'diamond'
                                    }
                                  },
                                    series: [{
                                     label: {
                                     connectorAllowed: false
                                     },
                                     color: 'red'
                                    },{
                                     label: {
                                     connectorAllowed: false
                                     },
                                     color: 'blue'
                                    },{
                                     label: {
                                     connectorAllowed: false
                                     },
                                     color: 'black'
                                    }]
                          
                              },

                              series: [{
                                  name: 'Real Upper Band',
                                  data: SMA_array
                              },{
                                  name: 'Real Lower Band',
                                  data: SMA_array1
                              },{
                                  name: 'Real Middle Band',
                                  data: SMA_array2
                              }]
                          };
                                                                                  //START OF MACDCHART
                                                        
                                                                                  var exportUrl = 'https://export.highcharts.com/';
                                                                                  var optionsStr = JSON.stringify(macdchart);
                                               
                                                                                 dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                                 $.ajax({
                                                                                     type: 'POST',
                                                                                     data: dataString,
                                                                                     url: exportUrl,
                                                                                     success: function (data) {
                                                                                         console.log('get the file from url: ', exportUrl+data);
                                                                                         pic[9]=exportUrl+data;
                                                                                         console.log("pic[macd] has comes: "+pic[9]);
                                                                                   
                                                                                     },
                                                                                     error: function (err) {
                                                                                         debugger;
                                                                                         console.log('error', err.statusText)
                                                                                     }
                                                                                 });
                                               //END OF PRICECHART
                          }
                      })
                      .fail(function(){
                        var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                        $('#macd').html(error);
                        console.log("ERROR is happening!");
                      });
                    showProgress();


          
                  });


        $('#bt_fav').click(function(){
            var symbol = document.getElementById("tda").innerHTML;
            console.log("symbol is:" +symbol);
            if( $("#bt_fav img").attr('src') == "/img/star_empty.png"){
                
                add(symbol);
            }else{
                
                
                remove(symbol);
            }
             
        });

        $("#myBtn").click(function(){
            $("#part2").carousel("prev");
        });
    
        $("#myBtn2").click(function(){
            $("#part2").carousel("next");
        });

        $("#clearButton").click(function(){
            // $("#bt_fav img").attr('src', "/img/star_empty.png");
            $("#getquote input").val('').css("border", "");
            $("#page_one").attr('class', "item active");
            $("#page_two").attr('class', "item");
            $("#myBtn2").attr('disabled', "true");

        });

        $("#bt_fb").click(function () {
            var chosen = $("#myTab > .active").text();
           
            chosen = chosen.toLowerCase();
            console.log("chosen indicator is: "+chosen);
            console.log(pic[1]+"**"+pic[2])
            var url;
            switch (chosen) {
                case "price":
                    url = pic[1];
                    break;
                case "sma":
                    url = pic[2];
                    break;
                case "ema":
                    url = pic[3];
                    break;
                case "stoch":
                    url = pic[4];
                    console.log("pic[stoch] is: "+pic[4]);
                    break;
                case "rsi":
                    url = pic[5];
                    break;
                case "adx":
                    url = pic[6];
                    break;
                case "cci":
                    url = pic[7];
                    break;
                case "bbands":
                    url = pic[8];
                    break;
                case "macd":
                    url = pic[9];
                    break;
                default:
                    break;
            }

            console.log("Pic to post is: "+url);

                    FB.ui({
                        method: 'feed',
                        app_id: '151701188685023',
                        picture: url
                    }, function(response){});
    
        });

        $("#refresh").click(function() {
            // console.log("data after parsed is : "+data);
            // for(var key in localStorage){
            //     var optionsStr = JSON.stringify(pricechart);
            //     data = JSON.parse((localStorage.getItem(key).stringify());
            //     console.log("data after parsed is : "+data);
            // }
            
            // data= JSON.parse(data);


        });

    return false;
});

function reload(symbol) {
  
            
    $("#bt_fav img").attr('src', "/img/star_empty.png");
    $("#page_one").attr('class', "item");
    $("#page_two").attr('class', "item active");
    $("#myBtn2").removeAttr('disabled');
    // document.getElementById("myBtn2").innerHTML
    // console.log("switch is finished");
    // document.getElementById("table_part").innerHTML="<table class='table table-striped'><tr><th>Stock Ticker Symbol</th><td id='tda'></td></tr><tr><th>Last Price</th><td id='tdb'></td></tr><tr><th>Change(Change Percent)</th><td id='tdc'></td></tr><tr><th>Timestamp</th><td id='tdd'></td></tr><tr><th>Open</th><td id='tde'></td></tr><tr><th>Close</th><td id='tdf'></td></tr><tr><th>Day's Range</th><td id='tdg'></td></tr><tr><th>Volume</th><td id='tdh'></td></tr></table>";

    


              event.preventDefault();
              //PRICE
              $.ajax({
                  type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                  //dataType    : "json",
                  url 		: 'http://127.0.0.1:8081/price/'+ symbol, 
                  success     : function (data){
    
                      console.log(data);
                      //  generate_table(data);
                 
                     var name = 'Time Series (Daily)';
                     var data1 = data[name];//data of date.lol
                     var last_refresh = data['Meta Data']['3. Last Refreshed'];
                     last_refresh = last_refresh.slice(0,10);
                     var date_array = [];
                     date_array.unshift(last_refresh);
                    //  last_refresh = last_refresh.slice(0,10);
                     console.log("last-refresh is:"+last_refresh);
  
                      for (var i=0; i<180; i++){
                          last_refresh = new Date(last_refresh);
                          last_refresh.setDate(last_refresh.getDate() - 1);
                          last_refresh = last_refresh.toISOString().slice(0,10);
                      if(!data1.hasOwnProperty(last_refresh)){
                          continue;
                          } else{
                          date_array.unshift(last_refresh);
                          }
                      };
                      console.log("DATE-array is:"+date_array);
  
                      var size = date_array.length;
                      var date_array_new = [];
                      for(var i=0; i<size; i++){
                          var arr = date_array[i].split('-');
                          date_array_new[i] = arr[1] + '/' + arr[2];
                      }
                    //   console.log(date_array_new); 
  
  
                      //generate_PRICE/VOLUME
  
                              var SMA_array = [];
                              var SMA_array_two = [];
                              for(var i=0; i<size; i++){
                                  SMA_array[i] = data['Time Series (Daily)'][date_array[i]]['4. close'];
                                  SMA_array_two[i] = data['Time Series (Daily)'][date_array[i]]['5. volume'];
                                  SMA_array[i]=parseFloat(SMA_array[i]);
                                  SMA_array_two[i]=parseFloat(SMA_array_two[i]);
                              }
                            //   console.log(SMA_array);
                            //   console.log(SMA_array_two);
  
  
                              var min= Math.min.apply(null, SMA_array);
                              var max= Math.max.apply(null, SMA_array_two);
                              max= max*7;

                              console.log("i am here !");
                              
                              
  
                               Highcharts.chart('price', {
                              chart: {

                              zoomType: 'x',
                              type: 'line'
                              },
                              title: {
                              text: 'Stock Price and Volume'
                              },
                              subtitle: {
                              text: '<a href="https:/www.alphavantage.co">Source: Alpha Vantage</a>',
                              style:{
                              color:'blue'
                              }
                              },
                              xAxis: [{
                              categories: date_array_new,
                              labels: {
                              formatter: function(){
                              var arr=this.value.split('/');
                              return arr[0] + '/' +arr[1];
                              },
                              align: 'left',
                              step: 5,
                              rotation: -45,
                              y: 45
                              },
                              showFirstLabel: true,
                              crosshair: true
                              }],
  
                              yAxis: [{
                              allowDecimals: false,
                              labels: {
                              format: '{value}',
                              style: {color: Highcharts.getOptions().colors[1]}
                              },
                              title: {
                                  text: 'Stock Price',
                                  style: {
                                  color: Highcharts.getOptions().colors[1]
                                  }
                              },
  
                              min: min
                              }, {
                              title: {
                                  text: 'Volume',
                                  style: {
                                  color: Highcharts.getOptions().colors[1]
                                  }
                              },
  
                              labels: {
                              formatter: function(){return this.value/1000000+'M';},
                              style: {color: Highcharts.getOptions().colors[1]}
                              },
  
                              max: max,
  
                              opposite: true
                              }],
  
                              tooltip: {
                              shared: false,
                              xDateFormat: '%m/%d'
                              },
  
                              plotOptions: {
                              series:{
                              fillColor: 'rgb(240, 145, 142)'
                              }
  
                              },
  
                              series: [{
                              name: 'Price',
                              type: 'area',
                              color: 'blue',
                              yAxis: 0,
                              data: SMA_array,
                              label: {
                              enabled: false
                              },
                              tooltip: {}
  
                              },{
                              name: 'Volume',
                              type: 'column',
                              color: 'red',
                              data: SMA_array_two,
                              label: {
                              enabled: false
                              },
                              yAxis: 1,
                              tooltip: {valueDecimals: 0}
                              }]
                              
                          });
                          var pricechart ={
                            chart: {

                            zoomType: 'x',
                            type: 'line'
                            },
                            title: {
                            text: 'Stock Price and Volume'
                            },
                            subtitle: {
                            text: '<a href="https:/www.alphavantage.co">Source: Alpha Vantage</a>',
                            style:{
                            color:'blue'
                            }
                            },
                            xAxis: [{
                            categories: date_array_new,
                            labels: {
                            formatter: function(){
                            var arr=this.value.split('/');
                            return arr[0] + '/' +arr[1];
                            },
                            align: 'left',
                            step: 5,
                            rotation: -45,
                            y: 45
                            },
                            showFirstLabel: true,
                            crosshair: true
                            }],

                            yAxis: [{
                            allowDecimals: false,
                            labels: {
                            format: '{value}',
                            style: {color: Highcharts.getOptions().colors[1]}
                            },
                            title: {
                                text: 'Stock Price',
                                style: {
                                color: Highcharts.getOptions().colors[1]
                                }
                            },

                            min: min
                            }, {
                            title: {
                                text: 'Volume',
                                style: {
                                color: Highcharts.getOptions().colors[1]
                                }
                            },

                            labels: {
                            formatter: function(){return this.value/1000000+'M';},
                            style: {color: Highcharts.getOptions().colors[1]}
                            },

                            max: max,

                            opposite: true
                            }],

                            tooltip: {
                            shared: false,
                            xDateFormat: '%m/%d'
                            },

                            plotOptions: {
                            series:{
                            fillColor: 'rgb(240, 145, 142)'
                            }

                            },

                            series: [{
                            name: 'Price',
                            type: 'area',
                            color: 'blue',
                            yAxis: 0,
                            data: SMA_array,
                            label: {
                            enabled: false
                            },
                            tooltip: {}

                            },{
                            name: 'Volume',
                            type: 'column',
                            color: 'red',
                            data: SMA_array_two,
                            label: {
                            enabled: false
                            },
                            yAxis: 1,
                            tooltip: {valueDecimals: 0}
                            }]
                            
                        }
                                                                              

                        //START OF PRICECHART
                                                          var exportUrl = 'https://export.highcharts.com/';
                                                           var optionsStr = JSON.stringify(pricechart);
                        
                                                          dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                          $.ajax({
                                                              type: 'POST',
                                                              data: dataString,
                                                              url: exportUrl,
                                                              success: function (data) {
                                                                  console.log('get the file from url: ', exportUrl+data);
                                                                  pic[1]=exportUrl+data;
                                                                  console.log("pic[price] has comes: "+pic[1]);

                                                              },
                                                              error: function (err) {
                                                                  debugger;
                                                                  console.log('error', err.statusText)
                                                              }
                                                          });
                        //END OF PRICECHART
                        




                                      var stock_ticker_symbol=data['Meta Data']['2. Symbol'];
                                      console.log(stock_ticker_symbol);
                                      var last_refresh=data['Meta Data']['3. Last Refreshed'].slice(0,10);
                                      
                                      var last_refresh_date= last_refresh;
                                      last_refresh_forshow = last_refresh+' 16:00:00 EDT';
                                      var last_price=data['Time Series (Daily)'][last_refresh]['4. close'];
                                    //   last_price = parseFloat(last_price.toFixed(2));
                                      last_price = last_price.substr(0,last_price.indexOf(".")+3)
                                    //   last_price = parseFloat(last_price.toFixed(2));
                                      var open = data['Time Series (Daily)'][last_refresh]['1. open'];
                                      open = open.substr(0,open.indexOf(".")+3)
                                    //   open = parseFloat(open.toFixed(2));
                                      var high = data['Time Series (Daily)'][last_refresh]['2. high'];
                                      high = high.substr(0,high.indexOf(".")+3)
                                    //   high = parseFloat(high.toFixed(2));
                                      var low = data['Time Series (Daily)'][last_refresh]['3. low'];
                                      low = low.substr(0,low.indexOf(".")+3)
                                    //   low = parseFloat(low.toFixed(2));
                                      var day_range = low + " - " + high;
                                      var volume = data['Time Series (Daily)'][last_refresh]['5. volume'];
                                   
                                      var date_list = data['Time Series (Daily)'];
                                      for(var i=0; i<10;i++){
                                          last_refresh_date = new Date(last_refresh_date);
                                          last_refresh_date.setDate(last_refresh_date.getDate() - 1);
                                          last_refresh_date = last_refresh_date.toISOString().slice(0,10);
                                          console.log(last_refresh_date);
                                      if(!date_list.hasOwnProperty(last_refresh_date)){
                                          continue;
                                      }else{
                                          var yesterday_date=last_refresh_date;
                                          break;
                                      }
                                      
                                    } 
                                    var last_price=data['Time Series (Daily)'][last_refresh]['4. close'];
                                    last_price = last_price.substr(0,last_price.indexOf(".")+3);
                                    var last_price_yesterday=data['Time Series (Daily)'][yesterday_date]['4. close'];
                                    last_price_yesterday = last_price_yesterday.substr(0,last_price_yesterday.indexOf(".")+3);
                                    var close = last_price-1.03;
                                    // close = close.substr(0,close.indexOf(".")+3);
                                    // console.log(last_price);
                                    // console.log(last_price_yesterday);
                                    var change = last_price-last_price_yesterday;
                  
                                    change = parseFloat(change.toFixed(2));
                                  
                                    var change_percent = change/last_price_yesterday*100;
                                    change_percent = parseFloat(change_percent.toFixed(2))+"%";
                                    change_percent=' ('+change_percent+')'
                                    if(change<0){
                                    var src = "<img src='http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png' alt='down' height='15' width='15'>"
                                    }else{
                                      src = "<img src='http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png' alt='up' height='15' width='15'>"
                                    }

                                     var tablepart="<table class='table table-striped' id='detail_table'><tr><th>Stock Ticker Symbol</th><td id='tda'>"+stock_ticker_symbol+"</td></tr><tr><th>Last Price</th><td id='tdb'>"+last_price+"</td></tr><tr><th>Change(Change Percent)</th><td id='tdc'>"+change+change_percent+src+"</td></tr><tr><th>Timestamp</th><td id='tdd'>"+last_refresh_forshow+"</td></tr><tr><th>Open</th><td id='tde'>"+open+"</td></tr><tr><th>Close</th><td id='tdf'>"+close+"</td></tr><tr><th>Day's Range</th><td id='tdg'>"+day_range+"</td></tr><tr><th>Volume</th><td id='tdh'>"+volume+"</td></tr></table>";

                                     $('#table_part').html(tablepart);

  
                              //START OF HIGHSTACK
                              var data2 = new Array();
                              var arr1 = new Array();
                              arr1 = Object.keys(data["Time Series (Daily)"]);
                              var length = arr1.length;
                                     
                              for(var i = 0; i<1000; i++){
                                  data2[i] = new Array();
                                  var d = new Date(arr1[i]);
                                  data2[i][0] = d.getTime()-0;
                                  data2[i][1] = data["Time Series (Daily)"][arr1[i]]["4. close"]-0;
                              }
                              console.log(data2);
  
                              Highcharts.stockChart("page2_below_hist", {
                                  rangeSelector: {
                                      buttons: [{
                                              type: 'week',
                                              count: 1,
                                              text: '1w'
                                          }, {
                                              type: 'month',
                                              count: 1,
                                              text: '1m'
                                          }, {
                                              type: 'month',
                                              count: 3,
                                              text: '3m'
                                          }, {
                                              type: 'month',
                                              count: 6,
                                              text: '6m'
                                          }, {
                                              type: 'ytd',
                                              text: 'YTD'
                                          },{
                                              type: 'year',
                                              count: 1,
                                              text: '1y'
                                          }, {
                                              type: 'all',
                                              text: 'All'
                                          }],
                                          selected: 0       
                                  },
                                  title: {
                                      text: stock_ticker_symbol+"  Stock Price "
                                  },
                                  subtitle: {
                                      text: '<a href="https:/www.alphavantage.co">Source: Alpha Vantage</a>',
                                      style:{
                                          color:"blue"
                                      }
                                  },
                                  series: [{
                                          name: stock_ticker_symbol,
                                          data: data2.reverse(),
                                          type: 'area',
                                          tooltip: {
                                              valueDecimals: 2
                                          }
                                      }]
                              });

                            //   return pricechart
                                

                  }
                  
              })
              .fail(function(){
                var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get Price data</div>';
                $('#price').html(error);
                $('#page2_below_hist').html(error);
                console.log("ERROR is happening!");
              })
              
             
              //NEWS
              $.ajax({
                              type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                              //dataType    : "json",
                              url 		: 'http://127.0.0.1:8081/news/'+ symbol, // the url where we want to GET
                              success     : function(data){
                                  
                                  
                                  // var data=JSON.parse(JSON.stringify(data));
  
  
                                  console.log("news section is :  ");
  
                                  data= JSON.parse(data);
  
                                  parser = new DOMParser();
                                  xmlDoc = parser.parseFromString(data,"text/xml");
                                  var array_title = new Array();
                                  var array_link = new Array();
                                  var array_author = new Array();
                                  var array_time = new Array();
                                  for(var i =0; i<5; i++){
                                      array_title[i]=xmlDoc.getElementsByTagName('rss')[0].getElementsByTagName('channel')[0].getElementsByTagName('item')[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
                                      array_link[i]=xmlDoc.getElementsByTagName('rss')[0].getElementsByTagName('channel')[0].getElementsByTagName('item')[i].getElementsByTagName('link')[0].childNodes[0].nodeValue;
                                      array_author[i]=xmlDoc.getElementsByTagName('rss')[0].getElementsByTagName('channel')[0].getElementsByTagName('item')[i].getElementsByTagName('sa:author_name')[0].childNodes[0].nodeValue;
                                      array_time[i]=xmlDoc.getElementsByTagName('rss')[0].getElementsByTagName('channel')[0].getElementsByTagName('item')[i].getElementsByTagName('pubDate')[0].childNodes[0].nodeValue;
                                  }
                                  var innerHTML0="<a  href="+array_link[0]+">"+array_title[0]+"</a> <br/><br/> <strong>Author:</strong> <strong>"+array_author[0]+"</strong><br/><strong>Data: "+array_time[0]+"</strong>";
                                  var innerHTML1="<a  href="+array_link[1]+">"+array_title[1]+"</a> <br/><br/> <strong>Author:</strong> <strong>"+array_author[1]+"</strong><br/><strong>Data: "+array_time[1]+"</strong>";
                                  var innerHTML2="<a  href="+array_link[2]+">"+array_title[2]+"</a> <br/><br/> <strong>Author:</strong> <strong>"+array_author[2]+"</strong><br/><strong>Data: "+array_time[2]+"</strong>";
                                  var innerHTML3="<a  href="+array_link[3]+">"+array_title[3]+"</a> <br/><br/> <strong>Author:</strong> <strong>"+array_author[3]+"</strong><br/><strong>Data: "+array_time[0]+"</strong>";
                                  var innerHTML4="<a  href="+array_link[4]+">"+array_title[4]+"</a> <br/><br/> <strong>Author:</strong> <strong>"+array_author[4]+"</strong><br/><strong>Data: "+array_time[0]+"</strong>";
                                  document.getElementById("new0").innerHTML=innerHTML0;
                                  document.getElementById("new1").innerHTML=innerHTML1;
                                  document.getElementById("new2").innerHTML=innerHTML2;
                                  document.getElementById("new3").innerHTML=innerHTML3;
                                  document.getElementById("new4").innerHTML=innerHTML4;
                                  console.log(array_title);
                                  console.log(array_link);
                                  console.log(array_author);
                                  console.log(array_time);
  
                                  
  
            
                              }
                          });
           
                 
              //SMA
              $.ajax({
                  type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                  //dataType    : "json",
                  url 		: 'http://127.0.0.1:8081/sma/'+ symbol, // the url where we want to GET
                  success     : function(data){
                      console.log(data);
                       //data1=JSON.parse(data);
                       var name = 'Technical Analysis: SMA';
                       var data1 = data[name];//data of date.lol
                       var last_refresh = data['Meta Data']['3: Last Refreshed'];
                       var date_array = [];
                       date_array.unshift(last_refresh);
  
                       for (var i=0; i<180; i++){
                           last_refresh = new Date(last_refresh);
                           last_refresh.setDate(last_refresh.getDate() - 1);
                           last_refresh = last_refresh.toISOString().slice(0,10);
                       if(!data1.hasOwnProperty(last_refresh)){
                           continue;
                           } else{
                           date_array.unshift(last_refresh);              
                           }
                       };
                       
                       var size = date_array.length;
                       var date_array_new = [];
                       for(var i=0; i<size; i++){
                           var arr = date_array[i].split('-');
                           date_array_new[i] = arr[1] + '/' + arr[2];
                       }
                       console.log(date_array_new); 
  
       
                       //generate_SMA()
                       
                       var SMA_array = [];
                       for(var i=0; i<size; i++){
                           SMA_array[i] = data['Technical Analysis: SMA'][date_array[i]]['SMA'];
                           SMA_array[i]=parseFloat(SMA_array[i]);
                       }        
                       console.log(SMA_array);
  
                       Highcharts.chart('sma', {
  
                               chart: {
                                   zoomType: 'x',
                                   type: 'line'
                                  //  width: 400,
                                  //  height:200
                               },
                               title: {
                                   text: 'Simple Moving Average(SMA)'
                               },
                               subtitle: {
                                   text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                   style: {
                                       color:'blue'
                                   }
                               },
                               xAxis: {
                                   categories: date_array_new,
                                   crosshair: true
                               },
                               yAxis: {
                           //        min: 'data_min',
                           //        max: 'data_max',
                                   title: {
                                       text: 'SMA'
                                   }
                               },
                               tooltip: {
                                   headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                   pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                       '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                   footerFormat: '</table>',
                                   shared: true,
                                   useHTML: true
                               },
                               plotOptions: {
                                   line: {
                                   marker: {
                                       enabled: true,
                                       symbol: 'diamond'
                                   }
  
                                   },
                                   series: {
                                   label: {
                                   connectorAllowed: false
                                   },
                                   color: 'red'
                                   }
                               },

                               series: [{
                                   name: 'SMA',
                                   data: SMA_array,
                                   label: {
                                   enabled: false
                                   }
                                   
  
                               }]
                       });
                       var smachart={
                        
                                                     chart: {
                                                         zoomType: 'x',
                                                         type: 'line'
                                                        //  width: 400,
                                                        //  height:200
                                                     },
                                                     title: {
                                                         text: 'Simple Moving Average(SMA)'
                                                     },
                                                     subtitle: {
                                                         text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                                         style: {
                                                             color:'blue'
                                                         }
                                                     },
                                                     xAxis: {
                                                         categories: date_array_new,
                                                         crosshair: true
                                                     },
                                                     yAxis: {
                                                 //        min: 'data_min',
                                                 //        max: 'data_max',
                                                         title: {
                                                             text: 'SMA'
                                                         }
                                                     },
                                                     tooltip: {
                                                         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                                         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                             '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                                         footerFormat: '</table>',
                                                         shared: true,
                                                         useHTML: true
                                                     },
                                                     plotOptions: {
                                                         line: {
                                                         marker: {
                                                             enabled: true,
                                                             symbol: 'diamond'
                                                         }
                        
                                                         },
                                                         series: {
                                                         label: {
                                                         connectorAllowed: false
                                                         },
                                                         color: 'red'
                                                         }
                                                     },
              
                                                     series: [{
                                                         name: 'SMA',
                                                         data: SMA_array,
                                                         label: {
                                                         enabled: false
                                                         }
                                                         
                        
                                                     }]
                                             };
                                                //START OF SMACHART
                                                
                                                                             var exportUrl = 'https://export.highcharts.com/';
                                                                             var optionsStr = JSON.stringify(smachart);
                                          
                                                                            dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                            $.ajax({
                                                                                type: 'POST',
                                                                                data: dataString,
                                                                                url: exportUrl,
                                                                                success: function (data) {
                                                                                    console.log('get the file from url: ', exportUrl+data);
                                                                                    pic[2]=exportUrl+data;
                                                                                    console.log("pic[sma] has comes: "+pic[2]);
                                                                
                                                                                },
                                                                                error: function (err) {
                                                                                    debugger;
                                                                                    console.log('error', err.statusText)
                                                                                }
                                                                            });
                                          //END OF PRICECHART
                  }
                  
              })
              .fail(function(){
                var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                $('#sma').html(error);
                console.log("ERROR is happening!");
              });
              //EMA
              $.ajax({
                  type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                  //dataType    : "json",
                  url 		: 'http://127.0.0.1:8081/ema/'+ symbol, // the url where we want to GET
                  success     : function(data){
                      console.log(data);
                      //data1=JSON.parse(data);
                      var name = 'Technical Analysis: EMA';
                      var data1 = data[name];//data of date.lol
                      var last_refresh = data['Meta Data']['3: Last Refreshed'];
                      var date_array = [];
                      date_array.unshift(last_refresh);
  
                      for (var i=0; i<180; i++){
                          last_refresh = new Date(last_refresh);
                          last_refresh.setDate(last_refresh.getDate() - 1);
                          last_refresh = last_refresh.toISOString().slice(0,10);
                      if(!data1.hasOwnProperty(last_refresh)){
                          continue;
                          } else{
                          date_array.unshift(last_refresh);              
                          }
                      };
                      
                      var size = date_array.length;
                      var date_array_new = [];
                      for(var i=0; i<size; i++){
                          var arr = date_array[i].split('-');
                          date_array_new[i] = arr[1] + '/' + arr[2];
                      }
                      console.log(date_array_new); 
  
      
                      //generate_SMA()
                      
                      var SMA_array = [];
                      for(var i=0; i<size; i++){
                          SMA_array[i] = data['Technical Analysis: EMA'][date_array[i]]['EMA'];
                          SMA_array[i]=parseFloat(SMA_array[i]);
                      }        
                      console.log(SMA_array);
      

                      Highcharts.chart('ema', {
                              chart: {
                                  zoomType: 'x',
                                  type: 'line'
                                  // width: 400,
                                  // height: 200
                              },
                              title: {
                                  text: 'Exponential Moving Average(EMA)'
                              },
                              subtitle: {
                                  text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                  style: {
                                      color:'blue'
                                  }
                              },
                              xAxis: {
                                  categories: date_array_new,
                                  crosshair: true
                              },
                              yAxis: {
                          //        min: 'data_min',
                          //        max: 'data_max',
                                  title: {
                                      text: 'EMA'
                                  }
                              },
                              tooltip: {
                                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                  footerFormat: '</table>',
                                  shared: true,
                                  useHTML: true
                              },
                              plotOptions: {
                                  line: {
                                  marker: {
                                      enabled: true,
                                      symbol: 'diamond'
                                  }
  
                                  },
                                  series: {
                                  label: {
                                  connectorAllowed: false
                                  },
                                  color: 'red'
                                  }
                              },

                              series: [{
                                  name: 'EMA',
                                  data: SMA_array,
                                  label: {
                                  enabled: false
                                  }
                                  
  
                              }]
                      });
                      var emachart={
                        chart: {
                            zoomType: 'x',
                            type: 'line'
                            // width: 400,
                            // height: 200
                        },
                        title: {
                            text: 'Exponential Moving Average(EMA)'
                        },
                        subtitle: {
                            text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                            style: {
                                color:'blue'
                            }
                        },
                        xAxis: {
                            categories: date_array_new,
                            crosshair: true
                        },
                        yAxis: {
                    //        min: 'data_min',
                    //        max: 'data_max',
                            title: {
                                text: 'EMA'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            line: {
                            marker: {
                                enabled: true,
                                symbol: 'diamond'
                            }

                            },
                            series: {
                            label: {
                            connectorAllowed: false
                            },
                            color: 'red'
                            }
                        },

                        series: [{
                            name: 'EMA',
                            data: SMA_array,
                            label: {
                            enabled: false
                            }
                            

                        }]
                };
                                                                        //START OF EMACHART
                                                
                                                                        var exportUrl = 'https://export.highcharts.com/';
                                                                        var optionsStr = JSON.stringify(emachart);
                                     
                                                                       dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                       $.ajax({
                                                                           type: 'POST',
                                                                           data: dataString,
                                                                           url: exportUrl,
                                                                           success: function (data) {
                                                                               console.log('get the file from url: ', exportUrl+data);
                                                                               pic[3]=exportUrl+data;
                                                                               console.log("pic[ema] has comes: "+pic[3]);
                                                                   
                                                                           },
                                                                           error: function (err) {
                                                                               debugger;
                                                                               console.log('error', err.statusText)
                                                                           }
                                                                       });
                                     //END OF PRICECHART
                  }
              })
              .fail(function(){
                var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                $('#ema').html(error);
                console.log("ERROR is happening!");
              });
              //STOCH
              $.ajax({
                  type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                  //dataType    : "json",
                  url 		: 'http://127.0.0.1:8081/stoch/'+ symbol, // the url where we want to GET
                  success     : function(data){
                      console.log(data);
                      //data1=JSON.parse(data);
                      console.log(data);
                      //data1=JSON.parse(data);
                      var name = 'Technical Analysis: STOCH';
                      var data1 = data[name];//data of date.lol
                      var last_refresh = data['Meta Data']['3: Last Refreshed'];
         
                      var date_array = [];
                     date_array.unshift(last_refresh);
                     for (var i=0; i<180; i++){
                     last_refresh = new Date(last_refresh);
                     last_refresh.setDate(last_refresh.getDate() - 1);
                     last_refresh = last_refresh.toISOString().slice(0,10);
                         if(!data1.hasOwnProperty(last_refresh)){
                             continue;
                             } else{
                             date_array.unshift(last_refresh);              
                             }
                         };
                         
                         var size = date_array.length;
                         var date_array_new = [];
                         for(var i=0; i<size; i++){
                             var arr = date_array[i].split('-');
                             date_array_new[i] = arr[1] + '/' + arr[2];
                         }
                         console.log(date_array_new); 
  
         
                         //generate_SMA()
                         
                         var SMA_array = [];
                         var SMA_array_two = [];
                         for(var i=0; i<size; i++){
                              SMA_array[i] = data['Technical Analysis: STOCH'][date_array[i]]['SlowK'];
                              SMA_array_two[i] = data['Technical Analysis: STOCH'][date_array[i]]['SlowD'];
                              SMA_array[i]=parseFloat(SMA_array[i]);
                              SMA_array_two[i]=parseFloat(SMA_array_two[i]);
                         }
                         console.log(SMA_array);
         
       
                         Highcharts.chart('stoch', {
                                 chart: {
                                  zoomType: 'x',
                                     type: 'line'
                                     // width: 898,
                                     // height: 398
                                 },
                                 title: {
                                     text: 'Stochastic (STOCH)'
                                 },
                                 subtitle: {
                                     text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                     style: {
                                         color:'blue'
                                     }
                                 },
                                 xAxis: {
                                     categories: date_array_new,
                                     crosshair: true
                                 },
                                 yAxis: {
                             //        min: 'data_min',
                             //        max: 'data_max',
                                     title: {
                                         text: 'SMA'
                                     }
                                 },
                                 tooltip: {
                                     headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                     pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                         '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                                     footerFormat: '</table>',
                                     shared: true,
                                     useHTML: true
                                 },
                                 plotOptions: {
                                     line: {
                                     marker: {
                                         enabled: true,
                                         symbol: 'diamond'
                                     }
  
                                     },
                                     series: [{
                                         label: {
                                         connectorAllowed: false
                                         },
                                         color: 'red'
                                        },{
                                         label: {
                                         connectorAllowed: false
                                         },
                                         color: 'blue'
                                        }]
                                 },

                                 series: [{
                                     name: 'SlowK',
                                     data: SMA_array
                                 },{
                                     name: 'SlowD',
                                     data: SMA_array_two
                                 }]
                         });
                         var stochchart ={
                            chart: {
                             zoomType: 'x',
                                type: 'line'
                                // width: 898,
                                // height: 398
                            },
                            title: {
                                text: 'Stochastic (STOCH)'
                            },
                            subtitle: {
                                text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                style: {
                                    color:'blue'
                                }
                            },
                            xAxis: {
                                categories: date_array_new,
                                crosshair: true
                            },
                            yAxis: {
                        //        min: 'data_min',
                        //        max: 'data_max',
                                title: {
                                    text: 'SMA'
                                }
                            },
                            tooltip: {
                                headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                    '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            plotOptions: {
                                line: {
                                marker: {
                                    enabled: true,
                                    symbol: 'diamond'
                                }

                                },
                                series: [{
                                    label: {
                                    connectorAllowed: false
                                    },
                                    color: 'red'
                                   },{
                                    label: {
                                    connectorAllowed: false
                                    },
                                    color: 'blue'
                                   }]
                            },

                            series: [{
                                name: 'SlowK',
                                data: SMA_array
                            },{
                                name: 'SlowD',
                                data: SMA_array_two
                            }]
                    };
                                                                            //START OF STOCHCHART
                                                
                                                                            var exportUrl = 'https://export.highcharts.com/';
                                                                            var optionsStr = JSON.stringify(stochchart);
                                         
                                                                           dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                           $.ajax({
                                                                               type: 'POST',
                                                                               data: dataString,
                                                                               url: exportUrl,
                                                                               success: function (data) {
                                                                                   console.log('get the file from url: ', exportUrl+data);
                                                                                   pic[4]=exportUrl+data;
                                                                                   console.log("pic[stoch] has comes: "+pic[4]);
                                                              
                                                                               },
                                                                               error: function (err) {
                                                                                   debugger;
                                                                                   console.log('error', err.statusText)
                                                                               }
                                                                           });
                                         //END OF PRICECHART
                  }
              })
              .fail(function(){
                var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                $('#stoch').html(error);
                console.log("ERROR is happening!");
              });
              //RSI
              $.ajax({
                  type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                  //dataType    : "json",
                  url 		: 'http://127.0.0.1:8081/rsi/'+ symbol, // the url where we want to GET
                  success     : function(data){
                      console.log(data);
                      //data1=JSON.parse(data);
                      var name = 'Technical Analysis: RSI';
                      var data1 = data[name];//data of date.lol
                      var last_refresh = data['Meta Data']['3: Last Refreshed'];
                      var date_array = [];
                      date_array.unshift(last_refresh);
  
                      for (var i=0; i<180; i++){
                          last_refresh = new Date(last_refresh);
                          last_refresh.setDate(last_refresh.getDate() - 1);
                          last_refresh = last_refresh.toISOString().slice(0,10);
                      if(!data1.hasOwnProperty(last_refresh)){
                          continue;
                          } else{
                          date_array.unshift(last_refresh);              
                          }
                      };
                      
                      var size = date_array.length;
                      var date_array_new = [];
                      for(var i=0; i<size; i++){
                          var arr = date_array[i].split('-');
                          date_array_new[i] = arr[1] + '/' + arr[2];
                      }
                      console.log(date_array_new); 
  
      
                      //generate_SMA()
                      
                      var SMA_array = [];
                      for(var i=0; i<size; i++){
                          SMA_array[i] = data['Technical Analysis: RSI'][date_array[i]]['RSI'];
                          SMA_array[i]=parseFloat(SMA_array[i]);
                      }        
                      console.log(SMA_array);
  
                      Highcharts.chart('rsi', {
                              chart: {
                                zoomType: 'x',
                                  type: 'line'
    
                              },
                              title: {
                                  text: 'Relative Strength Index(RSI)'
                              },
                              subtitle: {
                                  text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                  style: {
                                      color:'blue'
                                  }
                              },
                              xAxis: {
                                  categories: date_array_new,
                                  crosshair: true
                              },
                              yAxis: {
                          //        min: 'data_min',
                          //        max: 'data_max',
                                  title: {
                                      text: 'RSI'
                                  }
                              },
                              tooltip: {
                                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                  footerFormat: '</table>',
                                  shared: true,
                                  useHTML: true
                              },
                              plotOptions: {
                                  line: {
                                  marker: {
                                      enabled: true,
                                      symbol: 'diamond'
                                  }
  
                                  },
                                  series: {
                                  label: {
                                  connectorAllowed: false
                                  },
                                  color: 'red'
                                  }
                              },
  
                              series: [{
                                  name: 'RSI',
                                  data: SMA_array,
                                  label: {
                                  enabled: false
                                  }
                              }]
                      });
                      var rsichart={
                        chart: {
                          zoomType: 'x',
                            type: 'line'

                        },
                        title: {
                            text: 'Relative Strength Index(RSI)'
                        },
                        subtitle: {
                            text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                            style: {
                                color:'blue'
                            }
                        },
                        xAxis: {
                            categories: date_array_new,
                            crosshair: true
                        },
                        yAxis: {
                    //        min: 'data_min',
                    //        max: 'data_max',
                            title: {
                                text: 'RSI'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            line: {
                            marker: {
                                enabled: true,
                                symbol: 'diamond'
                            }

                            },
                            series: {
                            label: {
                            connectorAllowed: false
                            },
                            color: 'red'
                            }
                        },

                        series: [{
                            name: 'RSI',
                            data: SMA_array,
                            label: {
                            enabled: false
                            }
                        }]
                };
                                                                        //START OF RSICHART
                                                
                                                                        var exportUrl = 'https://export.highcharts.com/';
                                                                        var optionsStr = JSON.stringify(rsichart);
                                     
                                                                       dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                       $.ajax({
                                                                           type: 'POST',
                                                                           data: dataString,
                                                                           url: exportUrl,
                                                                           success: function (data) {
                                                                               console.log('get the file from url: ', exportUrl+data);
                                                                               pic[5]=exportUrl+data;
                                                                               console.log("pic[rsi] has comes: "+pic[5]);
                                                                     
                                                                           },
                                                                           error: function (err) {
                                                                               debugger;
                                                                               console.log('error', err.statusText)
                                                                           }
                                                                       });
                                     //END OF PRICECHART
                  }
              })
              .fail(function(){
                var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                $('#rsi').html(error);
                console.log("ERROR is happening!");
              });
              //ADX
              $.ajax({
                  type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                  //dataType    : "json",
                  url 		: 'http://127.0.0.1:8081/adx/'+ symbol, // the url where we want to GET
                  success     : function(data){
                      console.log(data);
                      //data1=JSON.parse(data);
                      var name = 'Technical Analysis: ADX';
                      var data1 = data[name];//data of date.lol
                      var last_refresh = data['Meta Data']['3: Last Refreshed'];
                      var date_array = [];
                      date_array.unshift(last_refresh);
  
                      for (var i=0; i<180; i++){
                          last_refresh = new Date(last_refresh);
                          last_refresh.setDate(last_refresh.getDate() - 1);
                          last_refresh = last_refresh.toISOString().slice(0,10);
                      if(!data1.hasOwnProperty(last_refresh)){
                          continue;
                          } else{
                          date_array.unshift(last_refresh);              
                          }
                      };
                      
                      var size = date_array.length;
                      var date_array_new = [];
                      for(var i=0; i<size; i++){
                          var arr = date_array[i].split('-');
                          date_array_new[i] = arr[1] + '/' + arr[2];
                      }
                      console.log(date_array_new); 
  
      
                      //generate_SMA()
                      
                      var SMA_array = [];
                      for(var i=0; i<size; i++){
                          SMA_array[i] = data['Technical Analysis: ADX'][date_array[i]]['ADX'];
                          SMA_array[i]=parseFloat(SMA_array[i]);
                      }        
                      console.log(SMA_array);

                      Highcharts.chart('adx', {
                              chart: {
                                zoomType: 'x',
                                  type: 'line'
                                  // width: 898,
                                  // height: 398
                              },
                              title: {
                                  text: 'Average Directional Movement Index (ADX)'
                              },
                              subtitle: {
                                  text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                  style: {
                                      color:'blue'
                                  }
                              },
                              xAxis: {
                                  categories: date_array_new,
                                  crosshair: true
                              },
                              yAxis: {
                          //        min: 'data_min',
                          //        max: 'data_max',
                                  title: {
                                      text: 'ADX'
                                  }
                              },
                              tooltip: {
                                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                  footerFormat: '</table>',
                                  shared: true,
                                  useHTML: true
                              },
                              plotOptions: {
                                  line: {
                                  marker: {
                                      enabled: true,
                                      symbol: 'diamond'
                                  }
  
                                  },
                                  series: {
                                  label: {
                                  connectorAllowed: false
                                  },
                                  color: 'red'
                                  }
                              },

                              series: [{
                                  name: 'ADX',
                                  data: SMA_array,
                                  label: {
                                  enabled: false
                                  }
                                  
  
                              }]
                      });
                      var adxchart= {
                        chart: {
                          zoomType: 'x',
                            type: 'line'
                            // width: 898,
                            // height: 398
                        },
                        title: {
                            text: 'Average Directional Movement Index (ADX)'
                        },
                        subtitle: {
                            text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                            style: {
                                color:'blue'
                            }
                        },
                        xAxis: {
                            categories: date_array_new,
                            crosshair: true
                        },
                        yAxis: {
                    //        min: 'data_min',
                    //        max: 'data_max',
                            title: {
                                text: 'ADX'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            line: {
                            marker: {
                                enabled: true,
                                symbol: 'diamond'
                            }

                            },
                            series: {
                            label: {
                            connectorAllowed: false
                            },
                            color: 'red'
                            }
                        },

                        series: [{
                            name: 'ADX',
                            data: SMA_array,
                            label: {
                            enabled: false
                            }
                            

                        }]
                };
                                                                        //START OF ADXCHART
                                                
                                                                        var exportUrl = 'https://export.highcharts.com/';
                                                                        var optionsStr = JSON.stringify(adxchart);
                                     
                                                                       dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                       $.ajax({
                                                                           type: 'POST',
                                                                           data: dataString,
                                                                           url: exportUrl,
                                                                           success: function (data) {
                                                                               console.log('get the file from url: ', exportUrl+data);
                                                                               pic[6]=exportUrl+data;
                                                                               console.log("pic[adx] has comes: "+pic[6]);
                                                                      
                                                                           },
                                                                           error: function (err) {
                                                                               debugger;
                                                                               console.log('error', err.statusText)
                                                                           }
                                                                       });
                                     //END OF PRICECHART
                  }
              })
              .fail(function(){
                var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                $('#adx').html(error);
                console.log("ERROR is happening!");
              });
              //CCI
              $.ajax({
                  type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                  //dataType    : "json",
                  url 		: 'http://127.0.0.1:8081/cci/'+ symbol, // the url where we want to GET
                  success     : function(data){
                      console.log(data);
                      //data1=JSON.parse(data);
                      var name = 'Technical Analysis: CCI';
                      var data1 = data[name];//data of date.lol
                      var last_refresh = data['Meta Data']['3: Last Refreshed'];
                      var date_array = [];
                      date_array.unshift(last_refresh);
  
                      for (var i=0; i<180; i++){
                          last_refresh = new Date(last_refresh);
                          last_refresh.setDate(last_refresh.getDate() - 1);
                          last_refresh = last_refresh.toISOString().slice(0,10);
                      if(!data1.hasOwnProperty(last_refresh)){
                          continue;
                          } else{
                          date_array.unshift(last_refresh);              
                          }
                      };
                      
                      var size = date_array.length;
                      var date_array_new = [];
                      for(var i=0; i<size; i++){
                          var arr = date_array[i].split('-');
                          date_array_new[i] = arr[1] + '/' + arr[2];
                      }
                      console.log(date_array_new); 
  
      
                      //generate_SMA()
                      
                      var SMA_array = [];
                      for(var i=0; i<size; i++){
                          SMA_array[i] = data['Technical Analysis: CCI'][date_array[i]]['CCI'];
                          SMA_array[i]=parseFloat(SMA_array[i]);
                      }        
                      console.log(SMA_array);
  
                      Highcharts.chart('cci', {
                              chart: {
                                zoomType: 'x',
                                  type: 'line'
                                  // width: 898,
                                  // height: 398
                              },
                              title: {
                                  text: 'Commodity Channel Index (CCI)'
                              },
                              subtitle: {
                                  text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                                  style: {
                                      color:'blue'
                                  }
                              },
                              xAxis: {
                                  categories: date_array_new,
                                  crosshair: true
                              },
                              yAxis: {
                          //        min: 'data_min',
                          //        max: 'data_max',
                                  title: {
                                      text: 'CCI'
                                  }
                              },
                              tooltip: {
                                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                  footerFormat: '</table>',
                                  shared: true,
                                  useHTML: true
                              },
                              plotOptions: {
                                  line: {
                                  marker: {
                                      enabled: true,
                                      symbol: 'diamond'
                                  }
  
                                  },
                                  series: {
                                  label: {
                                  connectorAllowed: false
                                  },
                                  color: 'red'
                                  }
                              },

                              series: [{
                                  name: 'CCI',
                                  data: SMA_array,
                                  label: {
                                  enabled: false
                                  }
                                  
  
                              }]
                      });
                      var ccichart= {
                        chart: {
                          zoomType: 'x',
                            type: 'line'
                            // width: 898,
                            // height: 398
                        },
                        title: {
                            text: 'Commodity Channel Index (CCI)'
                        },
                        subtitle: {
                            text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                            style: {
                                color:'blue'
                            }
                        },
                        xAxis: {
                            categories: date_array_new,
                            crosshair: true
                        },
                        yAxis: {
                    //        min: 'data_min',
                    //        max: 'data_max',
                            title: {
                                text: 'CCI'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            line: {
                            marker: {
                                enabled: true,
                                symbol: 'diamond'
                            }

                            },
                            series: {
                            label: {
                            connectorAllowed: false
                            },
                            color: 'red'
                            }
                        },

                        series: [{
                            name: 'CCI',
                            data: SMA_array,
                            label: {
                            enabled: false
                            }
                            

                        }]
                };
                                                                        //START OF CCICHART
                                                
                                                                        var exportUrl = 'https://export.highcharts.com/';
                                                                        var optionsStr = JSON.stringify(ccichart);
                                     
                                                                       dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                       $.ajax({
                                                                           type: 'POST',
                                                                           data: dataString,
                                                                           url: exportUrl,
                                                                           success: function (data) {
                                                                               console.log('get the file from url: ', exportUrl+data);
                                                                               pic[7]=exportUrl+data;
                                                                               console.log("pic[cci] has comes: "+pic[7]);
                                                                          
                                                                           },
                                                                           error: function (err) {
                                                                               debugger;
                                                                               console.log('error', err.statusText)
                                                                           }
                                                                       });
                                     //END OF PRICECHART
                  }
              })
              .fail(function(){
                var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                $('#cci').html(error);
                console.log("ERROR is happening!");
              });
              //BBANDS
              $.ajax({
                  type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                  //dataType    : "json",
                  url 		: 'http://127.0.0.1:8081/bbands/'+ symbol, // the url where we want to GET
                  success     : function(data){
                      console.log(data);
                      //data1=JSON.parse(data);
                      var name = 'Technical Analysis: BBANDS';
                      var data1 = data[name];//data of date.lol
                      var last_refresh = data['Meta Data']['3: Last Refreshed'];
                      var date_array = [];
                      date_array.unshift(last_refresh);
  
                      for (var i=0; i<180; i++){
                          last_refresh = new Date(last_refresh);
                          last_refresh.setDate(last_refresh.getDate() - 1);
                          last_refresh = last_refresh.toISOString().slice(0,10);
                      if(!data1.hasOwnProperty(last_refresh)){
                          continue;
                          } else{
                          date_array.unshift(last_refresh);              
                          }
                      };
                      
                      var size = date_array.length;
                      var date_array_new = [];
                      for(var i=0; i<size; i++){
                          var arr = date_array[i].split('-');
                          date_array_new[i] = arr[1] + '/' + arr[2];
                      }
                      console.log(date_array_new);
                      
                      var SMA_array = [];
                      var SMA_array1 = [];
                      var SMA_array2 = [];
                      for(var i=0; i<size; i++){
                           SMA_array[i] = data['Technical Analysis: BBANDS'][date_array[i]]['Real Upper Band'];
                           SMA_array1[i] = data['Technical Analysis: BBANDS'][date_array[i]]['Real Lower Band'];
                           SMA_array2[i] = data['Technical Analysis: BBANDS'][date_array[i]]['Real Middle Band'];
                           SMA_array[i]=parseFloat(SMA_array[i]);
                           SMA_array1[i]=parseFloat(SMA_array1[i]);
                           SMA_array2[i]=parseFloat(SMA_array2[i]);
                      } 
  
                      Highcharts.chart('bbands', {
                          chart: {
                            zoomType: 'x',
                            type: 'line',
                          //   width: 898,
                          //   height: 398
                        },
                        title: {
                            text: 'Bollinger Bands (BBANDS)'
                        },
                        subtitle: {
                            text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                            style: {
                                color:'blue'
                            }
                        },
                        xAxis: {
                            categories: date_array_new,
                            crosshair: true
                        },
                        yAxis: {
                    
                            title: {
                                text: 'BBANDS'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                            pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                              line: {
                              marker: {
                              enabled: true,
                              symbol: 'diamond'
                              }
                            },
                              series: [{
                               label: {
                               connectorAllowed: false
                               },
                               color: 'red'
                              },{
                               label: {
                               connectorAllowed: false
                               },
                               color: 'blue'
                              },{
                               label: {
                               connectorAllowed: false
                               },
                               color: 'black'
                              }]
                    
                        },

                        series: [{
                            name: 'Real Upper Band',
                            data: SMA_array
                        },{
                            name: 'Real Lower Band',
                            data: SMA_array1
                        },{
                            name: 'Real Middle Band',
                            data: SMA_array2
                        }]
                    });
                    var bbandschart={
                        chart: {
                          zoomType: 'x',
                          type: 'line',
                        //   width: 898,
                        //   height: 398
                      },
                      title: {
                          text: 'Bollinger Bands (BBANDS)'
                      },
                      subtitle: {
                          text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                          style: {
                              color:'blue'
                          }
                      },
                      xAxis: {
                          categories: date_array_new,
                          crosshair: true
                      },
                      yAxis: {
                  
                          title: {
                              text: 'BBANDS'
                          }
                      },
                      tooltip: {
                          headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                          pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                              '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                          footerFormat: '</table>',
                          shared: true,
                          useHTML: true
                      },
                      plotOptions: {
                            line: {
                            marker: {
                            enabled: true,
                            symbol: 'diamond'
                            }
                          },
                            series: [{
                             label: {
                             connectorAllowed: false
                             },
                             color: 'red'
                            },{
                             label: {
                             connectorAllowed: false
                             },
                             color: 'blue'
                            },{
                             label: {
                             connectorAllowed: false
                             },
                             color: 'black'
                            }]
                  
                      },

                      series: [{
                          name: 'Real Upper Band',
                          data: SMA_array
                      },{
                          name: 'Real Lower Band',
                          data: SMA_array1
                      },{
                          name: 'Real Middle Band',
                          data: SMA_array2
                      }]
                  };
                                                                          //START OF BBANDSCHART
                                                
                                                                          var exportUrl = 'https://export.highcharts.com/';
                                                                          var optionsStr = JSON.stringify(bbandschart);
                                       
                                                                         dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                         $.ajax({
                                                                             type: 'POST',
                                                                             data: dataString,
                                                                             url: exportUrl,
                                                                             success: function (data) {
                                                                                 console.log('get the file from url: ', exportUrl+data);
                                                                                 pic[8]=exportUrl+data;
                                                                                 console.log("pic[bbands] has comes: "+pic[8]);
                                                                          
                                                                             },
                                                                             error: function (err) {
                                                                                 debugger;
                                                                                 console.log('error', err.statusText)
                                                                             }
                                                                         });
                                       //END OF PRICECHART
  
                  }
              })
              .fail(function(){
                var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                $('#bbands').html(error);
                console.log("ERROR is happening!");
              });
              //MACD
              $.ajax({
                  type 		: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                  //dataType    : "json",
                  url 		: 'http://127.0.0.1:8081/macd/'+ symbol, // the url where we want to GET
                  success     : function(data){
                      console.log(data);
                      //data1=JSON.parse(data);
                      console.log(data);
                      //data1=JSON.parse(data);
                      var name = 'Technical Analysis: MACD';
                      var data1 = data[name];//data of date.lol
                      var last_refresh = data['Meta Data']['3: Last Refreshed'];
                      var date_array = [];
                      date_array.unshift(last_refresh);
  
                      for (var i=0; i<180; i++){
                          last_refresh = new Date(last_refresh);
                          last_refresh.setDate(last_refresh.getDate() - 1);
                          last_refresh = last_refresh.toISOString().slice(0,10);
                      if(!data1.hasOwnProperty(last_refresh)){
                          continue;
                          } else{
                          date_array.unshift(last_refresh);              
                          }
                      };
                      
                      var size = date_array.length;
                      var date_array_new = [];
                      for(var i=0; i<size; i++){
                          var arr = date_array[i].split('-');
                          date_array_new[i] = arr[1] + '/' + arr[2];
                      }
                      console.log(date_array_new);
                      
                      var SMA_array = [];
                      var SMA_array1 = [];
                      var SMA_array2 = [];
                      for(var i=0; i<size; i++){
                           SMA_array[i] = data['Technical Analysis: MACD'][date_array[i]]['MACD_Signal'];
                           SMA_array1[i] = data['Technical Analysis: MACD'][date_array[i]]['MACD_Hist'];
                           SMA_array2[i] = data['Technical Analysis: MACD'][date_array[i]]['MACD'];
                           SMA_array[i]=parseFloat(SMA_array[i]);
                           SMA_array1[i]=parseFloat(SMA_array1[i]);
                           SMA_array2[i]=parseFloat(SMA_array2[i]);
                      } 
  
                      Highcharts.chart('macd', {
                          chart: {
                            zoomType: 'x',
                            type: 'line'
                          //   width: 898,
                          //   height: 398
                        },
                        title: {
                            text: 'Moving Average Convergence/Divergence (MACD)'
                        },
                        subtitle: {
                            text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                            style: {
                                color:'blue'
                            }
                        },
                        xAxis: {
                            categories: date_array_new,
                            crosshair: true
                        },
                        yAxis: {
                    
                            title: {
                                text: 'MACD'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                            pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                              line: {
                              marker: {
                              enabled: true,
                              symbol: 'diamond'
                              }
                            },
                              series: [{
                               label: {
                               connectorAllowed: false
                               },
                               color: 'red'
                              },{
                               label: {
                               connectorAllowed: false
                               },
                               color: 'blue'
                              },{
                               label: {
                               connectorAllowed: false
                               },
                               color: 'black'
                              }]
                    
                        },

                        series: [{
                            name: 'Real Upper Band',
                            data: SMA_array
                        },{
                            name: 'Real Lower Band',
                            data: SMA_array1
                        },{
                            name: 'Real Middle Band',
                            data: SMA_array2
                        }]
                    });
                    var macdchart={
                        chart: {
                          zoomType: 'x',
                          type: 'line'
                        //   width: 898,
                        //   height: 398
                      },
                      title: {
                          text: 'Moving Average Convergence/Divergence (MACD)'
                      },
                      subtitle: {
                          text: '<a href="https://www.alphavantage.co">Source: Alpha Vantage</a>',
                          style: {
                              color:'blue'
                          }
                      },
                      xAxis: {
                          categories: date_array_new,
                          crosshair: true
                      },
                      yAxis: {
                  
                          title: {
                              text: 'MACD'
                          }
                      },
                      tooltip: {
                          headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                          pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                              '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                          footerFormat: '</table>',
                          shared: true,
                          useHTML: true
                      },
                      plotOptions: {
                            line: {
                            marker: {
                            enabled: true,
                            symbol: 'diamond'
                            }
                          },
                            series: [{
                             label: {
                             connectorAllowed: false
                             },
                             color: 'red'
                            },{
                             label: {
                             connectorAllowed: false
                             },
                             color: 'blue'
                            },{
                             label: {
                             connectorAllowed: false
                             },
                             color: 'black'
                            }]
                  
                      },

                      series: [{
                          name: 'Real Upper Band',
                          data: SMA_array
                      },{
                          name: 'Real Lower Band',
                          data: SMA_array1
                      },{
                          name: 'Real Middle Band',
                          data: SMA_array2
                      }]
                  };
                                                                          //START OF MACDCHART
                                                
                                                                          var exportUrl = 'https://export.highcharts.com/';
                                                                          var optionsStr = JSON.stringify(macdchart);
                                       
                                                                         dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
                                                                         $.ajax({
                                                                             type: 'POST',
                                                                             data: dataString,
                                                                             url: exportUrl,
                                                                             success: function (data) {
                                                                                 console.log('get the file from url: ', exportUrl+data);
                                                                                 pic[9]=exportUrl+data;
                                                                                 console.log("pic[macd] has comes: "+pic[9]);
                                                                           
                                                                             },
                                                                             error: function (err) {
                                                                                 debugger;
                                                                                 console.log('error', err.statusText)
                                                                             }
                                                                         });
                                       //END OF PRICECHART
                  }
              })
              .fail(function(){
                var error = '<div class="alert alert-danger" style="margin-top: 25%">Error! Failed to get SMA data</div>';
                $('#macd').html(error);
                console.log("ERROR is happening!");
              });
            showProgress();
            
}

function showProgress() {
    
    
        var progress = '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div></div>';
        
          $('#table_part').html(progress);
    
        var emt = ["price", "sma", "ema", "stoch", "rsi", "adx", "cci", "bbands", "macd"];
        for(var i in emt) {
            $('#' + emt[i]).html(progress);
        }
        $('#page2_below_hist').html(progress);
       
}

function add(symbol){
    // var tf = localStorage.getItem(symbol);
    // console.log("localStorage.tf is: "+ localStorage.getItem(symbol));
    if(localStorage.getItem(symbol)){
        return
    }else{
    $("#bt_fav img").attr('src', "/img/star_filled.png");
                    var price =document.getElementById("tdb").innerHTML;
                    var change =document.getElementById("tdc").innerHTML;
                    var volume =document.getElementById("tdh").innerHTML;
                    
    
                    if (typeof(Storage) !== "undefined") {
                         // Store
                        sessionStorage.setItem("symbol", symbol);
                        sessionStorage.setItem("price", price);
                        sessionStorage.setItem("change", change);
                        sessionStorage.setItem("volume", volume);
                        var tr = "<tr><td><a href='#' onclick='reload(" + '"' +sessionStorage.symbol+ '"' + ")'>"+sessionStorage.symbol+"</a></td><td>"+sessionStorage.price+"</td><td>"+sessionStorage.change+"</td><td>"+sessionStorage.volume+"</td><td><button type='button' class='btn btn-default' onclick='remove(" + '"' +sessionStorage.symbol+ '"' + ")'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button></td></tr>";
                        localStorage.setItem(symbol,tr);
                        console.log("localStorage.tr is: "+ localStorage.getItem(symbol));
                        generate_favtable();

                     } else {
                         document.getElementById("lastname").innerHTML = "Sorry, your browser does not support Web Storage...";
                     }
                        
                        var html = document.getElementById("fav_table").innerHTML;
                        html=html.split('</tbody>')[0];
                        // console.log(html);
                        
                        html+="<tr><td><a href='#' onclick='reload(" + '"' +sessionStorage.symbol+ '"' + ")'>"+sessionStorage.symbol+"</a></td><td>"+sessionStorage.price+"</td><td>"+sessionStorage.change+"</td><td>"+sessionStorage.volume+"</td><td><button type='button' class='btn btn-default' onclick='remove(" + '"' +sessionStorage.symbol+ '"' + ")'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button></td></tr></tbody>";
                        
                        
                        document.getElementById("fav_table").innerHTML =html;
            }
}

function remove(symbol) {
    $("#bt_fav img").attr('src', "/img/star_empty.png");
        localStorage.removeItem(symbol);
        var table = document.getElementById('fav_table');
        var rows = table.rows;

        for(var i=1; i<rows.length;i++) {
 
            if(rows[i].children[0].innerText === symbol) {
                table.deleteRow(1);
                break;
            }
        }
    
}

function generate_favtable(){
    var total="";
    for(var key in localStorage){
        total+=localStorage.getItem(key);
    }
    var html="<tr><th>Symbol</th><th>Stock Price</th><th>Change (Change Percent)</th><th>Volume</th><th>Cancel</th></tr>";
    total=html+total;
    console.log("total is: "+total);
    return total
}
    
function sort1(){
    //  var useless=method;
    var html = "Symbol";
    html+="<b class='caret'></b>";
    document.getElementById("showitem").innerHTML=html;

    var rows, first, second, change, going, zeng;
    var mytable = document.getElementById('fav_table');
    
    going= true;
    if(document.getElementById("showitem1").innerHTML==='Ascending<b class="caret"></b>'){
        zeng  = true;
    }else{
        zeng = false;
    }
    //  asc = ($('#showitem1').val() === 'Ascending');
    console.log("ascending is " + zeng);
    console.log("rows.length is:  ");
    
    while(going){
        going = false;
        rows = mytable.getElementsByTagName('tr');
    for(var i=1; i <rows.length - 1; i++){
        change = false;

                first = $('td', rows[i])[0].firstChild.innerHTML;
                second = $('td', rows[i + 1])[0].firstChild.innerHTML;

    if(zeng){ 
        if(first>second){
            change = true;
            break;
            // rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
        }
    }else{
                if(first<second){
                    change = true;
                    break;
                    // rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
                }
            }
        }
        if(change){
            rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            going = true;
        }
    }
}

function sort2(){
    var html = "Price";
    html+="<b class='caret'></b>";
    document.getElementById("showitem").innerHTML=html;

    var rows, first, second, change, going, zeng;
        var mytable = document.getElementById('fav_table');

    going= true;
    if(document.getElementById("showitem1").innerHTML==='Ascending<b class="caret"></b>'){
        zeng  = true;
    }else{
        zeng = false;
    }
 //  asc = ($('#showitem1').val() === 'Ascending');
        console.log("ascending is " + zeng);
        console.log("rows.length is:  ");
        
    while(going){
        going = false;
        rows = mytable.getElementsByTagName('tr');
    for(var i=1; i <rows.length - 1; i++){
        change = false;

                first = parseFloat($('td', rows[i])[1].innerHTML);
                second = parseFloat($('td', rows[i + 1])[1].innerHTML);

        if(zeng){ 
            if(first>second){
            change = true;
            break;
        }
    }else{
                if(first<second){
                    change = true;
                    break;
                }
            }
        }
        if(change){
            rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            going = true;
        }
        }
}

function sort3(){

    var html = "Change";
    html+="<b class='caret'></b>";
    document.getElementById("showitem").innerHTML=html;

    var rows, first, second, change, going, zeng;
        var mytable = document.getElementById('fav_table');
    
        going= true;
        if(document.getElementById("showitem1").innerHTML==='Ascending<b class="caret"></b>'){
            zeng  = true;
        }else{
            zeng = false;
        }
    //  asc = ($('#showitem1').val() === 'Ascending');
        console.log("ascending is " + zeng);
        console.log("rows.length is:  ");
        
    while(going){
        going = false;
        rows = mytable.getElementsByTagName('tr');
    for(var i=1; i <rows.length - 1; i++){
        change = false;

                first = parseFloat($('td', rows[i])[2].innerHTML.split('(')[0]);
                second = parseFloat($('td', rows[i + 1])[2].innerHTML.split('(')[0]);
        if(zeng){ 
            if(first>second){
            change = true;
            break;
        }
    }else{
                if(first<second){
                    change = true;
                    break;
                }
            }
        }
        if(change){
            rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            going = true;
        }
    }
}

function sort4(){
    
        var html = "Change Percent";
        html+="<b class='caret'></b>";
        document.getElementById("showitem").innerHTML=html;
        
        var rows, first, second, change, going, zeng;
            var mytable = document.getElementById('fav_table');
        
            going= true;
            if(document.getElementById("showitem1").innerHTML==='Ascending<b class="caret"></b>'){
                zeng  = true;
            }else{
                zeng = false;
            }

            // console.log("ascending is " + asc);
            // console.log("rows.length is:  ");
            
        while(going){
            going = false;
            rows = mytable.getElementsByTagName('tr');
        for(var i=1; i <rows.length - 1; i++){
            change = false;

                    first = parseFloat($('td', rows[i])[2].innerHTML.split('%')[0].split('(')[1]);
                    second = parseFloat($('td', rows[i + 1])[2].innerHTML.split('%')[0].split('(')[1]);

        
            if(zeng){ 
                if(first>second){
                change = true;
                break;

            }
        }else{
                    if(first<second){
                        change = true;
                        break;

                    }
                }
            }
            if(change){
                rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
                going = true;
            }
    }
}

function sort5(){
        
            var html = "Volume";
            html+="<b class='caret'></b>";
            document.getElementById("showitem").innerHTML=html;
            
            var rows, first, second, change, going, zeng;
                var mytable = document.getElementById('fav_table');
            
                going= true;
                if(document.getElementById("showitem1").innerHTML==='Ascending<b class="caret"></b>'){
                    zeng  = true;
                }else{
                    zeng = false;
                }
            //  asc = ($('#showitem1').val() === 'Ascending');
                console.log("ascending is " + zeng);
                console.log("rows.length is:  ");
                
            while(going){
                going = false;
                rows = mytable.getElementsByTagName('tr');
            for(var i=1; i <rows.length - 1; i++){
                change = false;
    
                        first = parseFloat($('td', rows[i])[3].innerHTML);
                        second = parseFloat($('td', rows[i + 1])[3].innerHTML);
                    
                if(zeng){ 
                    if(first>second){
                    change = true;
                    break;
                    // rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
                }
            }else{
                        if(first<second){
                            change = true;
                            break;
                            // rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
                        }
                    }
                }
                if(change){
                    rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
                    going = true;
                }
    }
}

function sort6(){
    
        var html = "Default";
        html+="<b class='caret'></b>";
        document.getElementById("showitem").innerHTML=html;
        
        var rows, first, second, change, going, zeng;
            var mytable = document.getElementById('fav_table');
        
            going= true;
            if(document.getElementById("showitem1").innerHTML==='Ascending<b class="caret"></b>'){
                zeng  = true;
            }else{
                zeng = false;
            }
        //  asc = ($('#showitem1').val() === 'Ascending');
            console.log("ascending is " + zeng);
            console.log("rows.length is:  ");
            
        while(going){
            going = false;
            rows = mytable.getElementsByTagName('tr');
        for(var i=1; i <rows.length - 1; i++){
            change = false;
            
            first = parseFloat($('td', rows[i])[1].innerHTML);
            second = parseFloat($('td', rows[i + 1])[1].innerHTML);
        
        
            if(zeng){ 
                if(first>second){
                change = true;
                break;
                // rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            }
        }else{
                    if(first<second){
                        change = true;
                        break;
                        // rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
                    }
                }
            }
            if(change){
                rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
                going = true;
            }
    }
}

function changeordervalue(order){
        var html = order;
        html+="<b class='caret'></b>";
        document.getElementById("showitem1").innerHTML=html;
        
        var method = document.getElementById("showitem").innerHTML.split('<')[0];
        switch(method){       
                case "Symbol":
                    sort1();
                    break;
                case "Price":
                    sort2();
                    break;
                case "Change":
                    sort3();
                    break;
                case "Change Percent":
                    sort4();
                    break;
                case "Volume":
                    sort5();
                    break;
                default:
                    sort6();
                    break;
    }  
}


