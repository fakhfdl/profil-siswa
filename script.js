// SCUDERIA X TKJ 1 — shared application script
const firebaseConfig={apiKey:"AIzaSyDfb7GXYliA6rUXDQI82Z2FaTpXb9m32XE",authDomain:"scuderia-x-tkj1.firebaseapp.com",projectId:"scuderia-x-tkj1",storageBucket:"scuderia-x-tkj1.firebasestorage.app",messagingSenderId:"273856938705",appId:"1:273856938705:web:6acf852b73b8688b43bbf0"};
const EMAIL_DOMAIN="scuderia-x-tkj1.local";
const USERS=["adha","akmal","alvina","alya","angga","anggun","aurel","callysta","daud","dinda","dwi","fany","fawwaz","hafy","hamdhani","husna","ilyas","jelita","jordan","juanita","khaira","kirana","lilis","luthfiyah","maghfirah","zhafran","fardan","yahya","fadly","faizal","fakhri","novelia","nurdiana","rachel","rahmadani","rayyan","rena","rino","rizqi","sahrul","shandy","sista","tiara","yulia","zahra"];
if(typeof firebase!=="undefined"&&!firebase.apps.length)firebase.initializeApp(firebaseConfig);
const auth=typeof firebase!=="undefined"?firebase.auth():null;
const usernameToEmail=u=>u+"@"+EMAIL_DOMAIN;
const showModal=id=>{const e=document.getElementById(id);if(e)e.classList.add("show")};
const closeModal=id=>{const e=document.getElementById(id);if(e)e.classList.remove("show")};
const friendlyError=e=>({ "auth/wrong-password":"Password salah.","auth/user-not-found":"Akun belum terdaftar.","auth/invalid-email":"Username tidak valid.","auth/weak-password":"Password terlalu pendek (minimal 6 karakter).","auth/network-request-failed":"Tidak ada koneksi internet.","auth/invalid-credential":"Username atau password salah.","auth/too-many-requests":"Terlalu banyak percobaan. Coba lagi nanti."}[e.code]||"Terjadi kesalahan. Silakan coba lagi.");
const initials=n=>(n||"Student").trim().split(/\s+/).map(x=>x[0]).slice(0,2).join("").toUpperCase();

