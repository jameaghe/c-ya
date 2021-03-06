$(function() {
  ko.applyBindings(new TransactionsModel(), $("#transactions")[0]);
});

function TransactionsModel() {
  var self = this;
  self.loading = ko.observable(false);
  self.dates = ko.observableArray([]);
  self.selection = ko.observable(false);
  self.more = ko.observable(false);

  self.GetTransactions = function() {
    self.loading(true);
    $.get("?ajax=get", GetParams(self.dates()), function(result) {
      if(!result.fail) {
        for(var d = 0; d < result.dates.length; d++)
          if(self.dates().length && self.dates()[self.dates().length - 1].date == result.dates[d].date)
            for(var t = 0; t < result.dates[d].transactions.length; t++)
              self.dates()[self.dates().length - 1].transactions.push(result.dates[d].transactions[t]);
          else {
            result.dates[d].transactions = ko.observableArray(result.dates[d].transactions);
            self.dates.push(result.dates[d]);
          }
        self.more(result.more);
      } else
        alert(result.message);
      self.loading(false);
    }, "json");
  };
  self.GetTransactions();

  self.Select = function(transaction) {
    self.selection(transaction);
  };

  self.SelectNone = function(transaction, e) {
    self.selection(false);
    e.stopImmediatePropagation();
  };
}

function GetParams(dates) {
  if(dates.length) {
    var oldest = dates[dates.length - 1];
    var oldid = oldest.transactions()[oldest.transactions().length - 1];
    return {oldest: oldest.date, oldid: oldid.id, acct: FindAccountID()};
  }
  return {oldest: "9999-12-31", oldid: 0, acct: FindAccountID()};
}

function FindAccountID() {
  var qs = window.location.search.substring(1).split("&");
  for(var i = 0; i < qs.length; i++) {
    var p = qs[i].split("=");
    if(p[0] = "acct")
      return p[1];
  }
  return 0;
}
