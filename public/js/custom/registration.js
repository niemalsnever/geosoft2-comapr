function validateRegForm() {
    if($("form#regForm")[0].checkValidity()) {
        console.log("foo");
        $("button#regSubmit")[0].disabled = false;
    }
}