var apiFunctions = require('../etc/api_functions.js');
require('../etc/db_setup.js')

apiFunctions.registerUser('Heinz', 'heinz@test.de' , 'Muenster', 'Deutschland', 'hallo',  function (err) {
    if (!err) {
        console.log("User 'Heinz' successfully created");
    } else {
        console.error(err);
    }
});
apiFunctions.registerUser('Hans', 'hans@test.de' , 'Muenster', 'Deutschland', 'hallo',  function (err) {
    if (!err) {
        console.log("User 'Hans' successfully created");
    } else {
        console.error(err);
    }
});
apiFunctions.newProject('testtesttest', 1 ,function(err){
    if (!err) {
        console.log("Created new project 'testtesttest'");
    } else {
        console.error(err);
    }
});

apiFunctions.shareProject('21053525068941d7c9194af346b4036e', 1, 'hans@test.de',true, true, true, function(err) {
    if (!err) {
        console.log("Shared Project with Hans");
    } else {
        console.error(err);
    }
});