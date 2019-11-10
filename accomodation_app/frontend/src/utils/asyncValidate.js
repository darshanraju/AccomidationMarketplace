const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
import accommodation from '../apis/accommodation';

const asyncValidate = (values) => {
    return sleep(1000)
        .then(() => {
            var exists = 0;
            (async () => {

                var postData = {
                    "username": values.username
                }

                await accommodation.post('auth/username', postData)
                    .then(response => {
                        if (response.data.username == false) {
                            console.log("User Free? ", response.data.username)
                            exists = 1
                        }
                    })
                    .catch(err => {
                        console.log("In Catch Error: ", err)
                    });
                if (exists == 1) {
                    console.log("Throwing json")
                    throw { username: 'That username is taken FLAG' }
                }

            })();

        })
        .catch(err => console.log(err))
}

export default asyncValidate


// const response = await accommodation.post('auth/username', postData)
                // if (response.data.username == false) {
                //     throw { username: 'That username is taken FLAG' }
                // }

