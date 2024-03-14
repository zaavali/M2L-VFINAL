const request = require('supertest');
const app = require('../server');

describe('Test connexion', () => {
    it('jeton valide pour des identifiants valides', async () => {
    
        const validCredentials = {
            email: 'marion@gmail.com',
            mdp: '123', 
        };

       
        const response = await request(app)
            .post('/api/user/conn')
            .send(validCredentials);

       
        expect(response.status).toEqual(200);

        expect(response.body.token).toBeTruthy();

    });

    it('erreur si identifiants invalides', async () => {
     
        const invalidCredentials = {
            email: 'marion@gmail.com',
            mdp: 'motdepasseincorrect', 
        };

        
        const response = await request(app)
            .post('/api/user/conn')
            .send(invalidCredentials);

       
        expect(response.status).toEqual(401);

        expect(response.body.message).toEqual('Identifiants invalides');
    });
});