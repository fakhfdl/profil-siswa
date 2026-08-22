document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector('.search-profile input');
    const studentCards = document.querySelectorAll('.student-card');
    const noMatchMessage = document.getElementById('no-match'); // Mengambil elemen teks tidak ditemukan

    if (!searchInput) {
        console.error("Input pencarian tidak ditemukan.");
        return;
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        let hasMatch = false; // Penanda awal: anggap tidak ada yang cocok

        studentCards.forEach(function(card) {
            const cardText = card.innerText.toLowerCase();

            if (cardText.includes(searchTerm)) {
                card.style.setProperty('display', '', 'important'); 
                hasMatch = true; // Jika ada 1 saja kartu yang cocok, tandai sebagai TRUE
            } else {
                card.style.setProperty('display', 'none', 'important'); 
            }
        });

        // Logika untuk memunculkan teks "Siswa tidak ditemukan"
        if (hasMatch) {
            noMatchMessage.style.display = 'none'; // Sembunyikan pesan jika ada siswa yang cocok
        } else {
            noMatchMessage.style.display = 'block'; // Tampilkan pesan jika ketikan ngasal / tidak ada yang cocok
        }
    });
});
