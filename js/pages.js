/*
    Erstelle den Graphen für den Banner
*/
function loadIndex() {
  var ctx = document.getElementById('index-chart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [{
              label: "Bitcoin Kurs",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: [0, 10, 5, 2, 20, 30, 45],
          }]
      },

      // Configuration options go here
      options: {
        legend: {
            display: false,
        },
        scales:{
            xAxes: [{
                display: false //this will remove all the x-axis grid lines
            }],
            yAxes: [{
                display: false //this will remove all the x-axis grid lines
            }]
        }
      }
  });
}
