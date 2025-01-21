import { loggedInUser } from "./index";
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



export  const check_if_user_exists = async (api_key, app_name, uid, tenant) => {
    const myHeaders = new Headers();
    // myHeaders.append("X-API-Key", api_key);
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        `https://gfxb0jf19k.execute-api.ap-south-1.amazonaws.com/prod/does_user_exist?app_name=${app_name}&uid=${uid}&tenant=${tenant}`,
        requestOptions
      );
  
      const textResult = await response.text();
      console.log("result", textResult, typeof textResult);
  
      // Parse the result if it's JSON
      const result = JSON.parse(textResult);
      console.log("Parsed result", result);
  
      // if (!result.success) {
      //   // logged in user does not exist in database
      //   // HERE RAISE AN ERROR
      //   throw new Error("User does not exist in the database.");
      // }
  
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error for further handling if needed
    }
  };

  // loggedInUser.app_name, p_data.message.frm_user.id
export function informPeerSysAboutBULKMsgsStatus(
    socket,
    ret_ids,
    status = "DELIVERED",
    app_name,
    user_id
  ) {
    console.log("show me what do e iahve", loggedInUser);
  
    // const userKey = !user.hasOwnProperty('uid') ? `user__${user.id}` : `user__${user.uid}`;
  
    const right_global_id = "global_for__" + loggedInUser.tenant_info.id;
    socket.emit("ON_MESSAGE_BULK_STATUS_UPDATE", {
      ret_ids: ret_ids, // THIS WILL BE DYNAMIC IN NATURE upda
      room: right_global_id,
      status: status,
      timestamp: Date.now(),
      app_name,
      user_id,
    });
  }



export async function fetchBotContent(app_name, tenant) {
   console.log("ensure tenant_id is tenant_id", tenant);
   const myHeaders = new Headers();
   myHeaders.append("x-api-key", "bGVnYWwxMjNfX1NFUFJBVE9SX190ZXN0ZGRk");
 
   const raw = "";
 
   const requestOptions = {
     method: "GET",
     headers: myHeaders,
     // body: raw,
     redirect: "follow",
   };
 
   try {
     const response = await fetch(
       `https://sk5ge5ejhd.execute-api.ap-south-1.amazonaws.com/prod/get_bot_content?app_name=${app_name}&tenant_id=${tenant}`,
       requestOptions
     );
     const result = await response.json();
     console.log(result);
     return result;
   } catch (error) {
     console.error(error);
   }
 }


export async function fetchMessages(apiUrl, loadingElement) {
    const tezkit_app_data = localStorage.getItem("tezkit_app_data");
  
    loadingElement.textContent = "Loading...";
  
    const tezkit_app_pdata = JSON.parse(tezkit_app_data);
  
    console.log(
      tezkit_app_pdata.tenant_info.id,
      "tezkit_apdsp_datdasdfsdf",
      loggedInUser.uid
    );
    try {
      const token = localStorage.getItem("tezkit_token");
  
      if (!token && tezkit_app_pdata.settings.version == "V1") {
        throw new Error("Token is missing");
      }
      let response = null;
      if (tezkit_app_pdata.settings.version == "V1") {
        console.log("arenot u going frm here???");
        response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: token,
            Accept: "application/json",
          },
        });
      } else if (tezkit_app_pdata.settings.version != "V1") {
        console.log(
          "arenot u going frm here??? no",
          tezkit_app_pdata.settings.version
        );
  
        response = await fetch(
          `${apiUrl}&uid=${loggedInUser.uid}&other_user_id=${tezkit_app_pdata.tenant_info.id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
      }
  
      if (!response.ok) {
        loadingElement.textContent = "";
  
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();
      loadingElement.textContent = "";
  
      return data;
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }
  
  
  // Function to append messages to the chat body
export  function addMessagesToChatBody(messages, frm_top) {
    // const previousScrollHeight = chatBody.scrollHeight; // Save current scroll height before adding messages
  
    // Record the current scroll height and scroll position
    const previousScrollHeight = chatBody.scrollHeight;
    const previousScrollTop = chatBody.scrollTop;
    messages.forEach((p_data) => {
      addNewElementToChatBody(
        chatBody,
        p_data,
        p_data.type,
        false,
        p_data.direction,
        frm_top
      );
    });
  
    // Adjust scroll position to show the newly loaded messages
    // const newScrollHeight = chatBody.scrollHeight;
    // chatBody.scrollTop = newScrollHeight - previousScrollHeight;
  
    // Calculate the new scroll position to maintain the previous last message's position
    const newScrollHeight = chatBody.scrollHeight;
    const heightDifference = newScrollHeight - previousScrollHeight;
    chatBody.scrollTop = previousScrollTop + heightDifference;
  
    // Create the lastMessageElement only if it doesn't exist yet
    if (!lastMessageElement) {
      lastMessageElement = document.createElement("div");
      lastMessageElement.id = "last-message"; // This is the element being observed
      chatBody.prepend(lastMessageElement); // Add it to the top
      observer.observe(lastMessageElement); // Start observing the last message element
    }
  }


export  async function fetchV1Users() {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "amV3ZWxlcnlraW5nX19TRVBSQVRPUl9fdjFhcHAx");
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      app_name: "v1app1",
      version: "V1",
      tenant: "jeweleryking",
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        "https://gfxb0jf19k.execute-api.ap-south-1.amazonaws.com/prod/users_list",
        requestOptions
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const usersList = await response.json(); // Parse the JSON response
      return usersList; // Return the fetched data
    } catch (error) {
      console.error("Error fetching users:", error);
      return []; // Return an empty array on error
    }
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
