

export const sessionActive = ( action , data ) => {

    switch (action) {
        case 'refreshToken':
                localStorage.setItem('token',  data.token)
                localStorage.setItem('token-init-date',  new Date().getTime())
            break;
    
        default:
                localStorage.setItem('token',  data.token)
                localStorage.setItem('name',  data.name)
                localStorage.setItem('surname',  data.surname)
                localStorage.setItem('email',  data.email)
                localStorage.setItem('image',   data.image)
                localStorage.setItem('uid',   data.uid)
                localStorage.setItem('token-init-date',  new Date().getTime())
            break;
    }


} 