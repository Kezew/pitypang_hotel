/* TODO */
/* 2. Jelenítse meg a képernyőn a leghosszabb szállodai tartózkodást! Csak az időtartamot
vegye figyelembe, azaz nem számít, hogy hány vendég lakott az adott szobában!
Az esetlegesen azonos hosszúságú tartózkodások közül bármelyiket kiválaszthatja.
Az eredményt ebben a formában írja a képernyőre:
Név (érkezési_nap_sorszáma) – eltöltött_éjszakák_száma
például: Nagy_Bertalan (105) – 16 */
// console.log(z);
var maxDays = 0;
var customerNameMaxDay;
var dayOfArrival = 0;

function longestPeriod() {
  for (var i = 0; i < foglalasok.length; i++) {
    if ((foglalasok[i].tavNap - foglalasok[i].erkNap) > maxDays) {
      maxDays = foglalasok[i].tavNap - foglalasok[i].erkNap;
      customerNameMaxDay = foglalasok[i].nev;
      dayOfArrival = foglalasok[i].erkNap;
    }
  }
  alert("A leghosszabb szállodai tartózkodás:\n" + customerNameMaxDay + "  (" + dayOfArrival + ")  -  " + maxDays);
}
longestPeriod();

/* 3. Számítsa ki, hogy az egyes foglalások után mennyit kell fizetnie az egyes vendégeknek!
A foglalás sorszámát és a kiszámított értékeket kettősponttal elválasztva írja ki
Ez – a példában szereplő Tóth család esetén – a következő lenne:
123:57200
Írja a képernyőre a szálloda teljes évi bevételét! */
// Tavasz: 1-120	Nyár: 121-243	ŐSZ: maradék időszak
let yearlyIncome = 0;
let roomPrice;
let extraBed = 0;
let breakfast = 0;

function costOfReservations() {
  foglalasok.forEach(function(reservation) {
    // TO DO a szoba árakat "konstans szerű" változókba kirakni és csak ott kell változtatni
    // reggelit is pótágyat is CSAK a motor fusson itt.
    // szoba ár -- időszak függvénye
    if (reservation.erkNap <= 120) {
      roomPrice = 9000;
    } else if (reservation.erkNap <= 243) {
      roomPrice = 10000;
    } else {
      roomPrice = 8000;
    }
    // pótágy?
    if (reservation.vendegek == 3) {
      extraBed = 2000;
    }
    // reggeli ár
    if (reservation.reggeli) {
      breakfast = 1100;
    }
    let cost = (reservation.tavNap - reservation.erkNap) * (roomPrice + extraBed + breakfast);
    yearlyIncome += cost;
    console.log(reservation.sorszam + ":" + cost);
  });
  console.log("éves bevétel: " + yearlyIncome);
}
costOfReservations();

/* 4. Készítsen statisztikát az egyes hónapokban eltöltött vendégéjszakákról! Egy vendégéjszakának
egy fő egy eltöltött éjszakája számít. A példában szereplő Tóth család áprilisban 3,
májusban pedig 9 vendégéjszakát töltött a szállodában. Írassa ki a havi vendégéjszakák
számát a képernyőre az alábbi formában:
hónap_sorszáma: x vendégéj
például: 8: 1059 vendégéj */
var nightOnSingleDays = []; // az év napjain hány vendégéjszaka volt: adott napi vendégszám
var x = 15;
for (var i = 0; i < 366; i++) {
  nightOnSingleDays[i] = 0; // a tömb indexei lesznek a napok
}
// a napok feltöltése, erkNap, tavNap, vendegek  kellenek a foglalások tömb elemeiből
for (var i = 0; i < foglalasok.length; i++) {
  for (var j = foglalasok[i].erkNap; j < foglalasok[i].tavNap; j++) {
    nightOnSingleDays[j] = nightOnSingleDays[j] + foglalasok[i].vendegek;
  }
}
// kiválasztott hónap statisztikája: szükséges a hónapok kezdő és utolsó napja >> honapok tömb-ben ( foglalasok.js )
var monthsNights = [];
for (var i = 0; i < 12; i++) {
  monthsNights[i] = 0;
  for (var j = honapok[i].elsonap; j <= honapok[i].utolsonap; j++) {
    monthsNights[i] = monthsNights[i] + nightOnSingleDays[j];
  }
}
for (var i = 0; i < 12; i++) {
  console.log(honapok[i].honap + " :  " + monthsNights[i] + "  vendégéj");
}


/* 5. Kérje be a felhasználótól egy új foglalás kezdő dátumához tartozó nap sorszámát és az eltöltendő
éjszakák számát! Határozza meg, hogy hány szoba szabad a megadott időszak
teljes időtartamában! A választ írassa ki a képernyőre! */

function isFreedays() {

  // szobák inicializálása:
  szobak.forEach(function(room) {
    for (var i = 0; i < 366; i++) {
      room.szobafoglalas[i] = 0;
    }
  });

  // az összes szobára létrehozott objektumban regisztráljuk a foglalt napokat(sorszámokat)
  // a foglalasok alapján
  function fillRoomReservations() {
    foglalasok.forEach(function(res) {
      for (var i = res.erkNap; i < res.tavNap; i++) {
        szobak[res.szoba].szobafoglalas[i] = 1;
      }
    });
  }
  fillRoomReservations();

  // a bekért dátum és eltöltendő éjszaka alapján kiírjuk,
  // hogy van-e szabad szoba és azt is, hogy hány db?


}

isFreedays();
