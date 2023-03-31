/* $("form").on("submit", e => {
       e.preventDefault();
       const name = $("input#name")
         .val()
         .trim();
       const phone = $("input#phone")
         .val()
         .trim();
       const email = $("input#email")
         .val()
         .trim();
       const message = $("input#message")
         .val()
         .trim();
       const data = {
         name,
         phone,
         email,message
       };
       $.post("/email", data)
         .then(() => {
           window.location.href = "#";
         })
         .catch(() => {
           window.location.href = "/error";
         });
     }); */
