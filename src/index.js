//
// import io from 'socket.io'; // Add this line if missing

// Import the CSS file
import "./style.css";
import io from "socket.io-client";
import {headerHandler,resetSettingFunc} from "./authHandler"
import {createChatModal, createChatModalOpenerContainer, chat_modal_open, getTheme, lc} from "./chatModal"

console.log("Client Activated!!!", process.env.WS_SERVER);

const arbitrary_string_to_diff = "j7hD9nXt3QpLvFz1uY6j7m2";

import {
  setAppData,
  awayHandler,
  isKeyTrue,
  getNextCorrectLength,
} from "../src/utility";

let global_bucket = { unread_msgs: [] };
export { global_bucket };

export const identifiers = {};

// export let chat_modal_open = false;
let chat_modal = null;
console.log("process.env.dsfsdf"); // Output will be the value of CUSTOM_ENV

// export { chat_modal_open };

console.log("Script got executed!!");
// Function to update the reaction
function updateMessageReaction(messageElement, reaction) {
  console.log("arewenoteven calling th?what is the diff", messageElement);
  let reactionElement = messageElement.querySelector(".reaction");
  if (!reactionElement) {
    reactionElement = document.createElement("div");
    reactionElement.classList.add("reaction");
    messageElement.appendChild(reactionElement);
  }
  reactionElement.textContent = reaction;
}



function updateMessageReactionInLs(ret_id, reaction) {
  const localStorageKey = "tezkit_msgs_read_data";

  // Retrieve data from localStorage
  const data = localStorage.getItem(localStorageKey);

  if (data) {
    try {
      // Parse the JSON data
      const parsedData = JSON.parse(data);

      // Check if the structure is valid
      if (parsedData && Array.isArray(parsedData.msgs)) {
        // Find the message with the given ret_id
        const messageObj = parsedData.msgs.find(
          (msg) => msg.message && msg.message.ret_id === ret_id
        );

        if (messageObj) {
          // Update the reaction

          messageObj.message.reaction = reaction;

          // Save the updated data back to localStorage
          localStorage.setItem(
            localStorageKey,
            JSON.stringify(parsedData, null, 4)
          );
        } else {
        }
      } else {
      }
    } catch (error) {
      console.error("Failed to parse localStorage data:", error);
    }
  } else {
  }
}

function updateMessageInLs(ret_id, updated_msg) {
  const localStorageKey = "tezkit_msgs_read_data";

  // Retrieve data from localStorage
  const data = localStorage.getItem(localStorageKey);

  if (data) {
    try {
      // Parse the JSON data
      const parsedData = JSON.parse(data);

      // Check if the structure is valid
      if (parsedData && Array.isArray(parsedData.msgs)) {
        // Find the message with the given ret_id
        const messageObj = parsedData.msgs.find(
          (msg) => msg.message && msg.message.ret_id === ret_id
        );

        if (messageObj) {
          // Update the reaction

          messageObj.message.message = updated_msg;

          // Save the updated data back to localStorage
          localStorage.setItem(
            localStorageKey,
            JSON.stringify(parsedData, null, 4)
          );
        } else {
        }
      } else {
      }
    } catch (error) {
      console.error("Failed to parse localStorage data:", error);
    }
  } else {
  }
}

function updateMessageText(messageElement, newText) {
  const messageText = messageElement.querySelector("p");
  if (messageText) {
    messageText.textContent = newText;
  } else {
    console.error("Message text element not found.");
  }
}

function incrementNotificationsCount() {
  const notification_num_div = document.getElementById("unread_chat_msgs_num");
  notification_num_div.textContent =
    Number(notification_num_div.textContent) + 1;
}

export function getMessageIndex(ret_id) {
  const msg_calc_ind = ret_id.split("__")[1];
  return parseInt(msg_calc_ind, 10) - 1;
}

