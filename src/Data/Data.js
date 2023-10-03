// import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
// import Config from 'react-native-config'

// Check if the Firebase app has already been initialized
// if (!firebase.apps.length) {
//     // Your secondary Firebase project credentials...
//     const credentials = {
//         apiKey: Config.API_KEY,
//         authDomain: Config.AUTH_DOMAIN,
//         databaseURL: Config.DATABASE_URL,
//         projectId: Config.PROJECT_ID,
//         storageBucket: Config.STORAGE_BUCKET,
//         messagingSenderId: Config.MESSAGING_SENDER_ID,
//         appId: Config.APP_ID
//     }
// }

// Create a dataAPI variable to store the retrieved data
let dataAPI = []
export let dataAPITitle
export let dataAPIGreet = []
export let dataAPIToken = []

database()
    .ref('/app/token')
    .on(
        'value',
        snapshot => {
            dataAPIToken = snapshot.val()
        },
        error => {
            console.log('Firebase database request failed:', error)
        }
    )

// Retrieve data from Firebase and update dataAPIGreet object
database()
    .ref('/greet')
    .on(
        'value',
        snapshot => {
            dataAPIGreet = snapshot.val()
        },
        error => {
            console.log('Firebase database request failed:', error)
        }
    )

// Retrieve data from Firebase and update dataAPITitle
database()
    .ref('/app')
    .on(
        'value',
        snapshot => {
            const data = snapshot.val()
            dataAPITitle = data.app_title
        },
        error => {
            console.log('Firebase database request failed:', error)
        }
    )

// Retrieve data from Firebase and update dataAPI array
database()
    .ref('/recipes')
    .on(
        'value',
        snapshot => {
            dataAPI = []
            const data = snapshot.val()

            Object.keys(data).forEach(key => {
                const recipe = data[key]
                const {
                    d_title,
                    d_description,
                    image,
                    isFavorite,
                    ingredients,
                    ingredients_value
                } = recipe

                dataAPI.push({
                    id: key,
                    d_title,
                    d_description,
                    ingredients,
                    ingredients_value,
                    image,
                    isFavorite
                })
            })
        },
        error => {
            console.log('Firebase database request failed:', error)
        }
    )

export {dataAPI}
