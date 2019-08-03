var app = new function() {
  this.el = document.getElementById('names');
  this.names = [
    ["Puke",[""],"profil/andrias.jpg"],
    ["Tramp",["QiFBgtgUtfw"], "profil/Daf.jpg"], 
    ["Pony", ["0rjZctQddOo"], "profil/fie.jpg"], 
    ["Bongduella", ["ZyhrYis509A"], "profil/Emilie.jpg"], 
    ["Sir Flex Alot", ["r2LpOUwca94", "OI3shBXlqsw", "VXd3MyFkLOk"], "profil/frederik.jpg"], 
    ["Dakke",["5Dtre2Yiw78" ], "profil/Hannah.png"], 
    ["Vino Blomst", ["N8t078YDojM"],"profil/Jonas.jpg"], 
    ["Træspritten", ["SMaVii7nnj4"], "profil/Helene.jpg"], 
    ["Bolle", ["dDu_wOTRXIM"], "profil/Louise.jpg"], 
    ["Bunde", ["uCRT8IItGpw", "n09xzMb1tdg", "otCpCn0l4Wo", "QFtnV6pMqvA", "bnqBLeg4Jbo"], "profil/Tox.jpg"], 
    ["Ballade", ["VDvr08sCPOc"], "profil/martin.jpg"], 
    ["Baby", ["6nIvBI2_hSY"], "profil/daniel.jpg"], 
   ["Alle", ["dLhFDYQHDQY","n09xzMb1tdg","Wmc8bQoL-J0"], "profil/Rask.jpg"], 
    ];

  this.Count = function() {

    var el   = document.getElementById('counter');
    var name = 'bunder';
    var antalAktive = 0;
    for(var i = 0; i < this.names.length; i++){
      if(this.names[i][3]){
        antalAktive++;
      }
    }
    if (antalAktive != 0) {
      if (antalAktive > 1) {
        name = 'bundere';
      }
      el.innerHTML = antalAktive + ' ' + name ;
    } else {
      el.innerHTML = 'Ingen ' + name;
    }
  };

  this.FetchAll = function() {
    var data = '';
    if (this.names.length > 0) {
      for (i = 0; i < this.names.length; i++) {
        if(!this.names[i][3]){
          data += '<tr>';
          data += '<td>' + this.names[i][0] + '</td>';
          data += '<td><button class="btn btn-danger" onclick="app.Switch(' + i + ')">Inaktiv</button></td>';
          data += '</tr>';
        } else {
          data += '<tr>';
          data += '<td>' + this.names[i][0] + '</td>';
          data += '<td><button class="btn btn-success" onclick="app.Switch(' + i + ')">Aktiv</button></td>';
          data += '</tr>';
        }
      }
    }
    this.Count();
    return this.el.innerHTML = data;
  };

  this.Switch = function (item) {
    this.names[item][3] = !this.names[item][3];
    // Display the new list
    this.FetchAll();
  };

  this.Deselect = function () {
    for(var i = 0; i < this.names.length; i++){
      this.names[i][3] = false;
    }
    // Display the new list
    this.FetchAll();
  };



  this.Start = function () {
    var filtered = this.names.filter(function(value){
      return value[3];
    });
    var data = JSON.stringify(filtered);
    sessionStorage.setItem('customLykkehjul', data);
    window.location.href = "index2.html";
  }

}
app.FetchAll();
