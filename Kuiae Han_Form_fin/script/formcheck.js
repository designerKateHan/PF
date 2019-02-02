let formChecker = (function(){

    function numbersOnly(testStr){
        let numCheck = /^[0-9]+$/
        if(numCheck.test(testStr)){
            return true;
        }
        return false;
    }

    function charsOnlyTest(testStr){
        let nameCheck = /^[a-zA-z]+$/;
        if(nameCheck.test(testStr)){
            return true;
        }
        return false;
    }

    function phoneOnlyCheck(testStr){
      let phoneCheck = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if(phoneCheck.test(testStr)){
          return true;
      }
  }

    function validateEmail(testStr){
      let emailCheck = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(emailCheck.test(testStr)){
          return true;
      }
      return false;
    }

    function hasValue(testStr){
        if(testStr!=null && testStr.length>=1){
            return true;
        }
        return false;
    }
// Checking Info
    function radioCheckedValue(checkName){
        if(event.target.querySelector(`input[name=${checkName}]:checked`)){
            return event.target.querySelector(`input[name=${checkName}]:checked`).value;
        }

            return null;

    }
    function errorsCheck(valuesList){
        let errors=[];
            valuesList.forEach((item) => {
                if((item.func)(item.val)==false){
                    errors.push(`<p>${item.errMsg}</p>`);
                }
            });
        return errors;
    }

    function canSubmit(errorsList){
        if(errorsList.length>0){
            showErrors(errorsList);
            return false;
        }

        else{
          var phoneCheck=document.querySelector('input[name="phonenumber"]');
            if(phoneCheck.value == "777-777-7777"){
              alert('WOW You have a Lucky Number');
              return true;
          }
        }

        return true;
    }


    function showErrors(errorsList){
        let errorDisplay = event.target.querySelector("#errors");
        errorDisplay.innerHTML=errorsList.join('');
    }

    function checkForm(event){
        event.preventDefault();

        //
        let submitValues = {};
        // Personal Info
        submitValues.first_name = event.target.querySelector("#first_name").value;
        submitValues.last_name = event.target.querySelector("#last_name").value;
        submitValues.gender = radioCheckedValue('gender');
        submitValues.month = event.target.querySelector("select[name=month]").value;
        submitValues.date = event.target.querySelector("#date").value;
        submitValues.year = event.target.querySelector("#year").value;
        submitValues.phonenumber = event.target.querySelector("#phonenumber").value;
        submitValues.emailAddress = event.target.querySelector("#emailAddress").value;
        // Vacation Info
        submitValues.when = radioCheckedValue('when');
        submitValues.where = radioCheckedValue('where');
        submitValues.who = event.target.querySelector("select[name=who]").value;
        submitValues.withName  = event.target.querySelector("#withName").value;
        submitValues.reason  = event.target.querySelector("#reason").value;

        let errorsList = errorsCheck(
            [
                {val:submitValues.first_name, func:hasValue, errMsg:"1)Please enter your First name"},
                {val:submitValues.last_name, func:charsOnlyTest, errMsg:"2)Please enter your Last name"},
                {val:submitValues.gender, func:hasValue ,errMsg:"3)Please enter a Gender"},
                {val:submitValues.month, func:hasValue, errMsg:"4)Please select Month"},
                {val:submitValues.date, func:numbersOnly, errMsg:"5)Please enter Date of your birthday"},
                {val:submitValues.year, func:numbersOnly, errMsg:"6)Please enter Year of your birthday"},
                {val:submitValues.phonenumber, func:phoneOnlyCheck, errMsg:"7)Please enter your Phonenumber"},
                {val:submitValues.emailAddress, func:validateEmail, errMsg:"8)Please enter your e-mail"},
                // Vacation Info Error Check
                {val:submitValues.when, func:hasValue, errMsg:"9)Please select When"},
                {val:submitValues.where, func:hasValue, errMsg:"10)Please select Where"},
                {val:submitValues.who, func:hasValue, errMsg:"11)Please select Who"},
                {val:submitValues.withName, func:hasValue, errMsg:"12)Please write the name"},
                {val:submitValues.reason, func:hasValue, errMsg:"13)Please write the reason"}
            ]);

        if(canSubmit(errorsList)){
            alert('Good Luck for the Free Flight Ticket!');
            console.log("I am ready for submit");
            console.table(submitValues);
            event.target.reset();
        }

    }

    return {
        initForm: function(userForm){
            userForm.addEventListener("submit", checkForm);
        }
    }

})();
