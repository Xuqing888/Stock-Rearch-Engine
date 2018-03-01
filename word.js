                   Highcharts.chart('sma', {
                             chart: {
                                 type: 'line'

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