
// -----------------------Drag and Drop File-----------------------------------------
// const uploadArea = document.getElementById('upload-area');
// const fileInput = document.getElementById('file-upload');

// // Highlight drop area when dragging files over it
// uploadArea.addEventListener('dragover', (event) => {
//     event.preventDefault();
//     uploadArea.style.backgroundColor = '#e6e6e6';
// });

// uploadArea.addEventListener('dragleave', () => {
//     uploadArea.style.backgroundColor = '#f9f9f9';
// });

// uploadArea.addEventListener('drop', (event) => {
//     event.preventDefault();
//     uploadArea.style.backgroundColor = '#f9f9f9';
//     fileInput.files = event.dataTransfer.files;
//     // Add your file handling logic here
//     alert(`${fileInput.files.length} file(s) uploaded`);
// });

// uploadArea.addEventListener('click', () => {
//     fileInput.click();
// });

// fileInput.addEventListener('change', () => {
//     // Add your file handling logic here
//     alert(`${fileInput.files.length} file(s) selected`);
// });
// ----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('upload-area');
    const uploadText = document.getElementById('upload-file-name');
    uploadArea.addEventListener('click', async () => {
        try {
            const files = await window.showOpenFilePicker({
                multiple: true,
                types: [
                    {
                        description: 'Documents',
                        accept: {
                            'application/pdf': ['.pdf'],
                            'text/plain': ['.txt'],
                            'application/msword': ['.doc', '.docx'],
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                        }
                    }
                ]
            });

            // Handle the files selected by the user
            const selectedFiles = await Promise.all(files.map(fileHandle => fileHandle.getFile()));
            uploadText.innerHTML = selectedFiles.map(file => file.name).join('<br>'); // Display file names
            
            // Prepare FormData for sending the files to the server
            const formData = new FormData();
            selectedFiles.forEach(file => formData.append('files', file));

            // Send files to the server
            const response = await fetch('/upload/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': '{{ csrf_token }}'  // Ensure CSRF protection if needed
                }
            });

            if (response.ok) {
                console.log('Files successfully uploaded');
            } else {
                console.error('Failed to upload files');
            }

            } catch (error) {
            console.error('File selection was canceled or failed', error);
            }
    });
});

