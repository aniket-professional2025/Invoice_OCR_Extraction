// // // // // Upload existing pdf file from the system
// // // // document.getElementById("upload-btn").addEventListener("click", () => {
// // // //   document.getElementById("upload-input").click();
// // // // });

// // // // document.getElementById("upload-input").addEventListener("change", async (event) => {
// // // //   const file = event.target.files[0];
// // // //   if (!file) return;

// // // //   // Show loader
// // // //   document.getElementById("loader").classList.remove("hidden");

// // // //   const formData = new FormData();
// // // //   formData.append("audio", file);

// // // //   try {
// // // //     const response = await fetch("/process_audio", {
// // // //       method: "POST",
// // // //       body: formData,
// // // //     });

// // // //     if (!response.ok) {
// // // //       const errorText = await response.text();
// // // //       throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
// // // //     }

// // // //     const data = await response.json();

// // // //     document.getElementById("loader").classList.add("hidden");

// // // //     document.getElementById("transcription").innerHTML = data.transcription || '';
// // // //     document.getElementById("summary1").innerHTML = data.summary1_concise || '';
// // // //     document.getElementById("summary2").innerHTML = data.summary2_detailed || '';
// // // //     document.getElementById("summary3").innerHTML = data.summary3_bullet_points || '';
// // // //     document.getElementById("summary4").innerHTML = data.summary4_key_takeaways || '';

// // // //   } catch (err) {
// // // //     console.error("Error uploading and processing file:", err);
// // // //     document.getElementById("loader").classList.add("hidden");
// // // //     alert("An error occurred while processing the audio. Check the console for details.");
// // // //   }
// // // // });

// // // // Upload existing pdf file from the system
// // // document.getElementById("upload-btn").addEventListener("click", () => {
// // //   document.getElementById("upload-input").click();
// // // });

// // // document.getElementById("upload-input").addEventListener("change", async (event) => {
// // //   const file = event.target.files[0];
// // //   if (!file) return;

// // //   // Show loader
// // //   document.getElementById("loader").classList.remove("hidden");

// // //   const formData = new FormData();
// // //   // formData.append("audio", file);
// // //   const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
// // // if (!allowedTypes.includes(file.type)) {
// // //   alert("Only image files (PNG, JPG, JPEG) are allowed.");
// // //   return;
// // // }
// // //   formData.append("image", file);

// // //   try {
// // //     const response = await fetch("/process_image", {
// // //       method: "POST",
// // //       body: formData,
// // //     });

// // //     if (!response.ok) {
// // //       const errorText = await response.text();
// // //       throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
// // //     }

// // //     const data = await response.json();

// // //     document.getElementById("loader").classList.add("hidden");

// // //     document.getElementById("transcription").innerHTML = data.transcription || '';
// // //     document.getElementById("summary1").innerHTML = data.summary1_concise || '';
// // //     document.getElementById("summary2").innerHTML = data.summary2_detailed || '';
// // //     document.getElementById("summary3").innerHTML = data.summary3_bullet_points || '';
// // //     document.getElementById("summary4").innerHTML = data.summary4_key_takeaways || '';

// // //   } catch (err) {
// // //     console.error("Error uploading and processing file:", err);
// // //     document.getElementById("loader").classList.add("hidden");
// // //     alert("An error occurred while processing the audio. Check the console for details.");
// // //   }
// // // });


// // document.getElementById("upload-btn").addEventListener("click", () => {
// //   document.getElementById("upload-input").click();
// // });

// // document.getElementById("upload-input").addEventListener("change", async (event) => {
// //   const file = event.target.files[0];
// //   if (!file) return;

// //   const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
// //   if (!allowedTypes.includes(file.type)) {
// //     alert("Only image files (PNG, JPG, JPEG) are allowed.");
// //     return;
// //   }

// //   document.getElementById("loader").classList.remove("hidden");

// //   const formData = new FormData();
// //   formData.append("image", file);

// //   try {
// //     const response = await fetch("/process_image", {
// //       method: "POST",
// //       body: formData,
// //     });

// //     if (!response.ok) {
// //       const errorText = await response.text();
// //       throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
// //     }

// //     const data = await response.json();

// //     document.getElementById("loader").classList.add("hidden");

// //     const markdown = data.Extracted_text_table || "No content extracted.";

// //     // ✅ Convert Markdown to HTML


    
// //     document.getElementById("Extracted_text_table").innerHTML = marked.parse(markdown);
    

// //   } catch (err) {
// //     console.error("Error uploading and processing image:", err);
// //     document.getElementById("loader").classList.add("hidden");
// //     alert("An error occurred while processing the image. Check the console for details.");
// //   }
// // });


