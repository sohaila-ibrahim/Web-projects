var contactNameInput = document.getElementById("fullName");
var contactNumberInput = document.getElementById("phoneNumber");
var contactEmailInput = document.getElementById("emailAddress");
var contactAddressInput = document.getElementById("Address");
var contactGroupInput = document.getElementById("Group");
var contactNotesInput = document.getElementById("Notes");
var contactImageInput = document.getElementById("change-photo");
var contactFavInput = document.getElementById("fav");
var contactEmargInput = document.getElementById("emarg");
var searchInputEl = document.getElementById("searchInput");

var AddBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var modalTitle = document.getElementById("staticBackdropLabel");
var modalEl = document.getElementById("staticBackdrop");

var AllContact = JSON.parse(localStorage.getItem("contact")) || [];
var editIndex = null;
display(AllContact);
displayFavAndEmarg();
updateCounts();

// validation
function isValidContact() {
    var name = contactNameInput.value.trim();
    var phone = contactNumberInput.value.trim();
    var email = contactEmailInput.value.trim();

    if (name === "") {
        Swal.fire({ icon: "warning", title: "Missing Name", text: "Please enter the full name." });
        return false;
    }

    if (phone === "") {
        Swal.fire({ icon: "warning", title: "Missing Phone", text: "Please enter a phone number." });
        return false;
    }

    if (!/^\d{7,15}$/.test(phone)) {
        Swal.fire({ icon: "warning", title: "Invalid Phone", text: "Phone number must contain 7-15 digits only." });
        return false;
    }

    if (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        Swal.fire({ icon: "warning", title: "Invalid Email", text: "Please enter a valid email address." });
        return false;
    }

    return true;
}

// Add contact
function addContact() {
    if (!isValidContact()) return;

    var contact = {
        contactName: contactNameInput.value.trim(),
        contactNumber: contactNumberInput.value.trim(),
        contactEmail: contactEmailInput.value.trim(),
        contactAddress: contactAddressInput.value.trim(),
        contactGroup: contactGroupInput.value,
        contactNotes: contactNotesInput.value.trim(),
        contactImage: contactImageInput.value,
        contactFav: contactFavInput.checked,
        contactEmarg: contactEmargInput.checked,
    };

    AllContact.push(contact);
    localStorage.setItem("contact", JSON.stringify(AllContact));

    display(AllContact);
    displayFavAndEmarg();
    updateCounts();
    clearForm();

    Swal.fire({
        icon: "success",
        title: "Contact Added!",
        text: contact.contactName + " has been added to your contacts.",
        timer: 1800,
        showConfirmButton: false,
    });
}

// display Fav&Emarg function
function displayFavAndEmarg() {
    var cartonaFav = "";
    var cartonaEmarg = "";
    for (var i = 0; i < AllContact.length; i++) {
        if (AllContact[i].contactFav) {
            cartonaFav += `<div
                                        class="contact p-2 d-flex align-items-center justify-content-between gap-2 rounded-3">
                                        ${buildAvatar(AllContact[i], 40, false)}
                                        <div class="contact-info me-auto">
                                            <h6 class="small fw-medium m-0">${AllContact[i].contactName}</h6>
                                            <p class="text-secondary m-0">${AllContact[i].contactNumber}</p>
                                        </div>
                                        <a href="tel:${AllContact[i].contactNumber}"
                                            class="call-bg bg-success bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center">
                                            <i class="fa-solid fa-phone text-success"></i>
                                        </a>
                                    </div>`;
        }

        if (AllContact[i].contactEmarg) {
            cartonaEmarg += `<div
                                        class="contact p-2 d-flex align-items-center justify-content-between gap-2 rounded-3">
                                        ${buildAvatar(AllContact[i], 40, false)}
                                        <div class="contact-info me-auto">
                                            <h6 class="small fw-medium m-0">${AllContact[i].contactName}</h6>
                                            <p class="text-secondary m-0">${AllContact[i].contactNumber}</p>
                                        </div>
                                        <a href="tel:${AllContact[i].contactNumber}"
                                            class="call-bg bg-success bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center">
                                            <i class="fa-solid fa-phone text-success"></i>
                                        </a>
                                    </div>`;
        }
    }

    document.getElementById("favorite").innerHTML =
        cartonaFav || `<p class="text-secondary small m-0">No favorites yet.</p>`;
    document.getElementById("emarj").innerHTML =
        cartonaEmarg || `<p class="text-secondary small m-0">No emergency contacts yet.</p>`;
}


var AVATAR_COLORS = [
    "linear-gradient(135deg,#7c3aed,#a855f7)",
    "linear-gradient(135deg,#2563eb,#38bdf8)",
    "linear-gradient(135deg,#16a34a,#4ade80)",
    "linear-gradient(135deg,#ea580c,#fb923c)",
    "linear-gradient(135deg,#db2777,#f472b6)",
    "linear-gradient(135deg,#0891b2,#22d3ee)",
];

