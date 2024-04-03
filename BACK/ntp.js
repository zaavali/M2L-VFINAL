const ntpClient = require('ntp-client');

// Fonction pour synchroniser l'horloge avec un serveur NTP
function syncClockWithNTP() {
    ntpClient.getNetworkTime("pool.ntp.org", 123, function(err, date) {
        if (err) {
            console.error("Erreur lors de la synchronisation de l'horloge avec NTP : ", err);
            return;
        }
        console.log("L'heure a été synchronisée avec succès avec le serveur NTP. Heure actuelle : " + date);
    });
}

// Appel de la fonction pour synchroniser l'horloge avec NTP
syncClockWithNTP();