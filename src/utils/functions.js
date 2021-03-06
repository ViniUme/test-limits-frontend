export async function VerifyUser(user){
    const init = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    return await fetch('/api/verify-user', init)
        .then(response => response.json())
        .then( async (json) => {
            if(json.response === true){
                console.log("existe")
                return true
            }
            else{
                console.log("criando")
                const create = await CreateUser(json.email);
                console.log(create);
                if(create === true){
                    console.log("feito");
                    return true
                }
            }
        })
}

export function CreateUser(user){

    const body = {
        email: user,
        wish: []
    }
    const init = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    return fetch("/api/create-user", init)
        .then(response => response.json())
        .then((json) => {
            if(json.message === true){
                return true
            }
        })
}

export async function AddWishList(product, user){

    const check = await VerifyUser(user);

    if(check === true){

        const info = await VerifyWishList(user)
        const wish = info.wish
        wish.push(product)
        const newInfo = [
            info.email,
            {
                email: info.email,
                wish: wish
            }
        ]
        
        const init = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newInfo)
        }

        fetch("/api/add-wish-list", init)
    }
}

export function VerifyWishList(user){
    const init = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    return fetch("/api/verify-wish-list", init)
        .then(response => response.json())
        .then((json) => {return json})
}