// Function to change the background color of the body
export function changeBackgroundColor() {
  const colors = ["#FF5733", "#33FF57", "#5733FF", "#33B5E5", "#FFC300"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
}

// Function to render the customized component
export function renderCustomizeComponent() {
  // Create the full-screen div
  const fullScreenDiv = document.createElement("div");
  fullScreenDiv.classList.add("full-screen-div");

  // Create the left part
  const leftPart = document.createElement("div");
  leftPart.classList.add("left-part");
  leftPart.style.width = "25%"; // Set left part width
  leftPart.style.height = "100%"; // Set left part height
  leftPart.style.backgroundColor = "white"; // Set left part background color
  leftPart.style.border = "3px solid grey"; // Set left part background color
  leftPart.style.float = "left"; // Float left for side-by-side layout
  leftPart.style.padding = "10px"; // Optional padding

  // Title input
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Form Title:";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Enter form title";
  // titleInput.style.width = '100%';
  titleInput.style.padding = "10px";
  titleInput.style.marginBottom = "10px";
  titleLabel.appendChild(titleInput);
  leftPart.appendChild(titleLabel);

  // Create form preview button
  const createFormPreviewButton = document.createElement("button");
  createFormPreviewButton.textContent = "Create Form Preview";
  createFormPreviewButton.style.width = "50%";
  createFormPreviewButton.style.padding = "10px";
  createFormPreviewButton.style.marginTop = "10px";
  createFormPreviewButton.style.backgroundColor = "#2196F3";
  createFormPreviewButton.style.color = "white";
  createFormPreviewButton.style.border = "none";
  createFormPreviewButton.style.borderRadius = "3px";
  createFormPreviewButton.addEventListener("click", () => {
    const newTitle = titleInput.value.trim();
    exampleConfig.form.title = newTitle || "Form Title"; // Update form title
    const dynamicForm = createDynamicForm(exampleConfig, handleLogin);
    rightPart.innerHTML = ""; // Clear existing preview
    rightPart.appendChild(dynamicForm); // Render new form preview
  });
  leftPart.appendChild(createFormPreviewButton);

  // Append left part to full-screen div
  fullScreenDiv.appendChild(leftPart);

  // Create the right part
  const rightPart = document.createElement("div");
  rightPart.classList.add("right-part");
  rightPart.style.width = "60%"; // Set right part width
  rightPart.style.height = "100%"; // Set right part height
  rightPart.style.backgroundColor = "black"; // Set right part background color
  rightPart.style.float = "left"; // Float left for side-by-side layout
  rightPart.style.padding = "10px"; // Optional padding

  // Append right part to full-screen div
  fullScreenDiv.appendChild(rightPart);

  // Render the full-screen div
  document.body.appendChild(fullScreenDiv);

  // Example form configuration
  const exampleConfig = {
    form: {
      id: "loginForm",
      title: "Login Title Here",
    },
    submitButton: {
      textContent: "Login",
    },
    fields: [
      { field_name: "email", placeholder: "Enter your email", type: "email" },
      {
        field_name: "password",
        placeholder: "Enter your password",
        type: "password",
      },
    ],
  };

  // Initial form preview
  const initialForm = createDynamicForm(exampleConfig, handleLogin);
  rightPart.appendChild(initialForm);
}

export async function onboarding(userData, tezkitAppPData) {
  // Validate the required data fields
  if (
    !tezkitAppPData ||
    !tezkitAppPData.auth_key ||
    !tezkitAppPData.tenant_id ||
    !tezkitAppPData.app_name
  ) {
    console.error("Error: Missing required fields in tezkitAppPData");
    return;
  }

  if (!userData || !userData.uid) {
    console.error("Error: Missing 'uid' in userData");
    return;
  }

  const reqUrl =
    "https://gfxb0jf19k.execute-api.ap-south-1.amazonaws.com/prod/onboarding";

  const headers = {
    Accept: "*/*",
    "User-Agent": "JavaScript Fetch", // Optional, can be customized
    "X-API-Key": tezkitAppPData.auth_key,
    "Content-Type": "application/json",
  };

  const payload = {
    tenant: tezkitAppPData.tenant_id,
    uid: userData.uid,
    app_name: tezkitAppPData.app_name,
    version:tezkitAppPData.settings.version
  };

  // Making the POST request
  fetch(reqUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Assuming the response is JSON
    })
    .then((data) => {
      console.log("Onboarding Response Data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export let socket;

function addNewElementToChatBody(
  chatBody,
  obj,
  msg_type = "REGULAR",
  skip_ls = true,
  direction = "RECEIVED",
  frm_top
) {
  let tn1;
  let append_msg = null;

  // const msg_id = tn1;
  console.log(
    "here are weroirewjtereq rewi",
    chatBody,
    msg_type,
    skip_ls,
    direction
  );
  if (!obj.message.msg_id) {
    tn1 = getNextCorrectLength("chatBody", "isittrueit's running twice");
    obj.message.msg_id = tn1;
  }

  console.log("so this message type is never com", obj);
  if (msg_type == "REGULAR") {
    const new_messageElement = document.createElement("div");
    new_messageElement.classList.add("message");

    // Convert the timestamp to a Date object
    const msg_time = new Date(obj.message.timestamp);

    // Format the date and time to a human-readable local string
    const localTime = msg_time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    new_messageElement.innerHTML = `
            <div>
            <p>${obj.message.message}</p>
            <span class="timestamp">${localTime}</span>
            </div>
        `;
    append_msg = new_messageElement;
  } else if (msg_type == "REPLY") {
    // const chatBody = document.getElementById("chatBody");
    const replyWrapper = document.createElement("div");
    replyWrapper.classList.add("message", "admin");

    const replyElement = document.createElement("div");
    replyElement.classList.add("reply-message");

    // const originalText = originalMessageText.querySelector("p").textContent;

    // const replyText = obj.message;

    //
    const replyTime = obj.message.timestamp || Date.now();

    replyElement.innerHTML = `
          <div class="original-message">
            <p>${obj.message.to_msg.msg}</p>
          </div>
          <div class="reply-content">
            <p>${obj.message.message}</p>
            <span class="time">${replyTime}</span>
          </div>
        `;

    replyWrapper.appendChild(replyElement);
    append_msg = replyWrapper;
  } else if (msg_type === "NEW_FILE_MIXED_V1") {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("message");
    const containerDiv = document.createElement("div");
    console.log("jere is ian obj", obj, msg_type);
    obj.message.result.forEach((paragraph) => {
      // Create a <p> element for each paragraph
      const pElement = document.createElement("p");

      // Loop through each node (text or image) in the paragraph
      paragraph.forEach((node) => {
        if (node.type === "text") {
          // Create a text node and append it to the paragraph
          const textNode = document.createTextNode(node.value);
          pElement.appendChild(textNode);
        } else if (node.type === "img") {
          // Create a wrapper <div> for the image and button
          const wrapperDiv = document.createElement("div");
          wrapperDiv.style.position = "relative";
          wrapperDiv.style.display = "inline-block";

          // Create the <img> element
          const imgElement = document.createElement("img");
          imgElement.src = node.value;
          imgElement.alt = "Image";
          imgElement.style.maxWidth = "100%"; // Ensure the image fits within the container
          imgElement.style.cursor = "pointer"; // Pointer cursor for clickable behavior

          // Add click event to open the image in a new tab
          imgElement.addEventListener("click", () => {
            window.open(node.value, "_blank"); // Open the image in a new tab
          });

          // Create the download button
          const downloadButton = document.createElement("button");
          downloadButton.textContent = "Download";
          downloadButton.style.position = "absolute";
          downloadButton.style.bottom = "10px";
          downloadButton.style.right = "10px";
          downloadButton.style.padding = "5px 10px";
          downloadButton.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
          downloadButton.style.color = "white";
          downloadButton.style.border = "none";
          downloadButton.style.borderRadius = "5px";
          downloadButton.style.cursor = "pointer";
          downloadButton.style.display = "none"; // Initially hidden
          downloadButton.style.zIndex = "10";

          // Set the download functionality
          downloadButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent the image click event from firing
            const linkElement = document.createElement("a");
            linkElement.href = node.value; // Image source URL
            linkElement.download = "downloaded-image"; // Suggested filename for the download
            linkElement.click();
          });

          // Show the button on hover
          wrapperDiv.addEventListener("mouseover", () => {
            downloadButton.style.display = "block";
          });
          wrapperDiv.addEventListener("mouseout", () => {
            downloadButton.style.display = "none";
          });

          // Append the image and button to the wrapper
          wrapperDiv.appendChild(imgElement);
          wrapperDiv.appendChild(downloadButton);

          // Append the wrapper to the paragraph
          pElement.appendChild(wrapperDiv);
        }
      });

      // Append the constructed <p> element to the container div
      containerDiv.appendChild(pElement);
    });

    // Append the new message at the bottom of chatBody
    // chatBody.appendChild(messageWrapper);
    containerDiv.setAttribute("class", "file-mixed-content");
    containerDiv.style.margin = "15px";
    messageWrapper.appendChild(containerDiv);
    append_msg = messageWrapper;
  }

  if (append_msg) {
    // if (theme_obj.chat_box_theme.backgroundColor){
    //   append_msg.style.backgroundColor = "red"

    // }
    const theme = localStorage.getItem("theme");
    if (theme) {
      const theme_obj = JSON.parse(theme);
      if (theme_obj.chat_box_theme) {
        if (theme_obj.chat_box_theme.textColor) {
          append_msg.style.color = theme_obj.chat_box_theme.textColor;
          // chatHeader.style.color = "green"
        }

        if (theme_obj.chat_box_theme.backgroundColor) {
          append_msg.style.backgroundColor =
            theme_obj.chat_box_theme.backgroundColor;
        }
      }
    }
    // const tn1 = getNextCorrectLength("chatBody")
    //

    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("message-container");
    messageWrapper.setAttribute("id", obj.message.msg_id);
    messageWrapper.appendChild(append_msg);

    if (direction) {
      obj.direction = direction;
      if (direction == "SENT") {
        // direction
        append_msg.classList.add("left_side");
      } else {
        append_msg.classList.add("admin");
      }
    }

    if (skip_ls) {
      addToReadMsgsLs(obj);
    }

    if (obj.message.reaction) {
      console.log("is there a difference?", append_msg, obj.message.reaction);
      updateMessageReaction(append_msg, obj.message.reaction);
    }

    if (frm_top) {
      chatBody.prepend(messageWrapper);
    } else {
      chatBody.appendChild(messageWrapper);
    }
  }
  return tn1;
}



// Define your breakpoints
export const MOBILE_WIDTH = 768;

// Function to check the viewport size
function checkViewportSize() {

  const chat_modal = document.getElementById(
    "chatModal" + "__" + arbitrary_string_to_diff
  );

  if (window.innerWidth < MOBILE_WIDTH) {
    chat_modal.style.display = "flex";

    // Add your mobile-specific logic here
  } else {
    // Add your desktop-specific logic here
    chat_modal.style.display = "block";
  }
}

// Function to check and handle missing app name or API key
function checkAppConfig(app_name, api_key) {
  const tezkit_app_data = localStorage.getItem("tezkit_app_data");
  if (tezkit_app_data) {
    const tezkit_app_p_data = JSON.parse(tezkit_app_data);
    console.log(
      app_name,
      "here is tezkit_app_p_datais",
      app_name,
      tezkit_app_p_data.app_name.length,
      app_name.length
    );
    if (tezkit_app_p_data.auth_key != api_key) {
      // throw new Error("Wrong `api_key` found in credentials. Please Correct them and Logout and Login again. You can also Reset using below button.");

      renderErrorPopup([
        "Wrong `api_key` found in credentials. Please Correct them and Logout and Login again. You can also Reset using below button.",
      ]);
    }

    if (tezkit_app_p_data.app_name != app_name) {
      throw new Error(
        "Wrong `app_name` found in credentials. Please Correct them and Try again. You might want to reset below"
      );
    }
  }

  //api_keys should not mismatch

  if (!app_name || !api_key) {
    throw new Error("App name or API key is missing.");
  }
}

// Function to initialize localStorage for messages if not already set
function initializeMessagesData(api_key) {
  let tezkit_msgs_read_data = localStorage.getItem("tezkit_msgs_read_data");
  if (!tezkit_msgs_read_data) {
    const initial_msgs_data_str = JSON.stringify({
      api_key: api_key,
      msgs: [],
    });
    localStorage.setItem("tezkit_msgs_read_data", initial_msgs_data_str);
  }

  let tezkit_msgs_unread_data = localStorage.getItem("tezkit_msgs_unread_data");
  if (!tezkit_msgs_unread_data) {
    const initial_msgs_data_str = JSON.stringify({
      api_key: api_key,
      msgs: [],
    });
    localStorage.setItem("tezkit_msgs_unread_data", initial_msgs_data_str);
  } else {
    validateApiKey(tezkit_msgs_read_data, api_key, "read");
    validateApiKey(tezkit_msgs_unread_data, api_key, "unread");
  }
}

// Function to validate the API key in the stored messages data
function validateApiKey(storedData, api_key, type) {
  const parsedData = JSON.parse(storedData);
  if (parsedData["api_key"] !== api_key) {
    renderErrorPopup([
      `Api Key did not match for ${type} messages; Should probably logout and login back.`,
    ]);
  }
}

// Function to set the theme in localStorage if provided
function setTheme(theme) {
  if (theme) {
    localStorage.setItem("theme", theme);
  }
}

// Function to perform the setup logic and store relevant values
function performSetup(app_name, api_key, theme, header_req, redirect_uri) {
  localStorage.setItem("tezkit_app_name", app_name);
  localStorage.setItem("tezkit_api_key", api_key);
  console.log("werwerheader_reqsdf", header_req);
  initializeMessagesData(api_key);
  setTheme(theme);
  localStorage.setItem("tezkit_header_req", JSON.stringify(header_req));
  localStorage.setItem("setup_done", "true");
  localStorage.setItem("redirect_uri", redirect_uri);
}

// Main function that orchestrates the setup process
export function setUp(
  app_name,
  api_key,
  theme = null,
  header_req = null,
  redirect_uri = null
) {
  try {
    console.log("arewewnrewr wrewrdsfsdf", app_name, api_key);
    checkAppConfig(app_name, api_key);
    console.log(app_name, "are we saving this api_key anywhere?", api_key);
    const setupDone = localStorage.getItem("setup_done");
    if (setupDone == null || setupDone == undefined) {
      performSetup(app_name, api_key, theme, header_req, redirect_uri);
      checkAppConfig(app_name, api_key);
    }

    initialize(null, api_key);
  } catch (error) {
    console.error("Failed to set up localStorage:", error.message);
    renderErrorPopup([error.message]);
    // Additional error handling logic (e.g., notify user)
  }
}

function updateNotificationBell(tezkit_app_data) {
  if (tezkit_app_data) {
    const tezkit_app_p_data = JSON.parse(tezkit_app_data);
    //

    if (tezkit_app_p_data.settings.version == "V1") {
      incrementNotificationsCount();
    }
  }
}


// loggedInUser.app_name, p_data.message.frm_user.id
function informPeerSysAboutMsgStatus(
  socket,
  ret_id,
  status = "DELIVERED",
  app_name,
  user_id
) {
  console.log("show me what do e iahve", loggedInUser);

  // const userKey = !user.hasOwnProperty('uid') ? `user__${user.id}` : `user__${user.uid}`;

  const right_global_id = "global_for__" + loggedInUser.tenant_info.id;
  socket.emit("ON_MESSAGE_STATUS_CHANGED", {
    action: "MSG_STATUS_CHANGE_EVENT",
    ret_id: ret_id, // THIS WILL BE DYNAMIC IN NATURE upda
    room: right_global_id,
    status: status,
    timestamp: Date.now(),
    app_name,
    user_id,
  });

  const deliveryPayload = {
    type: "status",
    msg_ids: [ret_id],
    status: status,
  };
  updateChatToDB(deliveryPayload);
}

export function renderErrorPopup(err_msgs) {
  // Create the error popup container
  const errorPopup = document.createElement("div");
  errorPopup.style.position = "fixed";
  errorPopup.style.top = "20px";
  errorPopup.style.right = "20px";
  errorPopup.style.padding = "20px";
  errorPopup.style.backgroundColor = "#ff4d4d";
  errorPopup.style.color = "#fff";
  errorPopup.style.border = "1px solid #ff1a1a";
  errorPopup.style.zIndex = "10000";
  errorPopup.style.borderRadius = "5px";
  errorPopup.style.maxWidth = "300px";
  errorPopup.style.fontFamily = "Arial, sans-serif";

  // Create the error title
  const errorTitle = document.createElement("h3");
  errorTitle.textContent = "Error(s) Occurred";
  errorPopup.appendChild(errorTitle);

  // Create the error list
  const errorList = document.createElement("ul");

  // Assume `data.errors` contains the list of errors (adjust accordingly)
  if (err_msgs) {
    err_msgs.forEach((error) => {
      const listItem = document.createElement("li");
      listItem.textContent = error;
      errorList.appendChild(listItem);
    });

    errorPopup.appendChild(errorList);

    // Append close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.style.marginTop = "10px";
    closeButton.style.backgroundColor = "#ff1a1a";
    closeButton.style.color = "#fff";
    closeButton.style.border = "none";
    closeButton.style.padding = "5px 10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.borderRadius = "3px";

    closeButton.addEventListener("click", () => {
      errorPopup.remove();
    });

    // const resetSettingsBtn = document.createElement("button")
    // resetSettingsBtn.textContent = "Reset Settings";

    const resetSettingsBtn = document.createElement("button");
    resetSettingsBtn.textContent = "🔄 Reset Settings";

    // Style the button for better appearance
    resetSettingsBtn.style.cssText = `
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
`;

    // Add hover and active effects
    resetSettingsBtn.addEventListener("mouseover", () => {
      resetSettingsBtn.style.backgroundColor = "#0056b3";
    });
    resetSettingsBtn.addEventListener("mouseout", () => {
      resetSettingsBtn.style.backgroundColor = "#007BFF";
    });
    resetSettingsBtn.addEventListener("mousedown", () => {
      resetSettingsBtn.style.transform = "scale(0.95)";
    });
    resetSettingsBtn.addEventListener("mouseup", () => {
      resetSettingsBtn.style.transform = "scale(1)";
    });

    resetSettingsBtn.addEventListener("click", function () {
      // window.location.reload();
      resetSettingFunc();
    });
    errorPopup.appendChild(resetSettingsBtn);
    errorPopup.appendChild(closeButton);

    // Prepend the error popup to the document body
    document.body.prepend(errorPopup);
  } else {
    console.error(
      "no error still error pop up was tried to open, Contact Admin"
    );
  }
}

function addToReadMsgsLs(p_data) {
  const tezkit_msgs_read_data = localStorage.getItem("tezkit_msgs_read_data");
  //WE CAN LATER PUT AN EXTRA CHECK FOR THE api_key match
  const tezkit_msgs_p_data = JSON.parse(tezkit_msgs_read_data);
  tezkit_msgs_p_data.msgs.push(p_data);
  // const prv_msg_data_string_ls = JSON.stringify(tezkit_msgs_p_data);
  // localStorage.setItem("tezkit_msgs_read_data", prv_msg_data_string_ls);
}

async function makeMeAPICall(token) {
  const apiUrl =
    "https://gfxb0jf19k.execute-api.ap-south-1.amazonaws.com/prod/me";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: token,
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}

export let loggedInUser = null;


function msgHandler(socket, data, tezkit_app_data, msg_type = "REGULAR") {
  const p_data = JSON.parse(data);

  // addToReadMsgsLs(p_data);

  informPeerSysAboutMsgStatus(
    socket,
    p_data.message.ret_id,
    "DELIVERED",
    loggedInUser.app_name,
    p_data.message.to_user.id
  );

  // update notifications bell
  updateNotificationBell(tezkit_app_data);

  if (chat_modal_open) {
    //IF MODAL IS OPEN & msg arrived

    //   "is there anything yet stored in the global_bucket",
    //   p_data
    // );
    // const msg = p_data["message"]["message"];
    // const timestamp = p_data["message"]["timestamp"];

    console.log("here is p_datasdfsdf", p_data);
    if (msg_type == "REGULAR") {
      addNewElementToChatBody(chatBody, p_data);
    } else if (msg_type == "REPLY") {
      addNewElementToChatBody(chatBody, p_data, "REPLY");
    } else if (msg_type == "NEW_FILE_MIXED_V1") {
      console.log("ihopedoc is uploading throughSDFSDFSDF it??");
      addNewElementToChatBody(chatBody, p_data, "NEW_FILE_MIXED_V1");
    }

    informPeerSysAboutMsgStatus(
      socket,
      p_data.message.ret_id,
      "READ",
      loggedInUser.app_name,
      p_data.message.to_user.id
    );
  } else {
    console.log("here is datrasdafs", p_data);
    //   const last_msg = prv_msgs_ls[prv_msgs_ls.length - 1]
    // const deliveryPayload = {
    //   type: "status",
    //   msg_id: p_data.message.ret_id,
    //   status: "DELIVERED",
    // };
    // updateChatToDB(deliveryPayload);

    //SAVE IT INTO THE BUCKET

    // global_bucket.unread_msgs.push(p_data);
    // tezkit_msgs_unread_data.setItem("")
    // addToUnReadMsgsLs(p_data);
  }
}


function getMessageElementFromChatBox(msg_id) {
  console.log("msg_idsdfsfsdfsdmsg_id", msg_id);
  const msgElm = document.getElementById(msg_id);
  if (msgElm) {
    return msgElm.firstChild;
  }
}

function handleMsgUpdatedEvent(p_data) {
  const { ret_id, message } = p_data.message;
  const msg = message;
  console.log("whatis it now?", p_data.message);
  // const chatBody = document.getElementById("chatBody");

  // const msgIndex = getMessageIndex(ret_id);
  // const messageElement = getMessageElement(msgIndex, chatBody);

  // const msg_id = getRightMessageIdByRetId(ret_id);
  console.log("wwhat is ths msg_id when broken1", ret_id);
  const messageElement = getMessageElementFromChatBox(ret_id, chatBody);

  if (messageElement) {
    updateMessageText(messageElement, msg);
    updateMessageInLs(ret_id, msg);
  }
}

function handleMsgReactionEvent(p_data) {
  //
  const { ret_id, message } = p_data.message;

  console.log("ret_idsdfsadfsdf", p_data.message);

  const reaction = message;
  // const chatBody = document.getElementById("chatBody");
  // const msg_id = getRightMessageIdByRetId(ret_id);
  // const msgIndex = getMessageIndex(ret_id);
  console.log("wwhat is ths msg_id when broken2", ret_id);

  const messageElement = getMessageElementFromChatBox(ret_id, chatBody);

  if (messageElement) {
    updateMessageReaction(messageElement, reaction);
    updateMessageReactionInLs(ret_id, reaction);
  }
}

function updateChatToDB(reactPayload, retryCount = 0) {
  console.log(reactPayload, "Here is the payload");
  const token = localStorage.getItem("tezkit_token");

  // Function to perform the actual fetch request
  const makeRequest = () => {
    fetch(
      "https://wtqbptd4j8.execute-api.ap-south-1.amazonaws.com/prod/update_chat",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Replace or modify if needed
        },
        body: JSON.stringify(reactPayload),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Reaction updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating reaction:", error);

        // Retry the request after 7 seconds if it fails and retryCount is less than 3
        if (retryCount < 3) {
          console.log("Retrying in 7 seconds...");
          setTimeout(() => {
            updateChatToDB(reactPayload, retryCount + 1); // Increment retry count
          }, 7000);
        } else {
          console.error("Max retries reached, operation failed.");
        }
      });
  };

  // Initial call to make the request
  makeRequest();
}
async function respondVideo(videoElm,offer_str) {
  console.log("Ensure it's not called multiple times...");
  // const offer_str = await fetchRTCOffer();
  console.log("offer_str", offer_str, typeof offer_str);
  const offer = JSON.parse(offer_str);
  // console.log("basically need sdp from there??",offer)
  console.log("here is your offer love",offer,typeof(offer))
  const rc = new RTCPeerConnection();
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  console.log("doweseestream", stream);
  videoElm.srcObject = stream;
  // myRef.current = {"srcObject":stream};
  // setStream(stream);
  rc.addStream(stream);
  // const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  console.log("doweseestream", stream);
  // yourVideoRef.current.srcObject = stream
  // myRef.current = {"srcObject":stream};
  // setStream(stream);
  // rc.addStream(stream);
  rc.onaddstream = (event) => {
    console.log("ON REMOTE @ TRACK", event, event.stream,);
    // myRef.current = {"srcObject":event.stream};
    // remoteVideoRef.current.srcObject = event.stream;
    videoElm.srcObject = event.stream;

    // setStream(event.stream)
    // setRemoteStream(event.stream);
  };

  rc.ondatachannel = (event) => {
    // Handle the data channel when it is created
    const dataChannel = event.channel;

    dataChannel.onopen = () => {
      console.log("Data channel opened!");
      // You can add any specific actions you want to perform when the data channel is open.
    };

    // Handle other data channel events if needed
  };

  rc.onicecandidate = async (e) => {
    if (e.candidate) {
      console.log("herei s the ansto_user_idsdfsadf" + JSON.stringify(rc.localDescription),"global_for__"+offer.frm_user_id);
      // const to_user_id = await fetchUserId(token, with_email);

      // saveRTCUserAns(
      //   false,
      //   JSON.stringify(rc.localDescription),
      //   to_user_id
      // );

      socket.emit("RESP_VIDEO",{
    
        ans:JSON.stringify(rc.localDescription),
        frm_user_id:loggedInUser.id,
        room: "global_for__"+offer.frm_user_id,
    
      })
    }
  };

  rc.setRemoteDescription(JSON.parse(offer.sdp)).then((a) => {
    console.log("set remoteDescription with local offer");
    console.log(
      "Signaling State after setting remoteDescription",
      rc.signalingState,
      a
    );
  });

  rc.createAnswer()
    .then((a) => {
      rc.setLocalDescription(a);
      console.log(
        "Signaling State after setting Local description set as a provisional answer.:",
        rc.signalingState
      );
    })
    .then((a) => {
      console.log("answer created");
      console.log(
        "Signaling State after setting Local description set as a provisional answer.:",
        rc.signalingState
      );
    });
  return [rc];
}

