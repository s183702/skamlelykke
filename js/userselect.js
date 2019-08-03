var app = new function() {
  this.el = document.getElementById('names');
  this.names = [
    ["Skipper",["YPV8LqSRSDg","CO0BXaawfZ0","trS2nrkN0_k"],"profil/andrias.jpg", true],
    ["Kristian",["6I-BTlgcVqU"], "profil/Daf.jpg", true], 
    ["Havflækkeren", ["ytWz0qVvBZ0", "qkbs33sxHLA"], "profil/fie.jpg", true], 
    ["Gurli", ["Qkuu0Lwb5EM"], "profil/Emilie.jpg", true], 
    ["Trash", ["C9M4rSoC4FY", "b7_aRsk5CJ4", "pRNMePD1v58"], "profil/frederik.jpg", true], 
    ["Kim",["3ij_pUtJJrw", "DUT5rEU6pqM"], "profil/Hannah.png", true], 
    ["Kinky", ["C9M4rSoC4FY"],"profil/Jonas.jpg", true], 
    ["Crocs", ["SMaVii7nnj4"], "profil/Helene.jpg", true], 
    ["Wingardium", ["Qa_2C15Uh5c"], "profil/Louise.jpg", true], 
    ["Emil", ["uCRT8IItGpw", "n09xzMb1tdg", "otCpCn0l4Wo", "QFtnV6pMqvA", "bnqBLeg4Jbo"], "profil/Tox.jpg", true], 
    ["Morten", ["VDvr08sCPOc"], "profil/martin.jpg", true], 
    ["Spock", ["6nIvBI2_hSY", "LWqyrGoUcDQ"], "profil/daniel.jpg", true], 
    ["Styrmand", ["dLhFDYQHDQY","n09xzMb1tdg","Wmc8bQoL-J0"], "profil/Rask.jpg", true], 
    ["Franz", ["HMqgVXSvwGo","DEsqGOHo0nI",], "profil/Mathias.jpg", true], 
    ["Fabian", ["kaQcfMFE9Fs", "fSDDn4l8JoQ"], "profil/Grove.jpg", true], 
    ["Kunsjatter", ["y9ongoen_oQ", "uYeHPFR3f0", "LUlZ5n0cyak","qc_F4_zLn4k","CaW-zbBnpnE","LbenCTAwyco","LDU_Txk06tM"],"profil/Niels.jpg", true], 
    ["Mario-hee", ["y1nM4OKvoXw","2KBFD0aoZy8"], "profil/emma.jpg", true], 
    ["Mario-hoo", ["1w7OgIMMRc4","o1tj2zJ2Wvg","Rbm6GXllBiw"], "profil/Rose.jpg", true], 
    ["Søren", ["elVLeQX6IUU"], "profil/Jens.jpg", true], 
    ["Shaggy", ["ULrxa1KVzZU","mdqU6Erw3kk","nQV7DKBqGdk","vMfObaxYBV8"], "profil/Sebastian.jpg", true],
    ["Bundemir", ["kJQP7kiw5Fk","KlyXNRrsk4A","tAp9BKosZXs","F57P9C4SAW4"], "profil/Victor.jpg", true],
    ["Sten", ["hwwg8st_5W4"], "profil/Mie.jpg", true],
    ["Fuldemir", ["eA9u-MF_H6Y","VrAu6ve8F6Y","oxWfTs1psoM"], "profil/simon.jpg", true],
    ["Lars", ["0HENeKIztcQ"], "profil/Oscar.jpg", true],
    ["Såla’", ["unfzfe8f9NI","KoyNlVQbUPc","XEjLoHdbVeE"], "profil/Marie.jpg", true],
    ["Darth", ["4fndeDfaWCg", "POq2AznJO1Q", "aBt8fN7mJNg", "5rmKy8H62BU"], "profil/Rolf.jpg", true]
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
