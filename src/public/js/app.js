$(document).ready(function () {
  const url = 'http://localhost:3000/select'
  const urlAccount = 'http://localhost:3000/account'
  const urlDates = 'http://localhost:3000/dates'
  const urlTaxes = 'http://localhost:3000/taxes-daily-data'
  const urlCards = 'http://localhost:3000/cards-select'

  var tableDaily = $('#tableDaily').DataTable({
    ajax: {
      url: url,
      dataSrc: ""
    },
    columns: [
      { data: "id_daily" },
      { data: "concept" },
      {
        data: "amount",
        // render: function (data, type) {
        //   var number = DataTable.render
        //     .number(',', '.', 2, '$')
        //     .display(data);
        //   // if (type === 'display') {
        //   //   let color = 'green';
        //   //   if (data < 250000) {
        //   //     color = 'red';
        //   //   }
        //   //   else if (data < 500000) {
        //   //     color = 'orange';
        //   //   }
        //   //   return `<span style="color:${color}">${number}</span>`;
        //   // }
        //   // return number;
        //   return `<span class="text-success">${number}</span>`;

        // }
      },
      { data: "person" },
      { data: "date" },
      { defaultContent: "<div class='text-center'><button class='btn btn-outline-dark btn-sm btnEditar'>Editar</button></div>" },
    ],
    drawCallback: function () {
      var api = this.api();
      $("#total_order").html(
        api.column(2, { page: 'current' }).data().sum()
      );
    }

    // drawCallback: function(data) {
    //   $("#total_order").html(data.amount)
    // }
    // columnDefs: [{ 
    //   targets: [2], 
    //   render(v) {
    //     return Number(v).toFixed(2)
    //   }
    // }]
  })

  var tableAccount = $('#tableAccount').DataTable({
    language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
      "infoEmpty": "Mostrando 0 to 0 of 0 registros",
      "infoFiltered": "(Filtrado de _MAX_ total registros)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ registros",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
      "paginate": {
        "first": "Primero",
        "last": "Ultimo",
        "next": "Siguiente",
        "previous": "Anterior"
      }
    },
    order: [[0, "desc"]],
    ajax: {
      url: urlAccount,
      dataSrc: ""
    },
    columns: [
      { data: "id_account" },
      { data: "date" },
      {
        data: 'bank', name: 'bank',
        render: function (data, type, row) {
          bank = '';
          switch (data) {
            case 'NU':
              bank = `<span class="badge rounded-pill text-bg-info">${data}</span>`
              break;
            case 'CITIBANAMEX':
              bank = `<span class="badge rounded-pill text-bg-primary">${data}</span>`
              break;
            case 'HSBC':
              bank = `<span class="badge rounded-pill text-bg-danger text-black-50">${data}</span>`
              break;
            case 'BBVA':
              bank = `<span class="badge rounded-pill text-bg-primary">${data}</span>`
              break;
            case 'SANTANDER':
              bank = `<span class="badge rounded-pill text-bg-danger">${data}</span>`
              break;
            case 'HEY BANCO':
              bank = `<span class="badge rounded-pill text-bg-dark">${data}</span>`
              break;
            case 'warning':
              bank = `<span class="badge rounded-pill text-bg-dark">${data}</span>`
              break;
          }
          return bank;
        }
      },
      { data: "concept" },
      { data: "person" },
      { data: "amount", render: $.fn.dataTable.render.number(',', '.', 2, '$') },
      { data: "msi" },
      { data: "partiality" },
      { data: "miss_mounth" },
      { data: "pay", render: $.fn.dataTable.render.number(',', '.', 2, '$') },
      { data: "miss_pay", render: $.fn.dataTable.render.number(',', '.', 2, '$') },
      {
        data: "status",
        render: function (data, type, row) {
          estatus = '';
          if (data === 'PAGADO') {
            estatus = `<span class="badge rounded-pill text-bg-success">${data}</span>`
          } else {
            estatus = `<span class="badge rounded-pill text-bg-danger">${data}</span>`
          }
          return estatus;
        }
      }
      // { defaultContent: "<div class='text-center'><button class='btn btn-outline-dark btn-sm btnEditar'>Editar</button></div>" },
    ],
    drawCallback: function () {
      var api = this.api();
      $("#totalPay").html(
        `$ ${api.column(9, { page: 'current' }).data().sum().toLocaleString('es-MX')}`
      );
      $("#totalMissPay").html(
        `$ ${api.column(10, { page: 'current' }).data().sum().toLocaleString('es-MX')}`
      );
    }
  })

  var tableDatesLimits = $('#tableDatesLimits').DataTable({
    createdRow: function (row, data) {
      if (data['status'] === 'SI') {
        $("td", row).closest('tr').addClass('table-success');
        // $("td", row).closest('tr').addClass('table-success').text();
        $("td", row).closest('tr').find('td:eq(06)').find('span').removeClass('badge rounded-pill text-bg-danger');
        // $("td", row).closest('tr').find('td:eq(06)').find('span').remove();

      } else {
        $("td", row).closest('tr').addClass('table-danger');
      }
    },
    ajax: {
      url: urlDates,
      dataSrc: ""
    },
    columns: [
      { data: "id_limit" },
      {
        data: "bank",
        render: function (data) {
          bank = '';
          switch (data) {
            case 'NU':
              bank = `<span class="badge rounded-pill text-bg-info">${data}</span>`
              break;
            case 'CITIBANAMEX':
              bank = `<span class="badge rounded-pill text-bg-primary">${data}</span>`
              break;
            case 'HSBC':
              bank = `<span class="badge rounded-pill text-bg-danger">${data}</span>`
              break;
            case 'BBVA':
              bank = `<span class="badge rounded-pill text-bg-primary">${data}</span>`
              break;
            case 'SANTANDER':
              bank = `<span class="badge rounded-pill text-bg-danger">${data}</span>`
              break;
            case 'HEY BANCO':
              bank = `<span class="badge rounded-pill text-bg-dark">${data}</span>`
              break;
            case 'warning':
              bank = `<span class="badge rounded-pill text-bg-dark">${data}</span>`
              break;
          }
          return bank;
        }
      },
      {
        data: "amount",
        render: function (data, type) {
          var number = DataTable.render.number(',', '.', 2, '$').display(data);
          // return `<span class="text-success">${number}</span>`;
          return number;
        }
      },
      { data: "date_cutoff" },
      { data: "date_limit" },
      { data: "days_cutoff" },
      {
        data: "days_limit",
        render: function (data) {
          daysLimits = '';
          if (data < 3) {
            daysLimits = `<span class="badge rounded-pill text-bg-danger">${data}</span>`
          } else if (data >= 3 && data <= 5) {
            daysLimits = `<span class="badge rounded-pill text-bg-warning">${data}</span>`
          } else {
            daysLimits = `<span class="badge rounded-pill text-bg-success">${data}</span>`
          }
          return daysLimits;
        }
      },
      {
        data: "record",
        // render: function (data) {
        //   record = '';
        //   if (data === 'NO') {
        //     record = `<span class="badge rounded-pill text-bg-danger">${data}</span>`
        //   } else {
        //     record = `<span class="badge rounded-pill text-bg-success">${data}</span>`
        //   }
        //   return record;
        // }
      },
      { data: "status" }
    ],
    drawCallback: function () {
      var api = this.api();
      $("#totalAmount").html(
        `$ ${api.column(2, { page: 'current' }).data().sum().toLocaleString('es-MX')}`
      )
    }
  })

  var tableDailyTaxes = $('#tableDailyTaxes').DataTable({
    ajax: {
      url: urlTaxes,
      dataSrc: ""
    },
    columns: [
      { data: "id_daily_taxes" },
      { data: "date" },
      { data: "amount", render: $.fn.dataTable.render.number(',', '.', 2, '$') },
      { data: "percentage", render: $.fn.dataTable.render.number(',', '.', 1, '', '%') },
      { data: "amount_year", render: $.fn.dataTable.render.number(',', '.', 2, '$') },
      { data: "amount_month", render: $.fn.dataTable.render.number(',', '.', 2, '$') },
      { data: "amount_week", render: $.fn.dataTable.render.number(',', '.', 2, '$') },
      { data: "amount_daily", render: $.fn.dataTable.render.number(',', '.', 2, '$') }
    ]
  })

  $("#insertFormAmount").click(function () {
    $("#formAmount").trigger("reset");
    $('#modalFormAccounts').modal('show');
  });


  $('#formAmount').submit(function (e) {
    e.preventDefault();
    date = $.trim($('#date').val());
    bank = $.trim($('#bank').val());
    concept = $.trim($('#concept').val());
    person = $.trim($('#person').val());
    amount = $.trim($('#amount').val());
    msi = $.trim($('#msi').val());
    partiality = $.trim($('#partiality').val());
    miss_mounth = $.trim($('#miss_mounth').val());
    pay = $.trim($('#pay').val());
    miss_pay = $.trim($('#miss_pay').val());

    $.ajax({
      url: "http://localhost:3000/add-account",
      type: "POST",
      datatype: "json",
      data: {
        date: date,
        bank: bank,
        concept: concept,
        person: person,
        amount: amount,
        msi: msi,
        partiality: partiality,
        miss_mounth: miss_mounth,
        pay: pay,
        miss_pay: miss_pay
      },
      success: function () {
        tableAccount.ajax.reload(null, false);
      }
    });
    $('#modalFormAccounts').modal('hide');
  });

  $(document).on("keyup", "#msi", function () {
    let msiValue = $(this).val();
    let partialityValue = $('#partiality').val();
    let amountValue = $('#amount').val()
    let missMounthValue = msiValue - partialityValue;
    let payValue = amountValue / msiValue
    // set new values
    $('#miss_mounth').val(missMounthValue);
    $('#pay').val(payValue)
  });

  $(document).on("keyup", "#partiality", function () {
    let partialityValue = $(this).val();
    let msiValue = $('#msi').val();
    let payValue = $('#pay').val();
    let missMounthValue = msiValue - partialityValue;
    let missPayValue = payValue * missMounthValue
    // set new values
    $('#miss_mounth').val(missMounthValue);
    $('#miss_pay').val(missPayValue);
  });

  $.ajax({
    url: urlCards,
    type: "GET",
    datatype: "json",
    success: function (data) {
      console.log("data", data);
      $('#limitNu').html(`$${data[0].limit.toLocaleString('es-MX')}`)
      $('#occupiedBalanceNu').html(`$${data[0].occupied_balance.toLocaleString('es-MX')}`)
      $('#freeBalanceNu').html(`$${data[0].free_balance.toLocaleString('es-MX')}`)

      $('#limitCiti').html(`$${data[1].limit.toLocaleString('es-MX')}`)
      $('#occupiedBalanceCiti').html(`$${data[1].occupied_balance.toLocaleString('es-MX')}`)
      $('#freeBalanceCiti').html(`$${data[1].free_balance.toLocaleString('es-MX')}`)

      $('#limitHsbc').html(`$${data[2].limit.toLocaleString('es-MX')}`)
      $('#occupiedBalanceHsbc').html(`$${data[2].occupied_balance.toLocaleString('es-MX')}`)
      $('#freeBalanceHsbc').html(`$${data[2].free_balance.toLocaleString('es-MX')}`)

      $('#limitBbva').html(`$${data[3].limit.toLocaleString('es-MX')}`)
      $('#occupiedBalanceBbva').html(`$${data[3].occupied_balance.toLocaleString('es-MX')}`)
      $('#freeBalanceBbva').html(`$${data[3].free_balance.toLocaleString('es-MX')}`)
    }
  });



  $.ajax({
    url: urlDates,
    type: "GET",
    datatype: "json",
    success: function (data) {
      var options = {
        series: [{
          name: [data[0].bank],
          data: [data[0].amount]
        }, {
          name: [data[1].bank],
          data: [data[1].amount]
        }, {
          name: [data[2].bank],
          data: [data[2].amount]
        }, {
          name: [data[3].bank],
          data: [data[3].amount]
        }, {
          name: [data[4].bank],
          data: [data[4].amount]
        }],
        chart: {
          type: 'bar',
          height: 500
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['BANCOS'],
        },
        yaxis: {
          title: {
            text: 'CANTIDAD $'
          }
        },
        colors: [
          "#672fa8",
          "#1c63a5",
          "#cf2c22",
          "#0d1f3b",
          "#d92b1b"
        ],
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val.toLocaleString('es-MX') + " pesos"
            }
          }
        }
      };
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    }
  });
})