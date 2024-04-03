const request = require('supertest');
const app = require('./server')

describe('Test Route GET /user', () => {
    it('Affichage Des Users ' , async () => {
        const res = await request(app)
        .get('/api/user/user')
        expect(res.status).toEqual(200);
    })
})


describe('Test Route GET /produits', () => {
    it('Affichage Des Produits ' , async () => {
        const res = await request(app)
        .get('/api/prod/produit')
        expect(res.status).toEqual(200);
    })
})


describe('Test de la fonction de connexion', () => {
    it('Devrait retourner un jeton valide pour des identifiants valides', async () => {
    
        const validCredentials = {
            email: 'Marion@gmail.com',
            mdp: '123', 
        };

       
        const response = await request(app)
            .post('/api/user/conn')
            .send(validCredentials);

       
        expect(response.status).toEqual(200);

        expect(response.body.token).toBeTruthy();

    });

    it('Devrait retourner une erreur pour des identifiants invalides', async () => {
     
        const invalidCredentials = {
            email: 'Marion@gmail.com',
            mdp: 'motdepasseincorrect', 
        };

        
        const response = await request(app)
            .post('/api/user/conn')
            .send(invalidCredentials);

       
        expect(response.status).toEqual(401);

        expect(response.body.message).toEqual('Identifiants invalides');
    });
});


describe('Test de la fonction de connexion', () => {
    it('Devrait retourner un jeton valide pour des identifiants valides', async () => {
    
        const validCredentials = {
            email: 'Eva@gmail.com',
            mdp: 'Eva', 
        };

       
        const response = await request(app)
            .post('/api/user/conn')
            .send(validCredentials);

       
        expect(response.status).toEqual(200);

        expect(response.body.token).toBeTruthy();

    });

    it('Devrait retourner une erreur pour des identifiants invalides', async () => {
     
        const invalidCredentials = {
            email: 'Eva@gmail.com',
            mdp: 'motdepasseincorrect', 
        };

        
        const response = await request(app)
            .post('/api/user/conn')
            .send(invalidCredentials);

       
        expect(response.status).toEqual(401);

        expect(response.body.message).toEqual('Identifiants invalides');
    });
});




describe('Test de la fonction d inscription', () => {
    it('Devrait retourner un jeton valide pour des identifiants valides', async () => {
    
        const validCredentials = {
            nom: "Yoann",
            email:'Yoann@gmail.com',
            mdp: 'Yoann', 
        };

     
        
        const response = await request(app)
            .post('/api/user/ins')
            .send(validCredentials);

        
        
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('Inscription réussie');

    });
    
});




describe('Test de la fonction de suppression d\'utilisateur', () => {
    it('Devrait supprimer un utilisateur avec succès', async () => {
       
        const response = await request(app)
            .delete('/api/user/user/714bdf6c-cf56-4060-8f4c-0e0527675b7e');

        
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('Utilisateur supprimé avec succès');
    });
});

describe('Test de la fonction d\'ajout de produit', () => {
    it('Devrait ajouter un produit avec succès', async () => {
        const newProduct = {
            nom: "Essai de produit",
            description: "Description du nouveau produit",
            prix: 100,
            quantite: 200
        };

        const response = await request(app)
            .post('/api/prod/produit')
            .send(newProduct);

        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('Produit ajouté avec succès');
    });
});
