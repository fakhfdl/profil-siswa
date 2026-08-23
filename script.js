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
            // Ambil data dasar dari kartu html
            const name = card.querySelector('.student-name').textContent;
            const imgSrc = card.querySelector('.profile-img').getAttribute('src');
            
            // Ambil data tambahan dari atribut data-*
            const nisn = card.getAttribute('data-nisn') || '-';
            const hobby = card.getAttribute('data-hobby') || '-';
            const bio = card.getAttribute('data-bio') || '-';
            
            // Coba ambil teks kelas secara otomatis
            const cardText = card.innerText;
            const classMatch = cardText.match(/Class:\s*(.*)/i);
            const className = classMatch ? classMatch[1] : 'X TKJ 1';

            // Masukkan data ke dalam panel pop-up modal
            modalImg.src = imgSrc;
            modalName.textContent = name;
            modalClass.textContent = className;
            modalNisn.textContent = nisn;
            modalHobby.textContent = hobby;
            modalBio.textContent = bio;

            // Munculkan panel pop-up
            modal.style.display = 'flex';
        });
    });

    // 3. LOGIKA MENUTUP MODAL DENGAN JEDA ANIMASI
    function closeModal() {
        // Tambahkan class closing untuk memicu animasi CSS keluar (popdownAnim)
        modal.classList.add('closing'); 
        
        // Beri jeda 300 milidetik agar animasi CSS selesai berputar terlebih dahulu
        setTimeout(function() {
            modal.style.display = 'none';
            modal.classList.remove('closing'); // Bersihkan class agar modal bisa dibuka kembali
        }, 300);
    }

    // Tombol (X) diklik -> jalankan animasi tutup
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Area luar kotak hitam diklik -> jalankan animasi tutup
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
});
