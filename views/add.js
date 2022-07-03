
        function disableFields() {
            dis = document.getElementsByClassName("in_db")
            disable_check = document.getElementsByClassName("form-check-input")
            for (i = 0; i < dis.length; i++) {
                for (j = 0; j < disable_check.length; j++) {
                    if (dis[i].id === disable_check[j].name) {
                        disable_check[j].disabled = true;
                    }
                }
            }
            disable_range = document.getElementsByClassName("form-control-range")
            for (i = 0; i < dis.length; i++) {
                for (j = 0; j < disable_range.length; j++) {
                    if (dis[i].id === disable_range[j].name) {
                        disable_range[j].disabled = true;
                    }
                }
            }

            disable_number = document.getElementsByClassName("form-control")
            for (i = 0; i < dis.length; i++) {
                for (j = 0; j < disable_number.length; j++) {
                    if (dis[i].id === disable_number[j].name) {
                        disable_number[j].disabled = true;
                    }
                }
            }
        }
        function clear_forms(id){
            for(i=0; i< id.length; i++) {
                document.getElementById(id[i]).style.display = "none";
            }
        }
        function option1(){
            if(document.getElementById("curtains").checked === true) {
                clear_forms(["locks", "lts", "tmp", "musics"])
                document.getElementById("crtns").style.display = "inline";
            }
        }
        function option2(){
            if(document.getElementById("security").checked === true) {
                clear_forms(["crtns", "lts", "tmp", "musics"])
                document.getElementById("locks").style.display = "inline";
            }
        }
        function option3() {
            if(document.getElementById("lights").checked === true) {
                clear_forms(["locks", "tmp", "musics", "crtns"])
                document.getElementById("lts").style.display = "inline";
            }
        }
        function option4() {
            if(document.getElementById("temp").checked === true) {
                clear_forms(["locks", "lts", "musics", "crtns"])
                document.getElementById("tmp").style.display = "inline";
            }
        }
        function option5() {
            if(document.getElementById("music").checked === true) {
                clear_forms(["locks", "lts", "tmp", "crtns"])
                document.getElementById("musics").style.display = "inline";
            }
        }
        function getSelectedValue(event){
            if(event.target.value === 3){
                document.getElementById("box1").style.display = "inline";
            }
        }
        function validateCurtainsForm(){
            let f = document.forms["curtainsForm"]["front_crt"].value;
            let b = document.forms["curtainsForm"]["back_crt"].value;
            let b1 = document.forms["curtainsForm"]["br1_crt"].value;
            let b2 = document.forms["curtainsForm"]["br2_crt"].value;
            const y = []
            if (f === "" && b === "" && b1 === "" && b2 === "") {
                alert("Please submit a value");
                return false;
            }
        }
        function validateSecurityForm(){
            let f = document.forms["securityForm"]["front_lock"].value;
            let b = document.forms["securityForm"]["back_lock"].value;
            let b1 = document.forms["securityForm"]["br1_lock"].value;
            let b2 = document.forms["securityForm"]["br2_lock"].value;
            const y = []
            if (f === "" && b === "" && b1 === "" && b2 === "") {
                alert("Please submit a value");
                return false;
            }
        }
        function validateLightsForm(){
            let f = document.forms["lightsForm"]["front_lts"].value;
            let b = document.forms["lightsForm"]["back_lts"].value;
            let b1 = document.forms["lightsForm"]["br1_lts"].value;
            let b2 = document.forms["lightsForm"]["br2_lts"].value;
            console.log(b2)
            if (f === "" && b === "" && b1 === "" && b2 === "") {
                alert("Please submit a value");
                return false;
            }
        }
        function validateTempForm(){

        }
        function validateMusicForm(){

        }
