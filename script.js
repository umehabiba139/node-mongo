urlg = "https://node-mongo-ashy.vercel.app/players";
function getScores() {
  console.log("test ");
  fetch(urlg, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const sc = document.getElementById("table");
      sc.innerHTML = `<tr>
                                <td class = "bold">Name</td>
                                <td class = "bold">Score</td>
                                <td>Operation</td>
                            </tr>`;
      data.forEach((element) => {
        console.log("test data rec");

        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const delbtn = document.createElement("button");
        const editbtn = document.createElement("button");
        td1.innerHTML = element.Name;
        td2.innerHTML = element.scores;
        tr.elementId = element._id;
        tr.appendChild(td1);
        tr.appendChild(td2);
        delbtn.innerHTML = "Delete";
        editbtn.innerHTML = "Edit";
        td3.appendChild(delbtn);
        td3.appendChild(editbtn);
        tr.appendChild(td3);
        delbtn.addEventListener("click", () => {
          fetch(urlg + "/" + element._id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
          getScores();
        }); 
        sc.appendChild(tr);
      });
    });
}

document.getElementById("post").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const score = document.getElementById("score").value;

  fetch(urlg, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ Name: name, scores: score }),
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
  document.getElementById("name").value = "";
  document.getElementById("score").value = "";
  getScores();
});
getScores();