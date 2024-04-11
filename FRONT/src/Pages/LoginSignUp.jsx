import {  useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CSS/Login.css'

export default function User() {
    const [formData, setFormData] = useState({ nom: '', email: '', mdp: '' });
  
    const [registrationMessage, setRegistrationMessage] = useState(''); 

    const handleChangeData = (e) => {
        setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            await axios.post('http://192.168.1.420:4000/api/user/ins', formData);
            console.log("Create request executed successfully!");
          
            setRegistrationMessage('Inscription réussie!');
        } catch (error) {
            console.error(error);
          
            setRegistrationMessage('Échec de l\'inscription');
        }
    }

  

   

    return (
        <div className='loginsignup'>
            <div className='loginsignup-container'>
                <h1>Je suis nouveau ici</h1>
                <form className='loginsignup-fields' onSubmit={handleCreate}>
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='nom'
                        placeholder='Nom'
                        value={formData.nom}
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='email'
                        placeholder='Adresse e-mail'
                        value={formData.email}
                    />
                    <input
                        onChange={handleChangeData}
                        type='password'
                        name='mdp'
                        placeholder='Mot de passe'
                        value={formData.mdp}
                    />
                    <button type='submit'>S'inscrire</button>
                </form>
                <p className="registration-message">{registrationMessage}</p>
                <p className="loginsignup-login">
                    Déjà inscrit ? <Link to="/login" className="no-underline">Connectez-vous ici</Link>
                </p>
            </div>
        </div>
    );
}























