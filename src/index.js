//
// import io from 'socket.io'; // Add this line if missing

// Import the CSS file
import "./style.css";
import io from "socket.io-client";

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

const identifiers = {};

let chat_modal_open = false;
let chat_modal = null;
console.log("process.env.dsfsdf"); // Output will be the value of CUSTOM_ENV

export { chat_modal_open };

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

function headerHandler(tezkit_app_data, token, tezkit_header_req_p) {
  if (tezkit_app_data) {
    const tezkit_app_p_data = JSON.parse(tezkit_app_data);

    if (tezkit_app_p_data.settings.version == "V1") {
      if (!token) {
        if (tezkit_header_req_p === false) {
          const tezkit_auth_div = document.getElementById("tezkit-auth-area");
          const signupBtn = createABtn("Signup");
          tezkit_auth_div.appendChild(signupBtn); // Append the// Set the inner HTML to the returned value
          const loginBtn = createABtn("Login");
          tezkit_auth_div.appendChild(loginBtn); // Append the// Set the inner HTML to the returned value
        } else {
          renderAuthHeader();
        }
      } else {
        if (tezkit_header_req_p === false) {
          const tezkit_auth_div = document.getElementById("tezkit-auth-area");
          const logoutBtn = createABtn("Logout");
          const meButton = createMeButtonComp("My Profile", (event) => {
            meProfileHandler(event);
          });

          tezkit_auth_div.appendChild(logoutBtn); // Append the// Set the inner HTML to the returned value
          tezkit_auth_div.appendChild(meButton);
        } else {
          renderAuthHeader(token);
        }

        // rightPart.appendChild(makeCompButton);
      }
    }
  } else {
    if (tezkit_header_req_p) {
      console.log(
        "wahteir si the problemtezkit_header_req_p",
        tezkit_header_req_p
      );
      renderAuthHeader();
    } else {
      if (tezkit_header_req_p === false) {
        // THIS SHOULD run only for V1
        // THIS HAPPENS WHEN APP IS V1 ONLY
        const tezkit_auth_div = document.getElementById("tezkit-auth-area");
        const signupBtn = createABtn("Signup");
        tezkit_auth_div.appendChild(signupBtn); // Append the// Set the inner HTML to the returned value
        const loginBtn = createABtn("Login");
        tezkit_auth_div.appendChild(loginBtn); // Append the// Set the inner HTML to the returned value
      }
    }
  }
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

let socket;

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

function addP2BMessageToChatBody(
  chatBody,
  obj,
  direction = "RECEIVED",
  frm_top
) {
  let tn1;
  let append_msg = null;

  if (!obj.message.msg_id) {
    tn1 = getNextCorrectLength("chatBody", "isittrueit's running twice");
    obj.message.msg_id = tn1;
  }

  console.log("so this message type is never com", obj);
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

  if (new_messageElement) {
    // console.log("append_msgsdfsdf",append_msg)

    const theme = localStorage.getItem("theme");
    if (theme) {
      const theme_obj = JSON.parse(theme);
      if (theme_obj.chat_box_theme) {
        if (theme_obj.chat_box_theme.textColor) {
          new_messageElement.style.color = theme_obj.chat_box_theme.textColor;
          // chatHeader.style.color = "green"
        }

        if (theme_obj.chat_box_theme.backgroundColor) {
          new_messageElement.style.backgroundColor =
            theme_obj.chat_box_theme.backgroundColor;
        }
      }
    }

    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("message-container");
    messageWrapper.setAttribute("id", obj.message.msg_id);
    messageWrapper.appendChild(new_messageElement);

    if (direction) {
      obj.direction = direction;
      if (direction == "SENT") {
        // direction
        new_messageElement.classList.add("left_side");
      } else {
        new_messageElement.classList.add("admin");
      }
    }

    if (frm_top) {
      chatBody.prepend(messageWrapper);
    } else {
      chatBody.appendChild(messageWrapper);
    }
  }
  return tn1;
}

export function renderAuthHeader(token) {
  const header = document.createElement("div");
  const theme = localStorage.getItem("theme");
  const theme_p = JSON.parse(theme);
  if (theme_p && theme_p.header_theme) {
    //override css here...
    header.style.backgroundColor = theme_p.header_theme.backgroundColor;
  }

  if (theme_p && theme_p.header_theme) {
    //override css here...
    header.style.color = theme_p.header_theme.textColor;
  }

  header.classList.add("header__" + arbitrary_string_to_diff);

  const leftPart = document.createElement("div");
  leftPart.classList.add("left");

  let tezkit_app_p_data = null;
  const tezkit_app_data = localStorage.getItem("tezkit_app_data");

  if (tezkit_app_data) {
    tezkit_app_p_data = JSON.parse(tezkit_app_data);
  }

  // Create an img element for the logo
  const logo = document.createElement("img");
  // logo.src = myImage;
  // logo.alt = "Tezkit Logo";
  logo.style.height = "50px"; // Adjust the height as needed
  logo.style.marginRight = "10px"; // Optional: Add some space between the logo and text

  leftPart.appendChild(logo);

  const logoText = document.createElement("div");

  if (tezkit_app_p_data) {
    console.log("sadfsdfsasdfsddf", tezkit_app_p_data);
    logoText.textContent = tezkit_app_p_data.tenant_id;

    if (tezkit_app_p_data.tenant_info.image) {
      logo.src = tezkit_app_p_data.tenant_info.image; //myImage;
    }
    logo.alt = tezkit_app_p_data.tenant_id + " Logo";
  }

  logoText.style.display = "inline-block"; // To align it horizontally with the image
  logoText.style.verticalAlign = "middle"; // To align it vertically with the image
  leftPart.appendChild(logoText);

  header.appendChild(leftPart);

  const rightPart = document.createElement("div");
  rightPart.classList.add("right");
  // rightPart.style.border = "5px solid red";

  const notificationIcon = document.createElement("span");
  notificationIcon.textContent = "🔔";
  notificationIcon.style.cursor = "pointer";
  notificationIcon.addEventListener("click", toggleNotificationModal);

  const notificationNum = document.createElement("span");
  notificationNum.setAttribute("id", "notification_num");
  notificationNum.textContent = 0;
  notificationNum.style.cursor = "pointer";
  // notificationNum.addEventListener('click', toggleNotificationModal);

  const notificationWrapperDiv = document.createElement("div");
  // notificationNum.textContent = 0;
  // notificationNum.style.cursor = 'pointer';
  // notificationNum.addEventListener('click', toggleNotificationModal);

  notificationWrapperDiv.appendChild(notificationIcon);
  notificationWrapperDiv.appendChild(notificationNum);

  rightPart.appendChild(notificationWrapperDiv);

  // const token = localStorage.getItem("tezkit_token");

  header.appendChild(rightPart);

  document.body.prepend(header);

  if (token) {
    const logoutButton = createButtonComp("Logout", () => {
      // Logout here
      logoutHandler();
    });

    rightPart.appendChild(logoutButton);

    // Add "My Profile" button with toggle functionality
    const meButton = createMeButtonComp("My Profile", (event) => {
      meProfileHandler(event);
    });

    //let's check if the config is invalid
    rightPart.appendChild(meButton);

    // const chatIcon = document.createElement("span");
    // chatIcon.textContent = "💬";
    // chatIcon.style.cursor = "pointer";
  } else {
    const loginButton = createABtn("Login");
    rightPart.appendChild(loginButton);

    // Example usage
    const signupButton = createABtn("Signup");

    rightPart.appendChild(signupButton);
  }
}

// Define your breakpoints
const MOBILE_WIDTH = 768;

// Function to check the viewport size
function checkViewportSize() {
  // if (width < 800) {
  //
  //   chat_modal.style.display = "flex";

  // }
  // else {
  //
  //   chat_modal.style.display = "block";

  // }

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

function renderErrorPopup(err_msgs) {
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

let loggedInUser = null;

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

 // Function to load more messages
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
  console.log("arewqrewrwer")
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
    console.log("arewerewrew")
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
  })()

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

async function renderLeftPart() {
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
    userElement.addEventListener('click',async function () {
    console.log("objectuserElement",user)
      //here we can try to rerender something in the right part?
      // loadChatSkelton(rsc)      
      const rsc = document.querySelector(".right-side-chat")
      // console.log("rsasdfsdfsdf",rsc)


    const tezkit_app_data = localStorage.getItem("tezkit_app_data");


    if (loggedInUser) {
      // Then find the chat_header and the h3 element inside it
    const chatHeader = createChatHeader(tezkit_app_data);
    const chatBody = createChatBody();
    // rsc.firstChild.remove()
    while (rsc.firstChild) {
      rsc.firstChild.remove();
    }
    rsc.appendChild(chatHeader)
    rsc.appendChild(chatBody)
    


      // chatHeader.querySelector(".chat_header");
    const theme = localStorage.getItem("theme");
    const chatFooter = createChatFooter(tezkit_app_data, theme, user);
    rsc.appendChild(chatFooter)

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
            console.log("userele",userElement)
              loginMessage.textContent = user.full_name
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
    console.log("arewrewrwer")
      renderRightPart(tezkit_app_data)

    }
    
    })
    userElement.textContent = user.full_name;
    userElement.className = "user-name-item"; // Optional class for styling
    chat_lr_wrapper.appendChild(userElement);


  });

  console.log("Left side chat updated with users' names.");
}

