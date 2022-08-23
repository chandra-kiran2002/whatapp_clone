var chat=[1,2,3,4,5,6,7,8,9,10]
        var currentTo=null;
        var from=24
        window.onload = function exampleFunction() {
                var x =document.cookie.split(";")[0].split("=")[1].split(" ")
                from=x[1]
                document.getElementById("username").innerHTML="hi "+x[0]
                update()
            }
            window.onbeforeunload = function () {
            alert("fgsdgs")
            }
            // function everyTime() {
            //     // console.log('each 1 second...');
            //     if(from!=null)
            //     update()
            //     if(currentTo!=null)
            //     updatechat(0)
                
            // }

            // var myInterval = setInterval(everyTime, 500);
            function chatting(a){
                currentTo=a.getAttribute('name')
                console.log(a.getAttribute('name'))
                console.log(a.childNodes[1].childNodes[0].innerHTML)
                document.getElementById("toname").innerHTML=a.childNodes[1].childNodes[0].innerHTML
                updatechat(1)
                if(screen.width < 767){
                removestylelinks()
            create("css/chat.css")
                }
            }
          function fun(){
            if(screen.width < 767){
            removestylelinks()
            create("css/persons.css")
            }
          }
          function removestylelinks(){  
            var ary = document.getElementsByTagName("link");
            console.log(ary.length)
            for (var i=0;i<ary.length;i++) {
            var s1 = ary[i].href.split("/")
            s1=s1[s1.length-1]
            if(s1=="chat.css" || s1=="style.css" || s1=="persons.css" )
            ary[i].parentNode.removeChild(ary[i]);
          console.log("sadf")
        }
        }
        function create(x){
             var head = document.getElementsByTagName('HEAD')[0];
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = x;
            head.appendChild(link);
        }
        if(screen.width < 767){
            console.log("cdsfgth")
            
            removestylelinks()
            create("css/persons.css")
        }    
        function send(){
            var message=document.getElementById("messagevalue").value
            document.getElementById("messagevalue").value=""
            if(message!=""){
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "from": from,
                "to": currentTo,
                "message":message
                });

                var requestOptions = {
                method: 'POST',
                mode:'cors',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("https://chat-clone1.herokuapp.com/uploadmessage", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result)
                    updatechat(1)
                    update()
                })
                .catch(error => console.log('error', error));
            }
        }
        function update(){
                if(from!=null){
                    var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "from": from
                });

                var requestOptions = {
                method: 'POST',
                mode:'cors',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("https://chat-clone1.herokuapp.com/getprofiles", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)   
                    var scrollHtml=""
                     for(var i=0;i<result.length;i++){
                        scrollHtml+="<li class='clearfix' name='"+ result[i].chatlist+"' onclick='chatting(this)'><img src='https://bootdey.com/img/Content/avatar/avatar1.png' alt='avatar'><div class='about'><div class='name'>"+result[i].name+"</div><div class='status'> <i class='fa fa-circle offline'></i> left 7 mins ago </div></div></li>"
                    }
                    document.getElementById("scroll").innerHTML=scrollHtml  
                                   
                        })
                        .catch(error => console.log('error', error));
                }
            
        }
        // function fun(a){
        //     currentTo=a.name
        //     document.getElementById("toname").innerHTML=a.childNodes[0].childNodes[0].childNodes[0].childNodes[1].innerText
        //     console.log(a.childNodes[0].childNodes[0].childNodes[0].childNodes[1].innerText)
        //     document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight);
        //     console.log(a.name)
        //     updatechat(1)
        // }
        
        function updatechat(x){
              if(currentTo!=null){
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "from": from,
                "to":currentTo
                });

                var requestOptions = {
                method: 'POST',
                mode:'cors',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("https://chat-clone1.herokuapp.com/getmessages", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result) 
                    var chatresult =""
                    for(var i=0;i<result.length;i++){
                        if(result[i].from==from){
                            console.log(result[i].from+"  "+from)
                            chatresult+="<li class='clearfix'><div class='message-data text-right'><span class='message-data-time'>10:10 AM, Today</span></div><div class='message other-message float-right'>"+result[i].message+"</div></li>"
                        }
                        else{
                            chatresult+="<li class='clearfix'><div class='message-data text-right'><span class='message-data-time'>10:10 AM, Today</span></div><div class='message my-message'>"+result[i].message+"</div></li>"
                        }
                    }
                    document.getElementById("chatting").innerHTML=chatresult
                    // if(x==1)
                    // document.getElementById("chatting").scrollTo(0, document.getElementById("chat").scrollHeight);
                    

                 })
                        .catch(error => console.log('error', error));
              }
            
        }
        function searchuser(){
            var input=document.getElementById("searchuser").value
            if(input!=null){
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "user": input
                });

                var requestOptions = {
                method: 'POST',
                mode:'cors',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("https://chat-clone1.herokuapp.com/msgtonew", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result) 
                    if(result.length==1){
                    currentTo=result[0].id
                    document.getElementById("toname").innerHTML=result[0].name
                    document.getElementById("searchuser").value=""
                    if(screen.width < 767){
                        console.log("cdsfgth")
                        
                        removestylelinks()
                        create("css/chat.css")
                    }
                    aler("user found")
                    }
                    else{
                        alert("user not found")
                    }

                 })
                        .catch(error => console.log('error', error));
              
            }
        }
        