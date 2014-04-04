app.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('BillCtrl', function($scope, Member) {
    $scope.subBill = false;
    $scope.showDeal = false;
    function dateSort(a, b) {
      return parseInt(b.date) - parseInt(a.date)
    };
    function sumBill(bills) {
      var sum = 0;
      for (var i = 0; i < bills.length; i ++) {
        sum += bills[i].amount;
      }
      return sum.toFixed(2);
    }
    function doubleSpace (number) {
      return number >= 10 ? number : '0'+number.toString();
    }
    var qs_bill_w = {
      'weixinID': 'client',        //
      'endAt': parseInt(new Date() / (1000 * 86400)),
      'startAt': parseInt(new Date() / (1000 * 86400)) - 7,
      'type': 'bill'
    };
    var qs_bill_m = Object.create(qs_bill_w);
    qs_bill_m.startAt = parseInt(new Date() / (1000 * 86400)) - 30;
    var qs_bill_all = Object.create(qs_bill_w);
    delete qs_bill_all.endAt;
    delete qs_bill_all.startAt;

    Member.query(qs_bill_w, function(result) {
      console.log(result)
      var fake = result;
      fake.push({merchantName: '小霸王', date: 16093, amount: 4000});
      fake.push({merchantName: '小霸王', date: 16096, amount: 4400});
      fake.sort(dateSort)
      console.log(fake)
      for (var i = 0; i < fake.length; i ++) {
        var d = new Date(0);
        d.setUTCDate(fake[i].date);
        fake[i].amount /= 100;
        fake[i].date = d.getFullYear() +
          "-" + doubleSpace(Number(Number(d.getMonth()) + 1)) +
          "-" + doubleSpace(d.getDate());
      }
      var bill_merchants = _.groupBy(fake, function(bill) {
        return bill.merchantName;
      })
      var bill_key = [];
      for (var b in bill_merchants)
        bill_key.push(b)
      var bill_array = [];
      for (var i = 0; i < bill_key.length; i ++)
        bill_array.push({name: bill_key[i], bills: bill_merchants[bill_key[i]], sum: sumBill(bill_merchants[bill_key[i]])})
      $scope.bills_merchants = bill_array;
//      console.log(bill_array);
    })
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