// Call the renderLeftPart function to fetch and render users
// renderLeftPart();

  // Function to toggle the modal visibility
  async function toggleChatModal(loggedInUser, tezkit_app_data) {
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

function createChatModal(tezkit_app_data) {
  console.log("Creating chat modal...");

  const theme = getTheme();
  const chat_modal = createChatModalContainer();
  const chatWrapper = createChatWrapper();

  const leftSideChat = createLeftSideChat();
  const rightSideChat = createRightSideChat(tezkit_app_data, theme);

  chatWrapper.appendChild(leftSideChat);
  chatWrapper.appendChild(rightSideChat);

  chat_modal.appendChild(chatWrapper);

  const chat_modal_opener_container = createChatModalOpenerContainer(theme, tezkit_app_data);
  document.body.appendChild(chat_modal);

  return chat_modal_opener_container;
}

function getTheme() {
  const theme = localStorage.getItem("theme");
  return JSON.parse(theme);
}

function createChatModalContainer() {
  const chat_modal = document.createElement("div");
  chat_modal.classList.add("chat_modal" + "__" + arbitrary_string_to_diff);
  chat_modal.id = "chatModal" + "__" + arbitrary_string_to_diff;
  document.body.appendChild(chat_modal);
  return chat_modal;
}

function createChatWrapper() {
  const chatWrapper = document.createElement("div");
  chatWrapper.classList.add("chat-lr-wrapper");
  return chatWrapper;
}

function createLeftSideChat() {
  const leftSideChat = document.createElement("div");
  leftSideChat.classList.add("left-side-chat");
  leftSideChat.textContent = "Left Side";
  return leftSideChat;
}

function loadChatSkelton(rsc) {

  const tezkit_app_data = localStorage.getItem("tezkit_app_data");

    const chatHeader = createChatHeader(tezkit_app_data);
  const chatBody = createChatBody();
  const chatFooter = createChatFooter(tezkit_app_data, theme);

  rsc.appendChild(chatHeader);
  // rightSideChat.appendChild(chatBody);
  // rightSideChat.appendChild(chatFooter);



  

  // return rightSideChat
  // rsc.appendChild(rightSideChat)
}

function createRightSideChat(tezkit_app_data, theme) {
  const rightSideChat = document.createElement("div");
  rightSideChat.classList.add("right-side-chat");


  const defaultScreen = document.createElement("div")
  defaultScreen.textContent = "sall default"
  rightSideChat.appendChild(defaultScreen);

  return rightSideChat;
}




function createChatHeader(tezkit_app_data) {
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

  const closeButton = createCloseButton(tezkit_app_data);

  chatHeader.appendChild(headerLeft);
  chatHeader.appendChild(closeButton);

  return chatHeader;
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

function createSendButton(tezkit_app_data, chatInput,to_id) {
  const sendButton = document.createElement("button");
  sendButton.id = "sendButton";
  sendButton.textContent = "Send";

  sendButton.addEventListener("click", () => handleSend(tezkit_app_data, chatInput,to_id));

  return sendButton;
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

function createChatModalOpenerContainer(theme, tezkit_app_data) {
  const chat_modal_opener_container = document.createElement("div");
  chat_modal_opener_container.id = "chat_modal_opener" + "__" + arbitrary_string_to_diff;
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

function createUnreadBadge() {
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

function attachCommonSocks(tezkit_app_data) {
  console.log("identifierssdfsdfsd", identifiers);
  socket.emit("join_room", {
    room: "global_for__" + loggedInUser[identifiers["name_idn"]],
  });

  socket.on("ON_MESSAGE_ARRIVAL_BOT", function (data) {
    msgHandler(socket, data, tezkit_app_data);
  });

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
          "consumer",
          "receive_live_status_from_connected_clients"
        );
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

// export async function initialize(provided_token, apptyp="P2A", version ="V1") {
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
  }
}

// export async function initialize(provided_token, apptyp="P2A", version ="V1") {
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
  const supportedAppTypes = ["P2A"]; // Example: Add supported app types here
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

function createButtonComp(text, onClick) {
  const button = document.createElement("button");
  button.setAttribute(
    "class",
    text.toLowerCase() + "__" + arbitrary_string_to_diff
  );
  button.style.marginRight = "5px";
  // button.style.border = "3px solid black";
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

export function createABtn(name) {
  // Define a mapping of names to functions
  const functionMap = {
    Signup: toggleSignup,
    Login: routeToLogin, // Add any other functions you want to map
    Logout: logoutHandler,
    // Add more mappings as needed
  };

  // Get the appropriate function based on the name
  const func = functionMap[name];

  // Check if the function exists before calling it
  if (func) {
    // Use an arrow function to retain the lexical context
    return createButtonComp(name, () => {
      func(); // Call the appropriate function
    });
  } else {
    console.error(`No function mapped for name: ${name}`);
    return null; // Return null or handle the error as needed
  }
}

function createMeButtonComp(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

// Function to create a modal element
// Function to create a modal element
function createMeModal(data) {
  const modal = document.createElement("div");
  Object.assign(modal.style, {
    width: "300px",
    position: "absolute",
    borderRadius: "8px",
    zIndex: 1000000000,
    backgroundColor: "white",
    padding: "16px",
    border: "1px solid #ccc",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    color: "#333",
  });

  // Generate content in a key-value column format
  const content = `
    <table style="width: 100%; border-collapse: collapse;">
      <tbody>
        ${Object.entries(data)
          .map(([key, value]) => {
            if (key === "tenant_info" && typeof value === "object") {
              // Handle nested tenant_info object
              return `
                <tr>
                  <td colspan="2" style="padding: 8px 0; font-weight: bold; text-align: center;">Tenant Information</td>
                </tr>
                ${Object.entries(value)
                  .map(
                    ([nestedKey, nestedValue]) =>
                      `<tr>
                        <td style="padding: 4px; border-bottom: 1px solid #f0f0f0; text-align: left;">${nestedKey}</td>
                        <td style="padding: 4px; border-bottom: 1px solid #f0f0f0; text-align: right;">${
                          typeof nestedValue === "string" &&
                          nestedValue.startsWith("http")
                            ? `<img src="${nestedValue}" alt="${nestedKey}" style="width: 50px; height: auto; border-radius: 4px;" />`
                            : nestedValue
                        }</td>
                      </tr>`
                  )
                  .join("")}
              `;
            }

            return `
              <tr>
                <td style="padding: 4px; border-bottom: 1px solid #f0f0f0; text-align: left;">${key}</td>
                <td style="padding: 4px; border-bottom: 1px solid #f0f0f0; text-align: right;">${
                  typeof value === "string" && value.startsWith("http")
                    ? `<img src="${value}" alt="${key}" style="width: 50px; height: auto; border-radius: 4px;" />`
                    : value
                }</td>
              </tr>
            `;
          })
          .join("")}
      </tbody>
    </table>
  `;

  modal.innerHTML = content;
  return modal;
}

function createModal(content) {
  const modalOverlay = document.createElement("div");
  modalOverlay.style.position = "fixed";
  modalOverlay.style.top = "0";
  modalOverlay.style.left = "0";
  modalOverlay.style.width = "100%";
  modalOverlay.style.height = "100%";
  modalOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modalOverlay.style.display = "flex";
  modalOverlay.style.justifyContent = "center";
  modalOverlay.style.alignItems = "center";
  modalOverlay.style.zIndex = "1000";

  const modalContent = document.createElement("div");
  modalContent.style.backgroundColor = "white";
  modalContent.style.padding = "100px";
  modalContent.style.borderRadius = "8px";
  modalContent.style.width = "800px";
  modalContent.style.textAlign = "center";

  // // back button
  const backButton = document.createElement("button");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-arrow-left");
  icon.style.color = "black";
  icon.style.fontSize = "24px";
  icon.style.padding = "14px";
  backButton.appendChild(icon);

  // backButton.textContent = "Back";
  backButton.style.marginBottom = "15px";
  backButton.style.border = "none";
  backButton.style.outline = "none";
  backButton.style.borderRadius = "8px";
  backButton.addEventListener("click", () => {
    document.body.removeChild(modalOverlay);
  });

  modalContent.appendChild(backButton);
  modalContent.appendChild(content);
  modalOverlay.appendChild(modalContent);

  document.body.appendChild(modalOverlay);
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

// Function to handle routing to /login and render a login form
export function routeToLogin() {
  // Clear the body content
  // document.body.innerHTML = "";

  // Create the login form
  // const loginForm = createLoginForm(handleLogin);

  // Usage example
  const formConfig = {
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
        placeholder: "Enter you password",
        type: "password",
      },
    ],
  };

  const loginForm = createDynamicForm(formConfig, handleLogin);

  createModal(loginForm);

  // document.body.appendChild(loginForm);

  // Optionally, update the URL to reflect the new route
  // history.pushState(null, "", "/login");
}
function resetSettingFunc() {
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
  // setTimeout(function () {
  //   window.location.reload();
  // }, 3000);
  window.location.reload();
}
// Function to handle routing to /login and render a login form
export function logoutHandler() {
  resetSettingFunc();
}

// Function to handle routing to /login and render a login form
export function meProfileHandler(event) {
  const existingModal = document.querySelector(".profile-modal");

  if (existingModal) {
    // Remove modal if it already exists (close it)
    existingModal.remove();
  } else {
    // Create and display the new modal
    const me = JSON.parse(localStorage.getItem("tezkit_me")); // Parse the stored JSON string

    const modal = createMeModal(me);
    modal.classList.add("profile-modal"); // Add class to identify it later

    // Position modal below the button
    modal.style.top = `${
      event.target.getBoundingClientRect().bottom + window.scrollY
    }px`;
    modal.style.right = "0px"; // Position modal on the right edge
    document.body.appendChild(modal);
  }
}
// Function to toggle the modal visibility
function toggleNotificationModal() {
  const modal = document.getElementById("notificationModal");
  if (modal.style.display === "none" || modal.style.display === "") {
    modal.style.display = "block";
    //HERE WE PROBABLY SHOULD LIST OUT ALL THE NOTIFICATIONS IN DECENDING ORDER (ARRIVAL)
  } else {
    modal.style.display = "none";
  }
}

function toggleSignup() {
  const existingForm = document.getElementById("signupForm");
  if (existingForm) {
    existingForm.remove();
  } else {
    const signupForm = createSignupForm();
    signupForm.id = "signupForm";
    createModal(signupForm);
  }
}

// Function to create the signup form
function createSignupForm() {
  const form = document.createElement("form");
  form.style.width = "100%";
  form.id = "signupForm";

  // Title
  const titleElement = document.createElement("h2");
  titleElement.textContent = "Signup";
  titleElement.style.textAlign = "center";
  titleElement.style.marginBottom = "20px";
  form.appendChild(titleElement);

  // Full name input
  const fullNameInput = createFormInput(
    "full_name",
    "Enter your full name",
    "text"
  );
  form.appendChild(fullNameInput);

  // Image upload input
  const imageLabel = document.createElement("label");
  imageLabel.textContent = "Upload your profile picture (optional)";
  imageLabel.style.display = "block";
  imageLabel.style.marginTop = "15px";

  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.id = "profile_image";
  imageInput.name = "profile_image";
  imageInput.accept = "image/*"; // Accept only image files
  imageInput.style.display = "block";
  imageInput.style.marginTop = "5px";

  form.appendChild(imageLabel);
  form.appendChild(imageInput);

  // Phone number input
  const phoneInput = createFormInput(
    "phone",
    "Enter your phone number (optional)",
    "text"
  );
  form.appendChild(phoneInput);

  // Email input
  const emailInput = createFormInput("email", "Enter your email", "email");
  form.appendChild(emailInput);

  // Password input
  const passwordInput = createFormInput(
    "password",
    "Enter your password",
    "password"
  );
  form.appendChild(passwordInput);

  // Gender input
  const genderWrapper = document.createElement("div");
  genderWrapper.style.display = "flex";
  genderWrapper.style.alignItems = "center";
  genderWrapper.style.gap = "20px";

  const genderLabel = document.createElement("label");
  genderLabel.textContent = "Gender";
  genderLabel.style.fontWeight = "600";
  genderLabel.style.marginRight = "10px";

  const genderMale = document.createElement("input");
  genderMale.type = "radio";
  genderMale.name = "gender";
  genderMale.value = "Male";
  genderMale.style.transform = "scale(1.5)";

  const genderFemale = document.createElement("input");
  genderFemale.type = "radio";
  genderFemale.name = "gender";
  genderFemale.value = "Female";
  genderFemale.style.transform = "scale(1.5)";

  genderWrapper.appendChild(genderLabel);
  genderWrapper.appendChild(genderMale);
  genderWrapper.appendChild(document.createTextNode("Male"));
  genderWrapper.appendChild(genderFemale);
  genderWrapper.appendChild(document.createTextNode("Female"));
  form.appendChild(genderWrapper);

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Signup";
  submitButton.style.width = "100%";
  submitButton.style.padding = "20px";
  submitButton.style.backgroundColor = "#4CAF50";
  submitButton.style.color = "white";
  submitButton.style.border = "none";
  submitButton.style.borderRadius = "3px";
  submitButton.style.fontSize = "16px";
  submitButton.style.marginTop = "30px";
  submitButton.style.cursor = "pointer";
  form.appendChild(submitButton);

  // Get local storage data for tenant information
  const tezkit_app_data = localStorage.getItem("tezkit_app_data");
  const tezkit_app_pdata = JSON.parse(tezkit_app_data);

  // Form submission handling
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("type", "user_type");
    const file = imageInput.files[0];
    if (file) {
      formData.append("file", file, file.name);
    }

    if (formData.phone && formData.phone.trim() !== "") {
      formData.append("phone", formData.phone.trim());
    }

    formData.append("tenant", tezkit_app_pdata.tenant_id);
    formData.append("password", form.password.value);
    formData.append("full_name", form.full_name.value);
    formData.append("email", form.email.value);
    formData.append("gender", form.gender.value);
    formData.append("app_name", tezkit_app_pdata.app_name);
    formData.append("role", "65536");
    formData.append("type", "user_type");
    // type: user_type
    // app_name: my app1

    const requestOptions = {
      method: "POST",
      headers: {
        "X-API-Key": tezkit_app_pdata.auth_key,
      },
      body: formData,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://gfxb0jf19k.execute-api.ap-south-1.amazonaws.com/prod/signup",
        requestOptions
      );

      if (response.ok) {
        routeToLogin(); // Navigate to /login on successful signup
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  return form;
}

// Helper function to create form input elements
function createFormInput(name, placeholder, type) {
  const input = document.createElement("input");
  input.name = name;
  input.placeholder = placeholder;
  input.type = type;
  input.style.width = "100%";
  input.style.padding = "15px";
  input.style.marginBottom = "20px";
  input.style.border = "1px solid #ccc";
  input.style.borderRadius = "3px";
  input.style.outline = "none";
  input.style.fontSize = "16px";
  return input;
}

// Function to create the login form dynamically
function createDynamicForm(config, handleSubmit) {
  const form = document.createElement("form");
  form.style.width = "100%";
  // form.style.maxWidth = "400px";
  // form.style.margin = "auto";
  // form.style.padding = "20px";
  // form.style.backgroundColor = "#f2f2f2";
  // form.style.border = "1px solid #ccc";
  // form.style.borderRadius = "5px";
  form.id = config.form.id;

  // Title
  const titleElement = document.createElement("h2");
  titleElement.textContent = config.form.title || "Form Title";
  titleElement.style.textAlign = "center";
  titleElement.style.marginBottom = "20px";
  form.appendChild(titleElement);

  // Generate form fields dynamically
  config.fields.forEach((field) => {
    const input = createFormInput(
      field.field_name,
      field.placeholder,
      field.type
    );
    form.appendChild(input);
  });

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = config.submitButton.textContent || "Submit";
  submitButton.style.width = "100%";
  submitButton.style.padding = "20px";
  submitButton.style.backgroundColor = "#4CAF50";
  submitButton.style.color = "white";
  submitButton.style.border = "none";
  submitButton.style.borderRadius = "3px";
  submitButton.style.fontSize = "16px";
  submitButton.style.fontWeight = "600px";
  form.appendChild(submitButton);

  // Form submission handling
  form.addEventListener("submit", handleSubmit);

  return form;
}

// Function to handle login form submission
async function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  try {
    const tezkitAppData = localStorage.getItem("tezkit_app_data");
    if (!tezkitAppData) {
      throw new Error("Tezkit app data is missing from local storage.");
    }

    const tezkitAppParsedData = JSON.parse(tezkitAppData);
    console.log("Parsed Tezkit App Data:", tezkitAppParsedData);

    if (tezkitAppParsedData.settings?.version === "V1") {
      console.log("is it really goigng througthisn");
      const loginData = {
        type: "user_type",
        email: formData.get("email"),
        password: formData.get("password"),
        app_name: tezkitAppParsedData.app_name,
      };

      const headers = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };

      const response = await fetch(
        "https://gfxb0jf19k.execute-api.ap-south-1.amazonaws.com/prod/login",
        {
          method: "POST",
          body: JSON.stringify(loginData),
          headers: headers,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (!responseData?.token) {
          throw new Error(
            "Invalid email or password. Token missing in response."
          );
        }

        // Save the token to local storage
        localStorage.setItem("tezkit_token", responseData.token);
        console.log("Token saved successfully:", responseData.token);

        // Redirect based on the redirect URI
        const redirectUri = localStorage.getItem("redirect_uri");
        console.log("Redirect URI:", redirectUri);

        if (redirectUri) {
          routeToRoot(redirectUri);
        } else {
          routeToRoot("/package-consumer/index.html");
        }
      } else {
        // Handle non-2xx response
        const errorResponse = await response.json();
        console.error("Login failed:", errorResponse);

        renderErrorPopup([
          "Login failed",
          errorResponse.error || "An unknown error occurred.",
        ]);
      }
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error during login:", error);

    renderErrorPopup([
      "An unexpected error occurred. Please ensure all credentials are correct. If the issue persists, open a ticket.",
      error.message || "Please try again later.",
    ]);
  }
}

console.log("is it latested?");
// Function to handle routing to / root and render a welcome message
function routeToRoot(path = null) {
  // // Optionally, update the URL to reflect the new route
  history.pushState(null, "", path);
  window.location.reload();
}
