const changeTheme = (): void => document.body.classList.contains("lightmode") ? document.body.classList.remove("lightmode") : document.body.classList.add("lightmode")
export default changeTheme;