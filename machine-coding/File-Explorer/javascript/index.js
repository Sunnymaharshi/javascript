const folderStructure =
  JSON.parse(localStorage.getItem("folderStructure")) ?? [];
let nextId = localStorage.getItem("nextId") ?? 1;
nextId = +nextId;
console.log(nextId);
const foldersContainer = document.getElementById("folder-structure");
foldersContainer.addEventListener("click", (e) => {
  const folderClasses = [
    "folder",
    "folder-header",
    "folder-name",
    "folder-icon",
    "folder-actions",
    "svg-icon",
  ];
  if (
    Array.from(e.target.classList).some((cls) => folderClasses.includes(cls))
  ) {
    let temp = e.target;
    while (!Array.from(temp.classList).includes("folder")) {
      temp = temp.parentElement;
    }
    temp.classList.toggle("open");
  }
});
function renderFolderStructure() {
  const container = document.getElementById("folder-structure");
  container.innerHTML = "";
  folderStructure.forEach((folder) => {
    container.appendChild(createFolder(folder));
  });
}
function createFolder(folder) {
  const folderDiv = document.createElement("div");
  folderDiv.className = "folder";
  folderDiv.id = `folder-${folder.id}`;
  const folderHeader = document.createElement("div");
  folderHeader.className = "folder-header";
  const folderNameCon = document.createElement("div");
  folderNameCon.className = "folder-name-container";
  const folderName = document.createElement("span");
  folderName.className = "folder-name";
  folderName.innerText = `📁 ${folder.name}`;
  const collapseIcon = document.createElement("i");
  collapseIcon.className = "folder-icon";
  collapseIcon.innerHTML = `
    <svg class="svg-icon" width="10" height="10" viewBox="0 0 10 10">
        <polygon class="svg-icon" points="2,1 8,5 2,9" fill="#000" />    
    </svg>
    `;
  folderNameCon.appendChild(collapseIcon);
  folderNameCon.appendChild(folderName);
  folderHeader.appendChild(folderNameCon);
  folderDiv.appendChild(folderHeader);
  const folderActions = document.createElement("div");
  folderActions.className = "folder-actions";
  const addButton = document.createElement("button");
  addButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" version="1.1" id="Ebene_1" width="800px" height="800px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
<g>
	<path d="M62,14H30.829l-7.415-7.414C23.039,6.211,22.53,6,22,6H2C0.896,6,0,6.896,0,8v44c0,1.104,0.896,2,2,2h60   c1.104,0,2-0.896,2-2V16C64,14.896,63.104,14,62,14z M60,50H4V10h17.171l7.415,7.414C28.961,17.789,29.47,18,30,18h30V50z"/>
	<path d="M30,32h-8c-1.104,0-2,0.896-2,2s0.896,2,2,2h8v8c0,1.104,0.896,2,2,2s2-0.896,2-2v-8h8c1.104,0,2-0.896,2-2s-0.896-2-2-2   h-8v-8c0-1.104-0.896-2-2-2s-2,0.896-2,2V32z"/>
</g>
</svg>
  `;
  addButton.className = "add-sub-btn";
  addButton.addEventListener("click", (e) => {
    addNewFolder(folder.id);
  });
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
        <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
    </svg>
  `;
  deleteButton.className = "delete-btn";
  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteFolder(folder.id);
  });

  folderActions.appendChild(addButton);
  folderActions.appendChild(deleteButton);
  folderHeader.appendChild(folderActions);

  const folderContent = document.createElement("div");
  folderContent.className = "folder-content";
  if (folder.children && folder.children.length > 0) {
    folder.children.forEach((child) => {
      folderContent.appendChild(createFolder(child));
    });
  }
  folderDiv.appendChild(folderContent);

  return folderDiv;
}
function addNewFolder(parentId = null) {
  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";
  const input = document.createElement("input");
  input.className = "folder-input";
  const save = document.createElement("button");
  save.className = "save-btn";
  save.textContent = "save";
  inputContainer.appendChild(input);
  inputContainer.appendChild(save);
  if (parentId === null) {
    const foldersContainer = document.getElementById("folder-structure");
    foldersContainer.appendChild(inputContainer);
  } else {
    const parentFolderContent = document.querySelector(
      `#folder-${parentId} > .folder-content`
    );

    parentFolderContent.appendChild(inputContainer);
    parentFolderContent.parentElement.classList.add("open");
  }
  input.addEventListener("blur", (e) => {
    setTimeout(() => {
      inputContainer.remove();
    }, 100);
  });
  input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      save.click();
    }
  });
  input.focus();
  save.addEventListener("click", (e) => {
    const folderName = input.value.trim();
    if (folderName) {
      const newFolder = {
        id: nextId++,
        name: folderName,
        children: [],
      };
      if (parentId === null) {
        folderStructure.push(newFolder);
        saveFolderStructure();
        const foldersContainer = document.getElementById("folder-structure");
        foldersContainer.appendChild(createFolder(newFolder));
      } else {
        const parent = findFolder(folderStructure, parentId);
        if (parent) {
          parent.children.push(newFolder);
          saveFolderStructure();
          const parentFolderContent = document.querySelector(
            `#folder-${parentId} > .folder-content`
          );

          parentFolderContent.appendChild(createFolder(newFolder));
          parentFolderContent.parentElement.classList.add("open");
        }
      }
    }
    inputContainer.remove();
  });
}
function saveFolderStructure() {
  localStorage.setItem("folderStructure", JSON.stringify(folderStructure));
  localStorage.setItem("nextId", nextId.toString());
}
function deleteFolder(folderId) {
  if (
    confirm("Are you sure you want to delete this folder & all it's contents")
  ) {
    // check root folders
    for (let i = 0; i < folderStructure.length; i++) {
      if (folderStructure[i].id === folderId) {
        folderStructure.splice(i, 1);
        saveFolderStructure();
        renderFolderStructure();
        return;
      }
    }
    // if it is nested folder
    const result = deleteNestedFolder(folderStructure, folderId);
    if (result) {
      saveFolderStructure();
      renderFolderStructure();
    }
  }
}
function deleteNestedFolder(folders, folderId) {
  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];
    if (folder.children) {
      for (let j = 0; j < folder.children.length; j++) {
        if (folder.children[j].id === folderId) {
          folder.children.splice(j, 1);
          return true;
        }
      }
      if (deleteNestedFolder(folder.children, folderId)) {
        return true;
      }
    }
  }
}
function findFolder(folders, folderId) {
  for (let i = 0; i < folders.length; i++) {
    if (folders[i].id === folderId) {
      return folders[i];
    }
    if (folders[i].children) {
      const found = findFolder(folders[i].children, folderId);
      if (found) {
        return found;
      }
    }
  }
}
document
  .getElementById("add-root-folder-btn")
  .addEventListener("click", (e) => {
    addNewFolder();
  });
// Initial render
renderFolderStructure();
