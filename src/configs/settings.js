if(!localStorage.getItem('theme')) localStorage.setItem('theme', 'light');
if(!localStorage.getItem('default_language')) localStorage.setItem('default_language', 'pt');

window.addEventListener('keydown', (e) => {
    //cambiar el tema = Ctrl + Alt + T
    if (e.ctrlKey && e.altKey && e.key === 't') {
        if (localStorage.getItem('theme') === 'light') {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        window.location.reload();
    }
    //limpiar cache menos el token = Ctrl + Alt + C
    if (e.ctrlKey && e.altKey && e.key === '₢') {
        // let token = localStorage.getItem('token');
        localStorage.clear();
        // localStorage.setItem('token', token);
        console.log("Cache limpiada")
        window.location.reload();
    }
    //cambiar el idioma = Ctrl + Alt + N = Inglés / S = Español / P = Portugués
    if(e.ctrlKey && e.altKey){
        let lang = localStorage.getItem('default_language');
        switch(e.key){
            case 'n':
                if(lang!=='en') localStorage.setItem('default_language', 'en');
                break;
            case 's':
                if(lang!=='es') localStorage.setItem('default_language', 'es');
                break;
            case 'p':
                if(lang!=='pt') localStorage.setItem('default_language', 'pt');
                break;
            default:
                break;
        }
        if(e.key==='n' || e.key==='s' || e.key==='p') window.location.reload();
    }
});
export const Theme = localStorage.getItem('theme')
export const DefaultLanguage = localStorage.getItem('default_language');
export const AllowAnimations = true;