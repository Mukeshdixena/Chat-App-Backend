
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

async function addMessage(userId, messageText, createdAt) {

    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';

    const userName = `User ${userId}`;
    const timestamp = new Date(createdAt).toLocaleString();

    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = messageText;

    const header = document.createElement('div');
    header.className = 'message-header';
    header.innerHTML = `<strong>${userName}</strong> - <span class="timestamp">${timestamp}</span>`;

    messageContainer.appendChild(header);
    messageContainer.appendChild(message);

    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

let lastMsgId = 0;

let currentGourpId;

async function loadMessages() {
    chatBox.innerHTML = '';

    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}/api/getMessages`,
            {
                params: { ChatGroupId: currentGourpId },
                headers: { "Authorization": token }
            });

        const messages = response.data;
        if (messages.length > 0) {
            messages.forEach((messageData) => {
                const { UserId, messageText, createdAt, id } = messageData;
                addMessage(UserId, messageText, createdAt);

                if (id > lastMsgId) {
                    lastMsgId = id;
                }
            });
        }
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}
async function loadNewMessages() {

    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`${CONFIG.API_BASE_URL}/api/getNewMessages`,
            {
                params: { ChatGroupId: currentGourpId, lastMsgId: lastMsgId },
                headers: { "Authorization": token }
            });

        const messages = response.data;
        if (messages.length > 0) {
            messages.forEach((messageData) => {
                const { UserId, messageText, createdAt, id } = messageData;
                addMessage(UserId, messageText, createdAt);

                if (id > lastMsgId) {
                    lastMsgId = id;
                }
            });
        }
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

sendButton.addEventListener('click', async () => {
    const text = messageInput.value.trim();
    if (text) {
        addMessage("You", text, new Date().toISOString());
        messageInput.value = '';

        const token = localStorage.getItem('token');
        try {
            console.log("Sending message:");
            const response = await axios.post(`${CONFIG.API_BASE_URL}/api/postMessage`,
                { messageText: text, ChatGroupId: currentGourpId },
                { headers: { "Authorization": token } }
            );
            console.log("Message sent:", response.data);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendButton.click();
});


window.addEventListener('load', () => {
    setInterval(loadNewMessages, 1000);
});



const createGroupButton = document.getElementById('create-group-button');
const createGroupForm = document.getElementById('create-group-form');
const groupNameInput = document.getElementById('group-name');
const submitGroupButton = document.getElementById('submit-group-button');
const groupList = document.getElementById('group-list');

createGroupButton.addEventListener('click', function () {
    createGroupForm.style.display = 'block';
});

submitGroupButton.addEventListener('click', async function (event) {
    event.preventDefault();  // Prevent default form submission behavior

    const groupName = groupNameInput.value.trim();  // Get group name from input

    if (groupName !== '') {


        const response = await axios.post(`${CONFIG.API_BASE_URL}/api/postGroup`,
            { name: groupName },
        );

        console.log(response);
        addGroupToList(response.data)
        // Clear the input field and hide the form
        groupNameInput.value = '';
        createGroupForm.style.display = 'none';
    } else {
        alert('Please enter a group name.');
    }
});

(async () => {
    const response = await axios.get(`${CONFIG.API_BASE_URL}/api/getGroup`);
    console.log(response.data);

    response.data.forEach(group => {
        console.log(group.name);
        addGroupToList(group)
    })

})();



function addGroupToList(group) {
    const groupList = document.getElementById('group-list');
    const newGroupItem = document.createElement('li');
    newGroupItem.textContent = group.id + " " + group.name;

    // Pass a function reference or use an anonymous function to call groupEnter when clicked
    newGroupItem.addEventListener('click', function () {
        groupClickHandler(group);
    });

    groupList.appendChild(newGroupItem);
}

function groupClickHandler(group) {
    console.log('Group ID:', group.id);
    console.log('Group Name:', group.name);
    loadMessages(group.id);
    currentGourpId = group.id;
    lastMsgId = 0;
}