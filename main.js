function openInvitation() {
  document.getElementById('cover').classList.add('hide');
  document.getElementById('mainCard').classList.add('show');
  const shell = document.querySelector('.shell');
  if (shell) shell.classList.add('opened');
}

// Menangani logika pemutaran musik
document.addEventListener('DOMContentLoaded', function() {
  const openBtn = document.querySelector('.open-btn');
  const bgMusic = document.getElementById('bg-music');

  if (openBtn && bgMusic) {
    // Memutar musik saat tombol Buka Undangan diklik
    openBtn.addEventListener('click', function() {
      bgMusic.play().catch(function(error) {
        console.log("Gagal memutar audio:", error);
      });
    });
  }

  // Menangani pause/play otomatis saat pindah tab atau minimize browser
  document.addEventListener('visibilitychange', function() {
    if (!bgMusic) return;

    // Pastikan musik hanya di-play kembali jika undangan sudah dibuka (cover disembunyikan)
    const isOpened = document.getElementById('cover').classList.contains('hide');
    
    if (isOpened) {
      if (document.hidden) {
        bgMusic.pause(); // Pause saat tab tidak aktif/minimize
      } else {
        bgMusic.play().catch(function(error) {
          console.log("Gagal melanjutkan audio:", error);
        });
      }
    }
  });

  // Berhenti otomatis saat tab/browser ditutup (sebelum unload)
  window.addEventListener('pagehide', function() {
    if (bgMusic) {
      bgMusic.pause();
    }
  });
});
