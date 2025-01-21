// import {toggleChatModal} from "./chatModal"

const arbitrary_string_to_diff = "j7hD9nXt3QpLvFz1uY6j7m2";
import {loggedInUser, MOBILE_WIDTH, identifiers} from "./index"
import {
    setAppData,
    awayHandler,
    isKeyTrue,
    getNextCorrectLength,
  } from "../src/utility";




  const check_if_user_exists = async (api_key, app_name, uid, tenant) => {
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
function informPeerSysAboutBULKMsgsStatus(
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
export let chat_modal_open = false
 // Function to load more messages


 async function fetchBotContent(app_name, tenant) {
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

 function createChatHeader(tezkit_app_data, toggleVideoMode, videoMode=false) {
   // console.log("doesitrerender  at",videoMode)
   const chatHeader = document.createElement("div");
   chatHeader.classList.add("chat_header");
 
   const headerLeft = document.createElement("div");
   headerLeft.style.display = "flex";
   headerLeft.style.alignItems = "center";
 
   const loginMessage = document.createElement("h3");
   loginMessage.id = "loginMessage";
 
   const statusElement = document.createElement("span");
   statusElement.id = "statusElement";
   statusElement.style.marginLeft = "10px";
   statusElement.style.display = "none";
 
   headerLeft.appendChild(loginMessage);
   headerLeft.appendChild(statusElement);
 
   const videoIcon = document.createElement("div");
   videoIcon.setAttribute("id","video_mode")
   // videoIcon.src = "path/to/video-icon.png"; // Replace with the path to your video icon
   videoIcon.textContent = "V";
   videoIcon.style.width = "20px";
   videoIcon.style.height = "20px";
   videoIcon.style.cursor = "pointer";
   videoIcon.style.border = !videoMode ?"4px solid green":"1px solid red";
   videoIcon.style.marginRight = "10px";
 
   // Add click event to video icon (optional)
   videoIcon.addEventListener("click", () => {
     console.log("Video icon clicked!");
     toggleVideoMode()
     // Add your video call logic here
   });
 
   const closeButton = createCloseButton(tezkit_app_data);
 
   // Append video icon before the close button
   chatHeader.appendChild(headerLeft);
   chatHeader.appendChild(videoIcon); // Add the video icon
   chatHeader.appendChild(closeButton);
 
   return chatHeader;
 }
 



 async function loadMoreMessages() {
 console.log("whaeriwer")
  if (isLoading || (totalPages > 0 && currentPage >= totalPages)) {
    return;
  }

  isLoading = true;
  loadingElement.textContent = "Loading...";

  try {
    const apiUrl = `${apiUrlBase}${currentPage + 1}`;
    const data = await fetchMessages(apiUrl, loadingElement);

    if (data) {
      totalPages = data.pagination.total_pages || totalPages;
      currentPage = data.pagination.current_page || currentPage + 1;

      if (data.messages && data.messages.length) {
        const rev_msgs = data.messages.reverse();
        addMessagesToChatBody(rev_msgs, true);
      }

      console.log("datadsfsdafasdf", data);

      console.log("datadsfsdafasdfprv_msgs_ls", data);

      // Filter messages where the status is not 'READ'
      const messagesNotRead = data.messages
        .filter((message) => message.message.status !== "READ")
        .map((message) => message.message.msg_id);

      console.log("messagesNotReadSDFSD1111", messagesNotRead);
      if (messagesNotRead.length) {
        console.log(
          "sdfiuwhefijsqdhifsdasadddfsdff",
          socket,
          messagesNotRead,
          "DELIVERED",
          loggedInUser.app_name,
          loggedInUser.tenant_info.id
        );

        const deliveryPayload = {
          type: "status",
          msg_ids: messagesNotRead,
          status: "READ",
        };
        updateChatToDB(deliveryPayload);
        informPeerSysAboutBULKMsgsStatus(
          socket,
          messagesNotRead,
          "READ",
          loggedInUser.app_name,
          loggedInUser.tenant_info.id
        );
      }
    }
  } catch (error) {
    console.error("Error loading more messages:", error);
  } finally {
    isLoading = false;
    loadingElement.textContent = "";
  }
}






async function fetchMessages(apiUrl, loadingElement) {
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
function addMessagesToChatBody(messages, frm_top) {
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



// UpdateVideoIcon function (unchanged)
function UpdateVideoIcon(videoMode) {
  const chatHeader = document.querySelector(".chat_header");

  if (chatHeader) {
    // Find the video icon within the chat header
    const videoIcon = chatHeader.querySelector("#video_mode");
    if (videoIcon) {
      console.log("Video icon found:", videoIcon);
      videoIcon.style.border = videoMode
        ? "4px solid orange" // Video mode on
        : "4px solid green"; // Video mode off
    } else {
      console.error("Video icon not found in chat header.");
    }
  } else {
    console.error("Chat header not found.");
  }
}

export function createUnreadBadge() {
  const badge = document.createElement("div");
  badge.id = "unread_chat_msgs_num";
  badge.style = `
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: red;
      color: white;
      border-radius: 50%;
      padding: 5px 10px;
      font-size: 12px;
    `;
  badge.textContent = "0";
  return badge;
}

export async function renderLeftPart() {
  const usersList = await fetchV1Users(); // Fetch the user list from the API

  const chat_lr_wrapper = document.querySelector(
    `.chat_modal__j7hD9nXt3QpLvFz1uY6j7m2 > .chat-lr-wrapper > .left-side-chat`
  );

  if (!chat_lr_wrapper) {
    console.error("Left side chat container not found.");
    return;
  }

  // Clear previous content
  chat_lr_wrapper.textContent = "";

  // Loop through usersList and create elements for each user's full_name
  usersList.forEach((user) => {
    const userElement = document.createElement("div");
    userElement.addEventListener("click", async function () {
      console.log("objectuserElement", user);
      //here we can try to rerender something in the right part?
      // loadChatSkelton(rsc)
      const rsc = document.querySelector(".right-side-chat");
      // console.log("rsasdfsdfsdf",rsc)

      const tezkit_app_data = localStorage.getItem("tezkit_app_data");

      if (loggedInUser) {
        // let videoMode = false

        // Then find the chat_header and the h3 element inside it
        const chatHeader = createChatHeader(tezkit_app_data, toggleVideoMode);
        console.log("videoMode this might not rerender");
        const chatBody = createChatBody();
        // rsc.firstChild.remove()
        while (rsc.firstChild) {
          rsc.firstChild.remove();
        }
        rsc.appendChild(chatHeader);
        rsc.appendChild(chatBody);

        // chatHeader.querySelector(".chat_header");
        const theme = localStorage.getItem("theme");
        const chatFooter = createChatFooter(tezkit_app_data, theme, user);
        rsc.appendChild(chatFooter);

        if (theme) {
          const theme_obj = JSON.parse(theme);
          if (theme_obj.chat_box_theme) {
            if (theme_obj.chat_box_theme.textColor) {
              chatHeader.style.color = theme_obj.chat_box_theme.textColor;
            }
            if (theme_obj.chat_box_theme.backgroundColor) {
              console.log("overriding them preferences!!!");
              chatHeader.style.backgroundColor =
                theme_obj.chat_box_theme.backgroundColor;
            }
          }
        }

        const loginMessage = chatHeader.querySelector("h3");
        const statusElement = chatHeader.querySelector("#statusElement");
        console.log(
          "dowerelly have an identifier here for all versions",
          identifiers
        );

        const tezkit_app_pdata = JSON.parse(tezkit_app_data);

        console.log("sdfsdfsdtezkit_app_pdataaffd", tezkit_app_pdata.settings);
        if (tezkit_app_pdata.settings.version) {
          console.log(
            "sdfuhosdh arew wer eroeiegndfg",
            tezkit_app_pdata.tenant_id
          );

          const tezkit_me_data = localStorage.getItem("tezkit_me");
          if (tezkit_me_data) {
            const tezkit_me_pdata = JSON.parse(tezkit_me_data);

            console.log("tezkit_me_pdatasfsfsdfsd", tezkit_me_pdata);
            if (loggedInUser) {
              console.log(
                loggedInUser,
                "sdfsdfsdhfsdhftezkit_me_pdata",
                tezkit_app_pdata
              );

              // chat_box_err.error
              if (tezkit_app_pdata.settings.version != "V1") {
                console.log(
                  "tezkit_app_p_dataewsedfsdfasdfsd",
                  tezkit_app_pdata,
                  tezkit_app_pdata.auth_key,
                  loggedInUser
                );
                const userExist = await check_if_user_exists(
                  tezkit_app_pdata.auth_key,
                  tezkit_app_pdata.app_name,
                  loggedInUser.uid,
                  tezkit_app_pdata.tenant_id
                );

                console.log("fasdfasdfsdfuserExist", userExist);
                if (!userExist.success) {
                  console.log("faltu ki baate", userExist.success);
                  loginMessage.textContent = "Error Loading User";
                  console.log("chaewrewrewrewrchatBody", chatBody);

                  const errorDiv = document.createElement("div");
                  // errorDiv.setAttribute("id","chatbox-error")
                  chatBody.textContent = "";
                  errorDiv.textContent = "Invalid User";
                  errorDiv.style.color = "red";
                  chatBody.appendChild(errorDiv);

                  const modal = document.querySelector(
                    ".chat_modal__j7hD9nXt3QpLvFz1uY6j7m2"
                  ); // Get the modal element
                  const sendButton = modal.querySelector("#sendButton"); // Find sendButton inside the modal

                  if (sendButton) {
                    sendButton.disabled = true; // Disable the button

                    // Add a hover message for disabled state
                    sendButton.setAttribute("title", "✖ disabled");
                    console.log("Button disabled with hover message");
                  } else {
                    console.log("Send button not found");
                  }
                } else {
                  loginMessage.textContent =
                    (tezkit_me_pdata &&
                      tezkit_me_pdata.tenant_info &&
                      tezkit_me_pdata.tenant_info.full_name) ||
                    "Admin"; //loggedInUser.full_name || loggedInUser[identifiers["name_idn"]]
                }
              } else {
                console.log("userele", userElement);
                loginMessage.textContent = user.full_name;
                // (user.full_name) ||
                // "Admin"; //loggedInUser.full_name || loggedInUser[identifiers["name_idn"]]
              }
            }
          }
        }

        const beta_toggle = isKeyTrue(
          tezkit_app_pdata.beta_toggle,
          "consumer",
          "receive_live_status_from_connected_clients"
        );

        if (beta_toggle) {
          statusElement.textContent = "";
          statusElement.style.background = "#a99bbe";
        }
        console.log("arewrewrwer");
        renderRightPart(tezkit_app_data);
      }
    });
    userElement.textContent = user.full_name;
    userElement.className = "user-name-item"; // Optional class for styling
    chat_lr_wrapper.appendChild(userElement);
  });

  console.log("Left side chat updated with users' names.");
}

async function fetchV1Users() {
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

function renderRightPart(tezkit_app_data) {
  console.log("aerwerwerewrewsdfsdf");
  // const badge = document.getElementById("unread_chat_msgs_num");

  // badge.textContent = "0";

  // if there is any msgs in unread ls
  const tezkit_msgs_unread_data = localStorage.getItem(
    "tezkit_msgs_unread_data"
  );
  const tezkit_msgs_unread_p_data = JSON.parse(tezkit_msgs_unread_data);

  // Function to fetch messages from API

  // Initialize variables
  let isLoading = false;
  let currentPage = 1;
  let totalPages = 0;
  console.log("let'saddapp_name", loggedInUser.app_name);
  const apiUrlBase = `https://wtqbptd4j8.execute-api.ap-south-1.amazonaws.com/prod/get_chat?app_name=${loggedInUser.app_name}&page=`;

  // Reference to the chat body container
  const chatBody = document.getElementById("chatBody");

  // Create and append the loading indicator
  const loadingElement = document.createElement("div");
  loadingElement.id = "loading-message";
  loadingElement.textContent = "";
  chatBody.prepend(loadingElement);
  console.log("arewqrewrwer");
  // let lastMessageElement = null; // Declare globally

  // IntersectionObserver for detecting when the top element is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Top message in view, loading more messages...");
          loadMoreMessages();
        }
      });
    },
    {
      root: chatBody,
      threshold: 1.0,
    }
  );

  // Append initial messages and setup observer
  (async function initializeChat() {
    if (loggedInUser) {
      console.log("arewerewrew");
      const initialApiUrl = `${apiUrlBase}${currentPage}`;

      const prv_msgs_ls = await fetchMessages(initialApiUrl, loadingElement);
      console.log("datadsfsdafasdfprv_msgs_ls", prv_msgs_ls);

      // Filter messages where the status is not 'READ'
      const messagesNotRead = prv_msgs_ls.messages
        .filter((message) => message.message.status !== "READ")
        .map((message) => message.message.msg_id);

      console.log("messagesNotReadSDFSD", messagesNotRead);
      if (messagesNotRead.length == 0) {
        const chatBody = document.getElementById("chatBody");
        const obj = {
          _id: "67858f022b0e31401e379c6a",
          room: "global_for__1",
          message: {
            message: "bbbb",
            timestamp: 1736806146034,
            frm_user: {
              user: "sharp1",
              id: "sharp1",
            },
            to_user: {
              id: "1",
            },
            app_name: "v2app1",
            ret_id: "msg_id__460350",
            msg_id: "msg_id__460350",
          },
          app_name: "v2app1",
          direction: "RECEIVED",
        };
        // addP2BMessageToChatBody(chatBody, obj)

        console.log("loggeriend user", loggedInUser);
        const botContent = await fetchBotContent(
          loggedInUser.app_name,
          loggedInUser.tenant
        );
        console.log("botContentsdfsda", botContent.bot_payload);
        //MAKE THE CALL HERE TO GET THE BOT CONTENTS

        if (botContent && botContent.bot_payload) {
          renderNode(botContent.bot_payload);
        }
      }
      if (messagesNotRead.length) {
        const deliveryPayload = {
          type: "status",
          msg_ids: messagesNotRead,
          status: "READ",
        };
        updateChatToDB(deliveryPayload);
        console.log(
          "sdfiuwhefijsqdhifsdaf",
          socket,
          messagesNotRead
          // status = "DELIVERED",
          // app_name,
          // user_id
        );
        informPeerSysAboutBULKMsgsStatus(
          socket,
          messagesNotRead,
          "READ",
          loggedInUser.app_name,
          loggedInUser.tenant_info.id
        );
      }

      if (prv_msgs_ls) {
        const { messages, pagination } = prv_msgs_ls;

        totalPages = pagination.total_pages || 1;
        currentPage = pagination.current_page || 1;

        if (messages && messages.length) {
          chatBody.innerHTML = ""; // Clear the chat body
          addMessagesToChatBody(messages);

          // Observe the topmost message
          const firstMessage = chatBody.firstElementChild;
          if (firstMessage) {
            observer.observe(firstMessage);
          }

          // Scroll to the bottom of the initial messages
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      }
    }
  })();

  if (tezkit_msgs_unread_p_data.msgs.length) {
    tezkit_msgs_unread_p_data.msgs.forEach((p_data) => {
      updateNotificationBell(tezkit_app_data);
      // const msg = p_data["message"]["message"];
      // const timestamp = p_data["message"]["timestamp"];
      let ret_id;
      let msg_id;
      if (p_data["message"].hasOwnProperty("ret_id")) {
        ret_id = p_data["message"]["ret_id"];
      }

      if (p_data["message"].hasOwnProperty("msg_id")) {
        msg_id = p_data["message"]["msg_id"];
      }

      console.log("HERE WE MIGHT WANNA SEND THE TYPE CORRECTLY??/", p_data);

      addNewElementToChatBody(chatBody, p_data, p_data.type, true);

      //check if it was a sent msg or recieved one
      if (p_data.message.frm_user.id != loggedInUser.id) {
        informPeerSysAboutMsgStatus(
          socket,
          ret_id,
          "READ",
          loggedInUser.app_name,
          p_data.message.frm_user.id
        );
      }
    });
    const cleared_msgs_obj = {
      api_key: tezkit_msgs_unread_p_data.api_key,
      msgs: [],
    };
    localStorage.setItem(
      "tezkit_msgs_unread_data",
      JSON.stringify(cleared_msgs_obj)
    );
  }
}

// Shared state for videoMode
let videoMode = false; // Default state

// Function to toggle videoMode and update the video icon
function toggleVideoMode() {
  videoMode = !videoMode; // Toggle the state
  console.log("Toggled videoMode:", videoMode);
  UpdateVideoIcon(videoMode); // Update the video icon based on the state
}

function applyThemeToFooter(sendButton, theme) {
    if (theme && theme.chat_box_theme) {
      if (theme.chat_box_theme.backgroundColor) {
        sendButton.style.backgroundColor = theme.chat_box_theme.backgroundColor;
      }
      if (theme.chat_box_theme.textColor) {
        sendButton.style.color = theme.chat_box_theme.textColor;
      }
    }
  }


function addChatToDB(new_rply_msg_obj) {
    const token = localStorage.getItem("tezkit_token");
    const myHeaders = new Headers();
    const tezkit_app_data = localStorage.getItem("tezkit_app_data");
  
    const tezkit_app_pdata = JSON.parse(tezkit_app_data);
  
    let raw = null;
  
    if (tezkit_app_pdata.settings.version == "V1") {
      myHeaders.append("Authorization", token);
      raw = JSON.stringify({
        data: new_rply_msg_obj,
      });
    } else {
      raw = JSON.stringify({
        data: new_rply_msg_obj,
        uid: loggedInUser.uid,
      });
    }
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    fetch(
      "https://wtqbptd4j8.execute-api.ap-south-1.amazonaws.com/prod/add_chat",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  


// Function to render a node (question or answer) dynamically
function renderNode(node) {
    // const chatBody = document.querySelector(".chat_body");
    const chatBody = document.getElementById("chatBody");
  
    chatBody.innerHTML = ""; // Clear previous content
  
    // Create and display the current question or answer
    const nodeElement = document.createElement("div");
    nodeElement.textContent = node.value; //getting the right question
    // nodeElement.classList.add('node');
    chatBody.appendChild(nodeElement);
  
    // If it's a question, render choices
    if (node.isQuestion) {
      const choicesContainer = document.createElement("div");
  
      for (const choice in node.children) {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("choice");
  
        // Add click event to navigate to the next node
        choiceButton.addEventListener("click", () => {
          renderNode(node.children[choice]);
        });
  
        choicesContainer.appendChild(choiceButton);
      }
  
      chatBody.appendChild(choicesContainer);
    }
  }

  function createNewMessage(loggedInUser, messageContent, to_id) {
    return {
      room: to_id,
      message: {
        message: messageContent,
        timestamp: Date.now(),
        frm_user: {
          id: loggedInUser[identifiers["name_idn"]],
        },
        to_user: {
          id: loggedInUser.tenant_info.id,
        },
        app_name: loggedInUser.app_name,
      },
    };
  }
  
  
  function handleSend(tezkit_app_data, chatInput, to_id) {
    if (loggedInUser) {
      console.log("Sending message...", loggedInUser);
  
      const newMessage = createNewMessage(loggedInUser, chatInput.value, to_id);
  
      if (chatInput.value) {
        const msgId = addNewElementToChatBody(
          document.getElementById("chatBody"),
          newMessage,
          undefined,
          undefined,
          "SENT"
        );
  
        newMessage.message.ret_id = msgId;
        newMessage.message.msg_id = msgId;
  
        socket.emit("ON_MESSAGE_ARRIVAL_BOT", newMessage);
        addChatToDB(newMessage);
        chatInput.value = "";
      }
    } else {
      alert("Kindly login first!");
    }
  }

function createCloseButton(tezkit_app_data) {
  const closeButton = document.createElement("button");
  closeButton.id = "close-btn" + "__" + arbitrary_string_to_diff;
  closeButton.textContent = "Close";

  closeButton.addEventListener("click", () =>
    toggleChatModal(loggedInUser, tezkit_app_data)

  );

  return closeButton;
}

function createChatBody() {
  const chatBody = document.createElement("div");
  chatBody.classList.add("chat_body");
  chatBody.id = "chatBody";
  return chatBody;
}



function createSendButton(tezkit_app_data, chatInput,to_id) {
  const sendButton = document.createElement("button");
  sendButton.id = "sendButton";
  sendButton.textContent = "Send";

  sendButton.addEventListener("click", () => handleSend(tezkit_app_data, chatInput,to_id));

  return sendButton;
}


function createChatFooter(tezkit_app_data, theme, user) {
  console.log("hsdfsadfasdf user in footer",user)
  const chatFooter = document.createElement("div");
  chatFooter.classList.add("chat_footer");

  const chatInput = document.createElement("input");
  chatInput.type = "text";
  chatInput.id = "chatInput";
  chatInput.placeholder = "Type here...";

  const sendButton = createSendButton(tezkit_app_data, chatInput,"global_for__"+user.id);

  applyThemeToFooter(sendButton, theme);

  chatFooter.appendChild(chatInput);
  chatFooter.appendChild(sendButton);

  return chatFooter;
}

export function createChatModalOpenerContainer(theme, tezkit_app_data) {
  const chat_modal_opener_container = document.createElement("div");
  chat_modal_opener_container.id =
    "chat_modal_opener" + "__" + arbitrary_string_to_diff;
  chat_modal_opener_container.style = `
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #A370CE;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      margin-right: 10px;
      cursor: pointer;
    `;

  if (theme && theme.chat_opener_theme) {
    chat_modal_opener_container.style.backgroundColor =
      theme.chat_opener_theme.backgroundColor;
  }

  const chat_modal_opener = document.createElement("i");
  chat_modal_opener.classList.add("fas", "fa-comments");
  chat_modal_opener.style.color = "#fff";
  chat_modal_opener.style.fontSize = "24px";

  const badge = createUnreadBadge();

  chat_modal_opener_container.appendChild(chat_modal_opener);
  chat_modal_opener_container.appendChild(badge);

  chat_modal_opener_container.addEventListener("click", async () => {
    renderLeftPart(tezkit_app_data);
    // renderRightPart(tezkit_app_data);
    toggleChatModal(loggedInUser, tezkit_app_data);
  });

  return chat_modal_opener_container;
}




// Call the renderLeftPart function to fetch and render users
// renderLeftPart();

  // Function to toggle the modal visibility
export  async function toggleChatModal(loggedInUser, tezkit_app_data) {
    const chat_modal = document.getElementById(
      "chatModal" + "__" + arbitrary_string_to_diff
    );

    if (!chat_modal_open) {
      // Get the width and height of the window
      const width = window.innerWidth;
  

      if (width < MOBILE_WIDTH) {
        chat_modal.style.display = "flex";
      } else {
        chat_modal.style.display = "block";
      }
    } else {
      chat_modal.style.display = "none";
    }

 
    chat_modal_open = !chat_modal_open;
  }





export function getTheme() {
  const theme = localStorage.getItem("theme");
  return JSON.parse(theme);
}

export function createChatModalContainer() {
  const chat_modal = document.createElement("div");
  chat_modal.classList.add("chat_modal" + "__" + arbitrary_string_to_diff);
  chat_modal.id = "chatModal" + "__" + arbitrary_string_to_diff;
  document.body.appendChild(chat_modal);
  return chat_modal;
}

export function createChatWrapper() {
  const chatWrapper = document.createElement("div");
  chatWrapper.classList.add("chat-lr-wrapper");
  return chatWrapper;
}

export function createLeftSideChat() {
  const leftSideChat = document.createElement("div");
  leftSideChat.classList.add("left-side-chat");
  leftSideChat.textContent = "Left Side";
  return leftSideChat;
}

export function createRightSideLoader(tezkit_app_data, theme) {
  const rightSideChat = document.createElement("div");
  rightSideChat.classList.add("right-side-chat");

  const defaultScreen = document.createElement("div");
  defaultScreen.textContent = "sall default";
  rightSideChat.appendChild(defaultScreen);

  return rightSideChat;
}

export function createChatModal(tezkit_app_data) {
  console.log("Creating chat modal...");

  const theme = getTheme();
  const chat_modal = createChatModalContainer();
  const chatWrapper = createChatWrapper();

  const leftSideChat = createLeftSideChat();
  // const rightSideChat = createRightSideChat(tezkit_app_data, theme);
  const rightSideChat = createRightSideLoader(tezkit_app_data, theme);

  chatWrapper.appendChild(leftSideChat);
  chatWrapper.appendChild(rightSideChat);

  chat_modal.appendChild(chatWrapper);

//   const chat_modal_opener_container = createChatModalOpenerContainer(
//     theme,
//     tezkit_app_data
//   );
//   document.body.appendChild(chat_modal);

  return chat_modal;
}
