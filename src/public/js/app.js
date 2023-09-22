$(document).ready(function () {
  const url = 'http://localhost:3000/select'
  const urlAccount = 'http://localhost:3000/account'
  const urlDates = 'http://localhost:3000/dates'
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

})