// document.getElementById("upload-btn").addEventListener("click", () => {
//   document.getElementById("upload-input").click();
// });

// document.getElementById("upload-input").addEventListener("change", async (event) => {
//   const file = event.target.files[0];
//   if (!file) return;

//   const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
//   if (!allowedTypes.includes(file.type)) {
//     alert("Only image files (PNG, JPG, JPEG) are allowed.");
//     return;
//   }

//   document.getElementById("loader").classList.remove("hidden");

//   const formData = new FormData();
//   formData.append("image", file);

//   try {
//     const response = await fetch("/process_image", {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//     }

//     const data = await response.json();
//     document.getElementById("loader").classList.add("hidden");

//     const markdown = data.Extracted_text_table || "No content extracted.";
//     const tableHTML = convertMarkdownToHTMLTable(markdown);
//     document.getElementById("Extracted_text_table").innerHTML = tableHTML;

//   } catch (err) {
//     console.error("Error uploading and processing image:", err);
//     document.getElementById("loader").classList.add("hidden");
//     alert("An error occurred while processing the image. Check the console for details.");
//   }
// });

// // Converts markdown table into real HTML <table>
// function convertMarkdownToHTMLTable(markdown) {
//   const lines = markdown.trim().split("\n").filter(line => line.includes("|"));
//   if (lines.length < 2) return "<p>No valid table found.</p>";

//   const headers = lines[0].split("|").map(cell => cell.trim()).filter(Boolean);
//   const rows = lines.slice(2).map(line =>
//     line.split("|").map(cell => cell.trim()).filter(Boolean)
//   );

//   let html = `<table class="styled-table">
//     <thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>
//     <tbody>
//       ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}
//     </tbody>
//   </table>`;

//   return html;
// }


document.getElementById("upload-btn").addEventListener("click", () => {
  document.getElementById("upload-input").click();
});

document.getElementById("upload-input").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!allowedTypes.includes(file.type)) {
    alert("Only image files (PNG, JPG, JPEG) are allowed.");
    return;
  }

  document.getElementById("loader").classList.remove("hidden");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("/process_image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    document.getElementById("loader").classList.add("hidden");

    const markdown = data.Extracted_text_table || "No content extracted.";
    const htmlOutput = convertFullMarkdownToHTML(markdown);
    document.getElementById("Extracted_text_table").innerHTML = htmlOutput;

  } catch (err) {
    console.error("Error uploading and processing image:", err);
    document.getElementById("loader").classList.add("hidden");
    alert("An error occurred while processing the image. Check the console for details.");
  }
});

function convertFullMarkdownToHTML(markdown) {
  const lines = markdown.trim().split("\n");

  let headerLines = [];
  let tableLines = [];
  let footerLines = [];

  let inTable = false;

  for (let line of lines) {
    if (line.includes("|")) {
      tableLines.push(line);
      inTable = true;
    } else if (!inTable) {
      headerLines.push(line);
    } else if (inTable && !line.includes("|")) {
      footerLines.push(line);
    }
  }

  // Convert header
  const headerHTML = headerLines.map(line => `<p>${line.trim()}</p>`).join("");

  // Convert table
  const tableHTML = convertMarkdownToHTMLTable(tableLines);

  // Convert footer
  const footerHTML = footerLines.map(line => {
    if (line.toLowerCase().includes("total") || line.includes("%"))
      return `<p style="font-weight:bold;">${line.trim()}</p>`;
    else
      return `<p>${line.trim()}</p>`;
  }).join("");

  return `<div class="invoice-block">${headerHTML}${tableHTML}${footerHTML}</div>`;
}

// function convertMarkdownToHTMLTable(tableLines) {
//   if (tableLines.length < 2) return "";

//   const headers = tableLines[0].split("|").map(cell => cell.trim()).filter(Boolean);
//   const rows = tableLines.slice(2).map(line =>
//     line.split("|").map(cell => cell.trim()).filter(Boolean)
//   );

//   let html = `<table class="styled-table">
//     <thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>
//     <tbody>
//       ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}
//     </tbody>
//   </table>`;

//   return html;
// }

function convertMarkdownToHTMLTable(tableLines) {
  if (tableLines.length < 2) return "";

  const headers = tableLines[0].split("|").map(cell => cell.trim()).filter(Boolean);
  const rows = tableLines.slice(2).map(line =>
    line.split("|").map(cell => cell.trim()).filter(Boolean)
  );

  let html = `
  <div class="table-wrapper">
    <table class="styled-table">
      <thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>
      <tbody>
        ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>
  </div>
  `;
  return html;
}