function attachCommonSocks(tezkit_app_data) {
  console.log("identifierssdfsdfsd", identifiers);
  socket.emit("join_room", {
    room: "global_for__" + loggedInUser[identifiers["name_idn"]],
  });

  socket.on("ON_MESSAGE_ARRIVAL_BOT", function (data) {
    msgHandler(socket, data, tezkit_app_data);
  });

  socket.on("INITIATE_VIDEO",async function (data) {
    console.log("Incoming Video Call...!!",data)

    const chatBody = document.getElementById("chatBody");


    const videoCont = document.createElement("div");
    videoCont.textContent = "just some"; // Optional content or heading
    chatBody.prepend(videoCont);

    // Create the video element
    const videoElement = document.createElement("video");
    videoCont.setAttribute("id","incoming-call")

    videoElement.style.display = "none"
    // videoElement.style.visibility = "hidden";




    // Set attributes for the video element
    videoElement.setAttribute("controls", "true"); // Adds play, pause, and volume controls
    videoElement.setAttribute("width", "400"); // Set width
    videoElement.setAttribute("height", "300"); // Set height
    videoElement.setAttribute("autoplay", "true"); // Optional: Automatically play when loaded
    // videoElement.setAttribute("loop", "true"); // Optional: Loop the video
    videoElement.setAttribute("muted", "true"); // Optional: Mute the video by default

    // Set the source of the video
    const sourceElement = document.createElement("source");
    // sourceElement.setAttribute("src", "path_to_video/video.mp4"); // Replace with the actual video URL
    // sourceElement.setAttribute("type", "video/mp4"); // Specify the video type

    // Append the source element to the video element
    videoElement.appendChild(sourceElement);

    // Append the video element to the container
    videoCont.appendChild(videoElement);


    // Create the div element
    let initiatorCallingUIi = document.createElement("div");
    initiatorCallingUIi.setAttribute("id", "dialer");
    initiatorCallingUIi.innerHTML = "Getting a call...<br>";

    // Create the Accept button
    const acceptButton = document.createElement("button");
    acceptButton.textContent = "Accept"; // Set the button text
    // acceptButton.setAttribute("id", "acceptButton"); // Set an ID for styling or identification
    // acceptButton.setAttribute("class", "btn btn-success"); // Add classes for styling if needed
    acceptButton.addEventListener('click',async function () {
      await respondVideo(videoElement,data)
      const dialer = document.getElementById('dialer')
      dialer.remove()

      const ongoingCallDiv = document.getElementById("incoming-call")
      const videoElm = ongoingCallDiv.querySelector('video')
      videoElm.style.display = "block"

    })
    // Append the button to the div
    initiatorCallingUIi.appendChild(acceptButton);



    videoCont.appendChild(initiatorCallingUIi)
    // Add fallback text for browsers that don't support the <video> element
    videoElement.textContent = "Your browser does not support the video tag.";
    

  })


  // RESP_VIDEO

  socket.on("RESP_VIDEO",async function (data) {
    const p_data = JSON.parse(data)
    console.log(lc, "RESP_VIDEO sdp has arrived!AS ans has arrived!",p_data.ans)
    lc.setRemoteDescription(JSON.parse(p_data.ans))
    .then((a) => {
      console.log("dowseseethantythere");
      console.log(
        "Signaling State after setting answer on setRemoteDescription:",
        lc.signalingState
      );
    })
    .catch((error) => {
      console.error("Error setting remote description:", error);
    });

    
    

  })




  socket.on("ON_MESSAGE_ARRIVAL", function (data) {
    msgHandler(socket, data, tezkit_app_data, "REPLY");
  });

  // Main socket event handler
  socket.on("ON_MESSAGE_STATUS_CHANGED", function (data) {
    const p_data = JSON.parse(data);

    if (!p_data.message.action) {
      console.error("No action provided!");
      return;
    }

    if (p_data.message.action === "MSG_UPDATED_EVENT") {
      // const msg_id = p_data.message.ret_id
      // delete p_data.message.ret_id
      // p_data.message.msg_id = msg_id
      handleMsgUpdatedEvent(p_data);
    } else if (p_data.message.action === "MSG_REACTION_EVENT") {
      // const msg_id = p_data.message.ret_id
      // delete p_data.message.ret_id
      // p_data.message.msg_id = msg_id
      //
      handleMsgReactionEvent(p_data);
    } else {
      console.error("Action Not Yet Handled:", p_data.message.action);
    }
  });

  socket.on("ON_FILE_UPLOAD", function (p_data) {
    msgHandler(
      socket,
      JSON.stringify(p_data),
      tezkit_app_data,
      "NEW_FILE_MIXED_V1"
    );
  });
}