function getInitials(name) {
    var parts = String(name || "?")
        .trim()
        .split(/\s+/);
    var first = parts[0] ? parts[0][0] : "";
    var second = parts[1] ? parts[1][0] : "";
    return (first + second).toUpperCase() || "?";
}

function getAvatarColor(name) {
    var str = String(name || "");
    var hash = 0;
    for (var i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}


var badges = "";
if (showBadges && contact.contactFav) {
    badges += `<span style="position:absolute;top:-4px;right:-4px;width:20px;height:20px;border-radius:50%;
                        background:#ffc107;display:flex;align-items:center;justify-content:center;font-size:10px;
                        box-shadow:0 0 0 2px #fff;">★</span>`;
}
if (showBadges && contact.contactEmarg) {
    badges += `<span style="position:absolute;bottom:-4px;right:-4px;width:20px;height:20px;border-radius:50%;
                        background:#dc3545;color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;
                        box-shadow:0 0 0 2px #fff;">♥</span>`;
}
return `<div style="position:relative;width:${size}px;height:${size}px;flex-shrink:0;">
                <div class="rounded-4 d-flex align-items-center justify-content-center"
                    style="width:${size}px;height:${size}px;background:${getAvatarColor(
                      contact.contactName,
                    )};color:#fff;font-weight:700;font-size:${Math.round(size * 0.35)}px;">
                    ${getInitials(contact.contactName)}
                </div>
                ${badges}
            </div>`;
}

