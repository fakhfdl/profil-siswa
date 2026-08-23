document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector('.search-profile input');
    const studentCards = document.querySelectorAll('.student-card');
    const noMatchMessage = document.getElementById('no-match');

    // Elemen Modal Detail
    const modal = document.getElementById('profile-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalClass = document.getElementById('modal-class');
    const modalNisn = document.getElementById('modal-nisn');
    const modalHobby = document.getElementById('modal-hobby');
    const modalBio = document.getElementById('modal-bio');

    // Variabel pembantu untuk mencatat posisi gulir halaman luar
    let scrollPosition = 0;

    // 1. LOGIKA PENCARIAN SISWA
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let hasMatch = false;

            studentCards.forEach(function(card) {
                const cardText = card.innerText.toLowerCase();
                if (cardText.includes(searchTerm)) {
                    card.style.setProperty('display', '', 'important'); 
                    hasMatch = true;
                } else {
                    card.style.setProperty('display', 'none', 'important'); 
                }
            });

            noMatchMessage.style.display = hasMatch ? 'none' : 'block';
        });
    }

    // 2. LOGIKA KLIK KARTU UNTUK DETAIL PROFIL
    studentCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const name = card.querySelector('.student-name').textContent;
            const imgSrc = card.querySelector('.profile-img').getAttribute('src');
            
            const nisn = card.getAttribute('data-nisn') || '-';
            const hobby = card.getAttribute('data-hobby') || '-';
            const bio = card.getAttribute('data-bio') || '-';
            
            const cardText = card.innerText;
            const classMatch = cardText.match(/Class:\s*(.*)/i);
            const className = classMatch ? classMatch[1] : 'X TKJ 1';

            modalImg.src = imgSrc;
            modalName.textContent = name;
            modalClass.textContent = className;
            modalNisn.textContent = nisn;
            modalHobby.textContent = hobby;
            modalBio.textContent = bio;

            // Catat posisi koordinat scroll layar sebelum modal muncul
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            // Aktifkan pengunci posisi tubuh lewat class CSS
            document.body.classList.add('no-scroll');
            // Tahan posisi koordinat agar halaman belakang tidak melompat ke atas
            document.body.style.top = `-${scrollPosition}px`;

            modal.style.display = 'flex';
        });
    });

    // 3. LOGIKA MENUTUP MODAL DENGAN JEDA ANIMASI
    function closeModal() {
        modal.classList.add('closing'); 

        // Lepas pengunci posisi tubuh
        document.body.classList.remove('no-scroll');
        document.body.style.top = '';
        
        // Kembalikan posisi koordinat scroll layar ke letak semula sebelum diklik
        window.scrollTo(0, scrollPosition);
        
        setTimeout(function() {
            modal.style.display = 'none';
            modal.classList.remove('closing'); 
        }, 300);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
});
