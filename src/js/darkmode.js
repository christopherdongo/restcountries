const darkmode = document.getElementById('image');
const styles = document.documentElement.style;
let val = !true

const lightTheme = {
    '--headertitle':'hsl(200, 15%, 8%)',
    '--darkgraylight':'hsl(0, 0%, 52%)',
    '--verylightgray': 'hsl(0, 0%, 98%)',
    '--white':'hsl(0, 0%, 100%)',
}

const darkTheme = {
    '--darkgraylight':'hsl(209, 23%, 22%)',
    '--verylightgray': 'hsl(207, 26%, 17%)',
    '--white': 'hsl(200, 15%, 8%)',
    '--headertitle':'hsl(0, 0%, 100%)'
}

const changeTheme = theme =>{
    const customStyle = Object.keys(theme)
    for(const style of customStyle){
        console.log(theme[style])
        styles.setProperty(style, theme[style])
    }
}

darkmode.addEventListener('click', (e)=>{
    if(val){
        ChangeValor(false)
        darkmode.src="assets/sun.svg"
        changeTheme(lightTheme)
    }else{
        ChangeValor(true)
        darkmode.src="assets/moon.svg"
        changeTheme(darkTheme)
          
    }
})

const ChangeValor=(valor)=>{
    val=valor
}