function initializeSocketConnection(
  loggedInUser,
  tezkit_app_data,
  identifiers
) {
  if (loggedInUser) {
    // const io = await require('socket.io-client') // For client-side connection
    // const valid_soc_url = process.env.WS_SERVER || "wss://dev.addchat.tech"
    socket = io(process.env.WS_SERVER || "wss://dev.addchat.tech", {
      transports: ["websocket"],
    });

    //

    if (!identifiers.hasOwnProperty("name_idn")) {
      console.error("`name_idn` does not exist");
    } else {
      if (!loggedInUser.hasOwnProperty(identifiers["name_idn"])) {
      } else {
        attachCommonSocks(tezkit_app_data);

        // Usage in toggleChatModal or socket.on
        //
        const tezkit_app_pdata = JSON.parse(tezkit_app_data);

        const beta_toggle = isKeyTrue(
          tezkit_app_pdata.beta_toggle,
          "P2A",
          "live_status"
        )
        console.log("asdfsadfsadf", beta_toggle);
        if (beta_toggle.enable) {
          console.log("arewehever");
          socket.on("ON_USER_LIVE_STATUS", function (data) {
            const p_data = data;

            if (!p_data.hasOwnProperty("status")) {
              console.error("No status provided!");
            } else {
              const statusElement = document.getElementById("statusElement");

              if (statusElement) {
                statusElement.style.display = "inline";

                if (p_data.status === true) {
                  statusElement.textContent = "";
                  statusElement.style.background = "#9acd32";
                } else if (p_data.status === false) {
                  statusElement.textContent = "";
                  statusElement.style.background = "#a99bbe";
                }
              }
            }
          });
        }
      }
    }
  }
}


