// ==========================================
// 1. SISTEM PROTEKSI & REDIRECT KE LOGIN
// ==========================================
// Cek apakah siswa sudah sukses melewati halaman login.html
if (sessionStorage.getItem("isLoggedIn") !== "true") {
    // Jika belum login, paksa browser langsung mengarah ke login.html
    window.location.href = "login.html"; 
}

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

    let scrollPosition = 0;

    // 2. LOGIKA PENCARIAN SISWA
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

    // 3. LOGIKA KLIK KARTU UNTUK DETAIL PROFIL
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

            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            document.body.classList.add('no-scroll');
            document.body.style.top = `-${scrollPosition}px`;

            modal.style.display = 'flex';
        });
    });

    // 4. LOGIKA MENUTUP MODAL DENGAN JEDA ANIMASI
    function closeModal() {
        modal.classList.add('closing'); 

        document.body.classList.remove('no-scroll');
        document.body.style.top = '';
        
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
