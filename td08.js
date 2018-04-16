/* TD08 - UsersBDD - Le désérialisation de l'enfer

Vous reçevez d'un serveur un fichier CSV contenant 1000 entrées utilisateurs, 
celui-ci vous est donné dans la constante rawData 
(celle-ci est une string, n'hésitez pas à la console.log pour la visualiser).

La classe User, visant à contenir les informations d'une entrée 
utilisateur vous est donnée à titre indicatif vous pouvez la modifier à votre 
convenance tant que les tests passent à la fin!

La classe UsersBDD devra à son instanciation prendre un paramètre rawData qui correspondra 
à la donnée brute que le serveur vous renvoie. Elle ne sera pas directement parsée, juste
stockée dans votre classe UsersBDD dans un premier temps.

Le processus de déserialisation (parsing des données CSV en objets JS) peut prendre du temps,
et doit donc être fait de manière ASYNCHRONE ! Vous l'effectuerez dans la Promise d'une méthode 
init de UsersBDD (à ajouter).

Attention ! Si le paramètre fourni à UsersBDD est invalide, vous devrez reject un message
d'erreur dans le .catch de la Promise d'init.

Une fois votre UsersBDD initialisée avec init, nous devons pouvoir utiliser les méthodes 
suivantes d'UsersBDD (à ajouter) :

- init() - Retourne une Promise qui parse votre CSV
- get(id) - Retourne l'objet User lié à un ID dans la base de données
- put(user) - Ajoute un utilisateur dans votre instance d'UsersBDD (il n'est pas nécessaire de modifier rawData)
- getByEmail(email) - Retourne l'utilisateur associé à l'email spécifié
- getByIP(ip) - Retourne l'utilisateur associé à l'adresse IP spécifiée
- getByFirstName(firstName) - Retourne LES utilisateurs ayant firstName pour prénom

*/

const rawData = require('./bdd.js')

class User {
    constructor(id, firstName, lastName, email, gender, ip) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.gender = gender
        this.ip = ip
    }
}

class UsersBDD {
    constructor(rawData) {
        this.raw = rawData
        this.userCollection = []
    }

    init() {
        let promise = new Promise((resolve, reject) => {
            var tab_user = this.raw.split('\n');
        for (const item of tab_user) {
            var tab_user = item.split(',');
            if (tab_user.length != 6) {
                reject('Erreur')
            }
            else {
                this.userCollection.push(new User(parseInt(tab_user[0]), tab_user[1], tab_user[2], tab_user[3], tab_user[4], tab_user[5], tab_user[6]))
            }
        }
        // console.log(this.userCollection);
        resolve(this.userCollection);
    })
        return promise;
    }
    get(id) {
        return this.userCollection.find(res => res.id === id)
    }
    put(user) {
        this.userCollection.push(user)
    }
    getByEmail(email) {
        return this.userCollection.find(res => res.email === email)
    }
    getByIP(ip) {
        return this.userCollection.find(res => res.ip === ip)
    }
    getByFirstName(firstName) {
        return this.userCollection.filter(res => res.firstName === firstName)
    }
    get length() {
        console.log(this.userCollection.length);
        return this.userCollection.length;
    }

}

/* Testing Part */
const TD = 'TD :: 08 '
const usersBDD = new UsersBDD(rawData)

usersBDD
    .init()
    .then(() => {
        const test = () => {
            const user = new User(usersBDD.length + 1, 'Logan', 'Paul', 'lpaul-pro@gmail.com', 'Male', '127.0.0.1')
            const bddLength = usersBDD.length
            usersBDD.put(user)
            if (bddLength === usersBDD.length) {
                return TD + 'Failed 1'
            }
            if (usersBDD.get(100).id !== 100) {
                return TD + 'Failed 2'
            } else if (usersBDD.getByEmail('ldykesrn@businessinsider.com').id !== 996) {
                return TD + 'Failed 3'
            } else if (usersBDD.getByIP('101.135.3.254').id !== 1000) {
                return TD + 'Failed 4'
            } else if (usersBDD.getByFirstName('Eleonore').length !== 2) {
                return TD + 'Failed 5'
            }
            return  TD + 'Success \\o/'
        }
        console.log(test())
    })
    .catch((error) => console.error(error))