// export async function initialize(provided_token, apptyp="P2P", version ="V1") {
export async function initialize(provided_token) {
  // Attach the function to the resize event
  window.addEventListener("resize", checkViewportSize);

  const tezkit_app_data = localStorage.getItem("tezkit_app_data");

  if (tezkit_app_data) {
    const tezkit_app_p_data = JSON.parse(tezkit_app_data);
    console.log("sdfjsdlfjsdafsdf", tezkit_app_p_data);

    setIdentifiers(tezkit_app_p_data);
    const apptyp = tezkit_app_p_data.settings.app_type;
    const version = tezkit_app_p_data.settings.version;
    const tenant = tezkit_app_p_data.tenant_id;
    const app_name = tezkit_app_p_data.app_name;

    console.log(tezkit_app_p_data, "so can we rejruewrtenant_id", tenant);

    loggedInUser = await handleUserAuthentication(
      provided_token,
      tezkit_app_p_data,
      apptyp,
      version,
      tenant,
      app_name
    );

    console.log("dowe have it?sdafsdf", loggedInUser, socket);
    const tezkit_msgs_read_data = localStorage.getItem("tezkit_msgs_read_data");

    console.log(
      "wathewoirow is this tezkit_msgs_read_data",
      tezkit_msgs_read_data
    );
    if (tezkit_msgs_read_data) {
      checkAPIKeyMatch(tezkit_app_p_data, tezkit_msgs_read_data);
    }

    initializeSocketConnection(loggedInUser, tezkit_app_data, identifiers);
    awayHandler(loggedInUser, socket, apptyp, version, identifiers);
  } else {
    await handleMissingAppData();
  }

  const token = localStorage.getItem("tezkit_token");
  const tezkit_header_req = localStorage.getItem("tezkit_header_req");
  const tezkit_header_req_p = JSON.parse(tezkit_header_req);

  headerHandler(tezkit_app_data, token, tezkit_header_req_p);

  if (!chat_modal && loggedInUser) {
      console.log("open")
    chat_modal = createChatModal(tezkit_app_data);
    document.body.appendChild(chat_modal);
  const theme = getTheme();

    const chat_modal_opener_container = createChatModalOpenerContainer(
      theme,
      tezkit_app_data
    );
  document.body.appendChild(chat_modal_opener_container);

  }
}

