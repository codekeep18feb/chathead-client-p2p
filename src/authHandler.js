
const arbitrary_string_to_diff = "j7hD9nXt3QpLvFz1uY6j7m2";
import {renderErrorPopup} from "./index"


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

  


// Function to handle routing to / root and render a welcome message
function routeToRoot(path = null) {
  // // Optionally, update the URL to reflect the new route
  history.pushState(null, "", path);
  window.location.reload();
}


export async function handleLogin(event) {
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

export function createDynamicForm(config, handleSubmit) {
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

// Helper function to create form input elements
export function createFormInput(name, placeholder, type) {
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


export function resetSettingFunc() {
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


// Function to handle routing to /login and render a login form
export function logoutHandler() {
  resetSettingFunc();
}



function createMeButtonComp(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
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




export function headerHandler(tezkit_app_data, token, tezkit_header_req_p) {
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