document.addEventListener("DOMContentLoaded",()=>{
    const loginForm=document.getElementById("login-form");
    if(loginForm&&auth){
        loginForm.addEventListener("submit",async e=>{
            e.preventDefault();
            const username=document.getElementById("username").value.toLowerCase().trim(),password=document.getElementById("password").value,btn=document.getElementById("login-submit-btn");
            if(!USERS.includes(username)){alert("Username tidak dikenali. Gunakan nickname yang terdaftar di X TKJ 1.");return}
            btn.disabled=true;btn.innerHTML="AUTHENTICATING... <span>→</span>";
            try{
                await auth.signInWithEmailAndPassword(usernameToEmail(username),password);
                sessionStorage.setItem("isLoggedIn","true");sessionStorage.setItem("loggedInUsername",username);
                document.getElementById("success-message").textContent="Selamat datang, "+username.toUpperCase()+"!";
                showModal("success-modal");
                document.getElementById("success-ok").onclick=()=>location.href="index.html";
            }catch(error){alert("ACCESS DENIED! "+friendlyError(error))}
            finally{btn.disabled=false;btn.innerHTML="LOGIN TO SYSTEM <span>→</span>"}
        });
    }

    document.getElementById("open-setup")?.addEventListener("click",()=>{
        document.getElementById("setup-username").value=document.getElementById("username")?.value.toLowerCase().trim()||"";
        showModal("setup-modal");
    });
    document.getElementById("setup-submit")?.addEventListener("click",async()=>{
        const u=document.getElementById("setup-username").value.toLowerCase().trim(),p=document.getElementById("setup-new-pass").value,c=document.getElementById("setup-confirm-pass").value;
        if(!USERS.includes(u)){alert("Username tidak dikenali.");return}if(p.length<6){alert("Password minimal 6 karakter.");return}if(p!==c){alert("Password dan konfirmasi tidak sama.");return}
        try{await auth.createUserWithEmailAndPassword(usernameToEmail(u),p);sessionStorage.setItem("isLoggedIn","true");sessionStorage.setItem("loggedInUsername",u);closeModal("setup-modal");document.getElementById("success-message").textContent="Selamat datang, "+u.toUpperCase()+"!";showModal("success-modal");document.getElementById("success-ok").onclick=()=>location.href="index.html"}catch(e){alert(e.code==="auth/email-already-in-use"?"Akun sudah ada. Silakan login biasa.":friendlyError(e))}
    });
    document.getElementById("open-change-password")?.addEventListener("click",()=>{["change-username","change-old-pass","change-new-pass"].forEach(id=>document.getElementById(id).value="");showModal("change-modal")});
    document.getElementById("change-submit")?.addEventListener("click",async()=>{
        const u=document.getElementById("change-username").value.toLowerCase().trim(),oldP=document.getElementById("change-old-pass").value,newP=document.getElementById("change-new-pass").value;
        if(!USERS.includes(u)){alert("Username tidak dikenali.");return}if(newP.length<6){alert("Password baru minimal 6 karakter.");return}
        try{const cred=await auth.signInWithEmailAndPassword(usernameToEmail(u),oldP);await cred.user.updatePassword(newP);await auth.signOut();sessionStorage.clear();closeModal("change-modal");alert("Password berhasil diganti. Silakan login dengan password baru.")}catch(e){alert("Gagal ganti password: "+friendlyError(e))}
    });
    document.querySelectorAll(".password-toggle").forEach(b=>b.addEventListener("click",()=>{const i=document.getElementById(b.dataset.target);i.type=i.type==="password"?"text":"password"}));
    document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
    document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal(m.id)}));

    const dashboard=document.querySelector(".dashboard-page");
    if(dashboard){
        if(sessionStorage.getItem("isLoggedIn")!=="true"){location.href="login.html";return}
        const username=sessionStorage.getItem("loggedInUsername")||"Student",av=initials(username);
        ["top-username","hero-username","profile-name"].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=username.toUpperCase()});
        document.getElementById("profile-avatar")&&(document.getElementById("profile-avatar").textContent=av);
        document.querySelector(".user-avatar")&&(document.querySelector(".user-avatar").textContent=av);

        const sections=[...document.querySelectorAll(".page-section")],nav=[...document.querySelectorAll(".nav-item[data-section]")];
        const activate=name=>{sections.forEach(s=>s.classList.toggle("active-section",s.id==="section-"+name));nav.forEach(n=>n.classList.toggle("active",n.dataset.section===name));document.getElementById("sidebar")?.classList.remove("open");history.replaceState(null,"","#"+name);window.scrollTo({top:0,behavior:"smooth"})};
        nav.forEach(n=>n.addEventListener("click",()=>activate(n.dataset.section)));
        document.querySelectorAll("[data-jump]").forEach(b=>b.addEventListener("click",()=>activate(b.dataset.jump)));
        const hash=location.hash.slice(1);if(hash&&document.getElementById("section-"+hash))activate(hash);
        document.getElementById("mobile-menu")?.addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));

        const search=document.getElementById("member-search"),cards=[...document.querySelectorAll(".student-card")],noMatch=document.getElementById("no-match");
        search?.addEventListener("input",()=>{const q=search.value.toLowerCase().trim();let matches=0;cards.forEach(c=>{const ok=c.dataset.name.includes(q);c.style.display=ok?"":"none";if(ok)matches++});if(noMatch)noMatch.style.display=matches?"none":"block"});
        cards.forEach(card=>card.addEventListener("click",()=>{document.getElementById("modal-img").src=card.querySelector(".profile-img").src;document.getElementById("modal-name").textContent=card.querySelector(".student-name").textContent;document.getElementById("modal-hobby").textContent=card.dataset.hobby||"-";document.getElementById("modal-bio").textContent=card.dataset.bio||"-";showModal("profile-modal")}));
        document.getElementById("close-profile-modal")?.addEventListener("click",()=>closeModal("profile-modal"));
        const logout=async()=>{try{if(auth)await auth.signOut()}catch(e){}sessionStorage.clear();location.href="login.html"};
        document.getElementById("logout-btn")?.addEventListener("click",logout);document.getElementById("profile-logout")?.addEventListener("click",logout);
    }
});
