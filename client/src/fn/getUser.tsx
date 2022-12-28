//client/src/fn/getUser.tsx

//Returns currently logged in user, or null if not logged in
export default function getUser(){
    return new Promise((resolve, reject) => {
        fetch("getUser")
        .then(res => res.json())
        .then(user => {
            resolve(user);
        })
        .catch(err => {
            console.error("Failed to fetch user: ");
            console.error(err);
            reject(err);
        });
    })
}