// Display Function
function display(array) {
    var cartona = "";

    for (var i = 0; i < array.length; i++) {

        var realIndex = AllContact.indexOf(array[i]);

        cartona += `<div class="contact-card col-12 col-sm-6 p-2">
                            <div class="inner p-3 shadow rounded-4">
                                <div>
                                    <div class="d-flex gap-3 align-items-start">
                                        ${buildAvatar(array[i], 64, true)}
                                        <div>
                                            <h3 class="fs-5">${array[i].contactName}</h3>
                                            <div class="d-flex align-items-center gap-2">
                                                <div class="bg-primary bg-opacity-10 py-1 px-2 fit-content rounded-3">
                                                    <i class="fa-solid fa-phone text-primary small"></i>
                                                </div>
                                                <span class="text-secondary fw-medium">${array[i].contactNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="pt-2 d-flex align-items-center gap-2">
                                        <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                            <i class="fa-solid fa-envelope text-purple small"></i>
                                        </div>
                                        <span class="text-secondary">${array[i].contactEmail}</span>
                                    </div>
                                    <div class="pt-2 d-flex align-items-center gap-2">
                                        <div class="bg-success bg-opacity-10 p-1 px-2 rounded-2 fit-content">
                                            <i class="fa-solid fa-location-dot text-success small"></i>
                                        </div>
                                        <span class="text-secondary">${array[i].contactAddress}</span>
                                    </div>
                                    <div class="py-3 d-flex gap-2 flex-wrap">
                                        <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                            <span class="small text-purple">${array[i].contactGroup}</span>
                                        </div>
                                        ${
                                          array[i].contactEmarg
                                            ? '<div class="bg-danger bg-opacity-10 p-1 px-2 rounded-2 fit-content"><span class="small text-danger">&#10084; Emergency</span></div>'
                                            : ""
                                        }
                                    </div>
                                </div>
                                <div class="border-top border-1 border-secondary border-opacity-10 pt-3">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="d-flex gap-3">
                                            <a href="tel:${array[i].contactNumber}"
                                                class="bg-success bg-opacity-10 py-1 px-2 rounded-2 fit-content">
                                                <i class="fa-solid fa-phone text-success small"></i>
                                            </a>
                                            <a href="mailto:${array[i].contactEmail}"
                                                class="bg-main bg-opacity-10 py-1 px-2 rounded-2 fit-content">
                                                <i class="fa-solid fa-envelope text-purple small"></i>
                                            </a>
                                        </div>
                                        <div class="d-flex gap-3 align-items-center">
                                            <button class="border-0 bg-transparent" onclick="toggleFav(${realIndex})">${
                                              array[i].contactFav
                                                ? '<i class="fa-solid fa-star text-warning"></i>'
                                                : '<i class="fa-regular fa-star text-secondary"></i>'
                                            }
                                                </button>
                                            <button class="border-0 bg-transparent" onclick="toggleEmarg(${realIndex})">${
                                              array[i].contactEmarg
                                                ? '<i class="fa-solid fa-heart text-danger"></i>'
                                                : '<i class="fa-regular fa-heart text-secondary"></i>'
                                            }
                                                    </button>
                                            <button class="border-0 bg-transparent" onclick="editContact(${realIndex})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i
                                                    class="fa-solid fa-pen text-secondary"></i></button>
                                            <button onclick="deleteContact(${realIndex})" class="border-0 bg-transparent"><i
                                                    class="fa-solid fa-trash text-secondary"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    }
    document.getElementById("contacts").innerHTML =
        cartona || `<p class="text-secondary text-center w-100 py-5">No contacts found.</p>`;
}

// Toggle Function
function toggleFav(index) {
    AllContact[index].contactFav = !AllContact[index].contactFav;
    localStorage.setItem("contact", JSON.stringify(AllContact));
    display(AllContact);
    displayFavAndEmarg();
    updateCounts();
}

function toggleEmarg(index) {
    AllContact[index].contactEmarg = !AllContact[index].contactEmarg;
    localStorage.setItem("contact", JSON.stringify(AllContact));
    display(AllContact);
    displayFavAndEmarg();
    updateCounts();
}
// contactFavandMarg

// Edit Function - opens the modal in "update" mode and fills it with this contact's data
function editContact(index) {
    contactNameInput.value = AllContact[index].contactName;
    contactNumberInput.value = AllContact[index].contactNumber;
    contactEmailInput.value = AllContact[index].contactEmail;
    contactAddressInput.value = AllContact[index].contactAddress;
    contactGroupInput.value = AllContact[index].contactGroup;
    contactNotesInput.value = AllContact[index].contactNotes;
    contactFavInput.checked = AllContact[index].contactFav;
    contactEmargInput.checked = AllContact[index].contactEmarg;

    editIndex = index;
    modalTitle.textContent = "Edit Contact";
    AddBtn.classList.replace("d-block", "d-none");
    updateBtn.classList.replace("d-none", "d-block");
}

// Update Function
function updateContact() {
    if (!isValidContact()) return;
    if (editIndex === null) return;

    AllContact[editIndex] = {
        contactName: contactNameInput.value.trim(),
        contactNumber: contactNumberInput.value.trim(),
        contactEmail: contactEmailInput.value.trim(),
        contactAddress: contactAddressInput.value.trim(),
        contactGroup: contactGroupInput.value,
        contactNotes: contactNotesInput.value.trim(),
        contactImage: contactImageInput.value,
        contactFav: contactFavInput.checked,
        contactEmarg: contactEmargInput.checked,
    };

    localStorage.setItem("contact", JSON.stringify(AllContact));

    display(AllContact);
    displayFavAndEmarg();
    updateCounts();
    clearForm();
    editIndex = null;

    Swal.fire({
        icon: "success",
        title: "Contact Updated!",
        text: "Your changes have been saved.",
        timer: 1800,
        showConfirmButton: false,
    });
}

document.getElementById("staticBackdrop").addEventListener("hidden.bs.modal", function() {
    updateBtn.classList.replace("d-block", "d-none");
    AddBtn.classList.replace("d-none", "d-block");
    modalTitle.textContent = "Add New Contact";
    editIndex = null;
    clearForm();
});

// Delete Function
function deleteContact(index) {
    var name = AllContact[index].contactName;

    Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: 'Do you really want to delete "' + name + '"? This cannot be undone.',
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
        confirmButtonColor: "red",
    }).then(function(result) {
        if (result.isConfirmed) {
            AllContact.splice(index, 1);
            localStorage.setItem("contact", JSON.stringify(AllContact));

            display(AllContact);
            displayFavAndEmarg();
            updateCounts();

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "The contact has been removed.",
                timer: 1500,
                showConfirmButton: false,
            });
        }
    });
}

// update the total
function updateCounts() {
    var favCount = 0;
    var emargCount = 0;

    for (var i = 0; i < AllContact.length; i++) {
        if (AllContact[i].contactFav) favCount++;
        if (AllContact[i].contactEmarg) emargCount++;
    }

    document.getElementById("total").textContent = AllContact.length;
    document.getElementById("favorite-count").textContent = favCount;
    document.getElementById("Emar-count").textContent = emargCount;
}

// Clear Function
function clearForm() {
    contactNameInput.value = "";
    contactNumberInput.value = "";
    contactEmailInput.value = "";
    contactAddressInput.value = "";
    contactGroupInput.value = "select-group";
    contactNotesInput.value = "";
    contactImageInput.value = "";
    contactFavInput.checked = false;
    contactEmargInput.checked = false;
}

// search Function
function searchInput() {
    var searchArr = [];
    var keyword = searchInputEl.value.trim().toLowerCase();

    if (keyword === "") {
        display(AllContact);
        return;
    }

    for (var i = 0; i < AllContact.length; i++) {
        var name = String(AllContact[i].contactName).toLowerCase();
        var number = String(AllContact[i].contactNumber).toLowerCase();
        var email = String(AllContact[i].contactEmail).toLowerCase();
        if (name.includes(keyword) || number.includes(keyword) || email.includes(keyword)) {
            searchArr.push(AllContact[i]);
        }
    }
    display(searchArr);
}