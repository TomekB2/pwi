function kk() {
    let licznikruchow = 0;
    let flagakoniec = false;
    var komputer = false;
    let pola = document.getElementsByClassName('komorka');
    var bk = document.getElementById("k");
    var bg = document.getElementById("g");
    bk.addEventListener("click", zkomputerem);
    bg.addEventListener("click", zgraczem);
    for (const pole of pola) {
        pole.style.visibility = 'hidden';
    } 
    let gracze = [
        {
            name: 'kolko'
        },
        {
            name: 'krzyzyk'
        }
    ];

    let kombinacje = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let gracz1 = gracze[0];
    let gracz2 = gracze[1];

    let elementpole = document.querySelector('.pole');
    elementpole.addEventListener('click', ruch)

    function wyswietlaktualnegogracza() {
        let status = document.querySelector('.status');
        status.innerText = `aktualny gracz: ${gracz1.name}`;
    }

    function zkomputerem() {
        komputer = true;
        const buttons = document.getElementsByTagName("button");
        for (const button of buttons) {
            button.disabled = true;
        }     
        for (const pole of pola) {
            pole.style.visibility = 'visible';
        } 
    }
    function zgraczem() {
        komputer = false;
        const buttons = document.getElementsByTagName("button");
        for (const button of buttons) {
            button.disabled = true;
        }
        for (const pole of pola) {
            pole.style.visibility = 'visible';
        } 
    }


    function ruch(event) {
        if (komputer == false) {
            wyswietlaktualnegogracza();
            if (!flagakoniec && czypusty(event.target) && czypoprawny(event.target)) {
                event.target.classList.add(gracz1.name);
                event.target.classList.remove(gracz2.name);
                if (sprawdz()) {
                    document.querySelector('.wynik').innerText = `wygrana: ${gracz1.name}`;
                    finish = true;
                    return;
                }
                if (licznikruchow === 8) {
                    document.querySelector('.wynik').innerText = 'remis'
                }
                licznikruchow++;
                gracz2 = gracze[((Math.abs(licznikruchow - 1)) % 2)];
                gracz1 = gracze[(licznikruchow % 2)];
                wyswietlaktualnegogracza();
            }
        }
        else {
            let status = document.querySelector('.status');
            status.innerText = ``;
            if (!flagakoniec && czypusty(event.target) && czypoprawny(event.target)) {
                event.target.classList.add('kolko');
                event.target.classList.remove('krzyzyk');
                if (sprawdz()) {
                    document.querySelector('.wynik').innerText = `wygrana: ${gracz1.name}`;
                    finish = true;
                    return;
                }
                licznikruchow++;
                ruch2(pola);
            }
        }

    }
    function ruch2(pola) {
        if (licznikruchow <8) {
            do {
                var pole = pola[Math.floor(Math.random() * 8)];
            } while (flagakoniec || !czypusty(pole) || !czypoprawny(pole));
            pole.classList.add('krzyzyk');
            pole.classList.remove('kolko');
            if (sprawdz()) {
                document.querySelector('.wynik').innerText = `wygrana: ${gracz2.name}`;
                finish = true;
                return;
            }
            if (licznikruchow === 8) {
                document.querySelector('.wynik').innerText = 'remis'
            }
            licznikruchow++;
        }     
    }
    

    function sprawdz() {
        let komorki = Array.from(document.querySelectorAll('.komorka'))
            .map(komorka1 => {
                if (czykolko(komorka1)) return {
                    name: 'kolko'
                }
                if (czykrzyzyk(komorka1)) return {
                    name: 'krzyzyk'
                }
                return {
                    name: undefined
                }
            });

        if (licznikruchow % 2 == 0) {
            var znak = gracz1.name
        }
        else {
            var znak = gracz2.name
        }
        if (komputer == false) {
            var znak = gracz1.name
        }
        let wygrane = kombinacje.map(function (linia) {
            return czywygrana(linia, komorki, znak);
        })
        return wygrane.includes(true);
    }

    function czywygrana(linia, komorki, znak) {
        for (let i = 0; i < linia.length; i++) {
            if (komorki[linia[i]].name !== znak) return false;
        }
        return true;
    }

    function czypoprawny(target) {
        return target.classList.contains("komorka");
    }

    function czykrzyzyk(target) {
        return target.classList.contains("krzyzyk");
    }

    function czykolko(target) {
        return target.classList.contains("kolko");
    }

    function czypusty(target) {
        return !czykolko(target) && !czykrzyzyk(target);
    }
}

window.onload = kk;
