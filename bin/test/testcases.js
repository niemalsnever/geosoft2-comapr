var apiFunctions = require('../etc/api_functions.js');
require('../etc/db_setup.js')

apiFunctions.registerUser('Heinz', 'heinz@test.de' , 'Muenster', 'Deutschland', 'hallo',  function (err) {
    console.log("heinz");
});
apiFunctions.registerUser('Hans', 'hans@test.de' , 'Muenster', 'Deutschland', 'hallo',  function (err) {
    console.log("hans");
});
apiFunctions.newProject('testtesttest', 1 ,function(err){
    console.log("new project");
});

apiFunctions.shareProject('21053525068941d7c9194af346b4036e', 1, 'hans@test.de',true, true,true, function(err) {
    console.log("mit hans geteilt");
});