// export async function initialize(provided_token, apptyp="P2P", version ="V1") {
export async function logout() {
  // localStorage.removeItem("token");

  const localStorageKeys = [
    "tezkit_app_name",
    "tezkit_api_key",
    "tezkit_msgs_read_data",
    "tezkit_msgs_unread_data",
    "theme",
    "tezkit_header_req",
    "setup_done",
    "redirect_uri",
    "tezkit_app_data",
    "tezkit_token",
    "tezkit_me",
  ];
  localStorageKeys.forEach((element) => {
    localStorage.removeItem(element);
  });
}

async function handleUserAuthentication(
  user_data,
  tezkit_app_p_data,
  apptyp,
  version,
  tenant,
  app_name
) {
  console.log(
    "Processing authentication:",
    user_data,
    tezkit_app_p_data,
    apptyp,
    version
  );

  if (!user_data) {
    // throw new Error("User data is required.");
    return null;
  }

  // Validate `apptyp` before proceeding
  const supportedAppTypes = ["P2P"]; // Example: Add supported app types here
  if (!supportedAppTypes.includes(apptyp)) {
    throw new Error(`Unsupported application type: ${apptyp}`);
  }

  let loggedInUser;

  try {
    console.log(
      "dsfherewrwerewrversdfsiontezkit_app_p_data",
      version,
      apptyp,
      tezkit_app_p_data
    );
    switch (version) {
      // console.log("object")

      case "V1":
        if (tezkit_app_p_data.settings.version == "V1") {
          // V1 Case: Handle Cloud Managed Authentication
          loggedInUser = await makeMeAPICall(user_data);
          localStorage.setItem("tezkit_me", JSON.stringify(loggedInUser));

          const loginForm = document.getElementById("loginForm");
          if (loginForm) {
            loginForm.addEventListener("submit", handleLogin);
          }
        } else {
          throw new Error("Unsupported configuration for V1 app type.");
        }
        break;

      case "V2":
        if (tezkit_app_p_data.settings.version == "V2") {
          // V2 Case: Handle Non-Cloud Managed Authentication
          loggedInUser = {
            ...user_data,
            apptyp,
            version,
            tenant,
            app_name,
            tenant_info: tezkit_app_p_data.tenant_info,
          };
          console.log("Logged in user for V2:", loggedInUser);
          localStorage.setItem("tezkit_me", JSON.stringify(loggedInUser));
        } else {
          console.log(
            version,
            "whey waht is it?",
            tezkit_app_p_data.settings.version
          );
          throw new Error("Unsupported configuration for V2 app type.");
        }
        break;

      case "V3":
        if (tezkit_app_p_data.settings.version == "V3") {
          console.log(
            typeof tezkit_app_p_data,
            "tezkit_app_p_datasdf",
            tezkit_app_p_data.auth_key
          );

          const reqUrl =
            "https://gfxb0jf19k.execute-api.ap-south-1.amazonaws.com/prod/onboarding";
          const headersList = {
            Accept: "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)", // Optional, might not be supported by some environments
            "X-API-Key": tezkit_app_p_data.auth_key,
            "Content-Type": "application/json",
          };
          const payload = JSON.stringify({
            tenant: tezkit_app_p_data.tenant_id,
            uid: user_data.uid,
            app_name: tezkit_app_p_data.app_name,
            version:tezkit_app_p_data.settings.version
          });

          fetch(reqUrl, {
            method: "POST",
            headers: headersList,
            body: payload,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("response data:aaa", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });

          // V3 Case: Handle Non-Cloud Managed Authentication
          loggedInUser = {
            ...user_data,
            apptyp,
            version,
            tenant,
            app_name,
            tenant_info: tezkit_app_p_data.tenant_info,
          };
          console.log("Logged in user for V3:", loggedInUser);
          localStorage.setItem("tezkit_me", JSON.stringify(loggedInUser));
        } else {
          console.log(
            version,
            "whey waht is it1?",
            tezkit_app_p_data.settings.version
          );
          throw new Error("Unsupported configuration for V3 app type.");
        }
        break;

      default:
        throw new Error(`Unsupported version: ${version}`);
    }
  } catch (error) {
    console.error("Authentication failed:", error.message);
    throw error; // Re-throw error after logging it
  }

  return loggedInUser;
}

function checkAPIKeyMatch(tezkit_app_p_data, tezkit_msgs_read_data) {
  const tezkit_msgs_p_data = JSON.parse(tezkit_msgs_read_data);
  if (tezkit_app_p_data.auth_key !== tezkit_msgs_p_data.api_key) {
    // console.error("Key did not seem to match, Please logout and login back");
  }
}

function setIdentifiers(tezkit_app_p_data) {
  // as soon as we have tezkit_app_p_data we should set an identifier
  if (tezkit_app_p_data.settings.version == "V1") {
    identifiers["name_idn"] = "id";
  } else if (
    tezkit_app_p_data.settings.version == "V2" ||
    tezkit_app_p_data.settings.version == "V3"
  ) {
    identifiers["name_idn"] = "uid";
  }
}

async function handleMissingAppData() {
  const app_name = localStorage.getItem("tezkit_app_name");
  const api_key = localStorage.getItem("tezkit_api_key");

  if (!app_name || !api_key) {
    console.error("app_name not provided to the client!");
  } else {
    try {
      const data = await setAppData(app_name, api_key);
      console.log("what is this should we nto reaiase ian ero", data);
      if (data.hasOwnProperty("statusCode") && data.statusCode != 200) {
        const pdata = JSON.parse(data.body);
        // throw Error(pdata.message)
        renderErrorPopup([
          pdata.message || "An unknown error occurred",
          "Or `api_key` is not correct for this `app_name`",
        ]);
      } else {
        localStorage.setItem("tezkit_app_data", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error occurred!", error);
    }
  }
}





// Function to handle routing to /chat and render a box with an orange background
export function routeToChat() {
  // Clear the body content
  document.body.innerHTML = "";

  // Create the chat box
  const chatBox = document.createElement("div");
  chatBox.style.width = "100%";
  chatBox.style.height = "200px";
  chatBox.style.backgroundColor = "orange";
  chatBox.style.color = "black";
  chatBox.style.textAlign = "center";
  chatBox.style.lineHeight = "200px";
  chatBox.innerText = "Welcome to the Chat!";

  // Append the chat box to the body
  document.body.appendChild(chatBox);

  // Optionally, update the URL to reflect the new route
  history.pushState(null, "", "/chat");
}









console.log("is it latested?");
