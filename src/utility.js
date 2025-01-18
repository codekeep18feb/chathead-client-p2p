export function isKeyTrue(data, context, key) {
  console.log("dataconterkey", data, context, key);
  console.log("erwewqrwerrwertertewrt", data[context][key]);
  return data[context][key];
}

function generateUniqueId() {
  return `${Date.now().toString().slice(-5)}${Math.floor(Math.random() * 10)}`;
}

export function getNextCorrectLength(id, opt) {
  console.log("hwomanytimes", opt);
  let chat_body = document.getElementById(id);

  // Count all child nodes (including text nodes and comment nodes)
  // let totalNodes = chat_body.childElementCount;
  // const next_msg_id = "msg_id__" + (totalNodes + 1);
  // return next_msg_id;
  const uuid = generateUniqueId();
  console.log(uuid); // Example: 134561
  const next_msg_id = "msg_id__"+uuid
  return next_msg_id;
}

export function updateLiveServer(bodyContent, headersList) {
  fetch(
    "https://tjlin02sxa.execute-api.ap-south-1.amazonaws.com/prod/update_ls_user",
    {
      method: "PUT",
      body: bodyContent,
      headers: headersList,
    }
  )
    .then((response) => response.text())
    .then((data) => {
      console.log("successfully send notification data", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function awayHandler(loggedInUser, socket, apptyp, version, identifiers) {
  console.log("this sis the apptyp, versionsdf", apptyp, version,socket);
  console.log("what is ths invoking?",loggedInUser);

  const awayLimit = 1000 // * 60 * 5; // 1 minute in milliseconds
  let awayTimer = null;
  const token = localStorage.getItem("tezkit_token");

  // Function to handle user away status
  function handleUserAway() {
    console.log(
      "User has been away for more than 1 minute; here will send soc status message (OFFLINE)"
    );
    console.log("Isnt Userddddd just away!");

    console.log(token, "tokensdfasdfdssdaloggedInUser", loggedInUser);

    if (apptyp == "P2A" && version == "V1") {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: token,
        "Content-Type": "application/json",
      };

      console.log("arewe here??what is the bodyCoentn", loggedInUser);

      // let bodyContent = JSON.stringify({ ...loggedInUser, is_online: false });

      let bodyContent = JSON.stringify({  
        "is_online": false,
        "tenant": loggedInUser.tenant,
        "user_data": {
        "email": loggedInUser.email
        }
      });

      console.log("arewe heredyContent in away handler", bodyContent);

      updateLiveServer(bodyContent, headersList);

      // socket.emit("ON_USER_LIVE_STATUS", {
      //   status: false,
      //   frm_user: {
      //     id: loggedInUser.id,
      //     user: loggedInUser.full_name,
      //     user_type: "ADMIN",
      //   },
      // });

    }

    else if (apptyp == "P2A" && version == "V2") {
      const tezkit_app_data = localStorage.getItem("tezkit_app_data");

      const tezkit_app_pdata = JSON.parse(tezkit_app_data);

      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "x-api-key": tezkit_app_pdata.auth_key,
        
        "Content-Type": "application/json",
      };

      console.log("ahere is p2a v2.1", loggedInUser);

      let bodyContent = JSON.stringify({ ...loggedInUser, is_online: false });

      console.log("arewe heredyContent in handlerUseraway", bodyContent,loggedInUser);

      updateLiveServer(bodyContent, headersList);

      // socket.emit("ON_USER_LIVE_STATUS", {
      //   status: false,
      //   frm_user: {
      //     id: identifiers["name_idn"], //loggedInUser.uid,
      //     user: identifiers["name_idn"], //loggedInUser.uid,
      //     user_type: "ADMIN",
      //   },
      // });
    }

  

  }

  
  // Event listeners for user activity
  function resetAwayTimer() {
    // socket.emit('ON_USER_LIVE_STATUS', { status: true, id: 1 },);

    clearTimeout(awayTimer);
  }

  document.addEventListener("visibilitychange", function () {
    const tezkit_app_data = localStorage.getItem("tezkit_app_data");

    const tezkit_app_pdata = JSON.parse(tezkit_app_data);

    console.log(
      JSON.stringify(tezkit_app_pdata),
      "tezkit_app_pdata can you check if the key is found?",
      "receive_live_status_from_connected_clients"
    ); // Output: false

    const beta_toggle = isKeyTrue(
      tezkit_app_pdata.beta_toggle,
      "consumer",
      "send_live_status_to_connected_clients"
    );
    console.log("here is result", beta_toggle); // This should output false
    if (beta_toggle.enable) {
      if (document.hidden) {
        // Start away timer if the tab becomes hidden
        awayTimer = setTimeout(handleUserAway, awayLimit);
      } else {
        // Clear away timer if the tab becomes visible again
        resetAwayTimer();

        let chat_type = "PEER2ADMINBOT";
        //later on this above hardcoded chat type will be real app setting data??

        if (chat_type == "PEER2ADMINBOT") {
          console.log("Isnt Userddddd just Back!");

          const token = localStorage.getItem("tezkit_token");
          console.log(token, "tokensdfasdfsdaloggedInUser", loggedInUser);

          let headersList = {};

          if (apptyp == "P2A" && version == "V1") {
            headersList = {
              Accept: "*/*",
              "User-Agent": "Thunder Client (https://www.thunderclient.com)",
              Authorization: token,
              "Content-Type": "application/json",
            };
      
            console.log("arewe here??what is the bodyCoentn", loggedInUser);
      
            // let bodyContent = JSON.stringify({ ...loggedInUser, is_online: false });
      
            let bodyContent = JSON.stringify({  
              "is_online": true,
              "tenant": loggedInUser.tenant,
              "user_data": {
              "email": loggedInUser.email
              }
            });
      
            console.log("arewe heredyContent when document is visibl3e", bodyContent, loggedInUser);
      
            updateLiveServer(bodyContent, headersList);
      
            // socket.emit("ON_USER_LIVE_STATUS", {
            //   status: true,
            //   frm_user: {
            //     id: loggedInUser.id,
            //     user: loggedInUser.full_name,
            //     user_type: "ADMIN",
            //   },
            // });
      
          }
      
          else if (apptyp == "P2A" && version == "V2") {
            let headersList = {
              Accept: "*/*",
              "User-Agent": "Thunder Client (https://www.thunderclient.com)",
              "x-api-key": tezkit_app_pdata.auth_key,
              "Content-Type": "application/json",
            };
      
            console.log("ahere is p2a v2.1", loggedInUser);
      
            let bodyContent = JSON.stringify({ ...loggedInUser, is_online: true });
      
            // let bodyContent = JSON.stringify({  
            //   "is_online": false,
            //   "tenant": loggedInUser.tenant,
            //   "user_data": {
            //   "email": loggedInUser.email
            //   }
            // });
      
            console.log("arewe heredyContent doc visisbility is true", bodyContent,loggedInUser);
      
            updateLiveServer(bodyContent, headersList);
      
            // socket.emit("ON_USER_LIVE_STATUS", {
            //   status: true,
            //   frm_user: {
            //     id: loggedInUser[identifiers["name_idn"]],
            //     user: loggedInUser[identifiers["name_idn"]],
            //     user_type: "ADMIN",
            //   },
            // });
         
         
          }
        }
      }
    }
  });
}

export async function setAppData(app_name, api_key) {
  console.log("was it called??");
  if (!app_name || !api_key) {
    console.error("app_name not provided to the client!");
    return;
  }

  console.log("arerewrewrew");
  const reqUrl = `https://5p6f350xba.execute-api.ap-south-1.amazonaws.com/prod/get_app?act_type=user_type&app_name=${app_name}`;
  const headersList = {
    Accept: "*/*",
    "X-API-Key": api_key, //THIS ONE SHOULD BE PICKED FROM index.html
  };

  try {
    const response = await fetch(reqUrl, {
      method: "GET",
      headers: headersList,
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }

    const data = await response.json();
    console.log("APP DATA", data);
    // localStorage.setItem("tezkit_app_data", JSON.stringify(data));
    return data
  } catch (error) {
    console.error("Request failed:", error);
  }
}
