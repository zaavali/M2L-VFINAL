import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CSS/Login.css'

export default function User() {
    const [formData, setFormData] = useState({ nom: '', email: '', mdp: '' });
  
    const [registrationMessage, setRegistrationMessage] = useState(''); // Declare registrationMessage

    const handleChangeData = (e) => {
        setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            await axios.post('http://localhost:4000/api/user/user', formData);
            console.log("Create request executed successfully!");
            // Set registration message on successful create
            setRegistrationMessage('Inscription réussie!');
        } catch (error) {
            console.error(error);
            // Set registration message on create failure
            setRegistrationMessage('Échec de l\'inscription');
        }
    }

    const recup = async () => {
        await axios.get('http://localhost:4000/api/user/user').then((res) => {
            console.log(res);
          
        });
    }

    useEffect(() => {
        recup();
    }, []);

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























// import { useEffect, useState } from 'react'
// import axios from 'axios'


// export default function User() {
//     const [formdata, setFormData] = useState({ nom: '', email: '', mdp: ''})
//     const [user, setUser] = useState([])
//     const [affichage, setAffichage] = useState(false)

//     const handleChangeData = (e) => {
//         setFormData((data) => ({ ...data, [e.target.name]: e.target.value }))
//     }

  

//     const handleCreate = async (e) => {
//         e.preventDefault()
//         console.log(formdata)
//         try {
//             await axios.post('http://localhost:4000/user/', formdata);
//             console.log("Create request executed successfully!");
//         } catch (error) {
//             console.error(error);
//         }
//     }

  
//     const recup = async () => {
//         await axios.get('http://localhost:4000/user/').then((res) => {
//             console.log(res)
//             setUser(res.data)
//             setAffichage(true)
//         })
//     }
 

//     useEffect(() => {
//         recup()
//     }, [])

//     return (
//         <div>
//             <h1>User Test</h1>
//             {affichage ? (
//                 user.map((user) => (
//                     <div key={user.uuid}>
//                         <fieldset>
//                             <p>id: {user.uuid}</p>
//                             <p> nom: {user.nom}</p>
//                             <p> email: {user.email}</p>
                          
//                         </fieldset>
//                     </div>
//                 ))
//             ) : (
//                 <p>Chargement...</p>
//             )}
//             <div>
             
//                 <form onSubmit={handleCreate}>
                
//                     <input
//                         onChange={handleChangeData}
//                         type='text'
//                         name='nom'
//                         placeholder='choose a name'
//                     />
//                     <input
//                         onChange={handleChangeData}
//                         type='text'
//                         name='email'
//                         placeholder='choose a mail'
//                     />
//                     <input
//                         onChange={handleChangeData}
//                         type='password'
//                         name='mdp'
//                         placeholder='choose a password'
//                     />
                 
//                     <button type='submit'>Create an user</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

















/*import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CSS/LoginSignUp.css';

const LoginSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/signup', formData);
      console.log('Registration successful:', response.data);

      // Set the registration message
      setRegistrationMessage('Inscription réussie!');

      // You can reset the form if needed
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Registration failed:', error.message);

      // Set the registration message for failure
      setRegistrationMessage('Échec de l\'inscription');
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Je suis nouveau ici</h1>
        <form className='loginsignup-fields' onSubmit={handleRegistration}>
          <input type='text' name='name' placeholder='Nom' value={formData.name} onChange={handleChange} />
          <input type='email' name='email' placeholder='Adresse e-mail' value={formData.email} onChange={handleChange} />
          <input type='password' name='password' placeholder='Mot de passe' value={formData.password} onChange={handleChange} />
          <button type='submit'>S'inscrire</button>
        </form>
        <p className="registration-message">{registrationMessage}</p>
        <p className="loginsignup-login">
          Déjà inscrit ? <Link to="/login" className="no-underline">Connectez-vous ici</Link>
        </p>
        {/* <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>En continuant, j'accepte les conditions d'utilisation et de confidentialité.</p>
        </div> }
      /*</div>
    </div>
  );
};*/

/*export default LoginSignUp;*/
